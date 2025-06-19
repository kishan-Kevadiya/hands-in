import type { JSX } from "solid-js";

import "@styles/components/button.css";

type ButtonProps = {
  children: JSX.Element;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  type?: "button" | "submit" | "reset" | "menu";
  disabled?: boolean;
  class?: string;
  style?: JSX.CSSProperties;
};

const Button = (props: ButtonProps) => (
  <button
    type={props.type ?? "button"}
    onClick={props.onClick}
    disabled={props.disabled ?? false}
    class={`button ${props.class ?? " button-primary"}`}
    style={props.style ?? {}}
  >
    {props.children}
  </button>
);

export default Button;
