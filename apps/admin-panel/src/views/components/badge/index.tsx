import type { JSX } from "solid-js";

import "./styles.css";

type BadgeProps = {
  children: JSX.Element;
  class?: string;
};

function createBadge(variant: string) {
  return function BadgeVariant(props: BadgeProps) {
    return (
      <span
        class={`badge text-nowrap badge--${variant.toLowerCase()} ${props.class ?? ""}`}
      >
        {props.children}
      </span>
    );
  };
}

export const Badge = {
  Success: createBadge("Success"),
  Warning: createBadge("Warning"),
  Secondary: createBadge("Secondary"),
  Danger: createBadge("Danger"),
  Info: createBadge("Info"),
};
