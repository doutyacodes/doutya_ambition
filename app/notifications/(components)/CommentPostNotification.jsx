import { baseImgURL } from "@/lib/baseData";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CommentPostNotification = ({ item, index }) => {
  return (
    <div className="flex-1 border-b pb-2">
      <div className="flex flex-1 justify-between items-center">
        <Link
          href={`/user/${item.user_id}`}
          className="flex gap-2 mt-4 items-center "
        >
          <div
            className={cn(
              " relative  h-12 w-12 ",
              item?.user_image
                ? ""
                : " bg-[#ff8f8e] rounded-full flex justify-center items-center"
            )}
          >
            {item?.user_image ? (
              <Image
                src={baseImgURL + item?.user_image}
                fill
                alt="Profile Image"
                className="rounded-full object-cover"
              />
            ) : (
              <p className="text-2xl text-white font-bold">
                {item?.first_character}
              </p>
            )}
          </div>
          <span className="font-bold">{item.name}</span>

          <Link href={`/posts/comments/${item.post_id}/${item.page_id}`} className="flex flex-col gap-1">
            <p>
              <span>
              {item.info_type == "post_replied" && "has replied to your comment"}
            
            {item.info_type == "post_comment_liked" &&
              "has liked to your comment"}
              </span>
            </p>
          </Link>
        </Link>
      </div>
    </div>
  );
};

export default CommentPostNotification;
