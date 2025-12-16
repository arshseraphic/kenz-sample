import React, { useState, useMemo, useEffect } from "react";
import addressService from "@/services/addressService";
import countryList from "react-select-country-list";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";

interface AddressModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addressId?: string;
  onSuccess: () => void;
}

interface FormData {
  full_name: string;
  house_no: string;
  street_area: string;
  state_province_region: string;
  city_town: string;
  country: string;
  pincode_zipcode: string;
  landmark?: string;
  address_type?: string;
  is_default: boolean;
}

const AddAddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  setOpen,
  addressId,
  onSuccess,
}) => {
  const [formData, setFormData]: any = useState<FormData>({
    full_name: "",
    house_no: "",
    street_area: "",
    state_province_region: "",
    city_town: "",
    country: "",
    pincode_zipcode: "",
    landmark: "",
    address_type: "Home",
    is_default: false,
  });

  const [errors, setErrors]: any = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [error, setError]: any = useState<string | null>(null);
  const [loading, setLoading]: any = useState(false);

  // Get country options from react-select-country-list
  const countryOptions = useMemo(() => countryList().getData(), []);

  // Get states based on selected country
  const stateOptions = useMemo(() => {
    if (!formData.country) return [];
    return State.getStatesOfCountry(formData.country).map((state) => ({
      value: state.isoCode,
      label: state.name,
    }));
  }, [formData.country]);

  // Get cities based on selected country and state
  const cityOptions = useMemo(() => {
    if (!formData.country || !formData.state_province_region) return [];
    return City.getCitiesOfState(
      formData.country,
      formData.state_province_region
    ).map((city) => ({
      value: city.name,
      label: city.name,
    }));
  }, [formData.country, formData.state_province_region]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
      ...(name === "country" && { state_province_region: "", city_town: "" }),
      ...(name === "state_province_region" && { city_town: "" }),
    }));

    setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({ ...prev, is_default: e.target.checked }));
  };

  const handleAddressTypeChange = (type: string) => {
    setFormData((prev: any) => ({ ...prev, address_type: type }));
  };

  useEffect(() => {
    if (isOpen && addressId) {
      getAddress();
    } else if (isOpen && !addressId) {
      // reset when opening for add
      setFormData({
        full_name: "",
        house_no: "",
        street_area: "",
        state_province_region: "",
        city_town: "",
        country: "",
        pincode_zipcode: "",
        landmark: "",
        address_type: "Home",
        is_default: false,
      });
    }
  }, [isOpen, addressId]);

  const getAddress = async () => {
    try {
      setLoading(true);
      const address = await addressService.getAddressesByid(addressId!);
      console.log("Fetched address:", address);

      // Assuming address object matches FormData structure
      setFormData({
        full_name: address.full_name || "",
        house_no: address.house_no || "",
        street_area: address.street_area || "",
        state_province_region: address.state_province_region || "",
        city_town: address.city_town || "",
        country: address.country || "",
        pincode_zipcode: address.pincode_zipcode || "",
        landmark: address.landmark || "",
        address_type: address.address_type || "Home",
        is_default: address.is_default || false,
      });
    } catch (error) {
      console.log("Error fetching address:", error);
      setError("Failed to fetch address. Please try again.");
      toast.error("Failed to fetch address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setErrors({});

    // Basic validation
    const requiredFields: (keyof FormData)[] = [
      "full_name",
      "house_no",
      "street_area",
      "state_province_region",
      "city_town",
      "country",
      "pincode_zipcode",
    ];

    const newErrors: Partial<Record<keyof FormData, string>> = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `Please fill in the ${field.replace(
          /_/g,
          " "
        )} field.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);

      // Scroll to first invalid field
      const firstErrorField = Object.keys(newErrors)[0];
      if (firstErrorField) {
        const el = document.querySelector(`[name="${firstErrorField}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    try {
      const payload: FormData = {
        ...formData,
        landmark: formData.landmark || undefined,
        address_type: formData.address_type || undefined,
      };

      if (addressId) {
        // Update existing address
        await addressService.updateAddress(addressId, payload);
        console.log("Address updated successfully");
        toast.success("Address updated successfully.");
        onSuccess();
      } else {
        // Add new address
        const response: any = await addressService.addAddress(payload);
        console.log("Address added successfully:", response);
        toast.success("Address added successfully.");
        onSuccess();
      }

      setOpen(false);
      setFormData({
        full_name: "",
        house_no: "",
        street_area: "",
        state_province_region: "",
        city_town: "",
        country: "",
        pincode_zipcode: "",
        landmark: "",
        address_type: "Home",
        is_default: false,
      });
    } catch (error: any) {
      setError(
        error.message ||
          `Failed to ${addressId ? "update" : "add"} address. Please try again.`
      );
      toast.error(
        `Failed to ${addressId ? "update" : "add"} address. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box text-[#272622] max-w-[800px] rounded-[24px] animate-fadeIn relative bg-white p-6">
        {/* Close Button */}
        <button
          className="text-black absolute right-5 top-5 !text-[24px] cursor-pointer"
          onClick={() => setOpen(false)}
          disabled={loading}
        >
          ✕
        </button>

        {/* Heading */}
        <div className="mb-4">
          <h1 className="text-[#272622] leading-[100%] text-[24px] font-[400]">
            {addressId ? "Edit Address" : "Add Address"}
          </h1>
        </div>

        {/* Global Error */}
        {error && <div className="mb-4 text-red-500 text-[14px] ">{error}</div>}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Full Name */}
          <div>
            <label className="block text-[14px] font-[400] text-[#787878] leading-[100%] mb-1">
              Full Name / Recipient Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              placeholder="Enter Name"
              className={`bg-white border text-[16px] font-[400]  border-[#EFEFEF] px-4 w-full rounded-[30px] py-3 ${
                errors.full_name ? "border-red-500" : ""
              }`}
              disabled={loading}
            />
            {errors.full_name && (
              <p className="text-red-500 text-[13px] mt-1 ">
                {errors.full_name}
              </p>
            )}
          </div>

          {/* House No. */}
          <div>
            <label className="block text-[14px] font-[400] text-[#787878] leading-[100%]  mb-1">
              House No.
            </label>
            <input
              type="text"
              name="house_no"
              value={formData.house_no}
              onChange={handleInputChange}
              placeholder="Enter Address"
              className={`bg-white border border-[#EFEFEF] px-4 w-full text-[16px] font-[400]  leading-[100%] rounded-[30px] py-3 ${
                errors.house_no ? "border-red-500" : ""
              }`}
              disabled={loading}
            />
            {errors.house_no && (
              <p className="text-red-500 text-[13px] mt-1 ">
                {errors.house_no}
              </p>
            )}
          </div>

          {/* Street/Area */}
          <div>
            <label className="block text-[14px] font-[400] text-[#787878] leading-[100%] mb-1">
              Street / Area
            </label>
            <input
              type="text"
              name="street_area"
              value={formData.street_area}
              onChange={handleInputChange}
              placeholder="Enter Street / Area"
              className={`bg-white border border-[#EFEFEF] px-4 w-full text-[16px] font-[400]  rounded-[30px] py-3 ${
                errors.street_area ? "border-red-500" : ""
              }`}
              disabled={loading}
            />
            {errors.street_area && (
              <p className="text-red-500 text-[13px] mt-1 ">
                {errors.street_area}
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-[14px] font-[400] leading-[100%] text-[#787878]  mb-1">
              Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={`select h-[50px] text-[16px] font-[400] bg-white border py-3 border-[#EFEFEF] w-full !rounded-[30px]
    ${formData.country === "" ? "text-gray-400" : "text-[#272622]"}
    ${errors.country ? "border-red-500" : ""}
  `}
              disabled={loading}
            >
              <option value="" disabled>
                Please Select
              </option>

              {countryOptions.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 text-[13px] mt-1 ">{errors.country}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-[14px] font-[400] leading-[100%] text-[#787878]  mb-1">
              State / Province / Region
            </label>
            <select
              name="state_province_region"
              value={formData.state_province_region}
              onChange={handleInputChange}
              className={`select h-[50px] text-[16px] font-[400]  bg-white border py-3 border-[#EFEFEF] w-full !rounded-[30px]
    ${errors.state_province_region ? "border-red-500" : ""}
    disabled:bg-white disabled:text-[#9CA3AF] disabled:border-[#EFEFEF] disabled:cursor-not-allowed
  `}
              disabled={loading || !formData.country}
            >
              <option value="">Please Select</option>
              {stateOptions.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
            {errors.state_province_region && (
              <p className="text-red-500 text-[13px] mt-1 ">
                {errors.state_province_region}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-[14px] font-[400] leading-[100%] text-[#787878]  mb-1">
              City / Town
            </label>
            <select
              name="city_town"
              value={formData.city_town}
              onChange={handleInputChange}
              className={`select h-[50px] text-[16px] font-[400]  bg-white border py-3 border-[#EFEFEF] w-full !rounded-[30px]
    ${errors.city_town ? "border-red-500" : ""}
    disabled:bg-white disabled:text-[#9CA3AF] disabled:border-[#EFEFEF] disabled:cursor-not-allowed
  `}
              disabled={loading || !formData.state_province_region}
            >
              <option value="">Please Select</option>
              {cityOptions.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
            {errors.city_town && (
              <p className="text-red-500 text-[13px] mt-1 ">
                {errors.city_town}
              </p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-[14px] font-[400] leading-[100%] text-[#787878]  mb-1">
              Pincode / Zipcode
            </label>
            <input
              type="text"
              name="pincode_zipcode"
              value={formData.pincode_zipcode}
              onChange={handleInputChange}
              placeholder="Enter Pincode / Zipcode"
              className={`bg-white border border-[#EFEFEF] px-4 w-full text-[16px] font-[400]  !rounded-[30px] py-3 ${
                errors.pincode_zipcode ? "border-red-500" : ""
              }`}
              disabled={loading}
            />
            {errors.pincode_zipcode && (
              <p className="text-red-500 text-[13px] mt-1 ">
                {errors.pincode_zipcode}
              </p>
            )}
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-[14px] font-[400] leading-[100%] text-[#787878]  mb-1">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleInputChange}
              placeholder="Enter Landmark"
              className="bg-white border border-[#EFEFEF] px-4 w-full text-[16px] font-[400]  !rounded-[30px] py-3"
              disabled={loading}
            />
          </div>
        </form>

        {/* Address Type */}
        <div className="mt-6">
          <label className="block text-[14px]  font-[400] leading-[100%] text-[#787878] mb-2">
            Address Type
          </label>
          <div className="flex gap-3 text-[#272622]">
            {["Home", "Office", "Other"].map((type) => (
              <button
                key={type}
                type="button"
                className={`px-3 py-1 rounded-full leading-[145%] !text-[14px] !font-[400] ! border ${
                  formData.address_type === type
                    ? "border-[#3B5455] bg-[] text-black"
                    : "border-[#EFEFEF]"
                }`}
                onClick={() => handleAddressTypeChange(type)}
                disabled={loading}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Checkbox */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_default}
            onChange={handleCheckboxChange}
            className="checked:bg-[#013FE8] checked:text-white checkbox checkbox-sm border-[#EFEFEF] border w-[20px] h-[20px] rounded-[6px]"
            disabled={loading}
          />
          <span className="text-[14px] leading-[100%] font-[400] text-[#272622]">
            Mark Address as Default
          </span>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="py-4 sm:w-[50%] w-full !text-[16px] !font-[400] !rounded-[50px] leading-none bg-[linear-gradient(179deg,#013FE8_0%,#8725EA_100%)] text-white"
          >
            {loading
              ? "Saving..."
              : addressId
              ? "Update Address"
              : "Save Address"}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop" onClick={() => setOpen(false)}></div>
    </div>
  );
};

export default AddAddressModal;
