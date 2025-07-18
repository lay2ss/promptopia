"use client"
import { useState, useEffect } from "react";
import { useSession } from "@node_modules/next-auth/react";
import Image from "@node_modules/next/image";
import { useRouter, useSearchParams } from "@node_modules/next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const {data:session} = useSession();
    const [submitting, setSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [post, setPost] = useState({
        prompt: '',
        tag:'',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }
        if(promptId) getPromptDetails();
    }, [promptId])

    const UpdatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert('Prompt ID not found');

        try {
            const response = await fetch(`/api/prompt/${promptId}`, 
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: post.prompt,
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
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={UpdatePrompt}
        />
  )
}

export default EditPrompt