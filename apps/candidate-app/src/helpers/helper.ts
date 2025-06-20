import { Moment } from "moment";
import { toast } from "react-toastify";

export const showToast = (type: "success" | "error" | "warning" | "info", message: string) => {
    switch (type) {
        case "success":
            toast.success(message);
            break;
        case "error":
            toast.error(message);
            break;
        case "warning":
            toast.warning(message);
            break;
        case "info":
            toast.info(message);
            break;
        default:
            toast(message);
            break;
    }
};

export const getTimeOrDate = (date: Moment) => {
    const now = new Date();
    return date.diff(now, "hours") < 24
        ? date.local().format("h:mm A")
        : date.local().format("MMM D, YYYY | h:mm A")
}


export const getPastTimeorDate = (date: Moment) => {
    const now = new Date();
    return date.diff(now, "hours") < 24
        ? date.local().format("h:mm A")
        : date.local().format("D-MM-YYYY")
}