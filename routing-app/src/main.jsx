import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root, {
    loader as rootLoader,
    action as rootAction,
} from "./routes/root";
import ErrorPage from "./routes/error-page";
import Contact, {
    loader as contactLoader,
    action as contactAction,
} from "./routes/contact";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes";

// Creating the router with basename for subdirectory hosting
const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            loader: rootLoader,
            action: rootAction,
            children: [
                {
                    errorElement: <ErrorPage />,
                    children: [
                        {
                            index: true,
                            element: <Index />,
                        },
                        {
                            path: "/contacts/:contactId",
                            element: <Contact />,
                            loader: contactLoader,
                            action: contactAction,
                        },
                        {
                            path: "/contacts/:contactId/edit",
                            element: <EditContact />,
                            loader: contactLoader,
                            action: editAction,
                        },
                        {
                            path: "/contacts/:contactId/destroy",
                            action: destroyAction,
                            errorElement: <div>Oops! There was an error.</div>,
                        },
                    ],
                },
            ],
        },
    ],
    {
        basename: "/web-development/", // Ensure this matches your Vite config base or subdirectory
    }
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>
);
