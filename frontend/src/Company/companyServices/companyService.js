import axios from "axios";

export const fetchAllCompanies = async (offset = 0, limit = 10) => {
  const response = await axios.get("http://localhost:3000/api/companies", {
    params: { offset, limit },
    withCredentials: true,
  });
  return response.data;
};
