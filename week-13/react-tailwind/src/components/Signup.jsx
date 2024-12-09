import { Button } from "./ButtonComponent";
import { Heading } from "./HeadingComponent";
import { Input } from "./InputComponent";
import { OtpBox } from "./OtpComponent";
import { Text } from "./TextComponent";


export function SignUp(){
    return (
        <div className="flex flex-col justify-center items-center m-auto w-full h-full">
            <Heading text="Webinar.gg"/>
            <Text text="Please sign up or sign in" />
            <Input text="Username" placeholder="username" />
            <Input text="Password" placeholder="password" />
            <Button text="Sign up" variant="enabled" />
            <OtpBox length={6} />
        </div>
    )
}