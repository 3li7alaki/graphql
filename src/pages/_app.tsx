import "../styles/globals.css";

import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import Header from "../components/Header";
import dynamic from "next/dynamic";
import {UserProvider} from "@/contexts/UserContext";

const GlobalInit = dynamic(() => import('../components/GlobalInit'), { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <div className="flex flex-col min-h-screen w-full">
                <Header />
                <main className="flex-grow overflow-hidden pt-[--tw-header-height]">
                    <Component {...pageProps} />
                </main>
                <Footer />
            </div>
            <GlobalInit />
        </UserProvider>
    );
}