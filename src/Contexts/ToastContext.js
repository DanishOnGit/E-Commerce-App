import { createContext,useContext,useState } from "react";

const ToastContext=createContext();

export function ToastProvider({children}){
const [toggleToast,setToggleToast]=useState("none");
const [message,setMessage]=useState("");
const [toastType,setToastType]=useState("info")

function showToast(message,toastType){
setToggleToast("block");
setMessage(message)
setToastType(toastType)
}
function hideToast(){
setToggleToast("none")
setMessage("")
}

  return <ToastContext.Provider value={{showToast,hideToast,toggleToast,message,toastType}}>
    {children}
    </ToastContext.Provider>
}

export function useToast(){
return useContext(ToastContext);
}