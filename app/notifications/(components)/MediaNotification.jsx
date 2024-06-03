import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MediaNotification = ({item,index}) => {
  return (
    <div className="flex-1 border-b pb-2">
      <div className="flex flex-1 justify-between items-center">
        <Link
          href={`/challenge/${item?.challenge.challenge_id}`}
          className="flex gap-2 mt-4 items-center "
        >
          <div
            className={cn(
              " relative  h-12 w-12  rounded-full flex justify-center items-center"
            )}
          >
            <Image
              src={`/assets/images/${item.info_type == "media_approved" ?  "green-tick.png" : "red-alert.png"}`}
              fill
              alt="Profile Image"
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className={cn("font-bold ",item.info_type == "media_rejected" ? "text-red-500" : "text-green-500")}>
              {item.info_type == "media_approved" && " the media is approved"}
              {item.info_type == "media_rejected" && " the media is rejected"}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MediaNotification;
