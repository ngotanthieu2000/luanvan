import { toast } from "react-toastify";

export const showErrorToastMessage = (msg) => {
    toast.error(msg, {
        position: toast.POSITION.TOP_CENTER,
    });
};
export const showSuccessToastMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose:1000
    });
  };