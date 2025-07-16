"use client"
import { useState } from "react";
import { useSession } from "@node_modules/next-auth/react";
import { useRouter } from "@node_modules/next/navigation";
import Image from "@node_modules/next/image";
import Form from "@components/Form";

const CreatePrompt = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag:'',
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: post.prompt,
                        userId: session?.user.id,
                        tag: post.tag,
                    })
                }
            )
            if(response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
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
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}

    />
  )
}

export default CreatePrompt