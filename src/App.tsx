import { RouterProvider } from "react-router";
import { ThemeProvider } from "@/lib/theme-context";
import { QueryProvider } from "@/lib/react-query/QueryProvider";
import { router } from "@/routes";

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
