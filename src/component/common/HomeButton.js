import { useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi";

function HomeButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="bg-gray-500 border text-white px-1 py-1 rounded flex items-center hover:bg-gray-800"
    >
      <HiHome className="sm:w-8 sm:h-6 w-6 h-5 text-white cursor-pointer" />
    </button>
  );
}

export default HomeButton;
