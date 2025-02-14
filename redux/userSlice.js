import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userUuid: "",
  firstName: "",
  lastName: "",
  nickName: "",
  email: "",
  phoneNumber: "",
  country: "",
  dob: "", 
  gender: "",
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser:(state,action) =>{
      state.userUuid = action.payload.userUuid;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.nickName = action.payload.nickName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.country = action.payload.country;
      state.dob = action.payload.dob;
      state.gender = action.payload.gender;
    },


  }

});

export const { setUser} = authSlice.actions;
export default authSlice.reducer;
