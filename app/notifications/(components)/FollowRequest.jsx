import React, { useState } from "react";
import axios from "axios";
import { baseImgURL, baseURL } from "@/lib/baseData";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FollowRequest = ({ item, index }) => {
  const [toggled, setToggled] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleConfirm = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/approveFollow.php?followed_user=${item.followed_user}&user_id=${item.user_id}`
      );
      if (response.status === 200) {
        // console.log(response.data)
        setToggled(true);
      } else {
        console.error("Failed to approve followers");
      }
    } catch (error) {
      console.error("Error while approve followers:", error.message);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/deleteFollow.php?followed_user=${item.followed_user}&user_id=${item.user_id}`
      );
      if (response.status === 200) {
        // console.log(response.data)
        setDeleted(true);
      } else {
        console.error("Failed to approve followers");
      }
    } catch (error) {
      console.error("Error while approve followers:", error.message);
    }
  };
  if (deleted) {
    return null; // If deleted, render nothing
  }
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
          <div className="flex flex-col gap-1">
            <p className="font-bold">{toggled
            ? `${item.name} has started following you`
            : item.name.length > 10
            ? `${item.name.slice(0, 10)}...`
            : item.name}</p>
          </div>
        </Link>
       {
        !toggled && (
            <>
             <div className="flex-1 flex justify-end gap-2">
          <div onClick={handleConfirm} className="py-0 flex justify-center px-5 bg-black text-white cursor-pointer rounded font-bold text-sm">Confirm</div>
          <div onClick={handleDelete} className="py-0 flex justify-center px-5 border cursor-pointer rounded font-bold text-sm">Delete</div>
        </div>
            </>
        )
       }
      </div>
    </div>
  );
};

export default FollowRequest;
