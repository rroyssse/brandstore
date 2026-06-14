import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from '../i18n';

export default function CheckoutSteps(props) {
  const { t } = useTranslation();

  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>{t('checkout.signIn')}</Col>
      <Col className={props.step2 ? 'active' : ''}>
        {t('checkout.shipping')}
      </Col>
      <Col className={props.step3 ? 'active' : ''}>
        {t('checkout.payment')}
      </Col>
      <Col className={props.step4 ? 'active' : ''}>
        {t('checkout.placeOrder')}
      </Col>
    </Row>
  );
}
