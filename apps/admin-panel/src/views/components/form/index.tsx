import {
  splitProps,
  type JSX,
  For,
  type Component,
  onMount,
  onCleanup,
  createEffect,
  Show,
  createSignal,
  Match,
  batch,
  Switch,
  Index
} from "solid-js";

import { A, useNavigate } from "@solidjs/router";
import AddCircle from "@icons/AddCircle";
import ErrorMessage from "@components/auth/ErrorMessage";
import BackArrow from "@icons/BackArrow";

import Quill from "quill";

import "./styles.css";
import { OpenEyeIcon, CloseEyeIcon } from "@icons/index";

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  class?: string;
  id?: string;
};

type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
  class?: string;
};

type CheckboxProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  class?: string;
};

type RadioProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
  class?: string;
};

type SwitchProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  error?: string;
  class?: string;
  checked?: boolean;
  onChange?: (e: any) => void;
};

type ButtonVariant = "primary" | "secondary" | "success" | "warning" | "danger";

type ButtonProps = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  label?: string;
  class?: string;
  error?: string;
  variant?: ButtonVariant; // for styling
  type?: "button" | "submit" | "reset"; // HTML button type
};

const inputBase = "custom-input";
const labelBase = "custom-label";
const containerBase = "custom-form-group";
const checkboxContainerBase = "custom-checkbox-group";
const radioContainerBase = "custom-radio-group";
const radioItemBase = "custom-radio-item";
const buttonBase = "custom-button";
const switchContainerBase = "custom-switch-group";

function Input(props: InputProps) {
  const [local, others] = splitProps(props, [
    "label",
    "error",
    "class",
    "placeholder",
  ]);

  return (
    <div class={containerBase}>
      {local.label && (
        <label for={others.id} class={labelBase}>
          {local.label}
        </label>
      )}
      <input
        id={others.id}
        class={`${inputBase} ${local.class ?? ""}${local.error ? "error" : ""}`}
        placeholder={local.placeholder}
        {...others}
      />

      {local.error && <ErrorMessage error={local.error} />}
    </div>
  );
}

function PasswordInput(props: InputProps) {
  const [local, others] = splitProps(props, [
    "label",
    "error",
    "class",
    "placeholder",
  ]);

  // ** hide password logic
  const [hide, setHide] = createSignal(true);
  const [type, setType] = createSignal("password");

  return (
    <div class={`${containerBase} password-input`}>
      {local.label && (
        <label for={others.id} class={labelBase}>
          {local.label}
        </label>
      )}
      <input
        id={others.id}
        class={`${inputBase} ${local.class ?? ""}${local.error ? "error" : ""}`}
        placeholder={local.placeholder}
        type={type()}
        {...others}
      />
      <span class="eye-icon" onClick={() => {
        batch(() => {
          setHide(prev => !prev);
          setType(type() === "password" ? "text" : "password");
        })
      }}>
        <Switch>
          <Match when={hide()}>
            <OpenEyeIcon />
          </Match>
          <Match when={!hide()}>
            <CloseEyeIcon />
          </Match>
        </Switch>
      </span>
      {local.error && <ErrorMessage error={local.error} />}
    </div>
  );
}

function Select(props: SelectProps) {
  const [local, others] = splitProps(props, [
    "label",
    "options",
    "error",
    "class",
    "id",
    "value",
    "onChange"
  ]);


  console.log(local.value)
  return (
    <div class={containerBase}>
      {local.label && <label for={local.id} class={labelBase}>{local.label}</label>}
      <select
        id={local.id}
        class={`${inputBase} ${local.class ?? ""}`}
        value={local.value}
        onChange={local.onChange}
        {...others}
      >
        <Index each={local.options}>
          {(opt) => <option value={opt().value} selected={local.value === opt().value}>{opt().label}</option>}
        </Index>
      </select>
      {local.error && <ErrorMessage error={local.error} />}
    </div>
  );
}

function Checkbox(props: CheckboxProps) {
  const [local, others] = splitProps(props, ["label", "error", "class"]);
  return (
    <div class={checkboxContainerBase}>
      <input
        type="checkbox"
        class={`custom-checkbox ${local.class ?? ""}`}
        {...others}
      />
      {local.label && (
        <label for={others.name} class={labelBase}>
          {local.label}
        </label>
      )}
      {local.error && <ErrorMessage error={local.error} />}
    </div>
  );
}

function SwitchInput(props: SwitchProps) {
  const [local, others] = splitProps(props, [
    "label",
    "error",
    "class",
    "checked",
    "onChange",
  ]);

  return (
    <div class={switchContainerBase}>
      {local.label && (
        <span class={`${labelBase} switch-text`}>{local.label}</span>
      )}

      <label class="switch-label" for={others.id}>
        <input
          type="checkbox"
          class={`custom-switch-input ${local.class ?? ""}`}
          onChange={local.onChange}
          {...others}
        />
        <span class="switch-slider"></span>
      </label>

      {local.error && <ErrorMessage error={local.error} />}
    </div>
  );
}

