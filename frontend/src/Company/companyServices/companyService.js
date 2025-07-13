import axios from "axios";

const fetchAllCompanies = async (offset = 0, limit = 10) => {
  const response = await axios.get("http://localhost:3000/api/companies", {
    params: { offset, limit },
    withCredentials: true,
  });
  return response.data;
};

const fetchAllPositionsInCompany = async (companyId, offset = 0, limit = 10) => {  
    const response = await axios.get("http://localhost:3000/api/positions/company", {
    params: { company_id: companyId, offset, limit },
    withCredentials: true,
  });
  return response.data;
};

export { fetchAllCompanies, fetchAllPositionsInCompany };
