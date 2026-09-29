import type {Metadata} from "next";
import "./globals.css";
export const metadata:Metadata={title:"Veyra AI — Resume intelligence for every application",description:"Build, analyze and tailor your resume for every role."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}