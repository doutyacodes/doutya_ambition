import { baseImgURL } from "@/lib/baseData";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const CompletedChallenges = ({
  item,
  user_id,
  currentUser,
  fetchAchievementData,
  setIsReload,
  isReload

}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [userText, setUserText] = useState(item.achieved ? true : false);

  const handleButtonClick = () => {
    // Assuming you have userId and challengeId available within your component
    fetchAchievementData(currentUser, item.challenge_id);
    setUserText((prevuserText) => !prevuserText);
    setIsVisible((prevIsFollowing) => !prevIsFollowing);
    setIsReload(!isReload)
  };
  return (
    <div className="p-2 relative">
      <div className="flex shadow-md justify-between p-2 bg-white rounded-md">
        <div className="flex gap-5 items-center">
          <div className="relative h-20 w-20">
            <Image
              src={
                item.uploaded_image?.length > 0
                  ? `${baseImgURL + item.uploaded_image}`
                  : `${baseImgURL + item.image}`
              }
              alt={item.image}
              fill
              className="rounded-md"
            />
          </div>
          <div>
            <p className="font-bold">{item.page_title}</p>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm">points earned: {item.earned_points}</p>
            <p className="text-sm">rank : {item.user_rank}</p>
          </div>
        </div>
        <div className="flex-1 ">
          {
            user_id == currentUser && (
                <Ellipsis
            onClick={() => setIsVisible((prevIsFollowing) => !prevIsFollowing)}
            className="rotate-90 ml-auto cursor-pointer"
          />
            )
          }
        </div>
      </div>
      {isVisible && (
        <div
          className="cursor-pointer py-2 px-3 shadow-md absolute right-10 bg-white border border-black/5 top-10 rounded-md"
          onClick={handleButtonClick}
        >
          <p className="text-sm font-semibold">
            {userText ? "Remove from achievements" : "Move to achievements"}
          </p>
        </div>
      )}
    </div>
  );
};

export default CompletedChallenges;
