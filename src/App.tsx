import { RouterProvider } from "react-router";
import { ThemeProvider } from "@/lib/theme";
import { QueryProvider } from "@/lib/query";
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
