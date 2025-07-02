import DatePicker, { type PickerValue } from '@rnwonder/solid-date-picker';

import { FormFields } from '../form';
import { CalendarIcon } from '@icons/index';

import './styles.css';

const containerBase = "custom-date-range-picker-container";
const labelBase = "custom-date-range-label";
const inputBase = "custom-date-range-picker-input";

interface PickerProps {
    label?: string;
    error?: string;
    class?: string;
    placeholder?: string;
    value: () => PickerValue;
    onChange: (value: PickerValue) => void;
    id: string;
}

function ErrorMessage(props: { error: string }) {
    return <div class="error-message">{props.error}</div>;
}

function RangePicker(props: PickerProps) {
    return (
        <div class={containerBase}>
            {props.label && (
                <label for={props.id} class={labelBase}>
                    {props.label}
                </label>
            )}
            <div class="date-picker-container d-flex align-center">
                <DatePicker
                    value={props.value}
                    setValue={(value) => {
                        if (typeof value === "function") {
                            props.onChange(value(props.value()));
                        } else {
                            props.onChange(value);
                        }
                    }}
                    renderInput={({ showDate, value }) => (
                        <>
                            <FormFields.Input
                                class={`${inputBase} ${props.class ?? ""}${props.error ? " error" : ""}`}
                                type="text"
                                value={value().label}
                                readOnly
                                onClick={showDate}
                                placeholder={props.placeholder}
                            />
                            <span class="date-picker-icon-container" role='button'>
                                <CalendarIcon class="date-picker-icon" />
                            </span>
                        </>
                    )}
                    type="range"
                />
            </div>
            {props.error && <ErrorMessage error={props.error} />}
        </div>
    );
}

function SingleDatePicker(props: PickerProps) {
    return (
        <div class={containerBase}>
            {props.label && (
                <label for={props.id} class={labelBase}>
                    {props.label}
                </label>
            )}
            <div class="date-picker-container">
                <DatePicker
                    value={props.value}
                    setValue={(value) => {
                        if (typeof value === "function") {
                            props.onChange(value(props.value()));
                        } else {
                            props.onChange(value);
                        }
                    }}
                    renderInput={({ showDate, value }) => (
                        <>
                            <FormFields.Input
                                class={`${inputBase} ${props.class ?? ""}${props.error ? " error" : ""}`}
                                type="text"
                                id={props.id}
                                value={value().label}
                                readOnly
                                onClick={showDate}
                                placeholder={props.placeholder}
                            />
                            <span class="date-picker-icon-container" role='button'>
                                <CalendarIcon class="date-picker-icon" />
                            </span>
                        </>
                    )}
                />
            </div>
            {props.error && <ErrorMessage error={props.error} />}
        </div>
    );
}

export const CustomDateRangePicker = { RangePicker, SingleDatePicker };