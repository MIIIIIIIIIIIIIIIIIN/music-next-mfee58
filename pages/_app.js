import "@/styles/globals.css";
import "@/styles/styleguide.css"
import { AuthContextProvider } from "@/Context/auth-context";

export default function App({ Component, pageProps }) {
    return(
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
