import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { useEffect, useRef } from "react";

export default function Hero() {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.update(); // 👈 ensure layout recalculates
        swiperRef.current.slideNext();
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Swiper
        onSwiper={(swiper: any) => (swiperRef.current = swiper)}
        slidesPerView="auto"
        centeredSlides={true}
        loop={true}
        spaceBetween={0}
        pagination={{ clickable: true }}
        autoplay={true}
        speed={800}
        initialSlide={1}
        modules={[Pagination, Keyboard, Mousewheel, Autoplay]}
        observer={true} // 👈 reinitialize when DOM changes
        observeParents={true} // 👈 recalc when parent size changes
        watchSlidesProgress={true} // 👈 ensures prev/next slides render properly
        className="mySwiper"
      >
        {/* --- Slide 1 --- */}
        <SwiperSlide className="!w-full">
          <div className="w-full  overflow-hidden flex flex-row">
            <Image
              src="/images/hero-bg-1.svg"
              width={900}
              height={485}
              alt="bg"
              className="w-[100%] md:block  h-[auto] "
            />
            <div className="flex justify-center items-center xl:w-[40%] xl:h-[auto] lg:w-[22%] lg:h-[auto] sm:w-[auto] sm:h-[auto] w-[auto] h-[auto] absolute  xl:top-[18%] xl:left-[60%] lg:top-[11.2%] lg:left-[70%] sm:top-[11.7%] sm:left-[60%] top-[13%] left-[60%] overflow-hidden">
              
              <div className="flex flex-col gap-2 sm:gap-5 xl:w-[100%] lg:w-[100%] sm:w-[50%] sm:h-[auto] w-[50%]  text-center items-center">
                <Image
                  src="/images/weekend-sale.svg"
                  alt="Gold Cash"
                  width={322}
                  height={181.67}
                  className="object-contain xl:w-[60%]"
                />
                <Image
                  src={"/images/upto20off.svg"}
                  alt="20% off"
                  width={224}
                  height={74}
                  className="lg:w-[195px] lg:h-[65px] xl:w-[40%] xl:h-[auto]"
                />
                <button className="group relative overflow-hidden cursor-pointer w-fit h-[20px] xl:w-[35%] xl:h-[56px] sm:h-[36px] rounded-[50px] whitespace-nowrap text-white font-[400] text-[24px] border bg-transparent flex justify-center items-center px-2 xl:py-0 xl:px-6 lg:py-6 lg:px-5 sm:px-3 sm:py-5 border-white xl:gap-3 lg:gap-2 sm:gap-1 leading-[100%] transition-all duration-300">
                  <span className="absolute inset-0 w-0 bg-gradient-to-r from-white to-white transition-all duration-500 ease-in-out group-hover:w-full origin-left"></span>
                  <span className="z-10 transition-colors duration-300 text-white group-hover:text-[#272622] font-[400] text-[8px] xl:text-[20px] lg:text-[17px] sm:text-[16px]">
                    Shop Now
                  </span>
                  <GoArrowRight className="text-white group-hover:text-[#272622] z-10 text-[10px] sm:text-[16px] lg:text-[20px] transition-all duration-300 ease-in-out group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* --- Slide 2 --- */}
        <SwiperSlide className="!w-full">
          <div className="w-full  overflow-hidden flex flex-row">
            <Image
              src="/images/hero-bg-1.svg"
              width={900}
              height={485}
              alt="bg"
              className="w-[100%] md:block  h-[auto] "
            />
            <div className="flex justify-center items-center xl:w-[40%] xl:h-[auto] lg:w-[22%] lg:h-[auto] sm:w-[auto] sm:h-[auto] w-[auto] h-[auto] absolute  xl:top-[18%] xl:left-[60%] lg:top-[11.2%] lg:left-[70%] sm:top-[11.7%] sm:left-[60%] top-[13%] left-[60%] overflow-hidden">
              
              <div className="flex flex-col gap-2 sm:gap-5 xl:w-[100%] lg:w-[100%] sm:w-[50%] sm:h-[auto] w-[50%]  text-center items-center">
                <Image
                  src="/images/weekend-sale.svg"
                  alt="Gold Cash"
                  width={322}
                  height={181.67}
                  className="object-contain xl:w-[60%]"
                />
                <Image
                  src={"/images/upto20off.svg"}
                  alt="20% off"
                  width={224}
                  height={74}
                  className="lg:w-[195px] lg:h-[65px] xl:w-[40%] xl:h-[auto]"
                />
                <button className="group relative overflow-hidden cursor-pointer w-fit h-[20px] xl:w-[35%] xl:h-[56px] sm:h-[36px] rounded-[50px] whitespace-nowrap text-white font-[400] text-[24px] border bg-transparent flex justify-center items-center px-2 xl:py-0 xl:px-6 lg:py-6 lg:px-5 sm:px-3 sm:py-5 border-white xl:gap-3 lg:gap-2 sm:gap-1 leading-[100%] transition-all duration-300">
                  <span className="absolute inset-0 w-0 bg-gradient-to-r from-white to-white transition-all duration-500 ease-in-out group-hover:w-full origin-left"></span>
                  <span className="z-10 transition-colors duration-300 text-white group-hover:text-[#272622] font-[400] text-[8px] xl:text-[20px] lg:text-[17px] sm:text-[16px]">
                    Shop Now
                  </span>
                  <GoArrowRight className="text-white group-hover:text-[#272622] z-10 text-[10px] sm:text-[16px] lg:text-[20px] transition-all duration-300 ease-in-out group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* --- Slide 3 --- */}
        <SwiperSlide className="!w-full">
          <div className="w-full  overflow-hidden flex flex-row">
            <Image
              src="/images/hero-bg-1.svg"
              width={900}
              height={485}
              alt="bg"
              className="w-[100%] md:block  h-[auto] "
            />
            <div className="flex justify-center items-center xl:w-[40%] xl:h-[auto] lg:w-[22%] lg:h-[auto] sm:w-[auto] sm:h-[auto] w-[auto] h-[auto] absolute  xl:top-[18%] xl:left-[60%] lg:top-[11.2%] lg:left-[70%] sm:top-[11.7%] sm:left-[60%] top-[13%] left-[60%] overflow-hidden">
              
              <div className="flex flex-col gap-2 sm:gap-5 xl:w-[100%] lg:w-[100%] sm:w-[50%] sm:h-[auto] w-[50%]  text-center items-center">
                <Image
                  src="/images/weekend-sale.svg"
                  alt="Gold Cash"
                  width={322}
                  height={181.67}
                  className="object-contain xl:w-[60%]"
                />
                <Image
                  src={"/images/upto20off.svg"}
                  alt="20% off"
                  width={224}
                  height={74}
                  className="lg:w-[195px] lg:h-[65px] xl:w-[40%] xl:h-[auto]"
                />
                <button className="group relative overflow-hidden cursor-pointer w-fit h-[20px] xl:w-[35%] xl:h-[56px] sm:h-[36px] rounded-[50px] whitespace-nowrap text-white font-[400] text-[24px] border bg-transparent flex justify-center items-center px-2 xl:py-0 xl:px-6 lg:py-6 lg:px-5 sm:px-3 sm:py-5 border-white xl:gap-3 lg:gap-2 sm:gap-1 leading-[100%] transition-all duration-300">
                  <span className="absolute inset-0 w-0 bg-gradient-to-r from-white to-white transition-all duration-500 ease-in-out group-hover:w-full origin-left"></span>
                  <span className="z-10 transition-colors duration-300 text-white group-hover:text-[#272622] font-[400] text-[8px] xl:text-[20px] lg:text-[17px] sm:text-[16px]">
                    Shop Now
                  </span>
                  <GoArrowRight className="text-white group-hover:text-[#272622] z-10 text-[10px] sm:text-[16px] lg:text-[20px] transition-all duration-300 ease-in-out group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        
        {/* --- Slide 4 --- */}
        <SwiperSlide className="!w-full">
          <div className="w-full  overflow-hidden flex flex-row">
            <Image
              src="/images/hero-bg-1.svg"
              width={900}
              height={485}
              alt="bg"
              className="w-[100%] md:block  h-[auto] "
            />
            <div className="flex justify-center items-center xl:w-[40%] xl:h-[auto] lg:w-[22%] lg:h-[auto] sm:w-[auto] sm:h-[auto] w-[auto] h-[auto] absolute  xl:top-[18%] xl:left-[60%] lg:top-[11.2%] lg:left-[70%] sm:top-[11.7%] sm:left-[60%] top-[13%] left-[60%] overflow-hidden">
              
              <div className="flex flex-col gap-2 sm:gap-5 xl:w-[100%] lg:w-[100%] sm:w-[50%] sm:h-[auto] w-[50%]  text-center items-center">
                <Image
                  src="/images/weekend-sale.svg"
                  alt="Gold Cash"
                  width={322}
                  height={181.67}
                  className="object-contain xl:w-[60%]"
                />
                <Image
                  src={"/images/upto20off.svg"}
                  alt="20% off"
                  width={224}
                  height={74}
                  className="lg:w-[195px] lg:h-[65px] xl:w-[40%] xl:h-[auto]"
                />
                <button className="group relative overflow-hidden cursor-pointer w-fit h-[20px] xl:w-[35%] xl:h-[56px] sm:h-[36px] rounded-[50px] whitespace-nowrap text-white font-[400] text-[24px] border bg-transparent flex justify-center items-center px-2 xl:py-0 xl:px-6 lg:py-6 lg:px-5 sm:px-3 sm:py-5 border-white xl:gap-3 lg:gap-2 sm:gap-1 leading-[100%] transition-all duration-300">
                  <span className="absolute inset-0 w-0 bg-gradient-to-r from-white to-white transition-all duration-500 ease-in-out group-hover:w-full origin-left"></span>
                  <span className="z-10 transition-colors duration-300 text-white group-hover:text-[#272622] font-[400] text-[8px] xl:text-[20px] lg:text-[17px] sm:text-[16px]">
                    Shop Now
                  </span>
                  <GoArrowRight className="text-white group-hover:text-[#272622] z-10 text-[10px] sm:text-[16px] lg:text-[20px] transition-all duration-300 ease-in-out group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        
        

        

        {/* --- Slide 2 --- */}
        {/* <SwiperSlide className="!w-full">
          <div className="bg-[url('/images/hero-bg2.jpg')] overflow-hidden h-[565px] w-full bg-cover bg-center">
            <div className="gradient-right w-full h-full flex justify-start items-center xl:pl-15 lg:pl-10 md:pl-8 pl-5 p-5">
              <div className="xl:w-[40%] lg:w-[50%] sm:w-[60%] w-full text-white flex flex-col gap-4">
                <h1 className="text-[55px] font-ebgaramond font-[500] leading-16">
                  Unique <br className="sm:block hidden" /> <i>and</i>{" "}
                  Authenticate Modern <i>Designer</i> Jewellery
                </h1>
                <p className="text-[18px]  capitalize font-[400]">
                  Now available at Gold Cash
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide> */}

        {/* --- Slide 3 --- */}
        {/* <SwiperSlide className="!w-full">
          <div className="flex overflow-hidden justify-between items-center bg-[#FFF8EC]">
            <div className="flex flex-col justify-center gap-8 bg-[url('/images/banner-bg.png')] h-[565px] bg-no-repeat bg-bottom bg-contain">
              <div className="flex flex-col gap-8 w-[90%] xl:w-[80%] pl-10 xl:pl-14">
                <h1 className="text-[#272622] font-[300] text-[40px] leading-none">
                  Buy Digital Gold Today
                </h1>
                <p className="text-[#787878] text-[16px]  font-[400]">
                  Gold Cash Limited offers Instant Cash for Gold by buying Gold
                  jewellery at market price, Releases Pledged or Mortgaged Gold
                  Loans by settling the Gold Loan of the customer, Buy Gold
                  within easy EMI, and extends Gold Loan services across India.
                </p>

                <Link href={"/carat-gold"}>
                  <button className="relative overflow-hidden rounded-[8px] text-[#272622] bg-white shadow-[0px_6px_18px_0px_#0000001F] !text-[22px] !font-[300] leading-none cursor-pointer border border-[#FFCA6D] flex justify-center items-center py-2 px-6 gap-3 transition-all duration-300 group">
                    <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#FFCA6D] to-[#FFB738] transition-all duration-500 ease-in-out group-hover:w-full origin-left"></span>
                    <span className="z-10 transition-colors duration-300 text-[#272622]">
                      Buy Now
                    </span>
                    <GoArrowRight className="text-[#272622] z-10 text-[20px] transition-all duration-300 ease-in-out group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>

            <div className="w-fit hidden lg:flex">
              <Image
                src={"/images/digital-gold-banner.png"}
                height={500}
                width={1350}
                alt="banner"
                className="!w-[1400px] min-w-[520px] h-[485px] bg-center"
              />
            </div>
          </div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
}
