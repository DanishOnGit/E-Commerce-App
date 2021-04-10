import { useToast } from "../Contexts"

export function Toast(){

  const {message,toggleToast,hideToast,toastType}=useToast();
  setTimeout(()=>hideToast(),2000)
return (
  <div className={`toast-wrapper ${toastType}-toast positioned-fixed`} style={{display:toggleToast}}>
  <span>{message}</span><i className="fas fa-times "></i>
</div>
)
}