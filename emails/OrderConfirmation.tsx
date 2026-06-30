import {
  Body, Container, Head, Heading, Hr, Html, Preview,
  Section, Text, Row, Column,
} from '@react-email/components';
import * as React from 'react';

interface Props {
  customerName: string;
  orderNumber: string;
  serviceType: 'repair' | 'new_wig';
}

export function OrderConfirmationEmail({ customerName, orderNumber, serviceType }: Props) {
  const firstName = customerName.split(' ')[0];
  const isRepair = serviceType === 'repair';

  return (
    <Html>
      <Head />
      <Preview>We received your {isRepair ? 'repair request' : 'new wig order'} — {orderNumber}</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Text style={logo}>✂ Wig Repair Studio</Text>
          </Section>

          {/* Gold bar */}
          <Section style={goldBar} />

          {/* Main content */}
          <Section style={content}>
            <Heading style={h1}>Request Received</Heading>
            <Text style={greeting}>Hi {firstName},</Text>
            <Text style={body_text}>
              Thank you for contacting Wig Repair Studio. We've received your{' '}
              {isRepair ? 'repair request' : 'new wig order'} and will review it shortly.
            </Text>

            {/* Order number box */}
            <Section style={orderBox}>
              <Text style={orderLabel}>YOUR ORDER NUMBER</Text>
              <Text style={orderNumber_style}>{orderNumber}</Text>
              <Text style={orderHint}>Save this to track your order status at any time.</Text>
            </Section>

            {/* What happens next */}
            <Text style={sectionTitle}>WHAT HAPPENS NEXT</Text>
            <Hr style={divider} />

            <Row style={stepRow}>
              <Column style={stepNum}><Text style={stepNumText}>1</Text></Column>
              <Column style={stepContent}>
                <Text style={stepTitle}>We Review Your Request</Text>
                <Text style={stepBody}>Our team will review your photos and details within 1–2 business days.</Text>
              </Column>
            </Row>

            <Row style={stepRow}>
              <Column style={stepNum}><Text style={stepNumText}>2</Text></Column>
              <Column style={stepContent}>
                <Text style={stepTitle}>We Send You a Quote</Text>
                <Text style={stepBody}>You'll receive a personalized quote via email. No obligation to proceed.</Text>
              </Column>
            </Row>

            <Row style={stepRow}>
              <Column style={stepNum}><Text style={stepNumText}>3</Text></Column>
              <Column style={stepContent}>
                <Text style={stepTitle}>{isRepair ? 'Mail Us Your Wig' : 'We Source Your Wig'}</Text>
                <Text style={stepBody}>
                  {isRepair
                    ? 'Once you approve the quote, mail your wig to our studio. We handle the rest.'
                    : 'Once you approve the quote, we begin sourcing and crafting your custom wig.'}
                </Text>
              </Column>
            </Row>

            <Hr style={divider} />

            <Text style={body_text}>
              Questions? Reply to this email or visit our contact page — we're happy to help.
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

export default OrderConfirmationEmail;

// Styles
const body = { backgroundColor: '#faf9f7', fontFamily: 'Georgia, serif', margin: 0, padding: '40px 0' };
const container = { maxWidth: '560px', margin: '0 auto', backgroundColor: '#ffffff', border: '1px solid #e8e0d5' };
const header = { backgroundColor: '#1a1a1a', padding: '24px 32px' };
const logo = { color: '#c9a84c', fontSize: '18px', fontWeight: '600', letterSpacing: '2px', margin: 0, textTransform: 'uppercase' as const };
const goldBar = { backgroundColor: '#c9a84c', height: '3px' };
const content = { padding: '40px 40px 32px' };
const h1 = { color: '#1a1a1a', fontSize: '28px', fontWeight: '400', margin: '0 0 16px', letterSpacing: '1px' };
const greeting = { color: '#1a1a1a', fontSize: '16px', margin: '0 0 12px' };
const body_text = { color: '#5a534a', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' };
const orderBox = { backgroundColor: '#faf9f7', border: '1px solid #c9a84c', padding: '24px', margin: '0 0 32px', textAlign: 'center' as const };
const orderLabel = { color: '#8a8078', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '0 0 8px' };
const orderNumber_style = { color: '#c9a84c', fontSize: '28px', fontWeight: '700', fontFamily: 'monospace', margin: '0 0 8px', letterSpacing: '2px' };
const orderHint = { color: '#8a8078', fontSize: '12px', margin: 0 };
const sectionTitle = { color: '#8a8078', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '0 0 12px' };
const divider = { borderColor: '#e8e0d5', margin: '0 0 20px' };
const stepRow = { marginBottom: '16px' };
const stepNum = { width: '36px', verticalAlign: 'top' };
const stepNumText = { backgroundColor: '#1a1a1a', color: '#c9a84c', fontSize: '12px', fontWeight: '700', width: '28px', height: '28px', lineHeight: '28px', textAlign: 'center' as const, margin: '2px 0 0' };
const stepContent = { paddingLeft: '12px' };
const stepTitle = { color: '#1a1a1a', fontSize: '14px', fontWeight: '600', margin: '0 0 4px' };
const stepBody = { color: '#5a534a', fontSize: '13px', lineHeight: '1.5', margin: 0 };
const footer = { backgroundColor: '#faf9f7', borderTop: '1px solid #e8e0d5', padding: '24px 40px' };
const footerText = { color: '#8a8078', fontSize: '11px', margin: '0 0 4px', textAlign: 'center' as const };
