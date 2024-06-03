"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseImgURL, baseURL } from "@/lib/baseData";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PiUserCircleFill } from "react-icons/pi";
import { MdPermMedia, MdLogout } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/features/authSlice";

const RightSidebar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchPeople = async () => {
      if (user) {
        // console.log(user)
        try {
          const response = await axios.get(
            `${baseURL}/getOtherUser.php?user_id=${user.id}`
          );
          if (response.status === 200) {
            setUserData(response.data);
            setCount(response.data.followers);
          } else {
            console.error("Failed to fetch other user");
          }
        } catch (error) {
          console.error("Error while fetching other user:", error.message);
        }
      }
    };

    fetchPeople();
  }, [user]);
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.replace("/signup");
  };
  return (
    <div className="h-full w-full">
      <div className="flex-1 w-full h-full flex flex-col gap-4">
        <Link
          href={`/user/${user.id}`}
          className="flex gap-3 w-full p-3 items-center bg-white border-b"
        >
          <PiUserCircleFill color="black" size={24} /> <p>My Profile</p>
        </Link>

        <Link
          href={`/faq`}
          className="flex gap-3 w-full p-3 items-center bg-white border-b"
        >
          <FaQuestionCircle color="black" size={24} /> <p>FAQ</p>
        </Link>
        <div
          onClick={handleLogout}
          className=" cursor-pointer flex gap-3 w-full p-3 items-center bg-white border-b"
        >
          <MdLogout color="black" size={24} /> <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
