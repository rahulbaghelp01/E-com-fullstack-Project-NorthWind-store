import type { ReactNode } from "react";
import Footer from "./Footer"
import Navbar from "./Navbar"


function Layout({children}: { children: ReactNode }) {
    return (
        <div className="flex min-h-svh flex-col bg-base-20 text-base-content ">
           <Navbar />
           <main className="max-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-10">{children}</main>
           <Footer/> 
        </div>
    )
}

export default Layout
    