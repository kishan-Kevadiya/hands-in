/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

interface QuestionOptionProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    register?: any
    id: string
    isChecked?: boolean
}
const QuestionOption: React.FC<QuestionOptionProps> = ({ label, register, id, isChecked, ...rest }) => {

    return (
        <label htmlFor={id} className='w-full bg-white py-2.5 pr-4 rounded-xl flex items-center justify-between cursor-pointer'>
            <p className='relative text-sm cursor-pointer text-black font-semibold pl-6 py-0.5 w-11/12'>{label}
                <span className={`${isChecked ? 'block' : 'hidden'} absolute top-1/2 left-0 -translate-y-1/2 border-[3px] h-full border-primary rounded-r-md`} />
            </p>
            <input
                id={id}
                {...register}
                type="radio"
                {...rest}
                className='accent-primary cursor-pointer h-4 w-4'
            />
        </label>
    )
}

export default QuestionOption
