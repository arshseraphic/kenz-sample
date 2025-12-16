import React from "react";

const SpinToWinModal = () => {
  return (
    <div className='modal modal-open'>
      <div className='modal-box relative max-w-[430px] rounded-none shadow-xl overflow-hidden bg-[white] p-5'>
        {/* <div className='w-[511px] h-[511px] bg-[#D8F4E7] z-10 rounded-full -right-[263px] absolute -top-[830px]'></div> */}

        <button
          className='text-black absolute right-4 top-5 text-[18px] cursor-pointer'
        //   onClick={() => {
        //     setIsCountryOpen(false);
        //   }}
        >
          ✕
        </button>
        <div className='text-center mb-4'>
          <h1 className='text-[#272622] text-[34px] leading-none font-[400]'>
            Spin to Win
          </h1>
        </div>
        <div className='flex flex-col justify-center gap-5 text-center'>
          {/* <p className="text-[#787878]  text-[16px] font-[500]">Congratulations, you won <span className="text-[#272622] font-[600]">$200</span></p> */}
          <p className='font-[400]  text-[16px] text-[#787878]'>
            Spin the wheel and win exciting rewards
          </p>
          <button className='py-3 !text-[22px] !font-[300] leading-none mx-auto w-[270px] bg-[#272622] justify-center gap-3 flex text-white rounded-l-none'>
            Spin
          </button>
          {/* <button className='py-3 !text-[22px] !font-[300] leading-none  mx-auto w-[230px] text-[#272622] border border-[#272622] justify-center gap-3 flex bg-white rounded-l-none'>
            Claim Reward
          </button>  */}
        </div>
      </div>
      <div className='modal-backdrop'></div>
    </div>
  );
};

export default SpinToWinModal;
