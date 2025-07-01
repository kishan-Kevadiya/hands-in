import type { Component } from 'solid-js';
import { useQuery } from '@tanstack/solid-query';
import { Show } from 'solid-js';

import { formatRupee } from '@utils';
import { UptrendArrowIcon } from '@icons/index';
import { QUERY_KEYS } from '@utils/constants';
import { financialTransactionsApis } from '@apis/finanacial_transactions';

import "./styles.css"


const RevenueCards: Component = () => {
    const query = useQuery(() => ({
        queryKey: [QUERY_KEYS.FINANCES.ANALYTICS],
        queryFn: () => financialTransactionsApis.getSummary(),
    }));

    return (
        <Show when={query.data}>
            {(revenueData) => (
                <section class="revenue-cards">
                    <article class="revenue-card-item" data-type="revenue">
                        <p class="revenue-card-title">Revenue</p>
                        <h2 class="revenue-card-value">{formatRupee(revenueData().revenue)}</h2>
                        <small>*Total earnings</small>
                        <span class='icon'>
                            <UptrendArrowIcon />
                        </span>
                    </article>
                    <article class="revenue-card-item" data-type="expense">
                        <p class="revenue-card-title">Expense</p>
                        <h2 class="revenue-card-value">{formatRupee(revenueData().expense)}</h2>
                        <small>*Total expenses</small>
                        <span class='icon'>
                            <UptrendArrowIcon />
                        </span>
                    </article>
                    <article class="revenue-card-item" data-type="profit">
                        <p class="revenue-card-title">Profit</p>
                        <h2 class="revenue-card-value">{formatRupee(revenueData().profit)}</h2>
                        <small>
                            {((revenueData().profit / revenueData().revenue) * 100).toFixed(2)}% Profite
                        </small>
                    </article>
                    <article class="revenue-card-item" data-type="ratio">
                        <p class="revenue-card-title">R/E Ratio</p>
                        <h2 class="revenue-card-value">{revenueData().revenueExpenseRatio.toFixed(2)}</h2>
                        <small>*Total ratio of earnings and expenses</small>
                    </article>
                </section>
            )}
        </Show>
    );
};

export default RevenueCards;
