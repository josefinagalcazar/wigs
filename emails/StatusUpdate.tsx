import {
  Body, Container, Head, Heading, Hr, Html, Preview,
  Section, Text,
} from '@react-email/components';
import * as React from 'react';

interface Props {
  customerName: string;
  orderNumber: string;
  status: string;
  customerVisibleNotes?: string | null;
}

const STATUS_CONFIG: Record<string, {
  icon: string;
  headline: string;
  body: string;
  nextStep?: string;
}> = {
  'Quote Sent': {
    icon: '💬',
    headline: 'Your Quote Is Ready',
    body: 'We've reviewed your request and prepared a personalized quote for you. Please review the details below.',
    nextStep: 'Reply to this email to approve your quote and get started.',
  },
  'Waiting for Wig': {
    icon: '📦',
    headline: 'Please Mail Us Your Wig',
    body: 'Your quote has been approved — thank you! The next step is to mail your wig to our studio.',
    nextStep: 'We'll send you our mailing address separately. Please use a tracked shipping method.',
  },
  'In Repair': {
    icon: '✂️',
    headline: 'Your Wig Is In Our Hands',
    body: 'We've received your wig and repair work has begun. Our skilled technicians are taking great care of it.',
    nextStep: 'We'll update you again when your wig is ready.',
  },
  'Ready for Payment': {
    icon: '💳',
    headline: 'Your Wig Is Ready',
    body: 'Great news — your wig has been beautifully restored and is ready to be sent back to you.',
    nextStep: 'Please complete your final payment so we can ship your wig right away.',
  },
  'Shipped Back': {
    icon: '🚚',
    headline: 'Your Wig Has Been Shipped',
    body: 'Your wig is on its way back to you! Keep an eye on your tracking number for delivery updates.',
  },
  'Completed': {
    icon: '✅',
    headline: 'Order Complete — Thank You!',
    body: 'Your order is now complete. We hope you love your wig. It was a pleasure working with you.',
    nextStep: 'We'd love to see how it looks — feel free to share photos or leave us a review.',
  },
  'Canceled': {
    icon: '❌',
    headline: 'Your Order Has Been Canceled',
    body: 'Your order has been canceled. If you have any questions or would like to resubmit, please don't hesitate to reach out.',
  },
};

export function StatusUpdateEmail({ customerName, orderNumber, status, customerVisibleNotes }: Props) {
  const firstName = customerName.split(' ')[0];
  const config = STATUS_CONFIG[status] ?? {
    icon: '📋',
    headline: `Status Update: ${status}`,
    body: 'Your order status has been updated. Please contact us if you have any questions.',
  };

  return (
    <Html>
      <Head />
      <Preview>{config.headline} — {orderNumber}</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={headerStyle}>
            <Text style={logo}>✂ Wig Repair Studio</Text>
          </Section>

          <Section style={goldBar} />

          {/* Status badge */}
          <Section style={statusBadge}>
            <Text style={statusIcon}>{config.icon}</Text>
            <Text style={statusLabel}>ORDER UPDATE</Text>
          </Section>

          {/* Main content */}
          <Section style={content}>
            <Heading style={h1}>{config.headline}</Heading>
            <Text style={greeting}>Hi {firstName},</Text>
            <Text style={bodyText}>{config.body}</Text>

            {/* Notes from studio */}
            {customerVisibleNotes && (
              <Section style={notesBox}>
                <Text style={notesLabel}>NOTE FROM OUR STUDIO</Text>
                <Text style={notesText}>{customerVisibleNotes}</Text>
              </Section>
            )}

            {/* Next step */}
            {config.nextStep && (
              <>
                <Text style={nextStepLabel}>NEXT STEP</Text>
                <Hr style={divider} />
                <Text style={nextStepText}>{config.nextStep}</Text>
              </>
            )}

            <Hr style={divider} />

            {/* Order number */}
            <Section style={orderRow}>
              <Text style={orderLabel}>ORDER NUMBER</Text>
              <Text style={orderNum}>{orderNumber}</Text>
            </Section>

            <Text style={bodyText}>
              Questions? Simply reply to this email — we're always here to help.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>Wig Repair Studio · Professional Wig Restoration</Text>
            <Text style={footerText}>You received this because you submitted a request on our website.</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

export default StatusUpdateEmail;

// Styles
const body = { backgroundColor: '#faf9f7', fontFamily: 'Georgia, serif', margin: 0, padding: '40px 0' };
const container = { maxWidth: '560px', margin: '0 auto', backgroundColor: '#ffffff', border: '1px solid #e8e0d5' };
const headerStyle = { backgroundColor: '#1a1a1a', padding: '24px 32px' };
const logo = { color: '#c9a84c', fontSize: '18px', fontWeight: '600', letterSpacing: '2px', margin: 0, textTransform: 'uppercase' as const };
const goldBar = { backgroundColor: '#c9a84c', height: '3px' };
const statusBadge = { backgroundColor: '#faf9f7', padding: '24px 40px 8px', textAlign: 'center' as const };
const statusIcon = { fontSize: '36px', margin: '0 0 4px' };
const statusLabel = { color: '#8a8078', fontSize: '10px', letterSpacing: '3px', margin: 0 };
const content = { padding: '24px 40px 32px' };
const h1 = { color: '#1a1a1a', fontSize: '26px', fontWeight: '400', margin: '0 0 16px', letterSpacing: '0.5px' };
const greeting = { color: '#1a1a1a', fontSize: '16px', margin: '0 0 12px' };
const bodyText = { color: '#5a534a', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' };
const notesBox = { backgroundColor: '#faf9f7', borderLeft: '3px solid #c9a84c', padding: '16px 20px', margin: '0 0 24px' };
const notesLabel = { color: '#8a8078', fontSize: '10px', letterSpacing: '3px', margin: '0 0 8px' };
const notesText = { color: '#1a1a1a', fontSize: '14px', lineHeight: '1.6', margin: 0, fontStyle: 'italic' };
const nextStepLabel = { color: '#8a8078', fontSize: '10px', letterSpacing: '3px', margin: '0 0 8px' };
const divider = { borderColor: '#e8e0d5', margin: '0 0 16px' };
const nextStepText = { color: '#1a1a1a', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px', fontWeight: '500' };
const orderRow = { margin: '0 0 20px' };
const orderLabel = { color: '#8a8078', fontSize: '10px', letterSpacing: '3px', margin: '0 0 4px' };
const orderNum = { color: '#c9a84c', fontSize: '20px', fontWeight: '700', fontFamily: 'monospace', margin: 0, letterSpacing: '2px' };
const footer = { backgroundColor: '#faf9f7', borderTop: '1px solid #e8e0d5', padding: '24px 40px' };
const footerText = { color: '#8a8078', fontSize: '11px', margin: '0 0 4px', textAlign: 'center' as const };
