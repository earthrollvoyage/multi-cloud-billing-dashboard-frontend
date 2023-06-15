import React, { useState } from "react";
import Amplify from "aws-amplify";
import { AmplifySignUp } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

const SignUp = () => {
    return (
        <AmplifySignUp 
            slot="sign-up"
            usernameAlias="email"
            formFields={[
            {
                type: "text",
                label: "Username",
                placeholder: "Please input your username",
                inputProps: { required: true, autocomplete: "username" },
            },
            {
                type: "password",
                label: "Password",
                placeholder: "Please input your password",
                inputProps: { required: true, autocomplete: "new-password" },
            },
            {
                type: "phone_number",
                label: "Custom Phone Label",
                placeholder: "Custom phone placeholder",
            },
            ]} 
        />
    )
}

export default SignUp;