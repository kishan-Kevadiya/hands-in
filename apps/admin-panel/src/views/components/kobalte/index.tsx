import { Select } from "@kobalte/core/select";
import { CaretIcon } from "@icons/index";
import { type Component } from "solid-js";
import "./styles.css";

interface KobalteSelectProps<T> {
    class?: string;
    options?: T[];
    placeholder?: string;
    itemComponent?: Component<any>;
    caretIcon?: Component<{ width?: number; height?: number }>;
    ariaLabel?: string;
    // Allow all other Select props
    [key: string]: any;
}


const defaultFruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple", "Strawberry", "Watermelon", "Orange", "Mango", "Peach"];

const defaultItemComponent = (props: any) => (
    <Select.Item item={props.item} class="select__item">
        <Select.ItemLabel>{props.item.rawValue}</Select.ItemLabel>
    </Select.Item>
);

function KobalteSelect<T>(props: KobalteSelectProps<T>) {
    const {
        class: className = "kobalte__select",
        options = defaultFruits as unknown as T[],
        placeholder = "Select a fruit…",
        itemComponent = defaultItemComponent,
        caretIcon: CaretIconComponent = CaretIcon,
        ariaLabel = "Fruit",
        ...rest
    } = props;

    return (
        <Select
            class={className}
            options={options}
            placeholder={placeholder}
            itemComponent={itemComponent}
            {...rest}
        >
            <Select.Trigger class="select__trigger" aria-label={ariaLabel}>
                <Select.Value class="select__value">
                    {(state: any) => state.selectedOption()}
                </Select.Value>
                <Select.Icon class="select__icon">
                    <CaretIconComponent width={20} height={20} />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content class="select__content">
                    <Select.Listbox class="select__listbox" />
                </Select.Content>
            </Select.Portal>
        </Select>
    );
}

export {
    KobalteSelect,
};
