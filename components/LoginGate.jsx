import Image from "@node_modules/next/image";

const LoginGate = () => {
    return (<div className="flex flex-center flex-col h-[75vh] max-w-[500px]">
        <h1 className="head_text text-center"><span className="orange_gradient">Sign In to start creating prompts</span></h1>
            <Image 
                    src="/assets/images/sign-in.svg"
                    alt="sign in"
                    width={400}
                    height={400}
                    className="object-contain mt-15"
                    /> 
        </div>
        )  
}

export default LoginGate