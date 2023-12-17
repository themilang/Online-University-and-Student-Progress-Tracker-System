import { toast } from 'react-toastify';

const config: any = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export const successToast = (message: string) => {
    toast.success(message, config);
}

export const warningToast = (message: string) => {
    toast.warning(message, config);
}

export const errorToast = (message: string) => {
    toast.error(message, config);
}