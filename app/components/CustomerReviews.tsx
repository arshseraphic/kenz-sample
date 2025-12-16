// components/CustomerReviews.tsx
"use client";

import React, { useMemo } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

/**
 * Example usage:
 * <CustomerReviews reviews={sampleReviews} />
 *
 * If you don't pass reviews prop, component uses internal sample data.
 */

// local uploaded image (developer-provided path)
const sampleAvatar = "/mnt/data/29f835e4-4862-4e5b-8c89-b45df8fb128b.png";

type Review = {
  id: string | number;
  rating: number; // 1..5
  title?: string;
  body: string;
  author: string;
  date: string; // ISO or readable
  avatar?: string;
};

const sampleReviews: Review[] = [
  {
    id: 1,
    rating: 4,
    body:
      "Lorem ipsum dolor sit amet consectetur. Ipsum placerat arcu risus nisi nisl eu iaculis velit. A facilisis vulputate.",
    author: "John Doe",
    date: "2025-11-16",
    avatar: sampleAvatar,
  },
  {
    id: 2,
    rating: 5,
    body:
      "Excellent product! Highly recommended — quality is top notch and delivery was fast.",
    author: "Jane Smith",
    date: "2025-11-13",
    avatar: sampleAvatar,
  },
  {
    id: 3,
    rating: 4,
    body:
      "Good value for money. Satisfied with the purchase and the packaging was great.",
    author: "Alex Brown",
    date: "2025-11-10",
    avatar: sampleAvatar,
  },
  {
    id: 4,
    rating: 4,
    body:
      "Works as expected. A couple of minor remarks but overall very happy with it.",
    author: "S. Parker",
    date: "2025-11-08",
    avatar: sampleAvatar,
  },
  {
    id: 5,
    rating: 4,
    body:
      "Nice finish and looks premium. Would buy again from the same seller.",
    author: "Priya K",
    date: "2025-11-07",
    avatar: sampleAvatar,
  },
];

type Props = {
  reviews?: Review[];
};

const formatDate = (iso: string) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return iso;
  }
};

const CustomerReviews: React.FC<Props> = ({ reviews = sampleReviews }) => {
  // derived stats
  const stats = useMemo(() => {
    const counts = [0, 0, 0, 0, 0]; // index 0->1-star ... 4->5-star
    let total = 0;
    let sum = 0;
    reviews.forEach((r) => {
      const idx = Math.min(Math.max(r.rating, 1), 5) - 1;
      counts[idx] += 1;
      total += 1;
      sum += r.rating;
    });
    const average = total ? +(sum / total).toFixed(1) : 0;
    return { counts, total, average };
  }, [reviews]);

  return (
    <div className="3xl:px-64 2xl:px-48 xl:px-20 lg:px-10 md:px-8 px-5 border-t border-[#EEEEEE] mt-5 pt-18 mb-10">
      <div className="flex flex-col gap-8">
        {/* LEFT: summary */}
        <div className="flex justify-between flex-wrap gap-2 items-center">
          <h2 className="text-[34px] font-[400] text-[#272622]">
            Customer Reviews
          </h2>
          <span className="text-[16px] font-[400] leading-[100%] text-[#787878]">(212 reviews)</span>
        </div>
        <div className="flex lg:flex-row flex-col lg:gap-9 gap-11">
          <div className="w-1/3">
            {/* bars */}
            <div className="space-y-5 w-[310px]">
              {Array.from({ length: 5 }).map((_, idx) => {
                const star = 5 - idx;
                const count = stats.counts[star - 1] || 0;
                const pct = stats.total ? Math.round((count / stats.total) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-4">
                    <div className="w-9 flex items-center justify-between text-[16px] text-[#787878] font-[400] leading-[100%]">{star}<FaStar className="text-[#787878]" /></div>
                    <div className="flex-1 bg-[#F1F5F9] rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 bg-[#013FE8]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="w-5 text-[16px] text-[#787878] font-[400] leading-[100%] text-right">
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: list */}
          <div className="flex-1">
            <div className="space-y-6">
              {reviews.map((r) => (
                <div key={r.id} className="border-b border-[#EAEAEA] pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div>
                        <div className="flex items-center gap-4">
                          {/* rating stars */}
                          <div className="flex text-[16px] text-[#013FE8] font-[400] gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className="text-[20px]">
                                {i < r.rating ? <FaStar /> : <FaRegStar className="text-[#787878] " />}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="text-[16px] text-[#272622] font-[300] leading-6 mt-3 xl:max-w-2xl lg:max-w-[33rem] max-w-full">
                          {r.body}
                        </p>

                        <div className="text-[16px] font-[500] leading-[100%] text-[#272622] mt-3">
                          By [{r.author}]
                        </div>
                      </div>
                    </div>

                    {/* right side small date for large screens */}
                    <div className="hidden lg:block text-[14px] leading-[100%] text-[#787878] font-[500]">
                      {formatDate(r.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
