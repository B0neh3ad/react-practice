import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Review from "./Review";
import Snack from "./Snack";
import SnackDetail from "./SnackDetail";
import AddSnack from "./AddSnack";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '',
                element: <Review />,
            },
            {
                path: 'snacks',
                element: <Snack />,
                children: [
                    {
                        path: 'new',
                        element: <AddSnack />,
                    },
                    {
                        path: ':id',
                        element: <SnackDetail />,
                    },
                ],
            },
        ],
    },
]);

export default Router;
