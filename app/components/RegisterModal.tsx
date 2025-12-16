import Image from "next/image";
import React, { useRef, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

interface RegisterModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define the CountryData interface based on react-phone-input-2
interface CountryData {
  name: string;
  dialCode: string;
  countryCode: string;
  format: string;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, setOpen }) => {
  if (!isOpen) return null; // don't render if closed

  const { sendOTP: authSendOTP, verifyOTP: authVerifyOTP } = useAuth();
  const router = useRouter();
  const [phone, setPhone]: any = useState("");
  const [countryCode, setCountryCode]: any = useState("IN"); // default
  const [isOTP, setIsOTP]: any = useState(false);
  const [otp, setOtp]: any = useState(new Array(5).fill("")); // 5 boxes
  const [sessionId, setSessionId]: any = useState<string | null>(null);
  const [loading, setLoading]: any = useState(false);
  const [error, setError]: any = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // focus next input if a digit was entered
    if (value && index < 4) {
      // Changed from 4 to 5 for 6 digits
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // clear current box
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // move back only if current is already empty
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const sendOTP = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        phoneCode: countryCode, // country ISO code
        phoneNumber: phone.replace(/^0+/, "").slice(countryCode.length), // remove leading 0s or country dial code
      };

      console.log("Sending OTP with payload:", payload);
      const response: any = await authSendOTP(payload);
      console.log("OTP send response:", response);

      // Always show the OTP screen after attempting to send OTP
      // This is a fallback in case the response format is different than expected
      console.log("Showing OTP verification screen");
      setSessionId(response?.sessionId || null);
      setIsOTP(true);
    } catch (error: any) {
      console.error("Send OTP error:", error);
      setError(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    setError(null);

    try {
      // Format the phone number correctly (matching sendOTP format)
      const formattedPhone = phone.replace(/^0+/, "").slice(countryCode.length);
      const otpString = otp.join("");

      // Use the auth context function instead of calling AuthService directly
      const response: any = await authVerifyOTP(
        formattedPhone,
        otpString,
        countryCode
      );

      if (response.status === "success") {
        console.log("access token", response?.data.tokens.accessToken);
        // Authentication successful - close modal
        setOpen(false);

        // Small delay to allow state to update
        setTimeout(() => {
          // Redirect to home page using Next.js router
          router.push("/home");
          router.refresh();
        }, 500);

        // Reset form
        setPhone("");
        setOtp(new Array(5).fill("")); // Reset to 6 empty digits
        setIsOTP(false);
      } else {
        setError(response.message || "Failed to verify OTP");
      }
    } catch (error: any) {
      setError(error.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box p-0 lg:rounded-[24px] max-w-[90%] sm:max-w-[94%] max-h-[90%] lg:max-w-[90%] xl:max-w-[860px] lg:py-[18px] sm:py-[16px] shadow-xl bg-[#FAFAFA] w-full">
        <div className="flex flex-col sm:flex-row lg:flex-row xl:min-w-[860px] justify-between">
          {/* Left Side */}

          <div className="lg:w-[43%] sm:w-[48%] w-full h-auto md:h-full bg-[#FCF5EF] rounded-none lg:rounded-[30px] lg:rounded-l-none rounded-t-[18px] sm:rounded-l-none sm:rounded-r-[24px] flex items-center justify-center overflow-hidden relative">
            <Image
              width={500}
              height={380}
              src="/images/register-image.svg"
              alt="ring"
              className="lg:h-[100%] lg:w-[100%] w-[100%] h-[90%] object-contain"
            />
            <Image
              width={73}
              height={85}
              src="/images/register-image2.svg"
              alt="ring"
              className="lg:h-[85px] lg:w-[73px] object-contain absolute lg:top-8 sm:top-8 top-7 left-center"
            />
          </div>

          {/* Right Side */}
          <div className="bg-white sm:w-[50%] sm:py-2 sm:px-4 lg:w-[55%] w-full shadow-lg lg:px-8 px-4 p-5 lg:pr-10 flex flex-col relative justify-around lg:rounded-l-[30px] sm:rounded-l-[24px] lg:rounded-r-none">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="text-[#272622] absolute right-4 md:top-2 top-3 lg:top-3 text-lg font-[600] cursor-pointer"
            >
              ✕
            </button>
            {!isOTP ? (
              <>
                <h2 className="text-lg sm:text-[20px] lg:text-[24px] text-[18px] sm:mt-1 lg:mt-2 font-[400] leading-[100%] text-[#272622]">
                  Welcome to Kenzari Jewellery
                </h2>
                <p className="mt-2 font-[400] text-[11px] sm:text-[12px] leading-loose-[5px] text-[#787878]">
                  Login/ Sign up to your account and start buying your new
                  jewellery.
                </p>

                {/* Phone Input */}
                <div className="sm:mt-4 lg:mt-6">
                  <label className="label mb-1">
                    <span className="label-text font-[400] text-[12px] sm:text-[14px] text-[#787878]">
                      Phone Number
                    </span>
                  </label>
                  <PhoneInput
                    country={countryCode.toLowerCase()}
                    value={phone}
                    onChange={(phone, data) => {
                      setPhone(phone.replace(/\D/g, "")); // only numbers
                      // Check if data has countryCode property before accessing it
                      if (
                        data &&
                        typeof data === "object" &&
                        "countryCode" in data
                      ) {
                        setCountryCode(
                          (data as CountryData).countryCode.toUpperCase()
                        ); // e.g., 'IN'
                      }
                    }}
                    inputClass="!w-[98%] !h-11  sm:!w-full sm:!h-12 !text-base !rounded-[50px] !pl-12 !pr-4 !border !border-gray-300 focus:!border-black focus:!shadow-none"
                    buttonClass="!bg-transparent !border-none !absolute !left-2"
                    dropdownClass="!text-sm"
                  />
                  {error && (
                    <div className="text-red-500 text-sm mt-2">{error}</div>
                  )}
                </div>

                {/* Continue Button */}
                <button
                  onClick={sendOTP}
                  disabled={loading}
                  className={`cursor-pointer rounded-[50px] !w-[98%] !h-11 !text-[16px] !font-[400] leading-[100%] py-4 sm:!w-full sm:!h-12 mt-6 ${
                    loading ? "bg-gray-400" : "bg-[#013FE8]"
                  } text-white`}
                >
                  {loading ? "Sending..." : "Continue"}
                </button>

                {/* Terms */}
                <div className="h-auto flex justify-center mt-4 items-end">
                  <p className="font-[400] text-[12px] leading-[120%]  text-[#787878] text-center">
                    By continuing, I agree to{" "}
                    <a href="#" className="underline text-[#272622] font-[500]">
                      Terms of Use
                    </a>{" "}
                    &{" "}
                    <a href="#" className="underline text-[#272622] font-[500]">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-row items-center gap-3">
                  <GoArrowLeft
                    onClick={() => setIsOTP(false)}
                    className="cursor-pointer text-[#272622] text-[24px]"
                  />
                  <h2 className="text-[24px] leading-[100%] font-[400] text-[#272622]">
                    OTP Verification
                  </h2>
                </div>
                <p className="mt-2 ml-9 font-[400] leading-[100%]  text-[12px] text-[#787878]">
                  Enter OTP sent to your phone number{" "}
                  <strong className="text-[#272622] font-[500]">
                    +{countryCode} {phone}123456789
                  </strong>
                </p>

                {/* Error message */}
                {error && (
                  <div className="text-red-500 text-sm mt-2 text-center">
                    {error}
                  </div>
                )}

                {/* Phone Input */}
                <div className="mt-12 flex flex-col items-center">
                  <div className="grid grid-cols-5 gap-3">
                    {otp.map((digit: any, index: any) => (
                      <input
                        key={index}
                        type="text"
                        placeholder="-"
                        inputMode="numeric"
                        maxLength={1}
                        className="h-[44px] w-[44px] md:h-[52px] md:w-[64px] rounded-[18px] text-center border text-[#272622] bg-white border-[#EFEFEF] text-[16px] font-[400]"
                        ref={(el: HTMLInputElement | null) => {
                          inputRefs.current[index] = el;
                        }}
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        disabled={loading}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-[16px] leading-[100%] my-6 font-[400] text-center text-[#787878]">
                  <p>
                    Resend OTP in {""} {""}
                    <span className="text-[#1A1A1A] font-[700]">50s</span>
                  </p>
                  {/* <span className="font-[500] underline">
                      Resend
                    </span> */}
                </div>

                {/* Continue Button */}
                <button
                  onClick={verifyOTP}
                  disabled={loading}
                  className={`py-3 w-full h-[52px] !text-[16px] rounded-[50px] !font-[400] leading-[100%] ${
                    loading ? "bg-gray-400" : "bg-[#013FE8]"
                  } text-[#ffffff]`}
                >
                  {loading ? "Verifying..." : "Continue"}
                </button>

                {/* Terms */}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop" onClick={() => setOpen(false)}></div>
    </div>
  );
};

export default RegisterModal;
