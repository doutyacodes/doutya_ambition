import React from "react";
import ChallengeHomeCard from "./ChallengeHomeCard";
import moment from "moment";
import Posts from "./Posts";
import { useAppSelector } from "@/lib/hooks";

const BuzzwallComponent = ({ item }) => {
  const user = useAppSelector((state) => state.auth.user);


    let formattedEndDate;
    let formattedDate;
  
    if (item.info_type == "challenge") {
      formattedDate = moment(item.start_date).fromNow();
      const endDate = moment(item.end_date);
      const now = moment();
  
      const duration = moment.duration(endDate.diff(now));
  
      if (duration.asDays() >= 1) {
        formattedEndDate = Math.round(duration.asDays()) + " days";
      } else if (duration.asHours() >= 1) {
        formattedEndDate =
          Math.floor(duration.asHours()) +
          ":" +
          (duration.minutes() < 10 ? "0" : "") +
          duration.minutes() +
          " hrs";
      } else {
        formattedEndDate = duration.minutes() + " minutes";
      }
    }
  return (
    <div className="  col-span-12 bg-white rounded-md ">
       {item.info_type == "challenge" && ( 
        <ChallengeHomeCard item={item} formattedDate={formattedDate} formattedEndDate={formattedEndDate}/>
       )}
       {item.info_type == "post" && ( 
        <Posts item={item} user_id={user?.id} />
       )}
    </div>
  );
};

export default BuzzwallComponent;
