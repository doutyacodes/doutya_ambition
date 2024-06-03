import React from "react";
import FollowRequest from "./FollowRequest";
import CommentNotification from "./CommentNotification";
import CommentPostNotification from "./CommentPostNotification";
import CommentPeopleNotification from "./CommentPeopleNotification";
import MediaNotification from "./MediaNotification";

const NotificationItem = ({ item, index }) => {
  return (
    <>
      {item.info_type === "follow_request" && (
        <FollowRequest item={item} index={index} />
      )}
      {(item.info_type === "user_replied" ||
        item.info_type === "user_post_comment" ||
        item.info_type === "user_comment_liked") && (
        <CommentNotification item={item} index={index} />
      )}
      {(item.info_type === "post_replied" ||
        item.info_type === "post_comment_liked") && (
        <CommentPostNotification item={item} index={index} />
      )}
      {(item.info_type === "people_replied" ||
        item.info_type === "people_comment_liked" ||
        item.info_type === "people_liked") && (
        <CommentPeopleNotification item={item} index={index} />
      )}
      {(item.info_type === "media_approved" ||
        item.info_type === "media_rejected") && (
        <MediaNotification item={item} index={index} />
      )}
    </>
  );
};

export default NotificationItem;
