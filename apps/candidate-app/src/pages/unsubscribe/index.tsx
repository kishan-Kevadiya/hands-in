import { useState } from 'react';
import { Card } from 'primereact/card';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import AuthButton from '@/components/ui/auth/AuthButton';
import { getSubscriberByEmail, unsubscribeMe } from '@/helpers/apis/subscribers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ProgressSpinner } from 'primereact/progressspinner';
import { toast } from 'react-toastify';

const feedbackOptions = [
    { name: 'Emails are too frequent', key: 'frequent' },
    { name: 'Content is not relevant to me', key: 'irrelevant' },
    { name: 'Privacy concerns', key: 'privacy' },
    { name: 'I switched to a different email address', key: 'switched' },
    { name: 'Other reason', key: 'other' }
];

export default function UnsubscribeForm() {
    const searchParams = new URLSearchParams(window.location.search);
    const emailParam = searchParams.get('email') || '';
    const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

    const { data: subscriber, isLoading, isError, refetch } = useQuery({
        queryKey: ['subscriber', emailParam],
        queryFn: () => getSubscriberByEmail(emailParam),
        enabled: !!emailParam,
        retry: false,
    });

    const { mutate: unsubscribe, isPending: isUnsubscribing } = useMutation({
        mutationFn: (data: { email: string; reasons: string }) => unsubscribeMe(data.email, data.reasons),
        onSuccess: () => {
            toast.success('Successfully unsubscribed!');
            refetch()
        },
        onError: (error) => {
            console.error('Unsubscribe failed:', error);
            alert('Failed to unsubscribe. Please try again.');
        },
    });

    const onReasonChange = (e: CheckboxChangeEvent) => {
        setSelectedReasons(prev => {
            if (e.checked) {
                return [...prev, e.value];
            } else {
                return prev.filter(reason => reason !== e.value);
            }
        });
    };

    const handleSubmit = () => {
        const reasons = feedbackOptions.filter(option => selectedReasons.includes(option.key));
        const data = {
            email: emailParam,
            reasons: reasons.map(option => option.name).toString()
        };
        unsubscribe(data);
    };

    const header = (
        <div className="text-center">
            <i className="pi pi-envelope text-4xl text-pink-800 border-circle p-3 bg-gray-100"></i>
        </div>
    );

    if (isLoading) {
        return (
            <div className="grid place-items-center min-h-screen bg-gray-100">
                <ProgressSpinner />
            </div>
        );
    }

    if (isError || !subscriber) {
        return (
            <div className="grid place-items-center min-h-screen bg-gray-100">
                <Card title="Subscriber Not Found" className="lg:w-1/3 p-4 max-w-30rem shadow-2 border-round-lg text-center">
                    <p className="text-gray-600">The email address '{emailParam}' was not found in our mailing list. It may have already been unsubscribed or never existed.</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="grid place-items-center min-h-screen bg-gray-100">
            <Card header={header} className="lg:w-1/3 p-4 max-w-30rem shadow-2 border-round-lg">
                <div className="text-center mb-5">
                    <h2 className="text-3xl font-semibold mb-2 text-primary">Unsubscribe from Emails</h2>
                    <p className="text-gray-600">
                        We're sorry to see you go. Please confirm you want to unsubscribe the following email from our mailing list.
                    </p>
                </div>

                <div className="p-fluid">
                    <div className="p-field mb-4">
                        <h4 className='w-full border-1 text-gray-800 font-bold border-purple-100 px-3 py-2 bg-purple-50 text-center'> {emailParam}</h4>
                    </div>

                    <div className="p-field mb-4 bg-blue-50 border-round p-3">
                        <p className="block text-sm font-semibold text-blue-800 mb-3">Why are you unsubscribing? (Optional)</p>
                        {feedbackOptions.map(option => (
                            <div key={option.key} className='flex align-center mb-2 pointer-events'>
                                <Checkbox
                                    inputId={option.key}
                                    pt={{
                                        root: { className: "!w-5 !h-5" },
                                        box: { className: "!w-5 !h-5 rounded-md border-primary bg-transparent" },
                                        icon: { className: "w-full h-full bg-primary" },
                                    }}
                                    onChange={onReasonChange}
                                    value={option.key}
                                    checked={selectedReasons.includes(option.key)}
                                />
                                <label htmlFor={option.key} className="ml-2 text-sm cursor-pointer">{option.name}</label>
                            </div>
                        ))}
                    </div>

                    <AuthButton label="Unsubscribe Me" onClick={handleSubmit} disabled={isUnsubscribing} />

                    <div className="text-center mt-3 text-sm">
                        <span className="text-gray-600">Changed your mind? </span>
                        <a href="/" className="text-primary font-semibold">Go to home</a>
                    </div>
                </div>

                <div className="mt-5 p-3 bg-pink-50 border-round">
                    <h3 className="font-semibold text-md mb-2">What happens next?</h3>
                    <ul className="list-none p-0 m-0 text-sm text-gray-700">
                        <li className="mb-2">✓ You'll be removed from our mailing list within 24-48 hours</li>
                        <li className="mb-2">✓ You may still receive transactional emails if you have an account</li>
                        <li>✓ You can resubscribe anytime from our website</li>
                    </ul>
                </div>
            </Card>
        </div>
    );
};
