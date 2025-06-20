import { QueryClientProvider } from "@tanstack/react-query";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { twMerge } from "tailwind-merge";
import App from "./App.tsx";
import MetaGenerator from "./components/MetaGenerator.tsx";
import queryClient from "./helpers/query.config.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PrimeReactProvider
            value={{
                unstyled: true,
                pt: Tailwind,
                ptOptions: {
                    mergeSections: true,
                    mergeProps: true,
                    classNameMergeFunction: twMerge,
                },
                ripple: true,
            }}
        >
            <QueryClientProvider client={queryClient}>
                <MetaGenerator
                    title="HeadsIn"
                    description="HeadsIn | Role-Specific Pre-Vetted Talent and Transparent Job Matching.
Revolutionizing job matchmaking in India with AI-driven solutions for seamless connections between job seekers and recruiters. Find your perfect fit today."
                />
                <App />
            </QueryClientProvider>
            {
                <ToastContainer
                    autoClose={2000}
                    limit={3}
                    closeButton
                    pauseOnFocusLoss={false}
                    pauseOnHover
                    theme="light"
                    position="top-right"
                />
            }
        </PrimeReactProvider>
    </StrictMode>
);
