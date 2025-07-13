import axios from 'axios'

const fetchTopFiveCompanies = async () => {
    const response = await axios.get("http://localhost:3000/api/companies/top-five",{ 
        withCredentials : true,
        });
    return response.data
}

export { fetchTopFiveCompanies}