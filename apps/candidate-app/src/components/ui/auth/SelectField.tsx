import { Dropdown, DropdownProps } from "primereact/dropdown";
import React from "react";
import { twMerge } from "tailwind-merge";
import { FieldError } from "react-hook-form";
import AuthLabel from "./AuthLabel";

interface SelectFieldProps extends DropdownProps {
    label?: string;
    dropdownContainerStyle?: string;
    dropdownStyle?: string;
    inputStyle?: string;
    errorMsg?: FieldError;
}

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    dropdownContainerStyle,
    dropdownStyle,
    inputStyle,
    errorMsg,
    ...rest
}: SelectFieldProps) => {
    return (
        <div
            className={twMerge("flex flex-col w-full", dropdownContainerStyle)}
        >
            <div
                className={`flex flex-col ${label ? "gap-1" : "gap-0"} w-full`}
            >
                <AuthLabel label={label} />
                <Dropdown
                    className={twMerge("w-full justify-between", dropdownStyle)}
                    {...rest}
                    pt={{
                        root: {
                            className: twMerge(
                                "!text-black border-none focus:!shadow-none !w-full !bg-field !font-manrope !rounded-xl bg-white",
                                rest.className
                            ),
                        },
                        filterInput: {
                            className:
                                "!text-black border-none focus:!shadow-none pr-7 py-2",
                        },
                        panel: { className: "!w-52 bg-white" },
                        wrapper: {
                            style: {
                                scrollbarWidth: "thin",
                                minHeight: "auto",
                            },
                        },
                        item: {
                            className:
                                "!text-black overflow-hidden text-ellipsis text-nowrap !bg-field hover:bg-primary hover:!text-primary border-none outline-none",
                        },
                        filterIcon: { className: "w-8 right-2" },
                        emptyMessage: { className: "px-4 py-4" },
                        header: {
                            className: "!bg-field",
                        },
                        input: { className: twMerge("", inputStyle) },
                        list: { className: "p-0" },
                        virtualScroller: { root: { className: "!bg-field" } },
                    }}
                />
            </div>
            {errorMsg && (
                <small className="text-red-400 w-full">
                    {errorMsg?.message}
                </small>
            )}
        </div>
    );
};

export default SelectField;
