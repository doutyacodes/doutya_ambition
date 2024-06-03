import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import CommentStructure from './CommentStructure';
import { BsThreeDots } from 'react-icons/bs';
import { baseImgURL } from '@/lib/baseData';

const ReplyStructure = ({
    item,
    isVisible,
    handleReply,
    handleReply2,
    showReplyBox,
    setShowReplyBox,
    parentId,
    fetchComments,
    setShowOptions,
    showOptions,
    user_id
  }) => {
    return isVisible ? (
    <div>
        <div className="flex gap-3 mt-2">
                <div
                  className={cn(
                    " relative  h-16 w-16 ",
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
                    <p className="text-3xl text-white font-bold">
                      {item?.first_character}
                    </p>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <p className="font-bold"> {item.name}</p>
                  <CommentStructure
                    comment_text={item.comment_text}
                    commentId={item.id}
                    handleReply={handleReply}
                    handleReply2={handleReply2}
                    showReplyBox={showReplyBox}
                    setShowReplyBox={setShowReplyBox}
                    parentId={parentId}
                    fetchComments={fetchComments}
                    setShowOptions={setShowOptions}
                    showOptions={showOptions}
                    user_id={user_id}
                    item={item}
                  />
                </div>
                <div className="ml-auto">
                  <BsThreeDots
                    onClick={() => {
                      showOptions == item.id
                        ? setShowOptions(0)
                        : setShowOptions(item.id);
                    }}
                  />
                </div>
              </div>
    </div>
  ):null
}

export default ReplyStructure