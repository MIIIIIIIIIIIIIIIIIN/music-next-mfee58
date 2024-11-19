import "@/styles/globals.css";
import "@/styles/styleguide.css";
import { AuthContextProvider } from "@/Context/auth-context";
import { TabProvider } from "@/components/Liam/detail/top/tab-Context";
import { CartProvider } from "@/components/George/context/cartdetail-provider";
import { QuantityProvider } from "@/components/George/context/quantity-provider";

import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({error}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AuthContextProvider>
      <TabProvider>
        <QuantityProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </QuantityProvider>
      </TabProvider>
    </AuthContextProvider>
    </ErrorBoundary>
  );
}
