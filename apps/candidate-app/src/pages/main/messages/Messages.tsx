import { NoProfile, NotShortlisted } from "@/assets/images";
import ExternalLinkIcon from "@/assets/svg/message/ExternalLinkIcon";
import AuthButton from "@/components/ui/auth/AuthButton";
import SelectField from "@/components/ui/auth/SelectField";
import Loader from "@/components/ui/loader/Loader";
import { getCompanyApplications } from "@/helpers/apis/application";
import { getUser } from "@/helpers/apis/auth";
import {
    getCompaniesForChat,
    getMessages,
    sendMessage,
} from "@/helpers/apis/message";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { getPastTimeorDate, getTimeOrDate } from "@/helpers/helper";
import useDebounce from "@/hooks/useDebounce";
import { JOBS } from "@/routes";
import { GetCompaniesForChat, Message, UserType } from "@/types/message";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Messages: React.FC = () => {
    const [selectedCompany, setSelectedCompany] = useState<
        GetCompaniesForChat["companies"][number] | null
    >(null);
    const [selectedApplication, setSelectedApplication] = useState<string>();
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [searchCompany, setSearchCompany] = useState("");
    const debouncedSearchCompany = useDebounce(searchCompany, 500);

    const navigate = useNavigate();

    const UserData = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_USER],
        queryFn: async () => await getUser(),
    });

    const companies = useQuery({
        queryKey: [
            USE_QUERY_KEYS.GET_COMPANIES_FOR_CHAT,
            debouncedSearchCompany,
        ],
        queryFn: async () =>
            await getCompaniesForChat({
                searchText: debouncedSearchCompany,
                page: 1,
                pageSize: 10,
            }),
    });

    const applications = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_COMPANY_APPLICATIONS, selectedCompany],
        queryFn: () =>
            getCompanyApplications({ companyId: selectedCompany?.companyId }),
    });

    const messagesFromServer = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_MESSAGES, selectedApplication],
        queryFn: () =>
            getMessages({
                applicationId: selectedApplication,
                page: 1,
                pageSize: 10,
            }),
    });

    const handleContactClick = (
        contact: GetCompaniesForChat["companies"][number]
    ) => {
        setSelectedCompany(contact);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (selectedApplication && inputMessage.trim() !== "") {
            const newMessage: Message = {
                message: inputMessage,
                sender: UserType.user,
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            };
            setMessages((prev) => [newMessage, ...prev]);
            await sendMessage({
                applicationId: selectedApplication,
                message: inputMessage,
            });
        }
        setInputMessage("");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const openApplication = () => {
        if (!selectedApplication) return;

        const application = applications.data?.data.find(
            (app) => app.application?.id === selectedApplication
        );
        if (!application) return;

        if (application?.job) {
            const url = JOBS + "/" + application?.job?.id;
            navigate(url);
        }
    };

    useEffect(() => {
        setSelectedApplication(applications?.data?.data[0]?.application?.id);
    }, [applications.data]);

    useEffect(() => {
        setMessages(messagesFromServer?.data?.messages || []);
    }, [messagesFromServer.data]);

    // const handleBackClick = () => {
    //     setselectedCompany(null)
    // }

    return (
        <div className="lg:flex-1 flex gap-4 h-full bg-gray-50 w-full">
            {/* Sidebar */}
            <div
                className={` ${
                    selectedCompany ? "hidden lg:block" : "flex flex-col"
                } lg:min-w-[320px] lg:w-[320px] w-full h-full rounded-2xl border border-[#E7E7E7] bg-white p-4`}
            >
                <div>
                    <h1 className="text-xl font-semibold mb-4 text-primary">
                        Messages
                    </h1>
                    <IconField
                        iconPosition="right"
                        pt={{
                            root: {
                                className: "!w-full pb-4 !font-manrope",
                            },
                        }}
                    >
                        <InputText
                            value={searchCompany}
                            onChange={(e) => setSearchCompany(e.target.value)}
                            placeholder="Search..."
                            className="w-full !h-[40px] !text-black !border-[#EEEEEE] focus:border-primary focus:!shadow-none !bg-[#F7F7F7] !rounded-xl font-manrope"
                        />
                        <InputIcon className="!top-3 !flex">
                            <i className="pi pi-search"></i>{" "}
                        </InputIcon>
                    </IconField>
                </div>
                {companies.isLoading ? (
                    <Loader isVisible />
                ) : (
                    <div className="flex-[1_1_auto] flex flex-col overflow-y-auto scrollbar-hidden w-full">
                        {companies.data?.data.companies?.map((contact) => (
                            <div
                                key={contact?.companyId}
                                className="flex items-center gap-2 px-2 py-3 hover:bg-field w-full rounded-xl cursor-pointer"
                                onClick={() => handleContactClick(contact)}
                            >
                                <img
                                    src={contact?.logo || NoProfile}
                                    alt={contact?.companyName ?? undefined}
                                    className="rounded-full aspect-square w-10 h-10 object-cover"
                                />
                                <div className="flex flex-col w-[calc(100%-7.5rem)]">
                                    <h3 className="font-semibold truncate">
                                        {contact?.companyName}
                                    </h3>
                                    <p className="text-xs font-medium text-[#3F3F3F] truncate">
                                        {contact?.messageMetadata?.latestMessage}
                                    </p>
                                </div>
                                {contact?.messageMetadata?.unreadCount ? (
                                    <div className="flex flex-col items-center justify-between gap-2 ml-auto">
                                        {contact?.messageMetadata
                                            ?.latestMessageTime && (
                                            <span className="text-xs text-primary font-medium text-nowrap">
                                                {getPastTimeorDate(
                                                    moment(
                                                        contact?.messageMetadata
                                                            ?.latestMessageTime
                                                    )
                                                )}
                                            </span>
                                        )}
                                        {contact?.messageMetadata
                                            ?.unreadCount && (
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                                                {
                                                    contact?.messageMetadata
                                                        ?.unreadCount
                                                }
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Chat Area */}
            {selectedCompany ? (
                <div
                    className={`${
                        selectedCompany ? "flex" : "hidden lg:flex"
                    } flex-col lg:w-[calc(100%-336px)] lg:max-w-[calc(100%-336px)] w-full rounded-2xl bg-white border border-[#E7E7E7]`}
                >
                    {/* Chat Header */}
                    <div className="flex md:flex-row flex-col items-center justify-between gap-3 border-b border-[#E7E7E7] p-4 w-full">
                        <div className="flex items-center gap-3 md:w-2/5 w-full">
                            <img
                                src={selectedCompany?.logo || NoProfile}
                                alt="Profile"
                                className="rounded-full aspect-square object-cover w-12 h-12"
                            />
                            <h2 className="text-xl font-semibold w-4/5 truncate">
                                {selectedCompany?.companyName || "Mac Jonathan"}
                            </h2>
                        </div>
                        <div className="flex items-center justify-between gap-4 md:w-1/2 w-full">
                            <div className="flex items-center gap-4 w-11/12">
                                <SelectField
                                    options={applications.data?.data?.map(
                                        (app) => ({
                                            label: app.job?.title,
                                            value: app.application?.id,
                                        })
                                    )}
                                    placeholder="Select"
                                    onChange={(e) =>
                                        setSelectedApplication(e.target.value)
                                    }
                                    value={selectedApplication}
                                    defaultValue={
                                        applications.data?.data[0]?.application
                                            ?.id
                                    }
                                    optionValue="value"
                                />
                                <div>
                                    <Button
                                        pt={{
                                            root: {
                                                className:
                                                    "bg-field text-white border-none outline-none rounded-xl hover:bg-field !shadow-none",
                                            },
                                        }}
                                        icon={<ExternalLinkIcon />}
                                        onClick={openApplication}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedCompany(null)}
                                className="shrink-0 w-8 h-8 mr-2 flex items-center justify-center rounded-md bg-[#F0F0F0]/50"
                                type="button"
                            >
                                <i className="pi pi-times text-black" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    {messagesFromServer.isLoading ? (
                        <Loader isVisible />
                    ) : (
                        <div className="flex flex-col-reverse h-full overflow-auto p-4 gap-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex flex-col ${
                                        message.sender === UserType.company
                                            ? "justify-start items-start"
                                            : "justify-end items-end"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[70%] px-4 py-2 ${
                                            message.sender === UserType.company
                                                ? "bg-[#F6F8FA] md:ml-10 ml-8 rounded-r-xl rounded-tl-xl"
                                                : "bg-primary text-white md:mr-10 mr-8 rounded-s-xl rounded-tr-xl"
                                        }`}
                                    >
                                        <p className="break-words">{message.message}</p>
                                    </div>
                                    <div
                                        className={`flex ${
                                            message.sender === UserType.company
                                                ? "flex-row-reverse"
                                                : "flex-row"
                                        } items-end gap-2`}
                                    >
                                        {message.createdAt && (
                                            <p
                                                className={`text-xs text-[#797C7B] font-medium`}
                                            >
                                                {getTimeOrDate(
                                                    moment(message.createdAt)
                                                )}
                                            </p>
                                        )}
                                        <img
                                            src={
                                                message.sender ===
                                                UserType.company
                                                    ? selectedCompany?.logo ||
                                                      NoProfile
                                                    : UserData.data?.avatar
                                            }
                                            alt="Profile"
                                            className="rounded-full aspect-square md:w-8 w-6 h-6 md:h-8"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="flex items-center gap-4 w-full p-4">
                        <input
                            type="text"
                            placeholder="Type a message"
                            className="w-full text-sm rounded-lg bg-[#F6F8FA] outline-none py-3 px-4"
                            value={inputMessage}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        <AuthButton
                            type="button"
                            icon={
                                <i className="pi pi-send w-full text-center"></i>
                            }
                            customStyle="w-16"
                            onClick={handleSendMessage}
                        />
                    </div>
                </div>
            ) : (
                <div
                    className={`${
                        selectedCompany ? "flex" : "hidden lg:flex"
                    } w-full rounded-2xl bg-white border border-[#E7E7E7]`}
                >
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <div className="aspect-square w-2/5">
                            <img
                                src={NotShortlisted}
                                alt="Not Shortlisted"
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;
