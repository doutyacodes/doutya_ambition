"use client";
import { baseImgURL, baseURL, baseVidUrl } from "@/lib/baseData";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { FaComment, FaHeart, FaRegHeart } from "react-icons/fa6";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";

const Posts = ({ item, user_id }) => {
  const [heartActive, setHeartActive] = useState(item.already_liked);
  const [count, setCount] = useState(parseInt(item.like_count));
  const router = useRouter();
  const formattedDate = moment(
    item.created_at,
    "DD-MM-YYYY HH:mm:ss"
  ).fromNow();
  const handleHeart = async () => {
    // alert("hello")
    if (!user_id) {
    return  router.push("/signup");
    }
    try {
      const response = await axios.get(
        `${baseURL}/toggle-post-likes.php?page_id=${item.page_id}&post_id=${item.post_id}&user_id=${user_id}`
      );

      //   console.log(response)
      if (response.status === 200) {
        if (heartActive) {
          setCount(count - 1);
        } else {
          setCount(count + 1);
        }
        setHeartActive(!heartActive);
        // console.log(response.data)
      } else {
        console.error("Failed to toggle likes");
      }
    } catch (error) {
      console.error("Error while toggling likes:", error.message);
    }
  };
  let encryptId;
  const key = "yourSecretKey"; // Replace with your secret key
  encryptId = CryptoJS.AES.encrypt(item.post_id, key).toString();
  return (
    <div className="col-span-12 shadow-lg border border-black/5 rounded-lg">
      <Link
        href={`/home`}
        className="p-3 flex gap-2 items-center"
      >
        <div className=" rounded-full w-10 h-10 relative">
          <Image
            src={baseImgURL + item.page_icon}
            fill
            alt="Profile Image"
            className="rounded-full"
          />
        </div>

        <div>
          <p>
            <span className="font-bold">{item.page_title}</span> has added a
            post
          </p>
          <p className="text-sm"> {formattedDate}</p>
        </div>
      </Link>
      <div className="p-3 space-y-5">
        {item.image && item.image.length > 0 && (
          <a href={baseImgURL + item.image} target="_blank">
            <div className=" relative h-72">
              <Image
                src={baseImgURL + item.image}
                fill
                alt="Profile Image"
                className="rounded-lg object-cover"
              />
            </div>
          </a>
        )}
        {item.video && item.video.length > 0 && (
          <video className="w-full h-full rounded-md" controls preload="metadata">
            <source src={baseVidUrl + item.video+'#t=0.1'} type="video/mp4" />
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
        <div>
          <div className="h-[1px] bg-slate-300 my-1" />
          {item.caption && <p className="font-bold">{item.caption}</p>}
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
            <Link href={user_id ? `/posts/comments/${item.post_id}/${item.page_id}`  : "/signup"}>

              <FaComment size={20} color="black" />
            </Link>
            <p>
              {" "}
              {item.comment_count}{" "}
              <span className="text-gray-500">comments</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
