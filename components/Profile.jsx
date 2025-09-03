"use client"
import PromptCard from "./PromptCard";
import { useSession } from "@node_modules/next-auth/react";
import { useState, useEffect } from "react";
import LoginGate from "./LoginGate";

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  const {data:session} = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      await new Promise(resolve => setTimeout(resolve, 250)); 
      setIsLoading(false);
    };
    checkSession();
  }, []);

  if (isLoading) {
    return null; 
  }

  if(!session?.user.id){
    return (<LoginGate/>)
  } 

 else

  return (
    <section className="w-full">
      <h1 className="head_text text-left"><span className="blue_gradient">{name} Profile</span> </h1>
      <p className="desc text-left">{desc}</p>
       <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard 
          key={post._id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div> 
    </section>
  )
}

export default Profile;