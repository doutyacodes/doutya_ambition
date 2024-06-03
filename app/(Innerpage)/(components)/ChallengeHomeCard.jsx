import React from "react";
import { baseImgURL } from "@/lib/baseData";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";
import { FaStar } from "react-icons/fa";
const ChallengeHomeCard = ({
  item,
  formattedDate,
  formattedEndDate,
  inPage = null,
  inMap = null,
  inTodo = null,
}) => {
  const encodedId = btoa(item.challenge_id);
  const maxLength = 12;
  const slicedTitle = item?.title
    ? item.title.length > maxLength
      ? item.title.slice(0, maxLength) + "..."
      : item.title
    : "";
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className={cn("shadow-xl  rounded-md max-md:w-76 md:min-w-96 bg-white")}>
      <Link
        href={
          inTodo
            ? user
              ? `/rounds/${item.challenge_id}`
              : `/challenge/${item.challenge_id}`
            : `/challenge/${item.challenge_id}`
        }
        className="p-3 space-y-3 flex rounded border items-center  px-3 gap-3  min-w-72 "
      >
        <div className={" relative md:h-24 md:w-32 w-20 h-16 border rounded-md"}>
          <Image
            src={baseImgURL + item.image}
            fill
            alt="Profile Image"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="w-full">
          <div className="w-full flex justify-between items-center">
            <p className={cn("font-bold whitespace-nowrap truncate")}>{slicedTitle}</p>
            {item?.success && (
              <div
                className={cn(
                  " rounded-full ",
                  item.success == "yes" ? "bg-[#0b6ebf]" : "bg-red-600"
                )}
              >
                <p className="text-white text-sm font-bold px-7 py-1 text-center flex">
                  {item.success == "yes" ? "Success" : "Failed"}
                </p>
              </div>
            )}
          </div>
          {<div className="h-[1px] bg-slate-300 my-1 w-full" />}
          <div className="w-full flex items-center justify-between">
          <div>
            <p className="text-xs font-light">Time Remaining</p>
            <p className="text-xs font-semibold text-slate-600">{formattedEndDate}</p>
          </div>
          {
            item.stars && (
              <div className="w-26">
                <p className="text-xs font-light text-center">Stars</p>
                <div className="flex gap-1">
                  {Array(parseInt(item.stars)).fill(0).map((_, index) => (
                    <FaStar key={index} color="gold" size={12} />
                  ))}
                </div>
              </div>
            )
          }
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChallengeHomeCard;
