"use client";
import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const RichTextEditor = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline"],
                        [{ list: "ordered" }, { list: "bullet" }],
                    ],
                },
                placeholder: "Hi Sarah Chen,\n\nI came across your profile...",
                theme: "snow",
            });

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
    }, []);

    return (
        <div className="custom-quill">
            <div ref={editorRef} />
        </div>
    );
};

export default RichTextEditor;
