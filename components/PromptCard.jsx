"use client"
import { useState } from "react";
import Image from "@node_modules/next/image";
import { usePathname, useRouter } from "@node_modules/next/navigation";
import { useSession } from "@node_modules/next-auth/react";

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {


  const {data:session} = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

   const handleVisitProfile = () => {
    if (post.creator._id === session?.user.id) {
      return router.push("/profile");
    }
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };
  
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleVisitProfile}>
        <Image 
          src={post.creator.image}
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain"
        />  
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900 font-inter">{post.creator.username}</h3>
          <p className="text-sm  text-gray-500 font-figtree">{post.creator.email}</p>
        </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
          src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
          width={12}
          height={12}
          alt="copy-button"
          />
        </div>
      </div>
      <p className="my-4 text-sm text-gray-700 font-inter">{post.prompt}</p>
      <p className="text-sm blue_gradient cursor-pointer font-figtree"
      onClick={() => handleTagClick && handleTagClick(post.tag)}
      >#{post.tag}</p>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="text-sm green_gradient cursor-pointer hover:opacity-45" onClick={handleEdit}>Edit</p>
          <p className="text-sm orange_gradient cursor-pointer hover:opacity-45" onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  )
}

export default PromptCard