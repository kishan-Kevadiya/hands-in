import GoogleIcon from "@/assets/svg/GoogleIcon";
import LinkedInIcon from "@/assets/svg/LinkedInIcon";
import AuthButton from "@/components/ui/auth/AuthButton";
import AuthInput from "@/components/ui/auth/AuthInput";
import AuthPassword from "@/components/ui/auth/AuthPassword";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import {
    createUser,
    getGoogleAuthUrl,
    getLinkedinAuthUrl,
} from "@/helpers/apis/auth";
import { showToast } from "@/helpers/helper";
import {
    LANDING_PAGE,
    LOGIN,
    PRIVACY_POLICY,
    TERMS_AND_CONDITIONS,
    VERIFY_OTP,
} from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { RegisterField, registerSchema } from "../../../types/auth.types";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const registerForm = useForm<RegisterField>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            emailConsent: true,
        },
        mode: "onSubmit",
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterField) => {
        setIsLoading(true);
        try {
            const response = await createUser(
                data.firstName,
                data.lastName,
                data.email,
                data.password
            );
            if (response) {
                navigate(VERIFY_OTP, {
                    state: { email: data.email, type: "register" },
                });
                showToast("success", response.data);
                registerForm.reset();
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
        <div className="flex flex-col justify-start items-center md:gap-5 gap-6 lg:w-3/4 md:w-4/5 w-full overflow-y-auto scrollbar-hidden">
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
            <p className="md:text-3xl text-2xl font-medium text-[#0C1421] w-full">
                Create Your Account!
            </p>

            <form className="w-full flex flex-col gap-2">
                <div className="flex md:flex-row flex-col gap-4 w-full">
                    <div className="md:w-1/2 w-full">
                        <AuthInput
                            register={registerForm.register("firstName")}
                            label="First Name"
                            placeholder="Type here"
                            errorMsg={registerForm.formState.errors.firstName}
                        />
                    </div>

                    <div className="md:w-1/2 w-full">
                        <AuthInput
                            register={registerForm.register("lastName")}
                            label="Last Name"
                            placeholder="Type here"
                            errorMsg={registerForm.formState.errors.lastName}
                        />
                    </div>
                </div>

                <AuthInput
                    register={registerForm.register("email")}
                    type="email"
                    placeholder="Example@email.com"
                    label="Email"
                    errorMsg={registerForm.formState.errors.email}
                />

                <Controller
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                        <AuthPassword
                            value={field.value}
                            onChange={field.onChange}
                            type="password"
                            placeholder="Password"
                            label="Password"
                            errorMsg={registerForm.formState.errors.password}
                        />
                    )}
                />

                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Checkbox
                        pt={{
                            root: {
                                className: "!w-5 !h-5",
                            },
                            box: {
                                className:
                                    "!w-5 !h-5 rounded-md border-primary bg-transparent",
                            },
                            icon: {
                                className: "w-full h-full bg-primary",
                            },
                        }}
                        onClick={() =>
                            registerForm.setValue(
                                "emailConsent",
                                !registerForm.watch("emailConsent")
                            )
                        }
                        checked={registerForm.watch("emailConsent")}
                    />
                    <span>
                        By creating an account, I agree to&nbsp;
                        <Link
                            className="underline"
                            to={TERMS_AND_CONDITIONS}
                            target="_blank"
                        >
                            Terms & Conditions
                        </Link>
                        &nbsp;and&nbsp;
                        <Link
                            className="underline"
                            to={PRIVACY_POLICY}
                            target="_blank"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </span>
                </div>

                <AuthButton
                    type="submit"
                    disabled={!registerForm.watch("emailConsent") || isLoading}
                    customStyle="mt-2"
                    onClick={registerForm.handleSubmit(onSubmit)}
                >
                    {isLoading ? (
                        <ButtonLoader isVisible={isLoading} />
                    ) : (
                        "Sign up"
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
                    Already have an account?{" "}
                    <Link
                        to={LOGIN}
                        className="font-semibold text-primary"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
