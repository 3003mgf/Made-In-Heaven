import React from 'react';
import styles from "./Payment.module.css";
import { Translate } from 'react-auto-translate';


const PaymentsDel = ({openPayment, setOpenPayment}) => {
  return ( 
    <article className={styles.article} style={{right: openPayment ? "0px" : "-200vw", opacity: openPayment ? 1 : 0}}>
      <div className={styles.div}>
        <div className={styles.title}>
          <i className='bx bx-chevron-left' onClick={()=> setOpenPayment(false)}></i>
          <span><Translate>Payments</Translate></span>
        </div>
        <div className={styles.text}>
          <span>
            <Translate>Payments are accepted by credit card, debit card, PayPal or Stripe with a valid billing address.</Translate>
          </span>
          <span>
            <Translate>When placing an order, your billing address must match the address of the card you will use for payment, otherwise the order cannot be processed.</Translate>
          </span>
          
          <span>
            <Translate>All transactions are secure. The Made In Heaven website has an SSL encryption system to protect personal and payment data.</Translate>
          </span>
        </div>
      </div>
    </article>
   );
}
 
export default PaymentsDel;