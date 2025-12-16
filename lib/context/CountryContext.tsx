"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface Country {
  name: string;
  flag: string;
  code: string;
}

interface CountryContextType {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  countries: Country[];
}

const CountryContext = createContext<CountryContextType | null>(null);

interface CountryProviderProps {
  children: ReactNode;
}

const defaultCountries: Country[] = [
  { name: "United States", flag: "/images/usaflag.svg", code: "USD" },
  { name: "Australia", flag: "/images/ausfalg.svg", code: "AUD" },
  { name: "United Arab Emirate", flag: "/images/aueflag.svg", code: "AE" },
  { name: "India", flag: "/images/indiaflag.svg", code: "INR" },
];

export const CountryProvider: React.FC<CountryProviderProps> = ({ children }) => {
  const [selectedCountry, setSelectedCountryState]: any = useState<Country>(
    defaultCountries[0]
  );

  // Initialize country from localStorage on mount
  useEffect(() => {
    const storedCountry = localStorage.getItem("selectedCountry");
    if (storedCountry) {
      try {
        const parsedCountry = JSON.parse(storedCountry);
        // Add code if missing for backward compatibility
        if (!parsedCountry.code) {
          const foundCountry = defaultCountries.find(c => c.name === parsedCountry.name);
          if (foundCountry) {
            parsedCountry.code = foundCountry.code;
          }
        }
        setSelectedCountryState(parsedCountry);
      } catch (error) {
        console.error("Error parsing stored country:", error);
      }
    }
  }, []);

  const setSelectedCountry = (country: Country) => {
    setSelectedCountryState(country);
    localStorage.setItem("selectedCountry", JSON.stringify(country));
  };

  const contextValue: CountryContextType = {
    selectedCountry,
    setSelectedCountry,
    countries: defaultCountries,
  };

  return (
    <CountryContext.Provider value={contextValue}>
      {children}
    </CountryContext.Provider>
  );
};

// Hook to use country context
export const useCountry = (): CountryContextType => {
  const context = useContext(CountryContext);

  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider");
  }

  return context;
};

export default CountryContext;