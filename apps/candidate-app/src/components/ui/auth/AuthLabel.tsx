import React from 'react'
import { twMerge } from 'tailwind-merge'

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
    label?: string;
    labelStyle?: string;
}
const AuthLabel: React.FC<LabelProps> = ({ label, labelStyle, ...rest }) => {
    return (
        <label className={twMerge("text-sm text-[#0C1421]", labelStyle)} {...rest}>{label}</label>
    )
}

export default AuthLabel
