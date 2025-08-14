import { Outlet, useLocation } from "react-router";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import { ReactLenis } from "lenis/react";
import { useEffect } from "react";

const LandingPage = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <ReactLenis root>
            <div className="font-manrope flex flex-col ">
                {/* <Navbar /> */}
                <Outlet />
                {/* <Footer /> */}
            </div>
        </ReactLenis>
    );
};

export default LandingPage;
