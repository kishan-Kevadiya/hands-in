import { Password, PasswordProps } from "primereact/password";
import React from "react";
import AuthLabel from "./AuthLabel";
import { FieldError } from "react-hook-form";
// import { FieldError } from 'react-hook-form';
interface PasswordFieldProps extends PasswordProps {
    label: string;
    placeholder: string;
    errorMsg?: FieldError;
}

const AuthPassword: React.FC<PasswordFieldProps> = ({
    label,
    placeholder,
    errorMsg,
    ...rest
}) => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col gap-2 w-full">
                <AuthLabel label={label} />
                <Password
                    {...rest}
                    pt={{
                        input: {
                            className:
                            "!w-full !text-black !bg-field border-none focus:!shadow-none !rounded-xl",
                        },
                        hideIcon: { className: "!cursor-pointer" },
                        showIcon: { className: "!cursor-pointer" },
                    }}
                    placeholder={placeholder}
                    toggleMask
                    feedback={false}
                />
            </div>
            {errorMsg && (<small className="w-full text-red-400">{errorMsg?.message}</small>)}
        </div>
    );
};

export default AuthPassword;
