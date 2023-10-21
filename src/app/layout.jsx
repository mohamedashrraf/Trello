
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./Navbar/page";
import Footer from "./Footer/page";
import ReactQuery from "@/componant/provider/ReactQuery/ReactQuery";
import Redux from "@/componant/provider/Redux/Redux";
import TokenContextProvider from './context/tokenContext';
import UserContextProvider from "./context/userContext";



const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Trello",
  description: "Home page",
};

export default function RootLayout({ children }) {

  return (
    <html>
      <body>
        <TokenContextProvider>
          <UserContextProvider>
            <Navbar />
            <Redux>
              <ReactQuery>
                <main className="min-vh-100">{children}</main>
              </ReactQuery>
            </Redux>
            <Footer />
          </UserContextProvider>
        </TokenContextProvider>

      </body>
    </html>
  );
}
