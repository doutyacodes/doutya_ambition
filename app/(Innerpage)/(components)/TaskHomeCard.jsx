"use client"
import { baseImgURL } from '@/lib/baseData';
import moment from 'moment';
import React from 'react'
import Link from "next/link"
import Image from "next/image"

const TaskHomeCard = ({item}) => {
    const formattedDate = moment(item.start_date).fromNow();
  let statusValue;
  if (item.pending_task == "yes") {
    statusValue = "Continue";
  } else {
    statusValue = "Pending";
  }
  return (
    <div className=" w-full rounded overflow-hidden shadow-lg p-3">
      <div className="p-3 flex gap-2 items-center">
        <div className=" rounded-full w-10 h-10 relative">
          <Image
            src={baseImgURL + item.selectedMovie.image}
            fill
            alt="Profile Image"
            className="rounded-full"
          />
        </div>

        <div>
          <p>
            <span className="font-bold">{item.page_title}</span> has added a
            challenge
          </p>
          <p className="text-sm"> {formattedDate}</p>
        </div>
      </div>
      <Link href={`/challenge/${item.challenge_id}`} className="p-3 space-y-5">
        <div className=" relative h-72">
          <Image
            src={baseImgURL + item.image}
            fill
            alt="Profile Image"
            className="rounded-lg object-cover"
          />
        </div>
        <div>
          <p className="font-bold">
            {item?.title?.length > 40
              ? item.title.slice(0, 40) + "..."
              : item.title}
          </p>
          <div className="h-[1px] bg-slate-300 my-1" />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="max-sm:text-sm font-light">Entry Fee</p>
            <p className=" font-semibold text-slate-600">
              {item.entry_points == 0 ? "Nill" : item.entry_points + " Points"}
            </p>
          </div>
          <div>
            <p className="max-sm:text-sm font-light">Reward Points</p>
            <p className=" font-semibold text-slate-600">
              {item.reward_points == 0
                ? "Nill"
                : item.reward_points + " Points"}
            </p>
          </div>
          <div>
            <p className="max-sm:text-sm font-light">Current Status</p>
            <p className=" font-semibold text-slate-600">{statusValue}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TaskHomeCard