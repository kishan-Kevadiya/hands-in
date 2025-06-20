import { NoProfile } from "@/assets/images";
import WebsiteIcon from "@/assets/svg/application/WebsiteIcon";
import LinkedinIcon from "@/assets/svg/LinkedinIcon";
import CallIcon from "@/assets/svg/support/call.svg";
import MailIcon from "@/assets/svg/support/mail.svg";
import Loader from "@/components/ui/loader/Loader";
import { getCompanyProfile } from "@/helpers/apis/profile";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router";

const Profile: React.FC = () => {
    const navigate = useNavigate();

    const companyProfileData = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_COMPANY_PROFILE],
        queryFn: () => getCompanyProfile(),
    });

    return companyProfileData.isLoading ? (
        <Loader isVisible />
    ) : companyProfileData.data ? (
        <div className="flex flex-col gap-14 md:p-12 p-6 bg-white rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
                <h1 className="lg:text-3xl text-2xl font-semibold tracking-[-1px] text-primary">
                    My Profile
                </h1>

                <button
                    onClick={() => {
                        navigate("/profile/create-profile");
                    }}
                    className="flex items-center gap-2 text-black font-semibold border border-[#C1C1C1] rounded-xl py-2 px-4"
                >
                    Edit Profile
                    <i className="pi pi-pen-to-square"></i>
                </button>
            </div>

            <div className="flex flex-col md:gap-6 gap-2 w-full">
                <div className="flex md:flex-row flex-col items-center justify-between w-full">
                    <div className="flex justify-start w-full gap-4 items-center lg:w-3/5 md:gap-10">
                        <div className="shrink-0 bg-[#F7FAFF] h-20 rounded-full w-20 lg:h-40 lg:w-40 md:h-32 md:w-32">
                            <img
                                src={
                                    companyProfileData.data?.logo
                                        ? companyProfileData.data
                                              ?.logo instanceof File
                                            ? URL.createObjectURL(
                                                  companyProfileData.data?.logo
                                              )
                                            : companyProfileData.data?.logo?.url
                                        : NoProfile
                                }
                                alt="No Image"
                                className="w-full h-full object-contain rounded-full"
                            />
                        </div>
                        <div className="flex flex-col md:gap-2 w-3/4">
                            <p className="md:text-4xl text-2xl font-semibold w-full md:line-clamp-1 line-clamp-2 pb-1 break-words">
                                {companyProfileData.data?.companyName}
                            </p>
                            <p className="text-base text-[#393939] line-clamp-2">
                                {companyProfileData.data?.address}
                            </p>
                        </div>
                    </div>

                    {(companyProfileData.data?.twitter ||
                        companyProfileData.data?.linkedin) && (
                        <div className="flex flex-row items-center justify-end gap-2 pr-4 md:w-auto w-full">
                            {companyProfileData.data?.linkedin && (
                                <Link
                                    to={`${companyProfileData.data?.linkedin}`}
                                    target="_blank"
                                    className="flex items-center justify-center w-9 h-9 border border-[#E7E7E7] rounded-full p-2 hover:bg-[#e3cbf8ad]"
                                >
                                    <LinkedinIcon />
                                </Link>
                            )}

                            {companyProfileData.data?.twitter && (
                                <Link
                                    to={`${companyProfileData.data?.twitter}`}
                                    target="_blank"
                                    className="flex items-center justify-center w-9 h-9 border border-[#E7E7E7] rounded-full p-2 hover:bg-[#e3cbf8ad]"
                                >
                                    <i className="pi pi-twitter text-black"></i>
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex md:flex-row flex-col md:gap-8 gap-2 md:pt-6">
                    <div className="flex gap-2 items-center">
                        <div className="shrink-0 flex items-center justify-center w-9 h-9 border border-[#D3D3D3]/30 rounded-full p-2">
                            <img
                                src={MailIcon}
                                alt="mail"
                                className="aspect-square h-full w-full"
                            />
                        </div>
                        <Link
                            to={`mailto:${companyProfileData.data?.email}`}
                            target="_blank"
                            className="truncate"
                        >
                            {companyProfileData.data?.email}
                        </Link>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="shrink-0 flex items-center justify-center w-9 h-9 border border-[#D3D3D3]/30 rounded-full p-2">
                            <img
                                src={CallIcon}
                                alt="call"
                                className="aspect-square h-full w-full"
                            />
                        </div>
                        <Link
                            className="text-nowrap"
                            to={`tel:${companyProfileData.data?.countryCode} ${companyProfileData.data?.phone}`}
                            target="_blank"
                        >
                            {companyProfileData.data?.countryCode}{" "}
                            {companyProfileData.data?.phone}
                        </Link>
                    </div>
                    {companyProfileData.data?.website && (
                        <div className="flex gap-2 items-center md:w-1/2">
                            <div className="shrink-0">
                                <WebsiteIcon />
                            </div>
                            <Link
                                className="md:w-4/5 truncate"
                                to={`${companyProfileData.data?.website}`}
                                target="_blank"
                            >
                                {companyProfileData.data?.website}
                            </Link>
                        </div>
                    )}
                </div>

                <p className="font-medium leading-8 line-clamp-4">
                    {companyProfileData.data?.description}
                </p>

                {(companyProfileData.data?.employeeSize ||
                    companyProfileData.data?.gst) && (
                    <div className="flex md:flex-row flex-col md:gap-8 gap-2 items-center">
                        {companyProfileData.data?.employeeSize && (
                            <p className="text-lg text-black w-full">
                                <span className="text-sm text-[#626262]">
                                    Employee Size{" "}
                                </span>
                                : {companyProfileData.data?.employeeSize}
                            </p>
                        )}

                        {companyProfileData.data?.gst && (
                            <p className="text-lg text-black w-full">
                                <span className="text-sm text-[#626262]">
                                    GST{" "}
                                </span>
                                : {companyProfileData.data?.gst}
                            </p>
                        )}
                    </div>
                )}

                <div className="flex flex-wrap items-start md:justify-start justify-center gap-4 border-t border-[#E9E9E9] pt-8">
                    {companyProfileData.data?.companyImages &&
                    companyProfileData.data?.companyImages.length > 0
                        ? companyProfileData.data?.companyImages.map(
                              (image, index) => (
                                  <div
                                      key={index}
                                      className="w-32 h-32"
                                  >
                                      <img
                                          src={
                                              image instanceof File
                                                  ? URL.createObjectURL(image)
                                                  : image.url
                                          }
                                          alt="image"
                                          className="w-full h-full object-contain rounded-xl"
                                      />
                                  </div>
                              )
                          )
                        : null}
                </div>
            </div>
        </div>
    ) : (
        <p className="w-full h-full flex items-center justify-center">
            No data found...
        </p>
    );
};

export default Profile;
