import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import Login from "./component/login/Login";
import Adminlogin from "./component/login/Adminlogin";
import Forgotpasswordlogin from "./component/forgotpassword/Forgotpasswordlogin";
import Registerverify from "./component/register/Registerverify";
import Resetpassword from "./component/register/Resetpassword";
import Passwordchanged from "./component/register/Passwordchanged";
import Registeragent from "./component/register/Registeragent";
import Homepage from "./component/homepage/Homepage.js";
import Pricing from "./component/admin/Pricing.js";
import Adminusers from "./component/admin/Adminusers.js";
import Adminusers1 from "./component/admin/Adminusers1.js";
import AdminSuperadmin from "./component/admin/Adminsuperadmin.js";
import Globalpropertyvalues from "./component/admin/Globalpropertyvalues.js";
import Globalaprvalues from "./component/admin/Globalaprvalues.js";
import Adminnotifications from "./component/admin/Adminnotifications.js";
import Adminusersingle from "./component/admin/Adminusersingle.js";
import Contactus from "./component/pages/Contactus.js";
import Aboutus from "./component/pages/Aboutus.js";
import Mailsent from "./component/forgotpassword/Mailsent.js";

import Homemaintenance from "./component/admin/homemaintain/Homemaintenance.js";
import Propertylist from "./component/admin/Propertylist.js";
import HelpnSupport from "./component/admin/Helpnsupport.js";
import Propertylistsingledetail from "./component/admin/Propertylistsingledetail.js";
import Myclient from "./component/profile/Myclients.js";
import Homeinspection from "./component/admin/homeinspection/Homeinspection.js";
import Homeinspectioncompleted from "./component/admin/homeinspection/Homeinspectioncompleted.js";
import AdminReviewclient from "./component/admin/reviewclient.js";
import Accountsettings1 from "./component/agent/Accountsettings.js";

import AddClientForm from "./component/agent/AddClientForm.js";

import Sendinvite from "./component/profile/Sendinvite.js";
import Topnavbar from "./component/admin/Topnavbar";
import Blogsnpages from "./component/admin/Blogsnotherpages";
import Testing from "./component/Testing.js";
import Sendotp from "./component/homepage/sendotp";
import Loader from "./component/loader_folder/Loader.js";

import {
  fetchUserProfile,
  fetchLenders,
  fetchInspectors,
  fetchTitles,
  fetchPropertyList,
  fetchHomeValueData,
  fetchPropertiesDocs,
  fetchPropertyApprRate,
  fetchMaintenanceTasks,
  fetchPropertiesMaintenanceTasks,
  fetchAgentRequestHistory,
  fetchProperties,
  fetchInvitees,
  setShowCientPreview,
  setAuthUser,
  fetchInvitationPropertyList,
  setProfileUserName,
} from "./store/index.js";
import ViewClientRequests from "./component/agent/ViewClientRequests.js";
import MainPage from "./component/homepage/MainPage.js";
import InviteeRegister from "./component/register/InviteeRegister.js";
import PropertyLink from "./component/homeowner/PropertyLink.js";

function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const auth = useSelector((state) => {
    return state.auth;
  });

  const propertyListLoading = useSelector((state) => {
    return state.propertyList.isLoading;
  });

  const profileLoading = useSelector((state) => {
    return state.profile.isLoading;
  });

  const myPropertyLoading = useSelector((state) => {
    return state.myProperties.isLoading;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch the first thunk and wait for it to complete
        await dispatch(fetchPropertyList());

        // Once the first thunk completes, dispatch the second thunk
        dispatch(fetchPropertiesMaintenanceTasks());
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching data:", error);
      }
    };

    dispatch(setAuthUser());

    if (auth.user) {
      dispatch(fetchMaintenanceTasks());
      dispatch(fetchPropertyApprRate());

      if (auth.tokenType === "agent") {
        dispatch(fetchUserProfile());
        fetchData();
        dispatch(fetchLenders());
        dispatch(fetchTitles());
        dispatch(fetchInspectors());
        dispatch(fetchHomeValueData());
        dispatch(fetchPropertiesDocs());
        dispatch(fetchAgentRequestHistory());
        dispatch(fetchInvitees());
        dispatch(fetchInvitationPropertyList());
      } else if (auth.tokenType === "homeowner") {
        // fetchDataHomeOwner();
        dispatch(setProfileUserName(auth.user));
        dispatch(fetchProperties());
        dispatch(setShowCientPreview(true));
      }
    }
    setIsLoading(false);
    // navigate("/dashboard");
  }, [auth]);

  if (myPropertyLoading || isLoading || propertyListLoading || profileLoading) {
    // console.log("loading .....");
    return <Loader />;
  }
  // console.log("after");

  // dispatch(setAppLoaded());

  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          {auth.user ? (
            <>
              <Route path="/dashboard" element={<Homepage />} />
              <Route path="/accountsettings/" element={<Accountsettings1 />} />
              <Route path="/myclientlist" element={<Myclient />} />
              <Route path="/requests" element={<ViewClientRequests />} />
              <Route path="/addclient" element={<AddClientForm />} />
              <Route path="/sendinvite" element={<Sendinvite />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              <Route path="/register" element={<Registeragent />} />
              <Route path="/inviteeregister" element={<InviteeRegister />} />
              <Route path="/login" element={<Login />} />
              <Route path="/resetpassword" element={<Resetpassword />} />
              <Route path="/passwordchanged" element={<Passwordchanged />} />
              <Route path="/property" element={<PropertyLink />} />
              <Route path="/" element={<MainPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}

          <Route path="/otpmatch" element={<Sendotp />} />
          <Route path="/mailsent" element={<Mailsent />} />

          <Route
            path="/registerverify/:token/:userid"
            element={<Registerverify />}
          />
          <Route path="/contact-us" element={<Contactus />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/testing" element={<Testing />} />

          <Route path="/admin/property_list" element={<Propertylist />} />
          <Route
            path="/admin/property_list/singledetail"
            element={<Propertylistsingledetail />}
          />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route
            path="/adminforgotpassword"
            element={<Forgotpasswordlogin />}
          />
          <Route
            path="/admin/usersingle/:userid"
            element={<Adminusersingle />}
          />
          <Route path="/admin/accounting/pricing" element={<Pricing />} />
          <Route path="/admin/accounting/users" element={<Adminusers />} />
          <Route path="/admin/accounting/users1" element={<Adminusers1 />} />
          <Route
            path="/admin/homeinspection/homemaintenance"
            element={<Homemaintenance />}
          />
          <Route
            path="/admin/homeinspection/homeinspection"
            element={<Homeinspection />}
          />
          <Route
            path="/admin/homeinspection/homeinspectioncompleted"
            element={<Homeinspectioncompleted />}
          />
          <Route
            path="/admin/superadmin/globalpropertyvalues"
            element={<Globalpropertyvalues />}
          />
          <Route
            path="/admin/superadmin/globalaprvalues"
            element={<Globalaprvalues />}
          />
          <Route path="/admin/notifications" element={<Adminnotifications />} />
          <Route path="/admin/helpnsupport" element={<HelpnSupport />} />
          <Route path="/admin/cms/topnavbar" element={<Topnavbar />} />
          <Route path="/admin/cms/blogsnpages" element={<Blogsnpages />} />
          <Route
            path="/admin/superadmin/superadmin"
            element={<AdminSuperadmin />}
          />
          <Route
            path="/admin/adminreviewclient/:clientid"
            element={<AdminReviewclient />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
