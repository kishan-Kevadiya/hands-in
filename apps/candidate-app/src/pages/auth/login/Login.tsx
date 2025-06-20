import GoogleIcon from "@/assets/svg/GoogleIcon";
import LinkedInIcon from "@/assets/svg/LinkedInIcon";
import AuthButton from "@/components/ui/auth/AuthButton";
import AuthInput from "@/components/ui/auth/AuthInput";
import AuthPassword from "@/components/ui/auth/AuthPassword";
import {
    getGoogleAuthUrl,
    getLinkedinAuthUrl,
    loginUser,
} from "@/helpers/apis/auth";
import { showToast } from "@/helpers/helper";
import {
    DASHBOARD,
    FORGOT_PASSWORD,
    JOB_DETAILS,
    LANDING_PAGE,
    REGISTER,
    VERIFY_OTP,
} from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { LoginField, loginSchema } from "../../../types/auth.types";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import queryClient from "@/helpers/query.config";
import { USE_QUERY_KEYS } from "@/helpers/constants";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const jobId = localStorage.getItem("jobId");    

    const loginForm = useForm<LoginField>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onSubmit",
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginField) => {
        setIsLoading(true);
        try {
            const response = await loginUser(data.email, data.password);
            if (response) {
                if (response?.data?.isEmailVerified) {
                    queryClient.removeQueries({
                        queryKey: [USE_QUERY_KEYS.GET_PROFILE],
                    });
                    navigate(jobId ? `${JOB_DETAILS}/${jobId}` : DASHBOARD);
                    showToast("success", response.message);
                } else {
                    navigate(VERIFY_OTP, { state: { email: data.email } });
                }
                loginForm.reset();
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    const openGoogleAuth = async () => {
        try {
            const response = await getGoogleAuthUrl();
            if (response?.authUrl) window.location.href = response?.authUrl;
        } catch (error) {
            console.error(error);
        }
    };

    const openLinkedinAuth = async () => {
        try {
            const response = await getLinkedinAuthUrl();
            if (response?.authUrl) window.location.href = response?.authUrl;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col justify-start items-center md:gap-5 gap-8 lg:w-3/4 md:w-4/5 w-full">
            <Link
                to={LANDING_PAGE}
                className="w-1/2 aspect-[6.04]"
            >
                <img
                    src="/logo.webp"
                    alt="logo"
                    className="w-full h-full"
                />
            </Link>

            <div className="flex flex-col gap-2 w-full">
                <p className="md:text-3xl text-2xl font-medium text-[#0C1421]">
                    Welcome Back!
                </p>
                <p className="md:text-base text-sm text-[#313957]">
                    It’s your day. Show up, stand out — sign in to unlock new
                    opportunities.
                </p>
            </div>

            <form className="w-full flex flex-col gap-2">
                <AuthInput
                    register={loginForm.register("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="Example@email.com"
                    label="Email"
                    errorMsg={loginForm.formState.errors.email}
                />

                <Controller
                    name="password"
                    control={loginForm.control}
                    render={({ field }) => (
                        <AuthPassword
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Password"
                            label="Password"
                            autoComplete="password"
                            errorMsg={loginForm.formState.errors.password}
                        />
                    )}
                />

                <Link
                    to={FORGOT_PASSWORD}
                    className="w-full text-right text-primary outline-none"
                >
                    Forgot Password?
                </Link>
                <AuthButton
                    type="submit"
                    disabled={isLoading}
                    onClick={loginForm.handleSubmit(onSubmit)}
                >
                    {isLoading ? (
                        <ButtonLoader isVisible={isLoading} />
                    ) : (
                        "Sign In"
                    )}
                </AuthButton>
                <div className="flex flex-col gap-3 items-center">
                    <div className="flex flex-row items-center gap-2 w-1/2 text-[#294957]">
                        <Divider
                            pt={{
                                root: {
                                    className:
                                        "before:border-1 before:border-[#CFDFE2]/80 my-3",
                                },
                            }}
                        />
                        Or
                        <Divider
                            pt={{
                                root: {
                                    className:
                                        "before:border-1 before:border-[#CFDFE2]/80 my-3",
                                },
                            }}
                        />
                    </div>
                    <Button
                        type="button"
                        pt={{
                            root: {
                                className:
                                    "w-full !bg-[#F3F9FA] !text-[#313957] hover:bg-unset border-none focus:shadow-none !rounded-xl py-2 md:px-4 px-0 flex flex-row items-center justify-center gap-4",
                            },
                            label: {
                                className: "flex-none font-medium text-base",
                            },
                        }}
                        label="Sign in with Google"
                        icon={<GoogleIcon />}
                        onClick={openGoogleAuth}
                    />
                    <Button
                        type="button"
                        pt={{
                            root: {
                                className:
                                    "w-full !bg-[#F3F9FA] !text-[#313957] hover:bg-unset border-none focus:shadow-none !rounded-xl py-2 md:px-4 px-0 flex flex-row items-center justify-center gap-4",
                            },
                            label: {
                                className: "flex-none font-medium text-base",
                            },
                        }}
                        label="Sign in with LinkedIn"
                        icon={<LinkedInIcon className="w-6 h-6" />}
                        onClick={openLinkedinAuth}
                    />
                </div>
                <p className="text-[#313957] text-center pt-2">
                    New on our platform?&nbsp;
                    <Link
                        to={REGISTER}
                        className="font-semibold text-primary outline-none"
                    >
                        Create an account
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
