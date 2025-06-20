import { ContactUs1, ContactUs2, ContactUs3 } from "@/assets/images";
import WordPullUp from "@/components/animated/WordPullUp";
import MetaGenerator from "@/components/MetaGenerator";
import AuthButton from "@/components/ui/auth/AuthButton";
import AuthInput from "@/components/ui/auth/AuthInput";
import AuthPhone from "@/components/ui/auth/AuthPhone";
import AuthTextArea from "@/components/ui/auth/AuthTextArea";
import { ApiPost } from "@/helpers/api-helper";
import { ApiResponse } from "@/types/apiResponse";
import { contactUsField, contactUsSchema } from "@/types/contactUs.types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ContactUs: React.FC = () => {
    const contactInformation = useForm<contactUsField>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        },
        mode: "all",
        resolver: zodResolver(contactUsSchema),
    });

    const onSubmit = async (data: contactUsField) => {
        try {
            const res: ApiResponse<string> = await ApiPost("/enquiry", data);

            if (res.data) {
                toast.success(
                    "Message sent successfully. We will get back to you soon."
                );
                contactInformation.reset();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <MetaGenerator
                title="HeadsIn | Contact Us"
                description="Contact us for any queries or support."
                canonicalUrl="https://www.headsin.co/contact-us"
            />
            {/* Contact-us Section */}
            <section>
                <div className="flex-col md:flex-col lg:flex lg:flex-row w-screen mb-20 ">
                    <div className="hidden md:block relative">
                        <div className="absolute h-130 w-150 bg-[radial-gradient(closest-side,theme(colors.rose.100),transparent)] -left-50 bottom-70"></div>
                        <div className="absolute h-130 w-150 bg-[radial-gradient(closest-side,theme(colors.purple.100),transparent)]  -left-50 top-50"></div>
                    </div>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                        <div className="flex w-full py-4 md:py-10 lg:py-15 px-4 md:px-10 lg:px-15 overflow-hidden">
                            <WordPullUp className="z-10">
                                <h1 className="z-10 text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight w-full font-extrabold text-[#343434]">
                                    Let's
                                    <span className="bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                                        &nbsp;Connect&nbsp;
                                    </span>
                                    & Help You Get Started!
                                </h1>
                            </WordPullUp>

                            <div className="hidden lg:block relative after:absolute after:bottom-0 after:z-10 after:w-full after:h-20 after:bg-red-400">
                                <div className="absolute w-150 h-150 border-2 items-center flex justify-center rounded-full border-dashed border-[#DF6789] -right-70 -bottom-80">
                                    <img
                                        src={ContactUs1}
                                        alt="ContactUs1"
                                        className="absolute -left-10"
                                    />
                                    <img
                                        src={ContactUs3}
                                        alt="ContactUs3"
                                        className="absolute -top-10"
                                    />

                                    <div className="absolute w-50 h-50 border-2 rounded-full border-dashed border-[#DF6789] ">
                                        <img
                                            src={ContactUs2}
                                            alt="ContactUs2"
                                            className="absolute -top-10"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full py-5 md:py-10 lg:py-15 px-3 md:px-10 lg:px-20">
                            <div className="bg-gradient-to-l z-10 h-fit w-full px-4 py-10 md:p-10 from-[#F8F1FF] to-[#FFEFF3] rounded-3xl">
                                <form
                                    className="flex flex-col gap-10 "
                                    onSubmit={contactInformation.handleSubmit(
                                        onSubmit
                                    )}
                                >
                                    <div className="flex flex-col gap-8">
                                        <div className="flex md:flex-col lg:flex-row flex-col gap-6">
                                            <AuthInput
                                                inputStyle="!bg-white/50 !border !border-white"
                                                register={contactInformation.register(
                                                    "firstName"
                                                )}
                                                placeholder="First Name"
                                                errorMsg={
                                                    contactInformation.formState
                                                        .errors.firstName
                                                }
                                            />

                                            <AuthInput
                                                inputStyle="!bg-white/50 !border !border-white"
                                                register={contactInformation.register(
                                                    "lastName"
                                                )}
                                                placeholder="Last Name"
                                                errorMsg={
                                                    contactInformation.formState
                                                        .errors.lastName
                                                }
                                            />
                                        </div>

                                        <AuthInput
                                            inputStyle="!bg-white/50 !border !border-white"
                                            register={contactInformation.register(
                                                "email"
                                            )}
                                            placeholder="Email"
                                            errorMsg={
                                                contactInformation.formState
                                                    .errors.email
                                            }
                                        />

                                        <AuthPhone
                                            register={contactInformation.register(
                                                "phone"
                                            )}
                                            label="Phone Number"
                                            placeholder="9999999999"
                                            errorMsg={
                                                contactInformation.formState
                                                    .errors.phone
                                            }
                                        />

                                        <AuthInput
                                            inputStyle="!bg-white/50 !border !border-white"
                                            register={contactInformation.register(
                                                "subject"
                                            )}
                                            placeholder="Subject"
                                            errorMsg={
                                                contactInformation.formState
                                                    .errors.subject
                                            }
                                        />

                                        <AuthTextArea
                                            inputStyle="!bg-white/50 !border !border-white"
                                            register={contactInformation.register(
                                                "message"
                                            )}
                                            placeholder="Message"
                                            rows={5}
                                            errorMsg={
                                                contactInformation.formState
                                                    .errors.message
                                            }
                                        />

                                        <div className="flex items-center justify-center ">
                                            <AuthButton
                                                customStyle="w-full"
                                                label="Send Message"
                                                type="submit"
                                                className="hover:!bg-primary/80"
                                            >
                                                {/* <i className='pi pi-telegram '></i> */}
                                            </AuthButton>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
