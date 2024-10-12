import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HeaderAndFooter = ()=>{
    return(
        <>
         <Header />
            <main>
                <Outlet />
            </main>
        <Footer />
        </>
    )
};

export default HeaderAndFooter;