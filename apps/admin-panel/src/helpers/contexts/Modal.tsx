import { createContext, useContext, createSignal, type JSX } from "solid-js";

type ModalContextType = {
  isOpen: () => boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType>();

export function ModalProvider(props: { children: JSX.Element }) {
  const [isOpen, setIsOpen] = createSignal(false);

  const toggle = () => setIsOpen((v) => !v);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen: isOpen, toggle, open, close }}>
      {props.children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}
