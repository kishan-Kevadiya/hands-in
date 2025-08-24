import { CommonModal } from "../common-modal/CommonModal";

type SaralInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
};

export function SaralInfoModal({ isOpen, onClose, content }: SaralInfoModalProps) {
  return (
    <CommonModal isOpen={isOpen} onClose={onClose} size="md">
      <div className="flex items-center mb-6">
        <button
          onClick={onClose}
          className="mr-3 text-gray-600 hover:text-gray-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-[#3F1562]">Information</h2>
      </div>

      {/* 👇 Whatever is passed will be shown here */}
      <div className="p-4">{content}</div>
    </CommonModal>
  );
}
