import { Slider, SliderProps } from 'primereact/slider';
import React from 'react';
import AuthLabel from './AuthLabel';
import { twMerge } from 'tailwind-merge';

interface SliderFieldProps extends SliderProps {
    label?: string;
    value: number;
}

const SliderField: React.FC<SliderFieldProps> = ({ label, value, ...rest }) => {

    return (
        <div className={twMerge('flex flex-col gap-2 w-full pb-2', rest.className)}>
            <AuthLabel label={label} />
            <div className="w-full flex flex-col items-center gap-2 px-3">
                <p>Years: <span className='font-semibold text-lg'>{Math.ceil(value / 3.34)}</span></p>
                <Slider
                    {...rest}
                    pt={{
                        root: {
                            className: "w-full"
                        },
                     
                        range: {
                            className: "bg-primary h-1 rounded-full",
                        },
                        handle: {
                            className: "border-primary hover:bg-primary hover:border-primary w-5 h-5 -mt-2 -ml-1",
                        }
                    }}
                    value={value}
                />
            </div>
        </div>
    )
}

export default SliderField