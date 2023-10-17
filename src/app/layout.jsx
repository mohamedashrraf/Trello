import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./Navbar/page";
import Footer from "./Footer/page";
import ReactQuery from "@/componant/provider/ReactQuery/ReactQuery";
import Redux from "@/componant/provider/Redux/Redux";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Trello-App",
  description: "Home page",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
      
          <ReactQuery>
            <main className="min-vh-100">{children}</main>
          </ReactQuery>
        
        <Footer />
      </body>
    </html>
  );
}
