import Header from "./components/Header";
import ReviewList from "./components/ReviewList";
import WriteReviewButton from "./components/WriteReviewButton";
import WriteReviewModal from "./components/WriteReviewModal";
import DeleteReviewModal from './components/DeleteReviewModal';
import './App.css';

export type ValidationErrorMessage = {
    image: string,
    snack_name: string,
    rating: string,
    content: string,
}

function App() {
    return (
        <>
            <Header />
            {/* TODO: <Outlet /> component로 header 이하 영역 감싸주기 */}
            {/* '/': 리뷰 페이지 */}
            <ReviewList />
            <WriteReviewButton />
            <WriteReviewModal />
            <DeleteReviewModal />
            {/* '/snack': 과자 페이지 */}
        </>
    );
}

export default App;
