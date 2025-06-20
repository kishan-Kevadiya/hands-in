import { Button, ButtonProps } from "primereact/button";
import React from "react";
import { twMerge } from "tailwind-merge";

interface MainBtnProps extends ButtonProps {
    label: string;
    customStyle?: string;
}

const SecondaryButton: React.FC<MainBtnProps> = ({ label, customStyle, ...rest }) => {
    return (
        <Button
            {...rest}
            pt={{ root: { className: twMerge("w-1/5 !bg-transparent text-foreground hover:bg-unset hover:border-unset border-primary focus:shadow-none py-1.5 md:px-5 px-0", customStyle) }, label: { className: "font-semibold !text-sm" } }}
            label={label}
        />
    );
};

export default SecondaryButton;