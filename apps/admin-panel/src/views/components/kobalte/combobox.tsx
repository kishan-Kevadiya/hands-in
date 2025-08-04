// KobalteCombobox.tsx
import { Combobox } from "@kobalte/core/combobox";
import { CaretIcon } from "@icons/index"; // Make sure this path is correct
import {
    Match,
    Switch,
    type Accessor,
    type Component,
    createEffect,
    on,
    For,
} from "solid-js";
import { createVirtualizer } from "@tanstack/solid-virtual";

import type { ComboboxItemProps } from "@kobalte/core/combobox";

import "./styles.css";


// --- Interface Definition ---
export interface BaseItem {
    value: string;
    label: string;
    // Add other properties if your items have them (e.g., disabled?)
    // disabled?: boolean;
}

// --- Props Interface ---
interface KobalteComboboxProps { // Make generic T extend BaseItem
    class?: string;
    options?:Accessor<BaseItem[]>; // Use the generic T
    placeholder?: string;
    // itemComponent is tricky with virtualization, often handled inside
    // itemComponent?: Component<ComboboxItemProps<T>>; // If used, needs correct typing
    caretIcon?: Component<{ width?: number; height?: number }>;
    ariaLabel?: string;
    virtualized?: boolean;
    // Consider adding specific props for virtualization if needed
    itemHeight?: number; // Allow configuring item height
    viewportHeight?: string; // Allow configuring viewport height
    [key: string]: any; // Allow other props to be passed through
}

const DefaultItemComponent = (props: ComboboxItemProps) => {
    return <Combobox.Item item={props.item}>
        <Combobox.ItemLabel>{props.item.rawValue.label}</Combobox.ItemLabel>
    </Combobox.Item>
}

// --- Virtualized Content Component ---
const VirtualizedComboboxContent = <T extends BaseItem>(props: {
    options: Accessor<T[]>
}) => {
    let contentRef: Element | null = null;

    const virtualizer = createVirtualizer({
        count: props.options().length,
        getScrollElement: () => contentRef,
        getItemKey: (index: number) => props.options()[index]?.value ?? index,
        estimateSize: () => 35,
        overscan: 5,
    });

    createEffect(on(() => props.options().length, () => {
        if (props.options().length > 0) {
            virtualizer.scrollToIndex(0);
        }
    }));

    return (
        <Combobox.Content // This renders the outer popup/portal content
            class="combobox__content combobox__content--virtualized" // Distinct class
            ref={contentRef}
            style={{
                height: "200px",
                "overflow-y": "auto",
                position: "relative", // Important for virtual positioning
            }}

        >
            <Combobox.Listbox
                ref={contentRef}
                scrollToItem={key =>
                    virtualizer.scrollToIndex(props.options().findIndex(option => option.value === key))
                }
                style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    width: "100%",
                    position: "relative",
                }}
            >
                {items => {
                    return (
                        <For each={virtualizer.getVirtualItems()}>
                            {virtualRow => {
                                const item = items().getItem(virtualRow.key?.toString());

                                if (!item) {
                                    return null; // Safety check
                                }

                                return (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: `${virtualRow.size}px`,
                                            transform: `translateY(${virtualRow.start}px)`,
                                        }}
                                    >
                                        <Combobox.Item item={item} class="combobox__item">
                                            <Combobox.ItemLabel>{item.rawValue.label}</Combobox.ItemLabel>
                                        </Combobox.Item>
                                    </div>
                                );
                            }}
                        </For>

                    )
                }}
            </Combobox.Listbox>
        </Combobox.Content>
    );
};

// --- Main Combobox Component ---
function KobalteCombobox<T extends BaseItem>(props: KobalteComboboxProps) {
    const {
        class: className = "kobalte__combobox",
        options = () => [] as unknown as T[], // Cast default, consider if this is safe
        placeholder = "Search...",
        itemComponent = DefaultItemComponent,
        caretIcon: CaretIconComponent = CaretIcon,
        ariaLabel = "Search",
        virtualized = false,
        ...rest
    } = props;

    return (
        <Combobox<BaseItem> // Specify the generic type T
            class={className}
            options={options()} // Pass the options array
            placeholder={placeholder}
            optionValue="value"
            optionTextValue="label"
            optionLabel="label"
            aria-label={ariaLabel}
            virtualized={virtualized}
            itemComponent={itemComponent}
            {...rest}
        >
            <Combobox.Control class="combobox__control">
                <Combobox.Input class="combobox__input" />
                <Combobox.Trigger class="combobox__trigger">
                    <Combobox.Icon class="combobox__icon">
                        <CaretIconComponent width={20} height={20} />
                    </Combobox.Icon>
                </Combobox.Trigger>
            </Combobox.Control>

            <Combobox.Portal>

                <Switch
                    fallback={ // Fallback for non-virtualized or when virtualized prop is not explicitly true
                        <Combobox.Content class="combobox__content">
                            <Combobox.Listbox class="combobox__listbox" />
                        </Combobox.Content>
                    }
                >
                    <Match when={virtualized && options().length > 0}>
                        <VirtualizedComboboxContent options={options} />
                    </Match>
                    <Match when={virtualized && options().length === 0}>
                        <Combobox.Content class="combobox__content combobox__content--empty">
                            <div class="combobox__empty-message">No items found.</div>
                        </Combobox.Content>
                    </Match>
                </Switch>
            </Combobox.Portal>
        </Combobox>
    );
}


export { KobalteCombobox, VirtualizedComboboxContent }; // Export VirtualizedContent for potential reuse/testing


