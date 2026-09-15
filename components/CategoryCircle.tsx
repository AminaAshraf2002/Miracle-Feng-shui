import React from 'react';
import Link from 'next/link';
import { CategoryCircleInfo } from '@/lib/placeholder-data';

export function CategoryCircle({ category }: { category: CategoryCircleInfo }) {
  return (
    <Link
      href={`/shop?category=${encodeURIComponent(category.slug)}`}
      className="group flex flex-col items-center text-center no-underline w-full p-0 pb-3 rounded-[16px] sm:rounded-[20px] transition-all duration-300 hover:bg-white hover:shadow-[0_4px_22px_rgba(0,0,0,0.11)] border border-transparent hover:border-black/5"
    >
      <div className="relative w-full aspect-[1/1.08] rounded-[14px] sm:rounded-[18px] overflow-hidden bg-[#F0EFEB]">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <span className="text-[13.5px] sm:text-[14.5px] md:text-[15px] font-semibold text-etsy-dark mt-2.5 sm:mt-3 leading-snug block line-clamp-1">
        {category.name}
      </span>
    </Link>
  );
}
