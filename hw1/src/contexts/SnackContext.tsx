import { ReactNode, createContext, useContext, useState } from "react";
import initReviewData from "../assets/data.json";
import initSnackData from "../assets/snackData.json";

/* type 정의 */
export type SnackInput = {
    image: string,
    snack_name: string,
};

export type Snack = {
    id: number,
    image: string,
    snack_name: string,
    rating: number,
};

export type ReviewInput = {
    snack_name: string,
    rating: string,
    content: string,
};

export type Review = {
    id: number,
    snack_id: number,
    rating: number,
    content: string,
};

export type SnackContextData = {
    snacks: Snack[];
    nextSnackId: number;
    getSnackById: (id: number) => Snack | null;
    getSnackByName: (name: string) => Snack | null;
    filterSnackByName: (query: string) => Snack[];
    // addSnack: (snackInput: SnackInput) => Snack;

    reviews: Review[];
    nextReviewId: number;
    editReviewId: number | null;
    deleteReviewId: number | null;
    editReview: (id: number) => void,
    cancelEditReview: () => void,
    saveEditReview: (id: number, content: string) => void;
    deleteReview: () => void,
    addReview: (reviewInput: ReviewInput) => void,

    showWriteReviewModal: boolean;
    showDeleteReviewModal: boolean;
    openWriteReviewModal: () => void,
    closeWriteReviewModal: () => void,
    openDeleteReviewModal: (id: number) => void,
    closeDeleteReviewModal: () => void,
}


/* Context 정의 */
export const SnackContext = createContext<SnackContextData | undefined>(undefined);

/* ContextProvider */
export function SnackProvider({ children }: { children: ReactNode}) {
    const [snacks, setSnacks] = useState<Snack[]>(initSnackData);
    const [nextSnackId, setNextSnackId] = useState(1000);

    const [reviews, setReviews] = useState<Review[]>(initReviewData);
    const [nextReviewId, setNextReviewId] = useState(1000);
    const [editReviewId, setEditReviewId] = useState<number | null>(null);
    const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);

    const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
    const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);

    const getSnackById = (id: number): Snack | null => {
        const snack = snacks.find((value: Snack) => value.id == id);
        return snack !== undefined ? snack : null;
    }
    const getSnackByName = (name: string): Snack | null => {
        console.log()
        const snack = snacks.find((value: Snack) => value.snack_name == name);
        return snack !== undefined ? snack : null;
    }
    const filterSnackByName = (query: string): Snack[] => {
        /**
         * TODO: 필요한 경우 filter 결과 리스트 잘라서 return.
         * 혹은 return 결과를 다른 곳에서 잘라쓰기
         * */
        const filteredSnacks = snacks.filter((value: Snack) => value.snack_name.replace(' ', '').includes(query.replace(' ', '')));
        return filteredSnacks;
    }

    /* Edit review */
    const editReview = (id: number) => setEditReviewId(id);
    const cancelEditReview = () => setEditReviewId(null);
    const saveEditReview = (id: number, content: string) => {
        const newReviews = reviews.map((value: Review) => 
            value.id === id ? { ...value, content: content } : value
        )
        setReviews(newReviews);
        setEditReviewId(null);
    };

    /* Write review modal */
    const openWriteReviewModal = () => setShowWriteReviewModal(true);
    const closeWriteReviewModal = () => setShowWriteReviewModal(false);
    const addReview = (validatedReviewInput: ReviewInput) => {
        const snack = getSnackByName(validatedReviewInput.snack_name);
        const newReview: Review = {
            id: nextReviewId,
            snack_id: snack!.id,
            rating: Number(validatedReviewInput.rating),
            content: validatedReviewInput.content,
        };
        const newReviews = [newReview, ...reviews];
        setReviews(newReviews);
        setNextReviewId(nextReviewId + 1);
        closeWriteReviewModal();
    }

    /* Delete review modal */
    const openDeleteReviewModal = (id: number) => {
        setDeleteReviewId(id);
        setShowDeleteReviewModal(true);
    };
    const closeDeleteReviewModal = () => setShowDeleteReviewModal(false);
    const deleteReview = () => {
        const newReviews = reviews.filter((value: Review) => value.id !== deleteReviewId)
        setReviews(newReviews);
        closeDeleteReviewModal();
    };

    const snackContextData: SnackContextData = {
        snacks,
        nextSnackId,
        getSnackById,
        getSnackByName,
        filterSnackByName,

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
