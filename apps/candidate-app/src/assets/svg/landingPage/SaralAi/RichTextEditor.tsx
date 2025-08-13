import { useEffect, useRef } from 'react';

// Type declarations for Quill
declare global {
    interface Window {
        Quill: any;
    }
}

const RichTextEditor = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any>(null);

    useEffect(() => {
        const loadQuillAssets = async () => {
            // Load Quill CSS
            if (!document.querySelector('link[href*="quill"]')) {
                const css = document.createElement('link');
                css.rel = 'stylesheet';
                css.href = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css';
                document.head.appendChild(css);
            }

            // Add custom CSS for purple theme
            if (!document.querySelector('#custom-quill-styles')) {
                const customCSS = document.createElement('style');
                customCSS.id = 'custom-quill-styles';
                customCSS.textContent = `
                    .custom-quill .ql-toolbar {
                        border: none !important;
                        border-bottom: 1px solid #e5e7eb !important;
                        padding: 12px 16px !important;
                        background: white !important;
                    }
                    .custom-quill .ql-container {
                        border: none !important;
                        background: #f3f4f6 !important;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                        font-size: 14px !important;
                    }
                    .custom-quill .ql-editor {
                        padding: 16px !important;
                        min-height: 200px !important;
                        line-height: 1.5 !important;
                    }
                    .custom-quill .ql-toolbar .ql-formats {
                        margin-right: 8px !important;
                    }
                    .custom-quill .ql-toolbar button {
                        width: 32px !important;
                        height: 32px !important;
                        margin: 0 2px !important;
                    }
                    .custom-quill .ql-toolbar button:hover {
                        background: #f3f4f6 !important;
                        border-radius: 4px !important;
                    }
                    .custom-quill .ql-toolbar button.ql-active {
                        background: #e5e7eb !important;
                        border-radius: 4px !important;
                    }
                    .custom-quill .ql-editor.ql-blank::before {
                        font-style: normal !important;
                        color: #9ca3af !important;
                    }
                `;
                document.head.appendChild(customCSS);
            }

            // Load Quill JS
            if (!window.Quill) {
                await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js';
                    script.onload = resolve;
                    document.body.appendChild(script);
                });
            }

            initializeQuill();
        };

        const initializeQuill = () => {
            if (window.Quill && editorRef.current && !quillRef.current) {
                quillRef.current = new window.Quill(editorRef.current, {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                        ],
                        history: {
                            delay: 500,
                            maxStack: 100,
                            userOnly: true
                        }
                    },
                    placeholder: 'Hi Sarah Chen,\n\nI came across your profile...',
                    theme: 'snow',
                });

                // Set initial content
                quillRef.current.root.innerHTML = `
                    <p>Hi Sarah Chen,</p>
                    <p><br></p>
                    <p>I came across your profile and was impressed by your 6 years of experience as a Senior Frontend Developer at TechCorp.</p>
                    <p><br></p>
                    <p>We're currently looking for a Senior React Developer. Would you be open to a brief conversation about this opportunity?</p>
                    <p><br></p>
                    <p>Best regards,<br>Leslie A.</p>
                `;
            }
        };

        loadQuillAssets();

        return () => {
            if (quillRef.current) {
                quillRef.current = null;
            }
        };
    }, []);

    const handleCancel = () => {
        if (quillRef.current) {
            quillRef.current.root.innerHTML = `
                <p>Hi Sarah Chen,</p>
                <p><br></p>
                <p>I came across your profile and was impressed by your 6 years of experience as a Senior Frontend Developer at TechCorp.</p>
                <p><br></p>
                <p>We're currently looking for a Senior React Developer. Would you be open to a brief conversation about this opportunity?</p>
                <p><br></p>
                <p>Best regards,<br>Leslie A.</p>
            `;
        }
    };

    const handleDone = () => {
        if (quillRef.current) {
            const html = quillRef.current.root.innerHTML;
            const text = quillRef.current.getText();
            console.log('Message sent!');
            console.log('HTML:', html);
            console.log('Text:', text);
            alert('Message sent successfully!');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-purple-100 rounded-lg shadow-lg overflow-hidden">
            {/* Undo/Redo buttons in top left */}
            <div className="bg-white px-4 py-3 border-b border-gray-200 flex justify-start">
                <button
                    onClick={() => quillRef.current?.history?.undo()}
                    className="p-2 hover:bg-gray-100 rounded transition-colors mr-2"
                    title="Undo"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 7v6h6"></path>
                        <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
                    </svg>
                </button>
                <button
                    onClick={() => quillRef.current?.history?.redo()}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    title="Redo"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 7v6h-6"></path>
                        <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"></path>
                    </svg>
                </button>
            </div>

            {/* Quill Editor */}
            <div className="custom-quill">
                <div ref={editorRef}></div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 p-4 bg-white">
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDone}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default RichTextEditor;
                </button>
                <button
                    onClick={handleDone"
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                    title="Done"
                >
                    Done
                </button>
