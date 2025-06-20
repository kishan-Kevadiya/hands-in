import { AuthBanner, AuthBg } from "@/assets/images";
import React from "react";
import { Outlet, useNavigate } from "react-router";

const AuthLayout: React.FC = () => {
    const navigate = useNavigate();
    const router = window.location.pathname.split("/")[2];

    return (
        <div className="w-full lg:h-screen flex justify-center">
            <div className="container flex justify-center gap-20 h-full p-8 font-manrope">
                <div
                    style={{ backgroundImage: `url(${AuthBg})` }}
                    className="bg-no-repeat bg-contain bg-center lg:flex hidden flex-col justify-items-start items-start h-full rounded-3xl max-w-[50%] aspect-[0.88] bg-primary p-10 text-white"
                >
                    <div className="w-full h-full flex flex-col gap-6 bg-white/20 backdrop-blur-sm rounded-3xl p-6 tracking-[-1px]">
                        <p className="text-2xl font-bold leading-12">
                            Your gateway to endless
                            <span className="font-extrabold text-[#BE3F63]"> Opportunities</span>
                            <br />
                            Let’s find a job you love.
                        </p>
                        <div className="w-11/12 h-11/12 flex items-center justify-center">
                            <img
                                src={AuthBanner}
                                alt="authentication"
                                title="Let's get started"
                                className="aspect-[1.08] w-full"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:justify-around justify-center items-center lg:w-1/2 w-full lg:h-auto lg:min-h-auto md:min-h-screen min-h-[calc(100vh-80px)] relative">
                    {router !== undefined && router !== "register" && (
                        <div
                            className="absolute md:left-14 left-0 md:top-14 top-0 flex items-center justify-center cursor-pointer border border-primary/40 rounded-full p-2 w-10 h-10"
                            onClick={() => navigate(-1)}
                        >
                            <i className="pi pi-chevron-left text-xs"></i>
                        </div>
                    )}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
