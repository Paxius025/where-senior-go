import  axios from 'axios';

const fetchAllReview = async (offset = 0, limit = 10) => {
  const response = await axios.get("http://localhost:3000/api/reviews", {
    params: { offset, limit },
    withCredentials: true,
  });
  return response.data;
};

export { fetchAllReview };

