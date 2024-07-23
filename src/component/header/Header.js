import { useNavigate } from "react-router-dom";

function Header({ logo }) {
  const navigate = useNavigate();
  return (
    <>
      <header className="bg-white flex justify-between items-center header-custom sm:pr-12 sm:pl-12 py-2 pr-2 pl-2 max-w-screen-xl mx-auto">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo ? logo : "/../asset/images/logo.png"}
            className="sm:w-56 w-32 sm:h-11 h-8"
            alt=""
          />
        </div>
        <div className="flex items-center">
          <button
            onClick={() => navigate("/register")}
            className="bg-red-500 border text-white px-4 py-2 text-sm rounded font-bold flex items-center hover:bg-red-800 mr-2"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border text-gray-600 px-4 py-2 text-sm rounded font-semibold flex items-center hover:bg-black hover:text-black bg-white"
          >
            Sign In
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
