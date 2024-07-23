import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const fetchPropertiesDocs = createAsyncThunk(
  "PropertyDoc/fetch",
  async (_, { getState, rejectWithValue }) => {
    const api = createApi();
    let formdata = new FormData();
    // const { propertyList } = getState();
    // console.log(propertyList);
    // let ids = [];
    // for (let property of propertyList.data) {
    //   console.log(property);
    //   ids.push(property.id);
    // }
    // formdata.append("ids", ids);
    formdata.append("authid", localStorage.getItem("token-info"));
    try {
      const response = await api.post(
        "/api/agentpropertygetdocuments",
        formdata
      );

      // DEV ONLY
      //   await pause(10000);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { fetchPropertiesDocs };
