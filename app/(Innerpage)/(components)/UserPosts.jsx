"use client";
import { baseImgURL, baseURL, baseVidUrl } from "@/lib/baseData";
import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CertificateCard from "./CertificateCard";
import { FaComment, FaHeart, FaRegHeart } from "react-icons/fa6";

const UserPosts = ({ item, user_id }) => {
  const [heartActive, setHeartActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [count, setCount] = useState(parseInt(item.like_count));
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [visitingPageId, setVisitingPageId] = useState(null);
  const [challenge, setChallenge] = useState([]);
  const showAlertFunction = () => {
    setShowAlert(true);
  };

  const hideAlertFunction = () => {
    setShowAlert(false);
  };
  const handleReport = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/report-media.php?challenge_id=${item.challenge_id}&people_data_id=${item.people_data_id}&user_id=${user_id}`
      );

      if (response.status === 200) {
        // console.log(response.data);
      } else {
        console.error("Failed to report media");
      }
    } catch (error) {
      console.error("Error while report media:", error.message);
    }
    setShowAlert(false);
  };
  const handleHeart = async () => {
    // console.log("item",item)
    // console.log("id",item.id)
    // console.log("a-ouser_id",item.user_id)
    // console.log("user_id",user_id)
    try {
      const response = await axios.get(
        `${baseURL}/toggle-post-likes.php?page_id=${item.page_id}&post_id=${item.post_id}&user_id=${user_id}`
      );
      // console.log(response.data);

      if (response.status === 200) {
        if (!heartActive) {
          setCount((prevCount) => prevCount + 1);
        } else {
          setCount((prevCount) => prevCount - 1);
        }
        setHeartActive((prevHeart) => !prevHeart);
        // console.log(response.data)
      } else {
        console.error("Failed to toggle likes comment");
      }
    } catch (error) {
      console.error("Error while toggling likes comment:", error.message);
    }
  };
  useEffect(() => {
    const fetchLike = async () => {
      try {
        // Only fetch rewards if user data is available
        if (!user_id) {
          // If user or user.id doesn't exist, skip the fetch
          return;
        }
        const response = await axios.get(
          `${baseURL}/checkAlreadyLiked.php?challenge_id=${item.challenge_id}&people_data_id=${people_data_id}&user_id=${user_id}`
        );
        // console.log(response.data);
        if (response.status === 200) {
          if (response.data.liked == "yes") {
            setHeartActive(true);
          }
          if (response.data.liked == "no") {
            setHeartActive(false);
          }
        } else {
          console.error("Failed to fetch likes");
        }
      } catch (error) {
        console.error("Error while fetching likes:", error.message);
      }
    };
    // fetchLike()
  }, []);
  return (
    <div className="p-3 shadow-lg rounded-md">
      <div>
        <div className=" gap-2">
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
              <p className="font-bold">{item.name}</p>
              <p className=" text-slate-400 text-xs">{item.date}</p>
            </div>
          </Link>
         
        </div>
        <div className="flex gap-2 overflow-x-scroll w-3/4 py-2 ">
          {item.image && item.image?.length > 0 && (
            <a
              href={`${baseImgURL + item.image}`}
              target="_blank"
              className="relative w-full min-w-72 h-72 rounded-md"
            >
              <Image
                src={`${baseImgURL + item.image}`}
                fill
                alt={item.challenge_title}
                className="rounded-md"
              />
            </a>
          )}
          {item.video && item.video.length > 0 && (
          <video className="w-full h-full rounded-md" controls preload="none">
            <source src={baseVidUrl + item.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {item.textData && item.textData.length > 0 && (
          <p>
            {item?.textData?.length > 40
              ? item.textData.slice(0, 40) + "..."
              : item.textData}
          </p>
        )}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <div onClick={handleHeart}>
            {heartActive ? (
              <FaHeart size={20} color="red" />
            ) : (
              <FaRegHeart size={20} color="black" />
            )}
          </div>
          <p>
            {" "}
            {count >= 1 ? count : ""}{" "}
            <span className="text-gray-500">likes</span>
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Link href={`/user-posts/comments/${item.post_id}`}>
            <FaComment size={20} color="black" />
          </Link>
          <p>
            {" "}
            {item.comment_count} <span className="text-gray-500">comments</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
