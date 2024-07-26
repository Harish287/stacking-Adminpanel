import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Logo from "../Assets/kait.png"
import { CgProfile } from "react-icons/cg";

const Header = () => {
  return (
    <header>
      <div className="w-[100%] h-[70px] bg-blue-900  flex justify-between  items-center ">
        <div><img className=" flex justify-center items-center pl-[100px]" src={Logo} alt="" ></img></div>
        <div className=" pr-[100px] flex justify-center items-center gap-2">
          <p className=" text-white text-[16px] ">Hello!Admin</p>
          <p className=" cursor-pointer"><CgProfile className=" text-[30px] bg-white box-border rounded-[20px]"/></p></div>
      </div>
      <div className="nav-area">
        <Link to="/" className="logo">
          {/* Logo */}
        </Link>

        {/* for large screens */}
        <Navbar />

        {/* for small screens */}
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
