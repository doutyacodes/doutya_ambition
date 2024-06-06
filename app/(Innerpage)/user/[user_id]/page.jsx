"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseImgURL, baseURL } from "@/lib/baseData";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IoMdInformationCircleOutline } from "react-icons/io";

import { FaPlusCircle } from "react-icons/fa";
import EditProfile from "../../(components)/EditProfile";

const UserDetails = ({ params }) => {
  const [todoData, setTodoData] = useState([]);
  const [toggleNav, setToggleNav] = useState("Keywords");
  const [reloadData,setReloadData] = useState(false)

  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signup");
    }
  }, [user, router]);

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/getOtherUser.php?user_id=${user?.id}`
        );
        if (response.status === 200) {
          setUserData(response.data);
        } else {
          console.error("Failed to fetch user data: ", response.statusText);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error while fetching data: ", error.message);
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user,reloadData]);

  useEffect(() => {
    const fetchCompleted = async () => {
      if (user) {
        try {
          // Only fetch rewards if user data is available
          const response = await axios.get(
            `${baseURL}/getAllCompleted.php?user_id=${user.id}`
          );
          // console.log(response.data);
          if (response.status === 200) {
            setTodoData(response.data.tasks);
            // console.log(response.data);
          } else {
            console.error("Failed to fetch progress");
          }
        } catch (error) {
          console.error("Error while fetching progress:", error.message);
        }
      }
    };

    fetchCompleted();
    const fetchUserKeywords = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/get-user-keywords.php?user_id=${user.id}`
        );
        // console.log("User keywords:", response.data);
        if (response.data.success) {
          setSelectedItems(response.data.data);
        } else {
          setSelectedItems([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompleted();
    fetchUserKeywords();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="max-w-[800px]  min-h-screen overflow-x-scroll w-full mx-auto bg-white">
      <div className="w-full h-full flex-1 ">
        <div className=" relative w-full md:h-40 h-28 ">
          <Image
            src={"/assets/images/bgImg.png"}
            fill
            className=" "
            objectFit="contain"
          />
        </div>
        <div className="w-full flex items-center gap-3">
          <div className="p-2 rounded-full border border-black/5 my-3">
            <div className=" relative  w-10 h-10 ">
              <Image
                src={"/assets/images/logo.png"}
                fill
                className=" "
                objectFit="contain"
              />
            </div>
          </div>
          <p className="font-bold text-lg">{userData?.name}</p>
        </div>
        <div className="flex justify-between items-center shadow bg-[#0b6ebf]">
          <p
            className={cn(
              "flex-1 text-center py-3 text-white font-bold duration-200 ease-in-out transition-all cursor-pointer border-b border-black"
            )}
          >
            My Profile
          </p>
        </div>
      </div>
      <div className="p-3 flex gap-4 items-center">
        <p className="text-xl font-bold">My Choices</p>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IoMdInformationCircleOutline color="red" size={23} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-72 max-w-96 p-3">
              <p class="text-sm text-gray-600 font-bold">
                Candidates can select up to two keywords of their choice. Please
                note that these selections cannot be changed later.
              </p>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-12 gap-3">
          {selectedItems?.length > 0 &&
            selectedItems.map((item, index) => {
              return (
                <div className="col-span-6 md:col-span-4  shadow-md rounded-full bg-gradient-to-tr from-[#614385] to-[#516395] text-white p-3 w-full text-center font-bold ">
                  <p>{item.name}</p>
                </div>
              );
            })}
          {selectedItems.length < 2 && (
            <Link
              href={"/choose-keyword"}
              className="col-span-6 md:col-span-4  shadow-md rounded-full bg-gradient-to-tr from-[#614385] to-[#516395] text-white p-3 w-full text-center font-bold flex justify-center items-center"
            >
              <p>
                <FaPlusCircle />
              </p>
            </Link>
          )}
        </div>
      </div>
      <div className="p-3">
      <div className=" flex gap-4 items-center">
        <p className="text-xl font-bold">Edit My Profile</p>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IoMdInformationCircleOutline color="red" size={23} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-72 max-w-96 p-3">
              <p class="text-sm text-gray-600 font-bold">
              Please ensure all your information is accurate before saving. Changes to your profile can be made at any time.

              </p>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-3 mb-14">
        <EditProfile setReloadData={setReloadData} reloadData={reloadData} />
      </div>
      </div>
    </div>
  );
};

export default UserDetails;
