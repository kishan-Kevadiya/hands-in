// Updated Resume Table to match the screenshot layout

import { createSignal, createMemo, onMount, onCleanup, startTransition, Suspense, Match, Switch, For, lazy, Show } from "solid-js";
import { useQuery } from "@tanstack/solid-query";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { PAGE_SIZE } from "@utils/index";
import { ASSETS, QUERY_KEYS } from "@utils/constants";
import { manualRecruitersApis } from "@apis/manual_recruiters";
import { FormFields } from "@components/form";
import Loader from "@components/Loader";
import { CommentIcon, SendIcon } from "@icons/index";
import { createForm, required, reset, setValue, type SubmitHandler } from "@modular-forms/solid";
import { useMutation } from "@tanstack/solid-query";
import { queryClient } from "@helpers/axios";
import { CustomDateRangePicker } from "@components/date-picker";
import type { PickerValue } from "@rnwonder/solid-date-picker";


import "../../../styles.css";

const CommentsView = lazy(() => import("./CommentsView"));


type ResumeTableProps = {
    requirementId: number;
};

type AddCommentForm = {
    resumeId: number;
    comment: string;
    commentDate: string;
};

type ResumeCardProps = {
    resume: any;
    handleSubmit: (values: AddCommentForm, event: SubmitEvent) => void;
    Form: any;
    Field: any;
    form: any
};

