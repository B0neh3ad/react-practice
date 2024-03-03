import ReviewList from "../components/ReviewList";
import WriteReviewButton from "../components/WriteReviewButton";
import WriteReviewModal from "../components/WriteReviewModal";
import DeleteReviewModal from '../components/DeleteReviewModal';

/**
 * url: '/'
 * 리뷰 페이지
 */
function Review() {
    return (
        <>
            <ReviewList />
            <WriteReviewButton />
            <WriteReviewModal />
            <DeleteReviewModal />
        </>
    );
}

export default Review;
