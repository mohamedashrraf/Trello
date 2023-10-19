
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./Navbar/page";
import Footer from "./Footer/page";
import ReactQuery from "@/componant/provider/ReactQuery/ReactQuery";
import Redux from "@/componant/provider/Redux/Redux";
import TokenContextProvider from './context/tokenContext';
// import { useClient } from 'next/stdlib/server';



const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Trello-App",
  description: "Home page",
};

    // useClient();
export default function RootLayout({ children }) {

  return (
    <html>
      <body>
         <TokenContextProvider>
        <Navbar />
      <Redux>
          <ReactQuery>
            <main className="min-vh-100">{children}</main>
          </ReactQuery>
        </Redux>
        <Footer />
          </TokenContextProvider>

      </body>
    </html>
  );
}