function Radio(props: RadioProps) {
  const [local, others] = splitProps(props, [
    "label",
    "options",
    "error",
    "class",
    "name",
    "value",
  ]);
  return (
    <div class={radioContainerBase}>
      {local.label && <div class={labelBase}>{local.label}</div>}
      <div>
        <For each={local.options}>
          {(opt) => (
            <label class={radioItemBase}>
              <input
                type="radio"
                name={local.name}
                value={opt.value ?? ""}
                checked={local.value === opt.value}
                class={`custom-radio ${local.class ?? ""}`}
                {...others}
              />
              <span>{opt.label}</span>
            </label>
          )}
        </For>
      </div>
      {local.error && <ErrorMessage error={local.error} />}
    </div>
  );
}

function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, [
    "label",
    "class",
    "variant",
    "type",
    "error",
  ]);
  return (
    <div>
      <button
        class={`${buttonBase} ${local.variant ? `${local.variant}` : ""} ${local.class ?? ""}`}
        type={local.type ?? "button"}
        {...others}
      >
        {local.label ?? props.children}
      </button>

      {local.error && <ErrorMessage error={local.error} />}
    </div>
  );
}

type CircleButtonProps = Omit<
  JSX.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  href: string;
  label?: string;
  class?: string;
  variant?: ButtonVariant;
};

function CircleButton(props: CircleButtonProps) {
  const [local, others] = splitProps(props, [
    "href",
    "label",
    "class",
    "variant",
  ]);
  return (
    <A
      href={local.href}
      class={`custom-circle-button ${local.variant ? `${local.variant}` : ""} ${local.class ?? ""}`}
      {...others}
    >
      <span class="icon">
        <AddCircle />
      </span>
      {local.label && <span>{local.label}</span>}
    </A>
  );
}

type BackButtonProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> & {
  label?: string;
  class?: string;
  icon?: Component;
  href?: string;
};

function BackButton(props: BackButtonProps) {
  const navigate = useNavigate();
  const [local, others] = splitProps(props, ["label", "class", "href"]);
  function handleBack() {
    if (local.href) {
      navigate(local.href, { replace: true });
    } else {
      navigate(-1);
    }
  }
  return (
    <button
      class={`back-button`}
      type={"button"}
      onClick={handleBack}
      {...others}
    >
      <span class="icon-text">
        <BackArrow />
      </span>
    </button>
  );
}

interface QuillEditorProps {
  value?: string;
  options?: Record<string, any>;
  onChange?: (e: any) => void;
  error?: any; // ** function for reactivity
  label?: string;
}

function QuillEditor(props: QuillEditorProps) {
  let editorRef!: HTMLDivElement;
  let quillInstance: Quill | null = null;
  let ignoreNextUpdate = false;

  onMount(() => {
    quillInstance = new Quill(editorRef, {
      theme: "snow",
      ...props.options,
    });

    if (props.value) {
      quillInstance.root.innerHTML = props.value;
    }

    quillInstance.on("text-change", () => {
      if (quillInstance) {
        const html = quillInstance.root.innerHTML;
        ignoreNextUpdate = true;
        props.onChange?.(html);
      }
    });
  });

  createEffect(() => {
    console.log(props.error());
    if (quillInstance && props.value !== undefined && !ignoreNextUpdate) {
      if (quillInstance.root.innerHTML !== props.value) {
        quillInstance.root.innerHTML = props.value;
      }
    }
    if (ignoreNextUpdate) ignoreNextUpdate = false;
  });

  onCleanup(() => {
    quillInstance = null;
  });

  return (
    <div class="quill-editor">
      {props.label && <span class="quill-label-text">{props.label}</span>}

      <div
        class="ql-editor-container"
        classList={{ error: props.error() ? true : false }}
      >
        <div ref={(el) => (editorRef = el)} style="min-height:150px" />
      </div>

      <Show when={props.error()}>
        <ErrorMessage error={props.error()} />
      </Show>
    </div>
  );
}

type TextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  class?: string;
  id?: string;
};

// const textareaBase = "custom-textarea";

function Textarea(props: TextareaProps) {
  const [local, others] = splitProps(props, [
    "label",
    "error",
    "class",
    "placeholder",
    "id",
    "value",
  ]);

  return (
    <div class={containerBase}>
      {local.label && (
        <label for={local.id} class={labelBase}>
          {local.label}
        </label>
      )}
      <textarea
        id={local.id}
        class={`${inputBase} ${local.class ?? ""}${local.error ? "error" : ""}`}
        placeholder={local.placeholder}
        value={local.value}
        {...others}
      />
      {local.error && <ErrorMessage error={local.error} />}
    </div>
  );
}

function SelectInputCombo(props: { children: JSX.Element; error?: string }) {
  return (
    <>
      <div class="select-input-combo" classList={{ error: props.error ? true : false }}>
        {props.children}
      </div>
    </>
  );
}

export const FormFields = {
  Input,
  Select,
  Checkbox,
  Radio,
  SwitchInput,
  Button,
  CircleButton,
  BackButton,
  QuillEditor,
  Textarea,
  PasswordInput,
  SelectInputCombo
};
