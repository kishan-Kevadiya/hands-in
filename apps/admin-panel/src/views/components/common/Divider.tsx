import type { JSX } from "solid-js";

type DividerVariant = "primary" | "secondary" | "danger" | "info" | "light";

type DividerProps = {
  text: string;
  variant?: DividerVariant;
  class?: string;
  lineClass?: string;
  textClass?: string;
  lineColor?: string;
  textBgColor?: string;
};

export default function Divider(props: DividerProps): JSX.Element {
  const { text, variant = "primary" } = props;

  return (
    <div class={`divider ${variant}`}>
      <span class={`divider-left-line`}></span>
      <span class={`divider-text text-nowrap`}>{text}</span>
      <span class={`divider-right-line`}></span>
    </div>
  );
}
