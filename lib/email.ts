import { Resend } from 'resend';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';
import { StatusUpdateEmail } from '@/emails/StatusUpdate';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = 'Wig Repair Studio <noreply@wigfrom.com>'; // update with real domain once set

export async function sendOrderConfirmation({
  to,
  customerName,
  orderNumber,
  serviceType,
}: {
  to: string;
  customerName: string;
  orderNumber: string;
  serviceType: 'repair' | 'new_wig';
}) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: `We received your request — ${orderNumber}`,
    react: OrderConfirmationEmail({ customerName, orderNumber, serviceType }),
  });
}

const STATUS_SUBJECTS: Record<string, string> = {
  'Quote Sent': 'Your quote is ready',
  'Waiting for Wig': 'Next step: mail us your wig',
  'In Repair': 'Your wig is now in repair',
  'Ready for Payment': 'Your wig is ready — final payment due',
  'Shipped Back': 'Your wig has been shipped back',
  'Completed': 'Your order is complete — thank you!',
  'Canceled': 'Your order has been canceled',
};

export async function sendStatusUpdate({
  to,
  customerName,
  orderNumber,
  status,
  customerVisibleNotes,
}: {
  to: string;
  customerName: string;
  orderNumber: string;
  status: string;
  customerVisibleNotes?: string | null;
}) {
  const subject = STATUS_SUBJECTS[status];
  if (!subject) return; // don't email for internal-only statuses

  await resend.emails.send({
    from: FROM,
    to,
    subject: `${subject} — ${orderNumber}`,
    react: StatusUpdateEmail({ customerName, orderNumber, status, customerVisibleNotes }),
  });
}
