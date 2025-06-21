import { Chip, ChipProps } from "primereact/chip";
import React from "react";
import { twMerge } from "tailwind-merge";

import type { ChipRemoveEvent } from "primereact/chip";

interface ChipFieldProps extends ChipProps {
    ChipFieldStyle?: string;
    onRemove?: (event: ChipRemoveEvent) => any;
}

const ChipField: React.FC<ChipFieldProps> = ({
    ChipFieldStyle,
    onRemove,
    ...rest
}) => {
    const customChip = () => {
        return (
            <div className="flex justify-between gap-2 items-center">
                <p className="text-black text-sm">{rest.label}</p>
                <i
                    className="border-none text-black text-sm cursor-pointer pi pi-times"
                    onClick={onRemove as any}
                ></i>
            </div>
        );
    };

    return (
        <div className={twMerge("", ChipFieldStyle)}>

            <Chip
                pt={{
                    root: {
                        className: "rounded-xl bg-white py-3 px-3",
                    },
                }}
                {...rest}
                template={customChip}
            />
        </div>
    );
};

export default ChipField;
