// _app.js
import { ItemContextProvider } from "@/Context/ItemContext";
import NavigationBar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import "tailwindcss/tailwind.css"; // Import the main Tailwind CSS file

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ItemContextProvider>
        <NavigationBar />
        <Component {...pageProps} />
      </ItemContextProvider>
    </SessionProvider>
  );
}
