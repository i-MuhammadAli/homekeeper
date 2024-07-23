import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile } from "../thunks/fetchProfile";

const userProfileSlice = createSlice({
  name: "user_profile",
  initialState: {
    data: {
      name: "",
      profileimg: "",
      agentlogo: "",
      type: "",
      id: "",
      company: "",
      email: "",
      phone: "",
      image: "",
      website: "",
      signature: "",
      address: "",
      suite: "",
      city: "",
      zip: "",
      state: "",
      officePhone: "",
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setProfileUserName(state, action) {
      // console.log(action.payload);
      state.data.name = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserProfile.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.name = action.payload.viewprofile.name;
      state.data.id = action.payload.viewprofile.id;
      state.data.profileimg = action.payload.profile_image;
      state.data.agentlogo = action.payload.logo;
      state.data.type = action.payload.viewprofile.usertype;
      state.data.company = action.payload.viewprofile.companyname;
      state.data.email = action.payload.viewprofile.email;
      state.data.phone = action.payload.viewprofile.cellnumber;
      state.data.website = action.payload.viewprofile.website;
      state.data.signature = action.payload.signature;
      state.data.address = action.payload.viewprofile.address1;
      state.data.suite = action.payload.viewprofile.suite;
      state.data.city = action.payload.viewprofile.city;
      state.data.zip = action.payload.viewprofile.zip;
      state.data.state = action.payload.viewprofile.state;
      state.data.officePhone = action.payload.viewprofile.office_phone_no;
      state.data.image = action.payload.image;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { setProfileUserName } = userProfileSlice.actions;

export const userProfileReducer = userProfileSlice.reducer;
