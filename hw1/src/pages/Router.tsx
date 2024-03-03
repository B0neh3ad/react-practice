import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Review from "./Review";
import Snack from "./Snack";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Review />,
            },
            {
                path: '/snacks',
                element: <Snack />,
                /** 
                 * TODO: snacks/new, snacks/id 등의 페이지를
                 * Snack의 하위 component로 둘지
                 * 형제 component로 둘지 정해야 함
                 * 
                 * header 구현에 따라 정해질 듯..?
                 * */
            }
        ],
    },
]);

export default Router;
