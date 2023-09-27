import React, { useState } from 'react';
import styles from "./Deliveries.module.css";
import PaymentsDel from './Payment/Payment';
import ShippingDel from './Shipping/Shipping';
import ReturnsDel from './Returns/Returns';
import PackingDel from './Packing/Packing';



const DeliveriesModal = ({setOpenDelModal, openDelModal}) => {
  
  const [openPayment, setOpenPayment] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);
  const [openReturns, setOpenReturns] = useState(false);
  const [openPacking, setOpenPacking] = useState(false);
  
  return ( 
    <article className={styles.article} style={{right: openDelModal ? "0px" : "-200vw", opacity: openDelModal ? 1 : 0}}>
      <PaymentsDel openPayment={openPayment} setOpenPayment={setOpenPayment}/>
      <ShippingDel openShipping={openShipping} setOpenShipping={setOpenShipping}/>
      <ReturnsDel openReturns={openReturns} setOpenReturns={setOpenReturns}/>
      <PackingDel openPacking={openPacking} setOpenPacking={setOpenPacking}/>
      
      <div className={styles.div}>
        <div className={styles.title}>
          <span>Deliveries and Returns</span>
          <i className='bx bx-x' onClick={()=> setOpenDelModal(false)}></i>
        </div>
        <div className={styles.container}>
          <div className={styles.each} onClick={()=> setOpenPayment(true)}>
            <div className={styles.eachLeft}>
              <span>Payment</span>
              <span>Accepted credit cards: Visa, American Express and MasterCard</span>
            </div>
            <i className='bx bx-chevron-right'></i>
          </div>
          <div className={styles.each} onClick={()=> setOpenShipping(true)}>
            <div className={styles.eachLeft}>
              <span>Shipping</span>
              <span>Complimentary standard shipping</span>
            </div>
            <i className='bx bx-chevron-right'></i>
          </div>
          <div className={styles.each} onClick={()=> setOpenReturns(true)}>
            <div className={styles.eachLeft}>
              <span>Returns & Exchanges</span>
              <span>Free of charge</span>
            </div>
            <i className='bx bx-chevron-right'></i>
          </div>
          <div className={styles.each} onClick={()=> setOpenPacking(true)}>
            <div className={styles.eachLeft}>
              <span>Packing</span>
              <span>Contemporary and ecological packaging, inspired by our heritage</span>
            </div>
            <i className='bx bx-chevron-right'></i>
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default DeliveriesModal;