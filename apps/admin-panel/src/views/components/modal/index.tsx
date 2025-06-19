import { Show, type JSXElement } from "solid-js";

import "./styles.css";
import DeleteIcon from "@icons/Delete";
import SuccessIcon from "@icons/modal/Success";
import InfoIcon from "@icons/modal/Info";

type ModalType = "delete" | "success" | "info" | "warning";

interface ModalProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const getModalStyles = (type: ModalType): { icon: JSXElement } => {
  switch (type) {
    case "delete":
      return { icon: <DeleteIcon /> };
    case "success":
      return { icon: <SuccessIcon /> };
    case "info":
      return { icon: <InfoIcon /> };
    case "warning":
      return { icon: <DeleteIcon /> };
    default:
      return { icon: <DeleteIcon /> };
  }
};

function BaseModal(props: ModalProps & { type: ModalType }) {
  const style = getModalStyles(props.type);
  return (
    <Show when={props.open}>
      <div class="custom-modal-overlay">
        <div class={`custom-modal ${props.type}`}>
          <div class="custom-modal-header">
            <span class={`custom-modal-icon ${props.type}`}>{style.icon}</span>
            <span class="custom-modal-title">{props.title}</span>
          </div>
          <div class="custom-modal-body">{props.message}</div>
          <div class="custom-modal-footer">
            <button class="custom-modal-btn" onClick={props.onClose}>
              Close
            </button>
            <Show when={props.type !== "delete"}>
              <button class="custom-modal-btn ok" onClick={props.onConfirm}>
                Ok
              </button>
            </Show>
            <Show when={props.type === "delete" && props.onConfirm}>
              <button class="custom-modal-btn delete" onClick={props.onConfirm}>
                Delete
              </button>
            </Show>
          </div>
        </div>
      </div>
    </Show>
  );
}

type ModalComponent = {
  Delete: (props: ModalProps) => JSXElement;
  Success: (props: ModalProps) => JSXElement;
  Info: (props: ModalProps) => JSXElement;
  Warning: (props: ModalProps) => JSXElement;
};

export const Modal: ModalComponent = {
  Delete: (props) => <BaseModal {...props} type="delete" />,
  Success: (props) => <BaseModal {...props} type="success" />,
  Info: (props) => <BaseModal {...props} type="info" />,
  Warning: (props) => <BaseModal {...props} type="warning" />,
};
