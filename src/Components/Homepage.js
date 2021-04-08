import { useCart } from "../Contexts";
import coverPic from "../images/cover-image.jpg";
import { Link} from "react-router-dom";
export function Homepage() {
  const { dispatch } = useCart();
  return (
    <div className="home-page-wrapper">
      <img className="cover-pic" src={coverPic} alt="cover-pic"/>
      <div className="header-wrapper">
        
        <h1 className="display-5">Love All, PLAY!</h1>
        <Link to="productsListingPage">
        <button
         
          className="btn btn-outline-primary home-page-btn"
        >
          SHOP NOW !
        </button>
        </Link>
      </div>
    </div>
  );
}
