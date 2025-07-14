import {
    RenderPage,
    RenderPageProps,
    Viewer,
    Worker,
} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import type {
    ToolbarSlot,
    TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import React from "react";

interface CustomPDFViewerProps {
    url: string;
    watermark?: string;
}

const CustomPDFViewer: React.FC<CustomPDFViewerProps> = ({
    url,
    watermark,
}) => {
    const toolbarPluginInstance = toolbarPlugin();
    const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

    const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
        ...slot,
        Download: () => <></>,
        DownloadMenuItem: () => <></>,
        Open: () => <></>,
        OpenMenuItem: () => <></>,
        EnterFullScreen: () => <></>,
        EnterFullScreenMenuItem: () => <></>,
        SwitchTheme: () => <></>,
        SwitchThemeMenuItem: () => <></>,
        Print: () => <></>,
        PrintMenuItem: () => <></>,
        SwitchSelectionMode: () => <></>,
        SwitchSelectionModeMenuItem: () => <></>,
    });

    // To Render Watermark
    const renderPage: RenderPage = (props: RenderPageProps) => (
        <>
            {props.canvasLayer.children}
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    left: "10%",
                    position: "absolute",
                    top: "20%",
                    fontSize: `${8 * props.scale}rem`,
                }}
            >
                <div
                    style={{
                        color: "rgba(0, 0, 0, 0.2)",
                        fontSize: `${3 * props.scale}rem`,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        transform: "rotate(-45deg)",
                        userSelect: "none",
                    }}
                >
                    {watermark}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-center",
                    right: "10%",
                    position: "absolute",
                    bottom: "20%",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        color: "rgba(0, 0, 0, 0.2)",
                        fontSize: `${3 * props.scale}rem`,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        transform: "rotate(-45deg)",
                        userSelect: "none",
                    }}
                >
                    {watermark}
                </div>
            </div>
            {props.annotationLayer.children}
            {props.textLayer.children}
        </>
    );

    return (
        <div className="w-full h-full">
            {url ? (
                <div
                    style={{
                        border: "1px solid rgba(0, 0, 0, 0.3)",
                        height: "100%",
                    }}
                >
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <div
                            style={{
                                alignItems: "center",
                                backgroundColor: "#eeeeee",
                                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                                display: "flex",
                                padding: "0.25rem",
                                height: "3rem",
                            }}
                        >
                            <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
                        </div>
                        <div
                            style={{
                                flex: 1,
                                overflow: "hidden",
                                height: "calc(100% - 3rem)",
                            }}
                        >
                            <Viewer
                                plugins={[toolbarPluginInstance]}
                                fileUrl={url}
                                renderPage={renderPage}
                                defaultScale={window.innerWidth < 768 ? 0.6 : 1}
                            />
                        </div>
                    </Worker>
                </div>
            ) : (
                <div
                    style={{
                        alignItems: "center",
                        border: "2px dashed rgba(0, 0, 0, .3)",
                        display: "flex",
                        fontSize: "2rem",
                        height: "100%",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    Preview
                </div>
            )}
        </div>
    );
};

export default CustomPDFViewer;
