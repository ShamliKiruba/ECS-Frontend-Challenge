import Axios from 'axios';
/* eslint-disable */
export default () => {
  const axiosInstance = Axios.create({
    headers: {},
  });

  return axiosInstance;
};
