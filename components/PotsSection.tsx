import React from 'react';
import { usePotsState } from '@/context/pots/PotsStateContext';
import Image from 'next/image';
import imagePot from "@/assets/images/icon-pot.svg"
import Link from 'next/link';

export default function PotsSection() {
  const pots = usePotsState();

  return (
    <div className="bg-white p-4 rounded-lg xl:col-start-1 xl:order-1 xl:py-4 py-8 xl:row-end-2 row-start-1">
      <div className="flex justify-between mb-4">
        <p className="font-semibold text-xl">Pots</p>
        <Link href={"/pots"} className="text-sm text-Grey500">See Details →</Link>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className='flex p-6 pl-10 gap-8 items-center bg-Grey100 rounded-xl'>
          <Image src={imagePot} alt='Pot image' className='block'></Image>
          <div className='flex flex-col gap-2'>
            <p className='text-Grey500'>Total Saved</p>
            <p className='font-semibold text-4xl'>{`$${pots.reduce((acc, currPot) => acc + currPot.total , 0)}`}</p>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-6'>
        {pots.map((pot, idx) => {
          if (idx > 3) {
            return null;
          }
          return (
            <div key={idx} className="flex flex-row gap-3 items-center">
              <div className='w-2 h-full rounded' style={{ backgroundColor: pot.theme }}></div>
              <div className='flex flex-col gap-2 truncate'>
                <p className='text-Grey500'>{pot.name}</p>
                <p className='font-semibold'>{`$${pot.total}`}</p>
              </div>
            </div>
          )
        })}
        </div>
      </div>
    </div>
  );
}