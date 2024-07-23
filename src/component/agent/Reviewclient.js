import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useParams, useLocation } from "react-router-dom";
import Switch from "react-switch";
import { HmacSHA256 } from "crypto-js";
import { saveAs } from "file-saver";
import $ from "jquery";
import createApi from "../../utils/api";

function Reviewclient() {
  const navigate = useNavigate();
  var md5 = require("md5");
  const searchParams = useParams();
  const api = createApi();
  const [lastinsertedid, setlastinsertedid] = useState("");
  const clientid = searchParams.clientid;
  const [agentrecord, setagentrecord] = useState("");
  const [endequitydate, setendequitydate] = useState("");
  const [commonvalue, setcommonval] = useState("");
  const [commonname, setcommonvname] = useState("");
  const [lenderrecord, setstateforlenderrecord] = useState("");
  const [homevaluesrecord, setstateforhomevalues] = useState("");
  const [inspectorrecord, setstateforinspectorrecord] = useState("");
  const [titlecompanyrecord, setstatefortitlecompanyrecord] = useState("");
  const [forreadonly, setstateforreadonly] = useState("");
  const [forreadonly1, setstateforreadonly1] = useState("");
  const [forreadonly2, setstateforreadonly2] = useState("");
  const [dataautodatacheck, setstatefordataauto] = useState("");
  const [dataforuploaddata, setdataforuploaddata] = useState("");
  const [successmessage, setsuccessmessage] = useState("");
  const [successmessage1, setsuccessmessage1] = useState("");
  const [successmessage2, setsuccessmessage2] = useState("");
  const [successmessage3, setsuccessmessage3] = useState("");
  const [successmessage4, setsuccessmessage4] = useState("");
  const [successmessage5, setsuccessmessage5] = useState("");
  const [successmessage6, setsuccessmessage6] = useState("");
  const [successmessage7, setsuccessmessage7] = useState("");
  const [successmessage8, setsuccessmessage8] = useState("");
  const [successmessage9, setsuccessmessage9] = useState("");
  const [successmessage10, setsuccessmessage10] = useState("");
  const [messageforuploaddocs, setsuccessmessageuploaddocs] = useState("");
  const [dataforLenders, SetdataforLenders] = useState([]);
  const [dataforHomeinspector, SetdataforHomeinspector] = useState([]);
  const [dataforTitleCompany, SetdataforTitleCompany] = useState([]);
  const [file, setFile] = useState();
  const [fillmanually, setstateforfillmanually] = useState("");
  const [forloanvalidation, setstateforloanvalidation] = useState("");
  const [homevaluenext, sethomevaluenext] = useState({
    id: "",
    value: "",
    date_from: "",
    date_to: "",
  });

  const [lenderdata, lenderstate] = useState({
    lendername: "",
    lenderemail: "",
  });
  const [inspectordata, inspectorstate] = useState({
    name: "",
    email: "",
    cellnumber: "",
    companyname: "",
  });
  const [titlecompanydata, titlecompanystate] = useState({
    titlename: "",
    titleemail: "",
    titlephone: "",
    titlecompany: "",
  });

  const [lendermodal, setStateforlendermodal] = useState({
    lendernamefromoption: "",
    lendername: "",
    lenderemail: "",
    lendercellphone: "",
    lendercompany: "",
  });

  const imgdownload = () => {
    // let url = "https://jleeinvestment.com.sg/jilee/public/image/homekeeper/corrections (2).docx"
    let url =
      "https://jleeinvestment.com.sg/jilee/public/image/homekeeper/home keeper final frd.pdf";
    saveAs(url, "pdf download");
  };

  const [oldvaluesget, setstateforoldvalues] = useState({
    loanamount: "",
    loanyear: "",
    apr_rate: "",
    monthly_Mortage_Insurance: "",
  });
  const [himodal, setStateforhimodal] = useState({
    inspectorfromoption: "",
    inspectorname: "",
    inspectoremail: "",
    inspectorcellphone: "",
    inspectorcompany: "",
  });
  const [tcmodal, setStatefortitlecompany] = useState({
    titlefromoption: "",
    titlename: "",
    titleemail: "",
    titlecellphone: "",
    titlecompanyname: "",
  });

  const [state2, setState2] = useState({
    loanyear: "",
    apr_rate: "",
    loanpmi: "",
    downpaymentkey: "",
    downpaymentvalue: "",
    loanamount: "",
    monthly_Mortage_Insurance: "",
    mortageinsuranceremoved: "",
    percentageequity: "",
    moretageyearsremoved: "",
  });

  const handleChange1 = (e) => {
    const { name, value } = e.target;

    setState2((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setstateforoldvalues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [checkedpartner, setCheckedpartner] = useState(false);
  const [checkedlender, setCheckedlender] = useState(true);
  const [checkedinspector, setCheckedinspector] = useState(true);
  const [checkedcompany, setCheckedtitlecompany] = useState(true);

  const [number, setNumber] = useState(0);
  const previousValue = useRef(null);
  useEffect(() => {
    // myFunction();
    getdetailsfromserver();
    previousValue.current = number;
    // alert(number)
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    //   alert(value)

    setStateforlendermodal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangehi = (e) => {
    const { name, value } = e.target;
    //   alert(value)

    setStateforhimodal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangetc = (e) => {
    const { name, value } = e.target;
    //   alert(value)

    setStatefortitlecompany((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updatestatusapi = async (type, status) => {
    console.log("thistype", type);
    console.log("thistype1", status);
    let formdata = new FormData();
    formdata.append("clientid", clientid);
    if (type == "partner") {
      formdata.append("checkedpartner", status);
    }
    if (type == "lender") {
      formdata.append("checkedlender", status);
    }
    if (type == "inspector") {
      formdata.append("checkedinspector", status);
    }
    if (type == "titlecompany") {
      formdata.append("checkedcompany", status);
    }
    api.post("/api/homekeeperupdatestatus", formdata).then(function (response) {
      console.log("response", response.data);
    });

    // let formdata = new FormData();
    // formdata.append('clientid', clientid);
    // formdata.append('checkedpartner', checkedpartner);
    // formdata.append('checkedinspector', checkedinspector);
    // formdata.append('checkedcompany', checkedcompany);
    // formdata.append('checkedlender', checkedlender);
    // axios.post("https://admin.myhomekeeper.co/api/homekeeperupdatestatus", formdata)
    //     .then(function (response) {
    //         console.log('response', response.data);
    //     })
  };

  const submithomelender = async (e) => {
    e.preventDefault();
    // const hashedPassword = md5(lendermodal.lenderpassword)
    let formdata = new FormData();
    formdata.append("clientid", clientid);
    formdata.append("lendername", lendermodal.lendername);
    formdata.append("lenderemail", lendermodal.lenderemail);
    formdata.append("lendercellphone", lendermodal.lendercellphone);
    formdata.append("lendercompanyname", lendermodal.lendercompany);
    formdata.append("lendernamefromoption", lendermodal.lendernamefromoption);
    // formdata.append('lenderpassword', lendermodal.lenderpassword);

    api
      .post("/api/homekeeperupdatemylenderinproperty", formdata)

      //axios.post("https://digittrix-staging.com/staging/crmapply/applyboard/api/homekeepermylenders", formdata)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  };
  const submithomeinspector = async (e) => {
    e.preventDefault();
    // const hashedPassword = md5(himodal.inspectorpassword)
    let formdata = new FormData();
    formdata.append("clientid", clientid);
    formdata.append("inspectorname", himodal.inspectorname);
    formdata.append("inspectoremail", himodal.inspectoremail);
    formdata.append("inspectorcellphone", himodal.inspectorcellphone);
    formdata.append("inspectorcompany", himodal.inspectorcompany);
    formdata.append("inspectorfromoption", himodal.inspectorfromoption);
    // formdata.append('inspectorpassword', himodal.inspectorpassword);

    api
      .post("/api/homekeeperupdatemyinspectorinproperty", formdata)

      //axios.post("https://digittrix-staging.com/staging/crmapply/applyboard/api/homekeepermylenders", formdata)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  };
  const submittitlecompany = async (e) => {
    e.preventDefault();
    // const hashedPassword = md5(tcmodal.titlepassword)
    let formdata = new FormData();
    formdata.append("clientid", clientid);
    formdata.append("titlename", tcmodal.titlename);
    formdata.append("titleemail", tcmodal.titleemail);
    formdata.append("titlecellphone", tcmodal.titlecellphone);
    formdata.append("titlecompanyname", tcmodal.titlecompanyname);
    formdata.append("titlefromoption", tcmodal.titlefromoption);
    // formdata.append('titlepassword', tcmodal.inspectorpassword);

    api
      .post("/api/homekeeperupdatemytitlecompanyinproperty", formdata)

      //axios.post("https://digittrix-staging.com/staging/crmapply/applyboard/api/homekeepermylenders", formdata)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  };
  const adduploadmoredocs = (e) => {
    e.preventDefault();
    Setstatevalue11(0);
    sendfileinserver();
  };

  const sendfileinserver = async () => {
    let formdata = new FormData();
    formdata.append("clientid", clientid);
    formdata.append("uploadimage", file);
    api
      .post("/api/homekeeperupdatepropertylistbyhomeinspector", formdata)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          setsuccessmessageuploaddocs("Updated Successfully");
          getdetailsfromserver();
          form1();
          console.log("success");
        } else {
          console.log("under error");
        }
      });
  };

  const getdetailsfromserver = async () => {
    // alert('hiii');
    //setError([]);

    let formdata = new FormData();

    formdata.append("clientid", clientid);
    // alert(clientid)
    api
      .post("/api/homekeepergetclientreview", formdata)
      .then(function (response) {
        console.log(
          "responseallpartner",
          response.data.clientdata.partnerfname
        );
        if (response.data.status == "success") {
          // alert("success")
          var agentrecord = response.data.clientdata;
          var lenderrecorddata = response.data.lenderdetails;
          var inspectorrecorddata = response.data.inspectordetails;
          var titlecompanydata = response.data.titlecompanydetails;
          var allhomevalues = response.data.allhomevalues;

          setendequitydate(
            response.data.clientdata.Mortage_Insurance_removed_value
          );
          // const myuploaddata='';
          if (response.data.clientdata.uploaddocument) {
            const myuploaddata =
              response.data.clientdata.uploaddocument.split("|");
            setdataforuploaddata(myuploaddata);
          }

          // console.log("myuploaddata",myuploaddata)
          if (lenderrecorddata) {
            setstateforlenderrecord(lenderrecorddata);
          }
          if (allhomevalues) {
            setstateforhomevalues(allhomevalues);
          }

          if (inspectorrecorddata) {
            setstateforinspectorrecord(inspectorrecorddata);
          }

          if (titlecompanydata) {
            setstatefortitlecompanyrecord(titlecompanydata);
          }

          // var partnerrecord=response.data.partnerdata;
          var partnerrecord = {
            partnerfname: response.data.clientdata.partnerfname,
            partnerlname: response.data.clientdata.partnerlname,
            partneremail: response.data.clientdata.partneremail,
            partnercellphone: response.data.clientdata.partnercellphone,
            partnerdob: response.data.clientdata.partnerdob,
          };
          setagentrecord(agentrecord);

          if (
            agentrecord.titlecompanystatus &&
            agentrecord.titlecompanystatus == "true"
          ) {
            setCheckedtitlecompany(true);
          } else {
            setCheckedtitlecompany(false);
          }
          if (
            agentrecord.lender_status &&
            agentrecord.lender_status == "true"
          ) {
            setCheckedlender(true);
          } else {
            setCheckedlender(false);
          }
          if (
            agentrecord.inspector_status &&
            agentrecord.inspector_status == "true"
          ) {
            setCheckedinspector(true);
          } else {
            setCheckedinspector(false);
          }
          if (agentrecord.lender_status) setState1(agentrecord.address);
          SetDummystate(agentrecord);
          SetDummystate1(partnerrecord);
          // alert(response.data.message);
          // alert("success")
          // alert(response.data.lastinsertedid)
          // var lastinsertedid = response.data.lastinsertedid;
          // alert(lastinsertedid)
          // navigate('/agent/addclient2/' + lastinsertedid);
          // navigate('/Thankyouvalidate')
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  };
  const [setvalue, Setstatevalue] = useState("");
  function greetUser() {
    //    alert("this")
    if (setvalue == "" || setvalue == 0) {
      Setstatevalue(1);
    } else {
      Setstatevalue(0);
    }
  }

  const [setvalue1, Setstatevalue1] = useState("");
  function greetUser1() {
    // console.log("Hi there, user!");
    if (setvalue1 == "" || setvalue1 == 0) {
      Setstatevalue1(1);
    } else {
      Setstatevalue1(0);
    }
  }
  const [setvalue2, Setstatevalue2] = useState("");
  function greetUser2() {
    // console.log("Hi there, user!");
    if (setvalue2 == "" || setvalue2 == 0) {
      Setstatevalue2(1);
    } else {
      Setstatevalue2(0);
    }
  }
  const [setvalue3, Setstatevalue3] = useState("");
  function greetUser3() {
    // console.log("Hi there, user!");
    if (setvalue3 == "" || setvalue3 == 0) {
      Setstatevalue3(1);
    } else {
      Setstatevalue3(0);
    }
  }

  const [setvalue4, Setstatevalue4] = useState("");
  function greetUser4() {
    // console.log("Hi there, user!");
    if (setvalue4 == "" || setvalue4 == 0) {
      Setstatevalue4(1);
    } else {
      Setstatevalue4(0);
    }
  }

  const [setvalue5, Setstatevalue5] = useState("");
  function greetUser5() {
    // console.log("Hi there, user!");
    if (setvalue5 == "" || setvalue5 == 0) {
      Setstatevalue5(1);
    } else {
      Setstatevalue5(0);
    }
  }

  const [setvalue6, Setstatevalue6] = useState("");
  function greetUser6() {
    // console.log("Hi there, user!");
    if (setvalue6 == "" || setvalue6 == 0) {
      Setstatevalue6(0);
    } else {
      Setstatevalue6(0);
    }
  }

  const [setvalue7, Setstatevalue7] = useState("");
  const [setvalue77, Setstatevalue77] = useState("");

  function greetUser70(id, value) {
    sethomevaluenext({ id: id, value: value });
    // console.log("Hi there, user!");
    if (setvalue77 == "" || setvalue77 == 0) {
      Setstatevalue77(1);
    } else {
      Setstatevalue77(0);
    }
  }
  function greetUser7(i, id, value, date_from, date_to) {
    sethomevaluenext({
      id: id,
      value: value,
      date_from: date_from,
      date_to: date_to,
    });
    // console.log("Hi there, user!");
    if (setvalue7 == "" || setvalue7 == 0) {
      Setstatevalue7(1);
    } else {
      Setstatevalue7(0);
    }
  }
  function greetUser7del(id) {
    deleteapiforhomevalue(id);

    // sethomevaluenext({ value: value, date: date })
    // // console.log("Hi there, user!");
    // if (setvalue7 == '' || setvalue7 == 0) {
    //     Setstatevalue7(1);
    // }
    // else {
    //     Setstatevalue7(0);
    // }
  }
  const [setvalue78, Setstatevalue78] = useState("");
  function greetUser78() {
    // console.log("Hi there, user!");
    if (setvalue78 == "" || setvalue78 == 0) {
      Setstatevalue78(1);
    } else {
      Setstatevalue78(0);
    }
  }
  const [setvalue70, Setstatevalue70] = useState("");
  function greetUser12() {
    // console.log("Hi there, user!");
    if (setvalue70 == "" || setvalue70 == 0) {
      Setstatevalue70(1);
    } else {
      Setstatevalue70(0);
    }
  }
  // function greetUser13() {
  //     // console.log("Hi there, user!");
  //     if (setvalue78 == '' || setvalue78 == 0) {
  //         Setstatevalue78(1);
  //     }
  //     else {
  //         Setstatevalue78(0);
  //     }
  // }
  const handleChangepartner = (nextChecked) => {
    setCheckedpartner(nextChecked);
    updatestatusapi("partner", nextChecked);
  };

  const handleChangelender = (nextChecked) => {
    setCheckedlender(nextChecked);
    updatestatusapi("lender", nextChecked);
  };
  const handleChangeinspector = (nextChecked) => {
    setCheckedinspector(nextChecked);
    updatestatusapi("inspector", nextChecked);
  };
  const handleChangetitlecompany = (nextChecked) => {
    setCheckedtitlecompany(nextChecked);
    updatestatusapi("titlecompany", nextChecked);
  };

  const [setvalue8, Setstatevalue8] = useState("");

  function deleteapiforhomevalue(id) {
    let formdata = new FormData();
    formdata.append("id", id);
    api
      .post("/api/homekeeperdeletehomevalue", formdata)

      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          getdetailsfromserver();
        }
      });
  }

  function greetUser8() {
    let formdata = new FormData();
    formdata.append("userid", localStorage.getItem("token-info"));
    api
      .post("/api/homekeepermylenders", formdata)

      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          SetdataforLenders(response.data.mylenders);
          console.log("mylenders", dataforLenders);
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  }
  const [setvalue9, Setstatevalue9] = useState("");
  function greetUser9() {
    let formdata = new FormData();
    formdata.append("userid", localStorage.getItem("token-info"));
    api
      .post("/api/homekeepermyhomeinspectorusers", formdata)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          SetdataforHomeinspector(response.data.homeinspectorusers);
          // console.log("mylenders", dataforLenders);
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
    // console.log("Hi there, user!");
    // if (setvalue9 == '' || setvalue9 == 0) {
    //     Setstatevalue9(1);
    // }
    // else {
    //     Setstatevalue9(0);
    // }
  }
  const [setvalue10, Setstatevalue10] = useState("");
  function greetUser10() {
    let formdata = new FormData();
    formdata.append("userid", localStorage.getItem("token-info"));
    api
      .post("/api/homekeepermytitlecompany", formdata)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          SetdataforTitleCompany(response.data.mytitlecompany);
          // console.log("mylenders", dataforLenders);
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
    // console.log("Hi there, user!");
    // if (setvalue10 == '' || setvalue10 == 0) {
    //     Setstatevalue10(1);
    // }
    // else {
    //     Setstatevalue10(0);
    // }
  }
  const [setvalue11, Setstatevalue11] = useState("");
  function greetUser11() {
    // console.log("Hi there, user!");
    if (setvalue11 == "" || setvalue11 == 0) {
      Setstatevalue11(1);
    } else {
      Setstatevalue11(0);
    }
  }

  function greetUser12() {
    console.log("test");
    if (setvalue70 == "" || setvalue70 == 0) {
      Setstatevalue70(1);
    } else {
      Setstatevalue70(0);
    }
  }

  const [state1, setState1] = useState();
  const [dummystate, SetDummystate] = useState({
    fname: "",
    lname: "",
    dob: "",
    email: "",
    cellphone: "",
    address: "",
    purchased: "",
    saleprice: "",
    homevalue: "",
    rental_value: "",
    Airbnb: "",
    loanamount: "",
    monthly_Mortage_Insurance: "",
    apr_rate: "",
    percentageequity: "",
    moretageyearsremoved: "",
    homevalueothers: "",
    homevalueothersdatefrom: "",
    homevalueothersdateto: "",
  });

  const [dummystate1, SetDummystate1] = useState({
    partnerfname: "",
    partnerlname: "",
    partnerdob: "",
    partneremail: "",
    partnercellphone: "",
  });
  // console.log("dummystate", dummystate);

  const handleClick = (e) => {
    const { name, value } = e.target;
    console.log("lapppname", name);
    console.log("lapppvalue", value);
    let commonval = "";
    let commonvname = "";

    // if (name =='mortageinsuranceremoved' && ne)
    // {

    // }

    if (name == "percentageequity") {
      commonval = value;
      commonvname = name;
      console.log("laplap", name);
      console.log("laplap1", value);
    }

    if (name == "moretageyearsremoved") {
      commonval = value;
      commonvname = name;
    }

    if (name == "mortageinsuranceremoved") {
      console.log("mortageinsuranceremoved", dummystate.percentageequity);
      console.log("mortageinsuranceremoved1", dummystate.moretageyearsremoved);
    }
    if (name == "mortageinsuranceremoved" && value == "equity") {
      // commonval = dummystate.percentageequity;
      // commonvname = value;
      setstateforreadonly(0);
      setstateforreadonly1(1);
      setstateforreadonly2(0);
    }
    if (name == "mortageinsuranceremoved" && value == "years") {
      // commonval = dummystate.moretageyearsremoved;
      // commonvname = value;
      setstateforreadonly(0);
      setstateforreadonly2(1);
      setstateforreadonly1(0);
    }
    if (name == "mortageinsuranceremoved" && value == "never") {
      commonval = 0;
      commonvname = value;
      setstateforreadonly(1);
    }
    if (name == "mortageinsuranceremoved") {
      // console.log("laplap", commonval)
      // console.log("laplap1", commonvname)
    }
    setcommonval(commonvname);
    setcommonvname(commonval);

    if (name == "loanpmi" && value == "yes") {
      // alert(value)
      $("div .showhide").show();
    }

    if (name == "loanpmi" && value == "no") {
      // alert(value)
      $("div .showhide").hide();
    }
    if (name == "loanpmi" && value == "clearselection") {
      setstateforfillmanually("");
    }

    // SetDummystate(value);
    SetDummystate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    sethomevaluenext((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setFile(e.target.files[0]);
  };

  const lenderclick = (e) => {
    const { name, value } = e.target;

    lenderstate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const inspectorclick = (e) => {
    const { name, value } = e.target;

    inspectorstate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const titlecompanyclick = (e) => {
    const { name, value } = e.target;

    titlecompanystate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick1 = (e) => {
    const { name, value } = e.target;

    SetDummystate1((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [AccountInformation, SetOwnerInformation] = useState({
    fname: "",
  });

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    SetOwnerInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const form1 = (e) => {
    // e.preventDefault();
    //  alert("hi");
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage("Updated Successfully");
    senddetailstoform1();
    Setstatevalue(0);
  };
  const Removeclassfunction = () => {
    setsuccessmessage("");
    setsuccessmessage1("");
    setsuccessmessage2("");
    setsuccessmessage3("");
    setsuccessmessage4("");
    setsuccessmessage5("");
    setsuccessmessage6("");
    setsuccessmessage7("");
    setsuccessmessage8("");
    setsuccessmessageuploaddocs("");
  };

  const form2 = (e) => {
    e.preventDefault();
    // setsuccessmessage('Updated Successfully')
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage1("Updated Successfully");
    senddetailstoform1();
    Setstatevalue1(0);
  };
  const form3 = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage2("Updated Successfully");
    senddetailstoform1();
    Setstatevalue2(0);
  };
  const form4 = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage3("Updated Successfully");
    senddetailstoform1();
    Setstatevalue3(0);
  };
  const form5 = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage4("Updated Successfully");
    edithomevalues();

    Setstatevalue7(0);
  };
  const form50 = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage4("Updated Successfully");
    edithomevalues();
    getdetailsfromserver();
    Setstatevalue70(0);
  };
  const form70 = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage4("Updated Successfully");
    senddetailstoform1();
    Setstatevalue70(0);
    getdetailsfromserver();
  };
  const form6 = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage5("Updated Successfully");
    senddetailstoform1();
    Setstatevalue4(0);
  };
  const form7 = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage6("Updated Successfully");
    senddetailstoform1();
    Setstatevalue5(0);
  };
  const form8 = (e) => {
    e.preventDefault();
    if (
      dummystate.loanamount == "" ||
      dummystate.loanyear == "" ||
      dummystate.apr_rate == "" ||
      dummystate.monthly_Mortage_Insurance == ""
    ) {
      // alert("Please fill Proper Loan Value")
      setstateforloanvalidation("Please fill Proper Loan Value");
      return false;
    } else {
      setstateforloanvalidation("");
      // alert("correct");
    }

    console.log("dummystate1", dummystate.loanamount);
    // console.log("dummystate2",dummystate.loanyear)
    // console.log("dummystate3",dummystate.apr_rate)
    // console.log("dummystate4", dummystate.monthly_Mortage_Insurance)
    // console.log("dummystate5", dummystate.mortageinsurance)
    // console.log("dummystate6", dummystate.mortageinsuranceremoved)
    // console.log("dummystate7", dummystate.percentageequity)
    // console.log("dummystate8", dummystate.moretageyearsremoved)
    //
    // setTimeout(Removeclassfunction, 3000);
    setsuccessmessage7("Updated Successfully");
    senddetailstoform1();
    Setstatevalue6(0);
  };

  const lenderdetails = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage8("Updated Successfully");
    senddetailstoform2();
  };

  const homeinspectordetails = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage9("Updated Successfully");
    senddetailstoform3();
  };
  const titlecompany = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage10("Updated Successfully");
    senddetailstoform4();
  };
  const uploaddocument = (e) => {
    e.preventDefault();
    senddetailstoform5();
  };

  const senddetailstoform5 = async () => {
    // alert("reach upload document")
    let formdata = new FormData();
    formdata.append("clientid", clientid);
  };
  const senddetailstoform4 = async () => {
    // alert("reach titlecompany point")
    let formdata = new FormData();
    formdata.append("clientid", clientid);
  };

  const senddetailstoform3 = async () => {
    // alert("reach inspector point")
    let formdata = new FormData();
    formdata.append("clientid", clientid);
  };
  const senddetailstoform2 = async () => {
    // alert("reach lender point")
    let formdata = new FormData();
    formdata.append("clientid", clientid);
  };

  const senddetailstoform1 = async () => {
    // setError([]);

    let formdata = new FormData();
    formdata.append("clientid", clientid);
    formdata.append("fname", dummystate.fname);
    formdata.append("lname", dummystate.lname);
    formdata.append("email", dummystate.email);
    formdata.append("cellphone", dummystate.cellphone);
    formdata.append("dob", dummystate.dob);
    formdata.append("partnerfname", dummystate1.partnerfname);
    formdata.append("partnerlname", dummystate1.partnerlname);
    formdata.append("partneremail", dummystate1.partneremail);
    formdata.append("partnercellphone", dummystate1.partnercellphone);
    formdata.append("partnerdob", dummystate1.partnerdob);
    formdata.append("partnerfname", dummystate1.partnerfname);
    formdata.append("partnerlname", dummystate1.partnerlname);
    formdata.append("partneremail", dummystate1.partneremail);
    formdata.append("partnercellphone", dummystate1.partnercellphone);
    formdata.append("partnerdob", dummystate1.partnerdob);
    formdata.append("address", dummystate.address);
    formdata.append("whenbuy", dummystate.whenbuy);
    formdata.append("saleprice", dummystate.saleprice);
    formdata.append("homevalue", dummystate.homevalue);
    if (dummystate.homevalueothers && dummystate.homevalueothersdatefrom) {
      formdata.append("homevalueothers", dummystate.homevalueothers);
      formdata.append(
        "homevalueothersdatefrom",
        dummystate.homevalueothersdatefrom
      );
    } else {
      formdata.append("homevalueothers", "");
      formdata.append("homevalueothersdatefrom", "");
    }

    formdata.append("rental_value", dummystate.rental_value);
    formdata.append("Airbnb", dummystate.Airbnb);
    formdata.append("loanamount", dummystate.loanamount);
    formdata.append("apr_rate", dummystate.apr_rate);
    formdata.append(
      "monthly_Mortage_Insurance",
      dummystate.monthly_Mortage_Insurance
    );

    formdata.append("lendername", lenderstate.name);
    formdata.append("lenderemail", lenderstate.email);

    formdata.append("inspectorname", inspectorstate.name);
    formdata.append("inspectoremail", inspectorstate.email);
    formdata.append("inspectorphone", inspectorstate.phone);
    formdata.append("inspectorcompany", inspectorstate.company);

    formdata.append("titlecompanyname", titlecompanystate.name);
    formdata.append("titlecompanyemail", titlecompanystate.email);
    formdata.append("titlecompanyphone", titlecompanystate.phone);
    formdata.append("titlecompanycompany", titlecompanystate.company);
    formdata.append("commonname", commonname);
    formdata.append("commonvalue", commonvalue);

    api
      .post("/api/homekeeperupdatepropertylistreviewclient1", formdata)
      .then(function (response) {
        getdetailsfromserver();
        console.log("response", response.data);
        if (response.data.status == "success") {
          // var agentrecord = response.data.clientdata;
          // setagentrecord(agentrecord);
          // setState1(agentrecord.address);
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  };

  function edithomevalues() {
    let formdata = new FormData();
    formdata.append("id", homevaluenext.id);
    formdata.append("value", homevaluenext.value);
    formdata.append("datefrom", homevaluenext.date_from);
    formdata.append("dateto", homevaluenext.date_to);
    api
      .post("/api/homekeeperedithomevalue", formdata)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          getdetailsfromserver();
        }
      });
  }

  function updateaddress(type, name) {
    // alert(`${type}`);
    // alert(`${name}`);
    // console.log(f)
    console.log("test", type);
    console.log("name", name);
    //  const { name, value } = e.target
    // // console.log("name is",name)
    // console.log("value is", e.currentTarget.value)
    // console.log("value is ttt", e.target.value)
    // setState1(value);
  }

  function updateaddressforlender() {
    // alert("test")
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      {/* <div>
            <p>Click this text to see the event bubbling</p>
            <button value="test" onClick={greetUser}>Click me</button>
        </div> */}
      <section className="review_client">
        <div className="container">
          <h3>
            <Link onClick={goBack}>
              <i className="fa-solid fa-arrow-left"></i>
            </Link>{" "}
            Review Client Detail & Proceed
          </h3>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h6 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <b>Property : </b> {agentrecord.address}{" "}
                  <img src="/../asset/images/aro_a.png" alt="icon" />
                </button>
              </h6>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="strow">
                    <div className="row">
                      <div className="col-sm-8">
                        <div className="stdiv">
                          <form onSubmit={handleSubmit(form1)}>
                            <div className="row reviewclientform">
                              <div className="col-sm-6">
                                <h5>OWNER Information</h5>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {agentrecord.fname} {agentrecord.lname}
                                </p>
                                <div className="form-group">
                                  <input
                                    className={
                                      "setvaluee" +
                                      (setvalue == 0 ? "hidden" : "show")
                                    }
                                    type="text"
                                    name="fname"
                                    value={dummystate.fname}
                                    onChange={handleClick}
                                  ></input>
                                </div>
                                <div className="form-group">
                                  <input
                                    className={
                                      "setvaluee" +
                                      (setvalue == 0 ? "hidden" : "show")
                                    }
                                    type="text"
                                    name="lname"
                                    value={dummystate.lname}
                                    onChange={handleClick}
                                  ></input>
                                </div>

                                <div className="form-group">
                                  <input
                                    className={
                                      "setvaluee" +
                                      (setvalue == 0 ? "hidden" : "show")
                                    }
                                    type="text"
                                    name="dob"
                                    value={dummystate.dob}
                                    onChange={handleClick}
                                  ></input>
                                </div>
                                <div className="form-group">
                                  <input
                                    className={
                                      "setvaluee" +
                                      (setvalue == 0 ? "hidden" : "show")
                                    }
                                    type="text"
                                    name="email"
                                    value={dummystate.email}
                                    onChange={handleClick}
                                  ></input>
                                </div>
                                <div className="form-group">
                                  <input
                                    className={
                                      "setvaluee" +
                                      (setvalue == 0 ? "hidden" : "show")
                                    }
                                    type="text"
                                    name="cellphone"
                                    value={dummystate.cellphone}
                                    onChange={handleClick}
                                  ></input>
                                </div>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {agentrecord.dob}
                                </p>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {agentrecord.email}
                                </p>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {agentrecord.cellphone}
                                </p>
                              </div>
                              <div className="col-sm-6">
                                <h5>
                                  Partner Information
                                  <a href="javascript:void(0)">
                                    <i
                                      onClick={greetUser}
                                      className="fa-solid fa-pen"
                                    ></i>
                                  </a>
                                  <div className="form-check form-switch me-2">
                                    {/* <Switch onColor="#3d9ddd"
                                                                        onHandleColor="#fff" height={20}
                                                                        width={48} onChange={handleChangepartner} className="react-switch" checked={checkedpartner} /> */}
                                    {/* <Switch onChange={handleChangepartner} className="react-switch" checked={agentrecord.partnerstatus == 'true' ? "checked" : checkedpartner} /> */}
                                  </div>
                                </h5>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {dummystate1.partnerfname &&
                                  dummystate1.partnerfname != "null"
                                    ? dummystate1.partnerfname
                                    : ""}{" "}
                                  {dummystate1.partnerlname &&
                                  dummystate1.partnerlname != "null"
                                    ? dummystate1.partnerlname
                                    : ""}{" "}
                                </p>
                                <div className="form-group">
                                  <div className="form-group">
                                    <input
                                      className={
                                        "setvaluee" +
                                        (setvalue == 0 ? "hidden" : "show")
                                      }
                                      type="text"
                                      name="partnerfname"
                                      value={
                                        dummystate1.partnerfname &&
                                        dummystate1.partnerfname != "null"
                                          ? dummystate1.partnerfname
                                          : ""
                                      }
                                      onChange={handleClick1}
                                    ></input>
                                  </div>
                                  <div className="form-group">
                                    <input
                                      className={
                                        "setvaluee" +
                                        (setvalue == 0 ? "hidden" : "show")
                                      }
                                      type="text"
                                      name="partnerlname"
                                      value={
                                        dummystate1.partnerlname &&
                                        dummystate1.partnerlname != "null"
                                          ? dummystate1.partnerlname
                                          : ""
                                      }
                                      onChange={handleClick1}
                                    ></input>
                                  </div>
                                  <div className="form-group">
                                    <input
                                      className={
                                        "setvaluee" +
                                        (setvalue == 0 ? "hidden" : "show")
                                      }
                                      type="text"
                                      name="partnerdob"
                                      value={
                                        dummystate1.partnerdob &&
                                        dummystate1.partnerdob != "null"
                                          ? dummystate1.partnerdob
                                          : ""
                                      }
                                      onChange={handleClick1}
                                    ></input>
                                  </div>
                                  <div className="form-group">
                                    <input
                                      className={
                                        "setvaluee" +
                                        (setvalue == 0 ? "hidden" : "show")
                                      }
                                      type="text"
                                      name="partneremail"
                                      value={
                                        dummystate1.partneremail &&
                                        dummystate1.partneremail != "null"
                                          ? dummystate1.partneremail
                                          : ""
                                      }
                                      onChange={handleClick1}
                                    ></input>
                                  </div>
                                  <div className="form-group">
                                    <input
                                      className={
                                        "setvaluee" +
                                        (setvalue == 0 ? "hidden" : "show")
                                      }
                                      type="text"
                                      name="partnercellphone"
                                      value={
                                        dummystate1.partnercellphone &&
                                        dummystate1.partnercellphone != "null"
                                          ? dummystate1.partnercellphone
                                          : ""
                                      }
                                      onChange={handleClick1}
                                    ></input>
                                  </div>
                                </div>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {dummystate1.partnerdob &&
                                  dummystate1.partnerdob != "null"
                                    ? dummystate1.partnerdob
                                    : ""}
                                </p>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {dummystate1.partneremail &&
                                  dummystate1.partneremail != "null"
                                    ? dummystate1.partneremail
                                    : ""}
                                </p>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {dummystate1.partnercellphone &&
                                  dummystate1.partnercellphone != "null"
                                    ? dummystate1.partnercellphone
                                    : ""}
                                </p>
                              </div>
                            </div>

                            {successmessage ? (
                              <h6 className="profilesettingreview ps-3">
                                {successmessage}
                              </h6>
                            ) : (
                              ""
                            )}
                            <button
                              className={
                                "btn setvaluee" +
                                (setvalue == 0 ? "hidden" : "show")
                              }
                            >
                              Submit
                            </button>
                          </form>
                          <ul className="ads">
                            <li>
                              <b>Address : </b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue1 == 1 ? "hidden" : "show")
                                }
                              >
                                {dummystate.address}
                              </span>{" "}
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue1 == 0 ? "hidden" : "show")
                                }
                              >
                                {/* input section start for address */}
                                <form onSubmit={form2}>
                                  <input
                                    type="text"
                                    placeholder="Enter Address"
                                    name="address"
                                    onChange={(e) => handleClick(e)}
                                    value={dummystate.address}
                                  ></input>
                                  <button
                                    onClick={() =>
                                      updateaddress(
                                        "address",
                                        dummystate.address
                                      )
                                    }
                                    type="submit"
                                    className="btn"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </span>
                              {successmessage1 ? (
                                <span className="profilesettingreview ps-3">
                                  {successmessage1}
                                </span>
                              ) : (
                                ""
                              )}
                              <a href="javascript:void(0)">
                                <img
                                  onClick={greetUser1}
                                  src="/../asset/images/penet.png"
                                />
                              </a>
                            </li>

                            {/* <input className="form-control" type="text" placeholder="full name" name="name" value={userdataprofile.name} onChange={inputsHandler} */}

                            <li>
                              <b>Purchased : </b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue2 == 1 ? "hidden" : "show")
                                }
                              >
                                {dummystate.whenbuy}{" "}
                              </span>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue2 == 0 ? "hidden" : "show")
                                }
                              >
                                <form onSubmit={form3}>
                                  <input
                                    type="date"
                                    name="whenbuy"
                                    onChange={(e) => handleClick(e)}
                                    value={dummystate.whenbuy}
                                  ></input>
                                  <button
                                    onClick={() =>
                                      updateaddress(
                                        "whenbuy",
                                        dummystate.whenbuy
                                      )
                                    }
                                    type="submit"
                                    className="btn"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </span>
                              {successmessage2 ? (
                                <span className="profilesettingreview ps-3">
                                  {successmessage2}
                                </span>
                              ) : (
                                ""
                              )}
                              <a href="javascript:void(0)">
                                <img
                                  onClick={greetUser2}
                                  src="/../asset/images/penet.png"
                                />
                              </a>
                            </li>

                            <li>
                              <b>Purchased Price : </b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue3 == 1 ? "hidden" : "show")
                                }
                              >
                                {dummystate.saleprice}{" "}
                              </span>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue3 == 0 ? "hidden" : "show")
                                }
                              >
                                <form onSubmit={form4}>
                                  <input
                                    type="text"
                                    name="saleprice"
                                    onChange={(e) => handleClick(e)}
                                    value={dummystate.saleprice}
                                  ></input>
                                  <button
                                    onClick={() =>
                                      updateaddress(
                                        "saleprice",
                                        dummystate.saleprice
                                      )
                                    }
                                    type="submit"
                                    className="btn"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </span>

                              {successmessage3 ? (
                                <span className="profilesettingreview ps-3">
                                  {successmessage3}
                                </span>
                              ) : (
                                ""
                              )}
                              <a href="javascript:void(0)">
                                <img
                                  onClick={greetUser3}
                                  src="/../asset/images/penet.png"
                                />
                              </a>
                            </li>
                          </ul>
                          <div className="adsvalue">
                            <h5>Home Value</h5>
                            <ul>
                              <li>
                                <span
                                  className={
                                    "setvaluee" +
                                    (setvalue77 == 1 ? "hidden" : "show")
                                  }
                                >
                                  ${dummystate.homevalue}
                                </span>
                                <a
                                  onClick={() =>
                                    greetUser70(
                                      dummystate.id,
                                      dummystate.homevalue
                                    )
                                  }
                                  href="javascript:void(0)"
                                >
                                  <img src="/../asset/images/penet.png" /> Editt
                                </a>

                                <span
                                  className={
                                    "w-100 setvaluee" +
                                    (setvalue77 == 0 ? "hidden" : "show")
                                  }
                                >
                                  <form onSubmit={form50}>
                                    <div className="row">
                                      <div className="col-10">
                                        <div className="row">
                                          <div className="col-4">
                                            <label>Value</label>
                                            <input
                                              type="text"
                                              name="value"
                                              onChange={(e) => handleClick(e)}
                                              value={homevaluenext.value}
                                            ></input>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-2">
                                        <button
                                          onClick={() =>
                                            updateaddress(
                                              "homevalue",
                                              "homevalue"
                                            )
                                          }
                                          type="submit"
                                          className="btn"
                                        >
                                          Updateee
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </span>
                              </li>

                              {successmessage4 ? (
                                <span className="profilesettingreview ps-3">
                                  {successmessage4}
                                </span>
                              ) : (
                                ""
                              )}

                              {homevaluesrecord
                                ? homevaluesrecord.map((items, i) => {
                                    return (
                                      <>
                                        <li
                                          className={
                                            "setvaluee" +
                                            (setvalue7 == 1 ? "hidden" : "show")
                                          }
                                        >
                                          ${items.homevalue} | {items.date_from}{" "}
                                        </li>
                                        <li>
                                          <a
                                            onClick={() =>
                                              greetUser7(
                                                i,
                                                items.id,
                                                items.homevalue,
                                                items.date_from,
                                                items.date_to
                                              )
                                            }
                                            href="javascript:void(0)"
                                          >
                                            <img src="/../asset/images/penet.png" />{" "}
                                            Editty
                                          </a>

                                          {/* <a onClick={() => greetUser7(items.id, items.homevalue, items.date_from, items.date_to)} href="javascript:void(0)"><img src="/../asset/images/penet.png" /> Editt</a> */}

                                          <a
                                            onClick={() =>
                                              greetUser7del(items.id)
                                            }
                                            href="javascript:void(0)"
                                          >
                                            <img src="/../asset/images/delete.png" />{" "}
                                            Remove
                                          </a>
                                        </li>
                                      </>
                                    );
                                  })
                                : ""}
                              <span
                                className={
                                  "w-100 setvaluee" +
                                  (setvalue7 == 0 ? "hidden" : "show")
                                }
                              >
                                <form onSubmit={form5}>
                                  <input
                                    type="hidden"
                                    name="id"
                                    value={homevaluenext.id}
                                  ></input>
                                  <div className="row">
                                    <div className="col-10">
                                      <div className="row">
                                        <div className="col-4">
                                          <label>Value</label>
                                          <input
                                            type="text"
                                            name="value"
                                            onChange={(e) => handleClick(e)}
                                            value={homevaluenext.value}
                                          ></input>
                                        </div>

                                        {homevaluenext.date_from ? (
                                          <div className="col-4">
                                            <label>Date From</label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              name="date_from"
                                              onChange={(e) => handleClick(e)}
                                              value={homevaluenext.date_from}
                                            ></input>
                                          </div>
                                        ) : (
                                          ""
                                        )}

                                        {/* <div className="col-4"><label>Date To</label>
                                                                                    <input type="date" className='form-control' onChange={(e) => handleClick(e)}  name="date_to" value={homevaluenext.date_to} ></input>
                                                                        </div> */}
                                      </div>
                                    </div>
                                    <div className="col-2">
                                      <button
                                        onClick={() =>
                                          updateaddress(
                                            "homevalue",
                                            "homevalue"
                                          )
                                        }
                                        type="submit"
                                        className="btn"
                                      >
                                        Updatee
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </span>
                            </ul>

                            <a
                              onClick={greetUser12}
                              className="addnew"
                              href="javascript:void(0)"
                            >
                              Add New
                            </a>
                            <span
                              className={
                                "w-100 setvaluee" +
                                (setvalue70 == 1 ? "hidden" : "show")
                              }
                            >
                              {" "}
                            </span>
                            <span
                              className={
                                "w-100 setvaluee" +
                                (setvalue70 == 0 ? "hidden" : "show")
                              }
                            >
                              <form onSubmit={form70}>
                                <div className="row">
                                  <div className="col-10">
                                    <div className="row">
                                      <div className="col-4">
                                        <label>Value</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="homevalueothers"
                                          value={dummystate.homevalueothers}
                                          onChange={(e) => handleClick(e)}
                                        ></input>
                                      </div>
                                      <div className="col-4">
                                        <label>Date From</label>
                                        <input
                                          type="date"
                                          className="form-control"
                                          name="homevalueothersdatefrom"
                                          value={
                                            dummystate.homevalueothersdatefrom
                                          }
                                          onChange={(e) => handleClick(e)}
                                        ></input>
                                      </div>
                                      {/* <div className="col-4"><label>Date To</label>
                                                                            <input type="date" className='form-control' name="homevalueothersdateto" value={dummystate.homevalueothersdateto} onChange={(e) => handleClick(e)}></input>
                                                                        </div> */}
                                    </div>
                                  </div>

                                  <div className="col-2">
                                    <button
                                      onClick={() =>
                                        updateaddress("homevalue", "homevalue")
                                      }
                                      type="submit"
                                      className="btn"
                                    >
                                      Submitt
                                    </button>
                                  </div>
                                </div>
                              </form>

                              {/* <div className="row">
                                                            <div className="col-6"><label>Value</label><input type="text" className="form-control" placeholder='Enter value'></input></div>
                                                            <div className="col-6"><label>Date</label><input type="date" className="form-control" placeholder='Enter Date'></input></div>
                                                        </div> */}
                            </span>
                          </div>
                          <ul className="ads">
                            <li>
                              <b>Rental Value : </b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue4 == 1 ? "hidden" : "show")
                                }
                              >
                                $ {dummystate.rental_value}
                              </span>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue4 == 0 ? "hidden" : "show")
                                }
                              >
                                <form onSubmit={form6}>
                                  <input
                                    type="number"
                                    name="rental_value"
                                    onChange={(e) => handleClick(e)}
                                    value={dummystate.rental_value}
                                  ></input>
                                  <button
                                    onClick={() =>
                                      updateaddress(
                                        "rentalvalue",
                                        "agentrecordrentalvalue"
                                      )
                                    }
                                    type="submit"
                                    className="btn"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </span>
                              {successmessage5 ? (
                                <span className="profilesettingreview ps-3">
                                  {successmessage5}
                                </span>
                              ) : (
                                ""
                              )}
                              <a href="javascript:void(0)">
                                <img
                                  onClick={greetUser4}
                                  src="/../asset/images/penet.png"
                                />
                              </a>
                            </li>

                            <li>
                              <b>Airbnb Value : </b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue5 == 1 ? "hidden" : "show")
                                }
                              >
                                ${dummystate.Airbnb}{" "}
                              </span>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue5 == 0 ? "hidden" : "show")
                                }
                              >
                                <form onSubmit={form7}>
                                  <input
                                    type="text"
                                    name="Airbnb"
                                    onChange={(e) => handleClick(e)}
                                    value={dummystate.Airbnb}
                                  ></input>
                                  <button
                                    onClick={() =>
                                      updateaddress(
                                        "airbnbvalue",
                                        "agentrecordairbnbvalue"
                                      )
                                    }
                                    type="submit"
                                    className="btn"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </span>
                              {successmessage6 ? (
                                <span className="profilesettingreview ps-3">
                                  {successmessage6}
                                </span>
                              ) : (
                                ""
                              )}
                              <img
                                style={{ float: "right" }}
                                onClick={greetUser5}
                                src="/../asset/images/addmore1.png"
                              ></img>
                              {/* <a href="#"><i onClick={greetUser5} className="fa-solid fa-pen"></i></a> */}
                            </li>

                            <li>
                              <b>Loan Value : </b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue6 == 1 ? "hidden" : "show")
                                }
                              >
                                {dummystate.loanpercentage != "null"
                                  ? dummystate.loanpercentage
                                  : ""}
                                %{" "}
                                {dummystate.downpaymentvalue != "null"
                                  ? dummystate.downpaymentvalue
                                  : ""}{" "}
                                $
                                {dummystate.loanamount != "null"
                                  ? dummystate.loanamount
                                  : ""}{" "}
                                At{" "}
                                {dummystate.apr_rate != "null"
                                  ? dummystate.apr_rate
                                  : ""}
                                % APR $
                                {dummystate.monthly_Mortage_Insurance != "null"
                                  ? dummystate.monthly_Mortage_Insurance
                                  : ""}{" "}
                              </span>
                              <a
                                href="javascript:void(0)"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalforloan"
                              >
                                <img
                                  onClick={greetUser6}
                                  src="/../asset/images/penet.png"
                                />
                              </a>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue6 == 0 ? "hidden" : "show")
                                }
                              >
                                <form className="row" onSubmit={form8}>
                                  <div className="col-md-6 col-lg-3">
                                    <label>Loan Amount: </label>
                                    <input
                                      type="text"
                                      name="loanamount"
                                      onChange={(e) => handleClick(e)}
                                      value={
                                        dummystate.loanamount != "null"
                                          ? dummystate.loanamount
                                          : ""
                                      }
                                    ></input>
                                  </div>

                                  <div className="col-md-6 col-lg-3">
                                    <label>Mortage Insurance: </label>
                                    <input
                                      type="text"
                                      name="monthly_Mortage_Insurance"
                                      onChange={(e) => handleClick(e)}
                                      value={
                                        dummystate.monthly_Mortage_Insurance !=
                                        "null"
                                          ? dummystate.monthly_Mortage_Insurance
                                          : ""
                                      }
                                    ></input>
                                  </div>
                                  <div className="col-md-6 col-lg-3">
                                    <label>APR RATE: </label>
                                    <input
                                      type="text"
                                      name="apr_rate"
                                      onChange={(e) => handleClick(e)}
                                      value={
                                        dummystate.apr_rate != "null"
                                          ? dummystate.apr_rate
                                          : ""
                                      }
                                    ></input>
                                  </div>
                                  <div className="col-md-6 col-lg-3">
                                    <button
                                      onClick={() =>
                                        updateaddress(
                                          "loanamount",
                                          "agentrecordloanvalue"
                                        )
                                      }
                                      type="submit"
                                      className="btn btn22 w-100"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </form>
                              </span>
                              {successmessage7 ? (
                                <span className="profilesettingreview ps-3">
                                  {successmessage7}
                                </span>
                              ) : (
                                ""
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <Link
                          className="mainbtn"
                          to={"/agent/checkmaintainitems/" + clientid}
                        >
                          <img
                            src="/../asset/images/maintb_icon.png"
                            alt="icon"
                          />{" "}
                          Maintenance Items
                        </Link>
                        <div className="maindiv">
                          <h5>
                            {" "}
                            <img
                              src="/../asset/images/it1_old.png"
                              alt="icon"
                            />{" "}
                            Lender Details{" "}
                            <div className="form-check form-switch">
                              <Switch
                                onColor="#3d9ddd"
                                onHandleColor="#fff"
                                height={20}
                                width={48}
                                onChange={handleChangelender}
                                className="react-switch"
                                checked={checkedlender}
                              />
                              {/* <Switch onChange={handleChangelender} className="react-switch" checked={agentrecord.lender_status == 'true' ? agentrecord.lender_status : checkedlender}  /> */}
                            </div>
                            <a href="javascript:void(0)">
                              <img
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalformaintainitem"
                                onClick={greetUser8}
                                src="/../asset/images/penet.png"
                              />
                            </a>
                          </h5>
                          <form onSubmit={lenderdetails}>
                            <p>
                              <b>Name :</b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue8 == 1 ? "hidden" : "show")
                                }
                              >
                                {lenderrecord.name}
                              </span>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue8 == 0 ? "hidden" : "show")
                                }
                              >
                                <input
                                  type="text"
                                  name="lendername"
                                  onChange={lenderclick}
                                  value={lenderrecord.name}
                                ></input>
                              </span>
                            </p>
                            <p>
                              <b>Email :</b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue8 == 1 ? "hidden" : "show")
                                }
                              >
                                {lenderrecord.email}
                              </span>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue8 == 0 ? "hidden" : "show")
                                }
                              >
                                <input
                                  type="text"
                                  name="lenderemail"
                                  onChange={lenderclick}
                                  value={lenderrecord.email}
                                ></input>
                              </span>
                            </p>
                            <button
                              className={
                                "btn setvaluee" +
                                (setvalue8 == 0 ? "hidden" : "show")
                              }
                            >
                              Submit
                            </button>
                          </form>
                          {successmessage8 ? (
                            <span className="profilesettingreview ps-3">
                              {successmessage8}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="maindiv">
                          <h5>
                            <img src="/../asset/images/it2.png" alt="icon" />{" "}
                            Homeinspector Details
                            <div className="form-check form-switch">
                              <Switch
                                onColor="#3d9ddd"
                                onHandleColor="#fff"
                                height={20}
                                width={48}
                                onChange={handleChangeinspector}
                                className="react-switch"
                                checked={checkedinspector}
                              />

                              {/* <Switch onChange={handleChangeinspector} className="react-switch" checked={agentrecord.inspector_status == 'true' ? agentrecord.inspector_status : checkedinspector} /> */}
                            </div>
                            <a href="javascript:void(0)">
                              <img
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalforinspector"
                                onClick={greetUser9}
                                src="/../asset/images/penet.png"
                              />
                            </a>
                          </h5>
                          <p>
                            <b>Name :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 1 ? "hidden" : "show")
                              }
                            >
                              {inspectorrecord.name &&
                              inspectorrecord.name != ""
                                ? inspectorrecord.name
                                : ""}{" "}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                type="text"
                                name="name"
                                onChange={inspectorclick}
                                value={
                                  inspectorrecord.name
                                    ? inspectorrecord.name
                                    : ""
                                }
                              ></input>
                            </span>
                          </p>
                          <p>
                            <b>Phone :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 1 ? "hidden" : "show")
                              }
                            >
                              {inspectorrecord.cellnumber
                                ? inspectorrecord.cellnumber
                                : ""}{" "}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                type="text"
                                name="cellnumber"
                                onChange={inspectorclick}
                                value={
                                  inspectorrecord.cellnumber
                                    ? inspectorrecord.cellnumber
                                    : ""
                                }
                              ></input>
                            </span>
                          </p>
                          <p>
                            <b>Email :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 1 ? "hidden" : "show")
                              }
                            >
                              {inspectorrecord.email
                                ? inspectorrecord.email
                                : ""}{" "}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                type="text"
                                name="email"
                                onChange={inspectorclick}
                                value={
                                  inspectorrecord.email
                                    ? inspectorrecord.email
                                    : ""
                                }
                              ></input>
                            </span>
                          </p>
                          <p>
                            <b>Business :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 1 ? "hidden" : "show")
                              }
                            >
                              {" "}
                              {inspectorrecord.companyname
                                ? inspectorrecord.companyname
                                : ""}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                type="text"
                                name="companyname"
                                onChange={inspectorclick}
                                value={
                                  inspectorrecord.companyname
                                    ? inspectorrecord.companyname
                                    : ""
                                }
                              ></input>
                            </span>
                          </p>

                          <button
                            className={
                              "btn setvaluee" +
                              (setvalue9 == 0 ? "hidden" : "show")
                            }
                          >
                            Submit
                          </button>
                        </div>

                        <div className="maindiv">
                          <h5>
                            <img src="/../asset/images/it1.png" alt="icon" />{" "}
                            Title Company Details
                            <div className="form-check form-switch">
                              <Switch
                                onColor="#3d9ddd"
                                onHandleColor="#fff"
                                height={20}
                                width={48}
                                onChange={handleChangetitlecompany}
                                className="react-switch"
                                checked={checkedcompany}
                              />
                            </div>
                            <a href="javascript:void(0)">
                              <img
                                onClick={greetUser10}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalfortc"
                                src="/../asset/images/penet.png"
                              />
                            </a>
                          </h5>
                          <p>
                            <b>Name :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 1 ? "hidden" : "show")
                              }
                            >
                              {titlecompanyrecord.name &&
                              titlecompanyrecord.name != ""
                                ? titlecompanyrecord.name
                                : ""}{" "}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                onChange={titlecompanyclick}
                                type="text"
                                name="titlename"
                                value={titlecompanydata.titlename}
                              ></input>
                            </span>
                          </p>
                          <p>
                            <b>Phone :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 1 ? "hidden" : "show")
                              }
                            >
                              {" "}
                              {titlecompanyrecord.cellnumber}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                type="text"
                                name="titlephone"
                                onChange={titlecompanyclick}
                                value={titlecompanydata.titlephone}
                              ></input>
                            </span>
                          </p>
                          <p>
                            <b>Email :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 1 ? "hidden" : "show")
                              }
                            >
                              {titlecompanyrecord.email}{" "}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                type="text"
                                name="titleemail"
                                onChange={titlecompanyclick}
                                value={titlecompanydata.titleemail}
                              ></input>
                            </span>
                          </p>
                          <p>
                            <b>Business :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 1 ? "hidden" : "show")
                              }
                            >
                              {titlecompanyrecord.companyname}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                onChange={titlecompanyclick}
                                name="titlecompany"
                                type="text"
                                value={titlecompanydata.titlecompany}
                              ></input>
                            </span>
                          </p>
                          <button
                            className={
                              "btn setvaluee" +
                              (setvalue10 == 0 ? "hidden" : "show")
                            }
                          >
                            Submit
                          </button>
                        </div>

                        <div className="maindiv">
                          <form onSubmit={adduploadmoredocs}>
                            <h5>
                              <img src="/../asset/images/it3.png" alt="icon" />{" "}
                              Documents
                              {/* <a href="#"><i onClick={greetUser11} className="fa-solid fa-pen"></i></a> */}
                              <img
                                style={{ float: "right", height: "auto" }}
                                onClick={greetUser11}
                                src="/../asset/images/addmore1.png"
                              ></img>
                            </h5>

                            <input
                              type="file"
                              accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              className={
                                "setvaluee" +
                                (setvalue11 == 0 ? "hidden" : "show")
                              }
                              name="document1"
                              onChange={handleClick}
                            ></input>
                            <button
                              className={
                                "btn setvaluee" +
                                (setvalue11 == 0 ? "hidden" : "show")
                              }
                            >
                              Submit
                            </button>
                          </form>
                          {messageforuploaddocs ? (
                            <span className="profilesettingreview ps-3">
                              {messageforuploaddocs}
                            </span>
                          ) : (
                            ""
                          )}
                          {dataforuploaddata.length > 0
                            ? dataforuploaddata.map((items, i) => {
                                return (
                                  <p className="p-0">
                                    <span
                                      className={
                                        "setvaluee" +
                                        (setvalue11 == 1 ? "hidden" : "show")
                                      }
                                    >
                                      <a href="#" onClick={imgdownload}>
                                        {items}
                                      </a>
                                    </span>
                                    <span
                                      className={
                                        "setvaluee" +
                                        (setvalue11 == 0 ? "hidden" : "show")
                                      }
                                    ></span>
                                  </p>
                                );
                              })
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h6 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <b>Communication</b>{" "}
                  <img src="/../asset/images/aro_a.png" alt="icon" />
                </button>
              </h6>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-sm-4 col-lg-3">
                      <div className="commun">
                        <h5>
                          {agentrecord.fname} {agentrecord.lname}
                        </h5>
                        <p>{agentrecord.dob}</p>
                        <p>
                          <img src="/../asset/images/eemml.png" alt="icon" />{" "}
                          {agentrecord.email}
                        </p>
                        <p>
                          <img src="/../asset/images/eemml2.png" alt="icon" />{" "}
                          {agentrecord.cellphone}
                        </p>
                        <ul>
                          <li>
                            <input type="radio" name="name" /> Email
                          </li>
                          <li>
                            <input type="radio" name="name" /> Text
                          </li>
                          <li>
                            <input type="radio" name="name" /> Both
                          </li>
                        </ul>
                        <p className="send">Send me text for birthday</p>
                      </div>
                    </div>
                    {/* <div className="col-sm-4 col-lg-3">
                                        <div className="commun">
                                            <h5>Punkaj Tripathi</h5>
                                            <p>07 March 1976</p>
                                            <p><img src="/../asset/images/eemml.png" alt="icon" /> punkajtripathi@gmail.com</p>
                                            <p><img src="/../asset/images/eemml2.png" alt="icon" /> +18765432100</p>
                                            <ul>
                                                <li><input type="radio" name="name"/> Email</li>
                                                <li><input type="radio" name="name"/> Text</li>
                                                <li><input type="radio" name="name"/> Both</li>
                                            </ul>
                                            <p className="send">Send me text for birthday</p>
                                        </div>
                                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h6 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <b>Alerts Settings</b>{" "}
                  <img src="/../asset/images/aro_a.png" alt="icon" />
                </button>
              </h6>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <table className="tables">
                    <tr>
                      <th>Mail</th>
                      <th>Text</th>
                      <th>
                        <span>All alert setting lorem ipusum</span>
                      </th>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h6 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  <b>Request and history</b>{" "}
                  <img src="/../asset/images/aro_a.png" alt="icon" />
                </button>
              </h6>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="request_set">
                        <h5>
                          <img src="/../asset/images/Request1.png" alt="icon" />{" "}
                          Request & History
                        </h5>
                        <h6>Chients requested your action</h6>
                        <ul>
                          <li>
                            Mark requested CMA for 123 Maple{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested CMA for 123 Maple{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested CMA for 123 Maple{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested CMA for 123 Maple{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested CMA for 123 Maple{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested CMA for 123 Maple{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="request_set">
                        <h5>
                          <img src="/../asset/images/Request2.png" alt="icon" />{" "}
                          See what your clients are doing
                        </h5>
                        <h6>See what your clients are doing</h6>
                        <ul>
                          <li>
                            Mark requested lemder for quote{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested lemder for quote{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested lemder for quote{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested lemder for quote{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested lemder for quote{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested lemder for quote{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* modal end */}

      {/* modal start for lender */}
      <div
        className="modal fade"
        id="exampleModalformaintainitem"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog Edi_Pricing mt-5">
          <form onSubmit={submithomelender}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Pick HomeLender
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <select
                  onChange={handleChange}
                  name="lendernamefromoption"
                  className="form-control"
                >
                  <option value="" selected>
                    Pick Your Home Lender
                  </option>
                  {dataforLenders.length > 0
                    ? dataforLenders.map((dataforLenders) => (
                        <option
                          id={dataforLenders.id}
                          value={dataforLenders.id}
                          className="user"
                        >
                          {dataforLenders.name}
                        </option>
                      ))
                    : ""}
                </select>
                <h6>Or</h6>
                <label>Add New Lender</label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lender name"
                    name="lendername"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email*"
                    name="lenderemail"
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="form-group">
                                <input type="password" className='form-control' placeholder="Password*" name='lenderpassword' onChange={handleChange} />
                            </div> */}

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cell phone"
                    name="lendercellphone"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company name"
                    name="lendercompany"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer pt-1">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModalforloan"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog Edi_Pricing loanmodal modal-lg mt-5">
          <form onSubmit={form8}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Loan Value
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                {forloanvalidation ? (
                  <h3 className="loanerror">{forloanvalidation}</h3>
                ) : (
                  ""
                )}

                <div className="set form-group">
                  <label>What is the Loan Amount:</label>

                  <input
                    type="number"
                    name="loanamount"
                    className="form-control"
                    value={
                      dummystate.loanamount
                        ? dummystate.loanamount
                        : state2.loanamount
                    }
                    onChange={(e) => handleClick(e)}
                  />
                </div>
                <div className="set form-group">
                  <label>How many years if the Loan:</label>
                  <input
                    type="number"
                    name="loanyear"
                    className="form-control"
                    value={
                      dummystate.loanyear
                        ? dummystate.loanyear
                        : state2.loanyear
                    }
                    onChange={(e) => handleClick(e)}
                  />
                </div>
                <div className="set form-group">
                  <label>Whats is APR:</label>
                  <input
                    type="number"
                    name="apr_rate"
                    className="form-control"
                    value={
                      dummystate.apr_rate
                        ? dummystate.apr_rate
                        : state2.apr_rate
                    }
                    onChange={(e) => handleClick(e)}
                  />
                </div>
                <div className="set form-group">
                  <label>Is there Mortage Insurance (PMI or MI):</label>
                  <input
                    type="radio"
                    name="loanpmi"
                    id="mortageinsurance"
                    value="yes"
                    className="qualitypmi clearformhide"
                    onChange={(e) => handleClick(e)}
                  />
                  <span className="radiobtn">
                    <span>Yes</span>
                  </span>
                  <input
                    type="radio"
                    value="no"
                    name="loanpmi"
                    className="qualitypmi clearformhide"
                    onChange={(e) => handleClick(e)}
                  />
                  <span className="radiobtn">
                    <span>No</span>
                  </span>
                </div>
                <div className="showhide">
                  <div className="set form-group">
                    <label>What is the monthly Mortage Insurance:</label>
                    <input
                      type="number"
                      name="monthly_Mortage_Insurance"
                      className="clearformhide form-control"
                      value={
                        dummystate.monthly_Mortage_Insurance
                          ? dummystate.monthly_Mortage_Insurance
                          : state2.monthly_Mortage_Insurance
                      }
                      onChange={(e) => handleClick(e)}
                    />
                  </div>

                  <div className="set form-group">
                    <label>When is the Mortage Insurance removed?</label>
                    <input
                      type="radio"
                      name="mortageinsuranceremoved"
                      className="qualitypmi clearformhide"
                      onChange={(e) => handleClick(e)}
                      value="never"
                    />
                    <span className="radiobtn">
                      <span>Never removed, its for the life of the loan</span>
                    </span>
                    <br />
                    <input
                      type="radio"
                      name="mortageinsuranceremoved"
                      className="qualitypmi clearformhide"
                      value="equity"
                      onChange={(e) => handleClick(e)}
                    />

                    <span className="radiobtn">
                      {" "}
                      {endequitydate}
                      <span>
                        After
                        <input
                          className="form-control"
                          onChange={(e) => handleClick(e)}
                          style={{ width: "80px" }}
                          type="text"
                          name={
                            forreadonly || forreadonly2 == 1
                              ? ""
                              : "percentageequity"
                          }
                          value={
                            forreadonly || forreadonly2
                              ? ""
                              : dummystate.percentageequity
                          }
                        ></input>{" "}
                        % Equity is reached
                      </span>
                    </span>
                    <br />
                    <input
                      type="radio"
                      name="mortageinsuranceremoved"
                      className="qualitypmi clearformhide"
                      value="years"
                      onChange={(e) => handleClick(e)}
                    />

                    <span className="radiobtn">
                      <span>
                        After{" "}
                        <input
                          style={{ width: "80px" }}
                          type="text"
                          name={
                            forreadonly || forreadonly1 == 1
                              ? ""
                              : "moretageyearsremoved"
                          }
                          value={
                            forreadonly || forreadonly1
                              ? ""
                              : dummystate.moretageyearsremoved
                          }
                          onChange={(e) => handleClick(e)}
                          className="form-control clearformhide"
                        ></input>{" "}
                        Years
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-footer pt-1">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss={
                    dummystate.loanamount == "" ||
                    dummystate.loanyear == "" ||
                    dummystate.apr_rate == "" ||
                    dummystate.monthly_Mortage_Insurance == ""
                      ? ""
                      : "modal"
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* modal end for lender */}
      {/* modal start for homeinspector */}

      <div
        className="modal fade"
        id="exampleModalforinspector"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog Edi_Pricing mt-5">
          <form onSubmit={submithomeinspector}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Pick Homeinspector
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <select
                  onChange={handleChangehi}
                  name="inspectorfromoption"
                  className="form-control"
                >
                  <option value="" selected>
                    Pick Your Home Inspector
                  </option>
                  {dataforHomeinspector.length > 0
                    ? dataforHomeinspector.map((dataforHomeinspector) => (
                        <option
                          id={dataforHomeinspector.id}
                          value={dataforHomeinspector.id}
                          className="user"
                        >
                          {dataforHomeinspector.name}
                        </option>
                      ))
                    : ""}
                </select>
                <h6>Or</h6>
                <label>Add New Inspector</label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Inspector name"
                    name="inspectorname"
                    onChange={handleChangehi}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email*"
                    name="inspectoremail"
                    onChange={handleChangehi}
                  />
                </div>
                {/* <div className="form-group">
                                <input type="password" className='form-control' placeholder="Password*" name='inspectorpassword' onChange={handleChangehi} />
                            </div> */}

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cell phone"
                    name="inspectorcellphone"
                    onChange={handleChangehi}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company name"
                    name="inspectorcompany"
                    onChange={handleChangehi}
                  />
                </div>
              </div>
              <div className="modal-footer pt-1">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* modal end for homeinspector */}
      {/* modal start for tc */}

      <div
        className="modal fade"
        id="exampleModalfortc"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog Edi_Pricing mt-5">
          <form onSubmit={submittitlecompany}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Pick Title Company
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <select
                  onChange={handleChangetc}
                  name="titlefromoption"
                  className="form-control"
                >
                  <option value="" selected>
                    Pick Your Title Company
                  </option>
                  {dataforTitleCompany.length > 0
                    ? dataforTitleCompany.map((dataforTitleCompany) => (
                        <option
                          id={dataforTitleCompany.id}
                          value={dataforTitleCompany.id}
                          className="user"
                        >
                          {dataforTitleCompany.name}
                        </option>
                      ))
                    : ""}
                </select>
                <h6>Or</h6>
                <label>Add New Title Company</label>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title Company name"
                    name="titlename"
                    onChange={handleChangetc}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email*"
                    name="titleemail"
                    onChange={handleChangetc}
                  />
                </div>
                {/* <div className="form-group">
                                <input type="password" className='form-control' placeholder="Password*" name='titlepassword' onChange={handleChangetc} />
                            </div> */}

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cell phone"
                    name="titlecellphone"
                    onChange={handleChangetc}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company name"
                    name="titlecompanyname"
                    onChange={handleChangetc}
                  />
                </div>
              </div>
              <div className="modal-footer pt-1">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* modal end for tc */}
      <Footer />
    </>
  );
}

export default Reviewclient;