const ResumeCard = (props: ResumeCardProps) => {
    const { resume, handleSubmit, Form, Field, form } = props;

    const [value, setDate] = createSignal<PickerValue>({
        label: '',
        value: {},
    });

    const [showComments, setShowComments] = createSignal<boolean>(false);

    return (
        <div class="resume-card-page card">
            <div class="d-flex align-center justify-between mb-2">
                <a href={`${import.meta.env.VITE_API_BASE_URL}/${ASSETS.RESUMES}/${resume.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="view-full-resume"><strong>{resume.resume} ➚</strong></a>
                <FormFields.Button
                    variant="secondary"
                    onClick={() => {
                        setShowComments(true)
                    }}
                    class="text-center w-100 mt-2"
                >
                    <CommentIcon width={18} class="mr-2" /> {resume.commentCount} Comment{resume.commentCount > 1 ? "s" : ""}
                </FormFields.Button>
            </div>

            <div class="comments-section">
                <Form onSubmit={(values: AddCommentForm, event: SubmitEvent) => {
                    handleSubmit({
                        ...values,
                        resumeId: resume.id
                    }, event);
                    setDate({
                        label: '',
                        value: {},
                    });

                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEYS.MANUAL_RECRUITER.REQ_RESUME_COMMENT_READ, resume.id],
                    });
                }} class="comment-form">
                    <Field name="comment" validate={[required("Comment is required")]}>
                        {(field: { value: string; error?: string }, props: any) => (
                            <FormFields.Textarea
                                {...props}
                                id="quick-comment-input"
                                placeholder="Quick Comment...."
                                value={field.value}
                                error={field.error}
                            />
                        )}
                    </Field>
                    <div class="d-flex align-center gap-2 date-container">
                        <div style={{ flex: 1 }}>
                            <Field name="commentDate" validate={[required("Comment date is required")]}>
                                {(field: { value: string; error?: string }, props: any) => (
                                    <CustomDateRangePicker.SingleDatePicker
                                        {...props}
                                        id="comment-date"

                                        placeholder="Comment Date"
                                        value={value}
                                        onChange={e => {
                                            setValue(form, "commentDate", e.value.selected || "");
                                            setDate(e)
                                        }}
                                        error={field.error}
                                    />
                                )}
                            </Field>
                        </div>
                        <FormFields.Button
                            variant="secondary"
                            type="submit"
                        >
                            <SendIcon height={20} width={18} />
                        </FormFields.Button>
                    </div>
                </Form>

                <div class="comments">
                    <Switch>
                        <Match when={!showComments()}>
                            <div class="text-light">
                                To load comments, please click on the Comments button.
                            </div>
                        </Match>
                        <Match when={showComments()}>
                            <Suspense fallback={<div>Loading comments...</div>}>
                                <Show
                                    when={resume.commentCount > 0}
                                    fallback={
                                        <div class="text-info">
                                            No comments yet.
                                        </div>
                                    }
                                >
                                    <CommentsView resumeId={resume.id} />
                                </Show>
                            </Suspense>
                        </Match>
                    </Switch>
                </div>
            </div>

        </div>
    );
};


const ResumeTable = (props: ResumeTableProps) => {
    const [pagination, setPagination] = createSignal({ pageIndex: 1, limit: PAGE_SIZE });
    const [search, setSearch] = createSignal("");
    const searchSubject = new Subject<string>();
    let searchSubscription: any;

    const [form, { Form, Field }] = createForm<AddCommentForm>({
        initialValues: {
            comment: "",
            commentDate: "",
        },
    });

    onMount(() => {
        searchSubscription = searchSubject.pipe(debounceTime(300)).subscribe((value) => {
            startTransition(() => {
                setSearch(value);
                setPagination((p) => ({ ...p, pageIndex: 1 }));
            });
        });
    });

    onCleanup(() => {
        searchSubscription?.unsubscribe();
    });

    function handleSearchInput(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        searchSubject.next(value);
    }

    const query = useQuery(() => ({
        queryKey: [QUERY_KEYS.MANUAL_RECRUITER.REQ_RESUME_READ, props.requirementId, pagination().pageIndex, pagination().limit, search()],
        queryFn: () => manualRecruitersApis.getResumesWithCommentsByRequirementId(
            props.requirementId,
            { page: pagination().pageIndex, limit: pagination().limit, search: search() }
        ),
        keepPreviousData: true,
        refetchOnWindowFocus: true
    }));

    const addCommentMutation = useMutation<any, unknown, AddCommentForm & { resumeId: number }, unknown>(
        () => ({
            mutationFn: (body: AddCommentForm) => manualRecruitersApis.addCommentToResume(
                body.resumeId,
                {
                    comment: body.comment,
                    commentDate: body.commentDate,
                }),
            onSuccess: (data) => {
                if (data && data.message) {
                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEYS.MANUAL_RECRUITER.REQ_RESUME_COMMENT_READ],
                    });
                }
            },
        }),
    );

    const resumes = createMemo(() => Array.isArray(query.data?.data) ? query.data.data : []);
    const totalResumes = createMemo(() => query.data?.totalCount ?? 0);

    const handleSubmit: SubmitHandler<AddCommentForm> = async (values) => {
        addCommentMutation.mutateAsync({
            ...values,
            commentDate: new Date(values.commentDate).toJSON(),
            resumeId: values.resumeId
        })

        reset(form);
    };

    return (
        <div class="resume-list-page">
            <div class="d-flex justify-between items-center card">
                <div class="d-flex align-center gap-2">
                    <h3>Resumes ({totalResumes()})</h3>
                    <FormFields.CircleButton href={`/manual-recruiter/requirement/resume/${props.requirementId}/add`} />
                </div>
                <FormFields.Input
                    type="search"
                    placeholder="Search resume..."
                    value={search()}
                    onInput={handleSearchInput}
                    disabled={query.isFetching && !query.isLoading}
                />
            </div>

            <Switch>
                <Match when={query.isLoading}><Loader /></Match>
                <Match when={query.isError}><div>Error loading resumes.</div></Match>
                <Match when={!query.isLoading}>
                    <Suspense fallback={<Loader />}>
                        <For each={resumes()}>
                            {(resume) => (
                                <ResumeCard
                                    resume={resume}
                                    Field={Field}
                                    Form={Form}
                                    handleSubmit={handleSubmit}
                                    form={form}
                                />
                            )}
                        </For>
                    </Suspense>
                </Match>
            </Switch>
        </div>
    );
};

export default ResumeTable;
