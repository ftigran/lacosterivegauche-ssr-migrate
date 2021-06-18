import { Doc } from '../StatDetails/check-list';

export type RefundType = {
  id?: number;
  date: string;
  status: string;
  docStatusName?: string | null;
  refund: number | null;
  refundStatus: string | null;
  moderateReason?: string | null;
};

export const convertDocToRefundType = (docs: Array<Doc>): Array<RefundType> =>
  docs.map((d) => ({
    id: d.id,
    date: d.created_at,
    status: d.doc_status.title,
    docStatusName: d.doc_status.name,
    refund: d.cache?.value ? parseFloat(d.cache.value) : null,
    refundStatus: d.cache?.cache_status.title ?? null,
    moderateReason: d.moderate_reason?.title,
  }));
