import { ReactNode, createContext, useContext, useState } from "react";
import initReviewList from '../assets/data.json';

/* type 정의 */
export type ReviewInput = {
    image: string,
    snack_name: string,
    rating: string,
    content: string,
};

export type Review = {
    id: number,
    image: string,
    snack_name: string,
    rating: number,
    content: string,
};

export type SnackContextData = {
    reviews: Review[];
    nextReviewId: number;
    editReviewId: number | null;
    deleteReviewId: number | null;
    editReview: (reviewId: number) => void,
    cancelEditReview: () => void,
    saveEditReview: (reviewId: number, content: string) => void;
    deleteReview: () => void,
    addReview: (reviewInput: ReviewInput) => void,

    showWriteReviewModal: boolean;
    showDeleteReviewModal: boolean;
    openWriteReviewModal: () => void,
    closeWriteReviewModal: () => void,
    openDeleteReviewModal: (reviewId: number) => void,
    closeDeleteReviewModal: () => void,
}

/* Context 정의 */
export const SnackContext = createContext<SnackContextData | undefined>(undefined);

/* ContextProvider */
export function SnackProvider({ children }: { children: ReactNode}) {
    const [reviews, setReviews] = useState(initReviewList);
    const [nextReviewId, setNextReviewId] = useState(1000);
    const [editReviewId, setEditReviewId] = useState<number | null>(null);
    const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);

    const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
    const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);

    function editReview(reviewId: number) {
        setEditReviewId(reviewId);
    }

    function cancelEditReview() {
        setEditReviewId(null);
    }

    function saveEditReview(reviewId: number, content: string) {
        const newReviews = reviews.map((value: Review) => 
            value.id === reviewId ? { ...value, content: content } : value
        )
        setReviews(newReviews);
        setEditReviewId(null);
    }

    /* write review modal */
    function openWriteReviewModal() {
        setShowWriteReviewModal(true);
    }

    function closeWriteReviewModal() {
        setShowWriteReviewModal(false);
    }

    /* delete review modal*/
    function openDeleteReviewModal(reviewId: number) {
        setDeleteReviewId(reviewId);
        setShowDeleteReviewModal(true);
    }

    function deleteReview() {
        const newReviews = reviews.filter((value: Review) => value.id !== deleteReviewId)
        setReviews(newReviews);
        closeDeleteReviewModal();
    }

    function closeDeleteReviewModal() {
        setShowDeleteReviewModal(false);
    }

    function addReview(validatedReviewInput: ReviewInput) {
        const newReview: Review = {
            id: nextReviewId,
            image: validatedReviewInput.image,
            snack_name: validatedReviewInput.snack_name,
            rating: Number(validatedReviewInput.rating),
            content: validatedReviewInput.content,
        };
        const newReviews = [newReview, ...reviews];
        setReviews(newReviews);
        setNextReviewId(nextReviewId + 1);
        closeWriteReviewModal();
    }

    const snackContextData: SnackContextData = {
        reviews,
        nextReviewId,
        editReviewId,
        deleteReviewId,
        editReview,
        cancelEditReview,
        saveEditReview,
        deleteReview,
        addReview,
    
        showWriteReviewModal,
        showDeleteReviewModal,
        openWriteReviewModal,
        closeWriteReviewModal,
        openDeleteReviewModal,
        closeDeleteReviewModal,
    }

    return (
        <SnackContext.Provider value={snackContextData}>
            {children}
        </SnackContext.Provider>
    );
}

/* hook */
export const useSnackContext = () => {
    const context = useContext(SnackContext);
    if (context === undefined) {
        throw new Error("SnackContext not Found");
    }
    return context;
}
