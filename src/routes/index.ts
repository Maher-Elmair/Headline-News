import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/layouts/RootLayout";
import { HomePage, NotFoundPage } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
