"use client";
import { baseURL } from "@/lib/baseData";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import NotificationItem from "./(components)/NotificationItem";
import { useAppSelector } from "@/lib/hooks";

const page = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [notificationDetails, setNotificationDetails] = useState([]);
  useEffect(() => {
    const fetchNotification = async () => {
      if (user) {
        try {
          // Only fetch rewards if user data is available
          const response = await axios.get(
            `${baseURL}/getNotification.php?userId=${user.id}`
          );

          if (response.status === 200) {
            setNotificationDetails(response.data);
            // console.log(response.data);
          } else {
            console.error("Failed to fetch notification");
          }
        } catch (error) {
          console.error("Error while fetching notification:", error.message);
        }
      }
    };
    fetchNotification();
  }, [user]);
  return (
    <div className="max-w-[800px]  min-h-screen overflow-y-scroll w-full mx-auto bg-white border p-3 relative flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Link href="/home">
          <FaChevronLeft />
        </Link>
        <p className="font-bold">Notifications</p>
      </div>
        <div className=" mt-3">
          {notificationDetails?.length > 0 &&
            notificationDetails.map((item, index) => {
              return <NotificationItem item={item} index={index} />;
            })}
        </div>
    </div>
  );
};

export default page;
