import coverPic from "../images/cover-image.jpg";
import { Link } from "react-router-dom";
import { brands } from "../utilities";
export function Homepage() {
  return (
    <div className="home-page-wrapper">
      <img className="cover-pic" src={coverPic} alt="cover-pic" />
      <div className="header-wrapper">
        <h1 className="display-5">Love All, PLAY!</h1>
        <Link to="productsListingPage">
          <button className="btn btn-outline-primary home-page-btn">
            SHOP NOW !
          </button>
        </Link>
      </div>

      {/* <div class='display-grid-4-4 vertical-middle gap-6'>
                    {brands.map((brand) => {
                        return <img class='responsive' src={brand?.image} />;
                    })}
                </div> */}
    </div>
  );
}
