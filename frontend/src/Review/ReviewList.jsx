import { fetchAllReview } from "./reviewService/reviewService";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifySessionOrRedirect } from "../Authentication/services/authHelpers.js";

const ReviewList = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 10;

    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loaderRef = useRef(null);

    useEffect(() => {
        verifySessionOrRedirect(navigate);
    }, []);

    const loadReviews = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await fetchAllReview(offset, limit);
            console.log('API response:', res);
            setReviews((prev) => [...prev, ...res]);
            setOffset((prev) => prev + res.pageSize);
            setHasMore(res.hasMore);
        } catch (err) {
            console.error("Failed to load reviews", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadReviews();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadReviews();
                }
            },
            {
                rootMargin: "100px",
            }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [loaderRef.current, hasMore, loading]);

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 gap-4">
                {reviews.map((review) => (
                    <div key={review.review_id} className="border p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">{review.position_title} at {review.company_name}</h3>
                        <p className="text-sm text-gray-600">Reviewed by: {review.username}</p>
                        <p className="mt-2">Rating: {review.rating} stars</p>
                        <p className="mt-2">{review.summary}</p>
                        <p className="mt-2">{review.detail}</p>
                        <p className="mt-2"><strong>Strengths:</strong> {review.strength}</p>
                        <p className="mt-2"><strong>Advice:</strong> {review.advice}</p>
                    </div>
                ))}
            </div>
            {hasMore && (
                <div ref={loaderRef} className="text-center mt-4">
                    {loading ? "Loading more reviews..." : "Scroll down to load more reviews"}
                </div>
            )}
        </div>
    );
};

export default ReviewList;