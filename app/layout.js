import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { StoreProvider } from "./StoreProvider";
import GlobalProvider from "./QuizProvider";
import { usePathname } from "next/navigation";
const nunito = Nunito({ subsets: ["latin"] });
export const metadata = {
  title: "Doutya Campus",
  description:
  "At Doutya Campus, we revolutionize college admissions by focusing on real skills over traditional metrics. Our innovative platform presents students with tailored quizzes that simulate the challenges they'll face in their chosen fields. Instead of relying solely on grades and test scores, we evaluate applicants based on their performance in these quizzes, ensuring that only the most capable and qualified individuals advance. Join us in transforming the way talent is discovered and admitted—proving that actions speak louder than words.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <StoreProvider>
          <GlobalProvider>{children}</GlobalProvider>
        </StoreProvider>

        <Toaster />
      </body>
    </html>
  );
}
