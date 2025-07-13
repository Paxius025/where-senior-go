import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsByCompanyAndPosition } from "./companyServices/companyService.js"
import Navbar from "../components/Navbar.jsx";
const ReviewPositionPage = () => {
  const { companyId, positionId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviewsByCompanyAndPosition(companyId, positionId);
        setReviews(data);
      } catch (err) {
        console.error("Error loading reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [companyId, positionId]);

  return (
    <> 
    <Navbar />
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">รีวิวตำแหน่งงาน</h1>

      <div className="grid grid-cols-1 gap-4">
        {reviews.map((review) => (
          <div key={review.review_id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-blue-700">{review.position_title}</h2>
            <p className="text-sm text-gray-600 mb-1">บริษัท: {review.company_name}</p>
            <p className="text-sm text-gray-600 mb-1">รีวิวโดย: {review.username}</p>
            <p className="text-yellow-500 text-sm">คะแนน: {review.rating}/5</p>
            <p className="mt-2 font-semibold">สรุป:</p>
            <p className="text-gray-800">{review.summary}</p>
            <p className="mt-2 font-semibold">จุดแข็ง:</p>
            <p className="text-gray-800">{review.strength}</p>
            <p className="mt-2 font-semibold">คำแนะนำ:</p>
            <p className="text-gray-800">{review.advice}</p>
          </div>
        ))}
      </div>

      {loading && <p className="mt-4 text-center">กำลังโหลด...</p>}
    </div>
    </>
  );
};

export default ReviewPositionPage;
