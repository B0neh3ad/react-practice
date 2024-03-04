import ReviewList from "../components/ReviewList";
import OpenMenuButton from '../components/OpenMenuButton';
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
            <OpenMenuButton />
            <WriteReviewModal />
            <DeleteReviewModal />
        </>
    );
}

export default Review;
