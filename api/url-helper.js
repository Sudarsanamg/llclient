import Config from 'react-native-config';
import axios from 'axios';

//get
export const verifyUser = async(email)=> await axios.get(`${Config.server_domain}/users/verify-user?email=${email}`);


//post
export const sendOtp =async(email) => await axios.post(`${Config.server_domain}/users/send-otp`,{email});


//put


//delete