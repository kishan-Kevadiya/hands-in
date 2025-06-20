import CertificateIcon from '@/assets/svg/Certificate'
import ResumeIcon from '@/assets/svg/ResumeIcon'
import UploadDocumentIcon from '@/assets/svg/UploadDocument'
import UploadIcon from '@/assets/svg/UploadIcon'
import AuthButton from '@/components/ui/auth/AuthButton'
import AuthInput from '@/components/ui/auth/AuthInput'
import SecondaryButton from '@/components/ui/auth/SecondaryButton'
import ButtonLoader from '@/components/ui/loader/ButtonLoader'
import ConfirmationModal from '@/components/ui/modals/ConfirmationModal'
import { UserAdditionalDocuments, UserDeleteAdditionalDocument, UserOnboarding } from '@/helpers/apis/account-setup'
import { getProfile } from '@/helpers/apis/profile'
import { USE_QUERY_KEYS } from '@/helpers/constants'
import { showToast } from '@/helpers/helper'
import queryClient from '@/helpers/query.config'
import { BROWSE_JOBS } from '@/routes'
import { UploadResumeCertificateField, uploadResumeCertificateSchema } from '@/types/accountSetup.types'
import { FileType } from '@/types/general.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

const UploadResumeCertificate: React.FC<{ onNext: () => void, onPrevious: () => void }> = ({ onNext, onPrevious }) => {

    const navigate = useNavigate();

    const [deleteDocumentModalVisible, setDeleteDocumentModalVisible] = useState({
        resume: false,
        otherDocumentId: "",
    });
    const [nextButtonLoader, setNextButtonLoader] = useState<boolean>(false);
    const [otherDocumentLoader, setOtherDocumentLoader] = useState<boolean>(false);

    const uploadResumeCertificateForm = useForm<UploadResumeCertificateField>({
        defaultValues: {
            resume: null,
        },
        mode: "all",
        resolver: zodResolver(uploadResumeCertificateSchema),
    });


    const ProfileDetails = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_PROFILE],
        queryFn: async () => await getProfile(),
    })

    const refeshProfile = () => {
        queryClient.invalidateQueries({
            queryKey: [USE_QUERY_KEYS.GET_PROFILE],
        });
    };

    const onSubmit = async (data: UploadResumeCertificateField) => {
        setNextButtonLoader(true);
        const formData = new FormData();
        formData.append("resume", data.resume instanceof File ? data.resume : new File([], ""));
        try {
            await UserOnboarding(formData);
        } catch (error) {
            console.error(error);
        }
        onNext();
        navigate(BROWSE_JOBS)
        setNextButtonLoader(false);
    }

    const uploadAdditionalDocument = async (document: File, documentName: string) => {
        try {
            const additionalDocumentsFormData = new FormData();
            additionalDocumentsFormData.append("document", document);
            additionalDocumentsFormData.append("name", documentName);
            await UserAdditionalDocuments(additionalDocumentsFormData);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteAdditionalDocument = async (documentId: string) => {
        try {
            await UserDeleteAdditionalDocument(documentId);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (ProfileDetails.data) {

            if (ProfileDetails.data?.user.resume && ProfileDetails.data?.user.resume as FileType) {
                uploadResumeCertificateForm.setValue("resume", {
                    id: ProfileDetails.data.user.resume.id,
                    name: ProfileDetails.data.user.resume.name,
                    url: ProfileDetails.data.user.resume.url,
                    type: "application/pdf",
                    size: 0
                });
            }
            if (ProfileDetails.data?.user.otherDocuments) {
                const otherDocument = {
                    document: ProfileDetails.data.user.otherDocuments.map((document) => ({
                        id: document.id,
                        name: document.name,
                        url: document.url,
                    }))[0],
                };
                uploadResumeCertificateForm.setValue("otherDocument", otherDocument);
            }
        }
    }, [ProfileDetails.data])

    return (
        <form className='flex flex-col gap-10'>
            {/* <UploadResume /> */}
            {
                uploadResumeCertificateForm.watch("resume") ? (
                    <div className="flex items-center justify-between bg-[#F4F4F4] py-2 px-3 rounded-xl md:w-1/3 w-full">
                        <div className="flex items-center gap-2 w-10/12">
                            <div className=''>
                                <ResumeIcon />
                            </div>
                            <a
                                href={(uploadResumeCertificateForm.watch("resume") as FileType).url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold truncate break-words">
                                {(uploadResumeCertificateForm.watch("resume") as FileType).name}
                            </a>
                        </div>
                        <i onClick={() => uploadResumeCertificateForm.setValue("resume", null)} className="pi pi-times text-white text-xs text-center bg-[#353535] p-1.5 rounded-full cursor-pointer"></i>
                    </div>
                ) : (
                    <div className="md:w-sm w-full p-8 rounded-3xl border-2 border-dashed border-primary/80">
                        <div className="flex flex-col items-center md:space-y-6 space-y-4">
                            <div>
                                <UploadIcon />
                            </div>

                            <div className="text-center">
                                <h2 className="md:text-xl text-lg text-[#8B8B8B] font-medium">
                                    Upload your resume as a <span className="text-primary">.pdf</span>
                                </h2>
                            </div>

                            <label htmlFor='pdf-upload' className='w-full flex items-center justify-center cursor-pointer'>
                                <input
                                    id="pdf-upload"
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    {...uploadResumeCertificateForm.register("resume", { onChange: (e) => uploadResumeCertificateForm.setValue("resume", e.target.files?.[0]) })}
                                />

                                <SecondaryButton
                                    type='button'
                                    onClick={() => {
                                        document.getElementById('pdf-upload')?.click();
                                    }}
                                    customStyle="py-2.5 md:w-fit w-1/2"
                                    label="Select File" />
                            </label>
                        </div>
                    </div>
                )
            }

            <div className='flex flex-col gap-5'>
                <h1 className="lg:text-4xl text-2xl font-semibold tracking-[-1px]">
                    Upload additional documents(certificate, LOR etc)
                </h1>

                {/* <UploadCertificate /> */}

                <div className='flex md:flex-row flex-col gap-5'>
                    <div className='flex flex-col gap-5 md:border-r border-[#E9E9E9] md:pr-14 lg:w-1/3 md:2/5 w-full'>
                        <AuthInput
                            register={uploadResumeCertificateForm.register(`otherDocument.documentName`)}
                            label='Document Name'
                            placeholder="Enter here"
                            errorMsg={uploadResumeCertificateForm.formState.errors.otherDocument?.documentName}
                        />

                        <div className="flex flex-wrap items-center gap-6 w-full">
                            <div className="flex flex-col items-center md:w-fit">
                                <label htmlFor={`file-upload-${0}`} className="cursor-pointer">
                                    <div className="flex flex-col items-center gap-3">
                                        <UploadDocumentIcon />
                                        {/* <p className="text-black text-lg font-medium">Drag file here</p> */}
                                    </div>
                                </label>
                                {/* <p className="text-gray-500 text-lg font-medium">or</p> */}
                                <input
                                    id={`file-upload-${0}`}
                                    type="file"
                                    className="hidden"
                                    accept="application/doc, application/docx"
                                    {...uploadResumeCertificateForm.register(`otherDocument.document`)}
                                    onChange={async (e) => {
                                        if (e.target.files) {
                                            const document = e.target.files[0];
                                            const documentName = uploadResumeCertificateForm.getValues(`otherDocument.documentName`); // or get the name from somewhere else

                                            if (!document || !documentName?.trim()) {
                                                showToast("error", "Please enter a document name");
                                                return;
                                            }
                                            setOtherDocumentLoader(true);
                                            await uploadAdditionalDocument(document, documentName);
                                            await refeshProfile();
                                            setOtherDocumentLoader(false);
                                            uploadResumeCertificateForm.setValue(`otherDocument.documentName`, "");
                                            uploadResumeCertificateForm.setValue(`otherDocument.document`, null);
                                        }
                                    }}
                                />

                                <AuthButton
                                    type="button"
                                    customStyle="py-2 mt-2 w-full"
                                    onClick={() => {
                                        document.getElementById(`file-upload-${0}`)?.click();
                                    }}
                                >
                                    {otherDocumentLoader ? <ButtonLoader isVisible /> : "Browse"}
                                </AuthButton>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 lg:w-2/3'>
                        <div className="flex flex-wrap gap-y-2 gap-x-6 items-center gap-2">

                            {ProfileDetails.data?.user.otherDocuments.map((doc, index) => (
                                <div key={index} className="flex flex-col gap-2 md:w-2/5 w-full">
                                    <p className='text-black text-lg font-semibold'>{doc.name}</p>
                                    {doc && (
                                        <div className='flex items-center justify-between bg-[#F4F4F4] py-2 px-3 rounded-xl'>
                                            <a
                                                href={`${doc.url}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 w-10/12"
                                            >
                                                <div>
                                                    <CertificateIcon />
                                                </div>
                                                <p className="text-sm font-semibold truncate break-words">
                                                    {doc?.name}
                                                </p>
                                            </a>
                                            <i
                                                onClick={() => { setDeleteDocumentModalVisible({ resume: true, otherDocumentId: doc.id }); }}
                                                className="pi pi-times text-white text-xs text-center bg-[#353535] p-1.5 rounded-full cursor-pointer"></i>
                                        </div>
                                    )}
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4">
                <SecondaryButton
                    customStyle="md:w-1/4 w-1/2 py-2.5 px-0 rounded-xl"
                    type="button"
                    label="Previous"
                    onClick={onPrevious}
                />

                <AuthButton
                    customStyle="md:w-2/5 w-1/2"
                    type="button"
                    disabled={nextButtonLoader}
                    onClick={uploadResumeCertificateForm.handleSubmit(onSubmit)}
                >
                    {nextButtonLoader ? <ButtonLoader isVisible /> : "Next"}
                </AuthButton>
            </div>

            {/* Other Documents Delete Confirmation Modal */}
            <ConfirmationModal
                buttonLabel={"Yes, Delete"}
                visible={deleteDocumentModalVisible.resume}
                setVisible={() => setDeleteDocumentModalVisible({ ...deleteDocumentModalVisible, resume: false })}
                header="Delete Document"
                message="Are you certain you wish to proceed with delete this document?"
                onClick={async () => {
                    setDeleteDocumentModalVisible({ ...deleteDocumentModalVisible, resume: false });
                    if (deleteDocumentModalVisible.otherDocumentId !== null) {
                        await deleteAdditionalDocument(deleteDocumentModalVisible.otherDocumentId);
                        await refeshProfile();
                    }
                }}
            />
        </form>
    )
}

export default UploadResumeCertificate
