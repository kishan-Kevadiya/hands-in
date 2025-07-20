import { QUERY_KEYS } from '@utils/constants';
import { useQuery } from '@tanstack/solid-query';
import type { Component } from 'solid-js';
import { Match, Switch, For } from 'solid-js';
import { manualRecruitersApis } from '@apis/manual_recruiters';

import "../../../styles.css";

type Comment = {
    comment: string;
    commentDate: string;
};

type CommentsViewProps = {
    resumeId: number;
};

const CommentsView: Component<CommentsViewProps> = (props) => {
    const { resumeId } = props;

    const commentQuery = useQuery(() => ({
        queryKey: [QUERY_KEYS.MANUAL_RECRUITER.REQ_RESUME_COMMENT_READ, resumeId],
        queryFn: () => manualRecruitersApis.getCommentsByResumeId(resumeId),
        enabled: !!resumeId,
    }));

    return (
        <div class='comment-one-page'>
            <Switch>
                <Match when={commentQuery.isLoading}>
                    <div>Loading comments...</div>
                </Match>
                <Match when={commentQuery.error}>
                    <div>Error loading comments.</div>
                </Match>
                <Match when={commentQuery.data && commentQuery.data.length === 0}>
                    <div>No comments found.</div>
                </Match>
                <Match when={commentQuery.data && commentQuery.data.length > 0}>
                    <For each={commentQuery.data}>
                        {(item: Comment, index) => (
                            <div class='comment-container'>
                                <p class='comment'>{index() + 1}. {item.comment}</p>
                                <small class='comment-date'>{new Date(item.commentDate).toDateString()}</small>
                            </div>
                        )}
                    </For>
                </Match>
            </Switch>
        </div>
    );
};

export default CommentsView;