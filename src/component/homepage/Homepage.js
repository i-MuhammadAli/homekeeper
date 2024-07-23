import Mainfooter from "../footer/Mainfooter";
import Header from "../header/Header";
// import axios from "axios";
import Banner from "./Banner";
// import createApi from "../../utils/api";
import Dashboard from "../agent/Dashboard";
import HomeOwnerDashboard from "../homeowner/Dashboard";
// import Header2 from "../header/Header2";
// import {
//   fetchUserProfile,
//   fetchLenders,
//   fetchInspectors,
//   fetchTitles,
//   fetchPropertyList,
// } from "../../store";
// import Loader from "../loader_folder/Loader";

function Homepage() {
  // const api = createApi();
  // const dispatch = useDispatch();

  // const lendersLoading = useSelector((state) => {
  //   return state.lenders.isLoading;
  // });

  // const propertyListLoading = useSelector((state) => {
  //   return state.propertyList.isLoading;
  // });

  // const profileLoading = useSelector((state) => {
  //   return state.profile.isLoading;
  // });

  // const titlesLoading = useSelector((state) => {
  //   return state.titles.isLoading;
  // });

  // const inspectorsLoading = useSelector((state) => {
  //   return state.inspectors.isLoading;
  // });

  // useEffect(() => {
  //   if (checkuserloggedin()) {
  //     dispatch(fetchUserProfile());
  //     dispatch(fetchLenders());
  //     dispatch(fetchTitles());
  //     dispatch(fetchInspectors());
  //     dispatch(fetchPropertyList());
  //   }
  // }, []);

  // const checkuserloggedin = () => {
  //   return localStorage.getItem("token-type") &&
  //     localStorage.getItem("token-info")
  //     ? true
  //     : false;
  // };

  // const handleButtonClick = () => {
  //   // axios.get("http://127.0.0.1:8000/api/hello");
  //   api.get("/api/hello");
  // };

  // if (
  //   lendersLoading ||
  //   propertyListLoading ||
  //   profileLoading ||
  //   titlesLoading ||
  //   inspectorsLoading
  // ) {
  //   return <Loader />;
  // }

  // console.log(appLoaded);

  return (
    <>
      {localStorage.getItem("token-type") === "agent" &&
      localStorage.getItem("token-info") ? (
        <>
          <Dashboard />
        </>
      ) : (
        <>
          <HomeOwnerDashboard />
        </>
      )}
    </>
  );
}

export default Homepage;
