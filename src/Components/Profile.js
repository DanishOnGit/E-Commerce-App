import { useAuth } from "../Contexts"
import lining from "../images/lining.png"

export const Profile=()=>{
    const {userDetails:{name,email},logoutUser}=useAuth()
    return (
        <div className="profile-card-wrapper">
            <div className="profile-avatar-wrapper color-grey">
               <i className="fas fa-user profile-avatar"></i>
               <button className="btn btn-outline-primary absolute" onClick={logoutUser}>Logout</button>
            </div>
            <div>
            <p ><span className=" strong"> Name: </span> {name}</p>
            <p ><span className=" strong"> Email: </span>{email}</p>
            </div>
        </div>
    )
}