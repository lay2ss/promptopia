import PromptCard from "./PromptCard";
import { useSession } from "@node_modules/next-auth/react";
import Image from "@node_modules/next/image";

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  const {data:session} = useSession();

  if(!session?.user.id){
    return (<div className="flex flex-center flex-col">
      <h1 className="head_text text-center"><span className="orange_gradient">Sign In to start creating prompts</span></h1>
        <Image 
                src="/assets/images/sign-in.svg"
                alt="sign in"
                width={450}
                height={450}
                className="object-contain mt-20"
                /> 
    </div>
    )  
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