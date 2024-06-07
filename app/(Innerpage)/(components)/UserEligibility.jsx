"use client"
import { useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
const UserEligibility = ({ item }) => {
    const user = useAppSelector((state) => state.auth.user);
    const [star_user, setStar_user] = useState(item.user_stars ? item.user_stars : 0)

  return (
    <div className="grid w-full grid-cols-12 items-center gap-3">
      <div className="col-span-6 w-full">
        <p className={cn("font-bold",user && item.stars <= star_user ? "text-green-600":star_user && item.stars && "text-red-500")}>{item.keyword}</p>
      </div>
      
      <div className="col-span-6 w-full justify-end items-end">
        <p className="font-bold flex gap-1 items-center text-sm">
          {" "}
          {item.stars}{user && "/"+star_user}{" "}
          <span>
            {" "}
            <FaStar size={"14"} color="gold" />{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserEligibility;
