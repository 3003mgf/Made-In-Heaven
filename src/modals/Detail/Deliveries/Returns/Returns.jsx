import React from 'react';
import styles from "./Returns.module.css";


const ReturnsDel = ({openReturns, setOpenReturns}) => {
  return ( 
    <article className={styles.article} style={{right: openReturns ? "0px" : "-200vw", opacity: openReturns ? 1 : 0}}>
      <div className={styles.div}>
        <div className={styles.title}>
          <i className='bx bx-chevron-left' onClick={()=> setOpenReturns(false)}></i>
          <span>Returns & Exchanges</span>
        </div>
        <div className={styles.container}>
          <h2><b>Returns</b></h2>
          <ul>
            <li><span>Register your return online or contact Customer Service:</span> To register online, log in to your MIH account. Contact Customer Service at +52 800 999 1807</li>
            <li><span>Prepare your package:</span> Place your item in its original packaging and with the original receipt.</li>
            <li><span>Place the prepaid label, included in your order, on your package:</span> Cover the old address labels with the new prepaid label and securely close your package with the adhesive strip on the inside of the box.</li>
            <li><span>Drop off your package:</span> Drop off your package at any UPS store.</li>
          </ul>

          <div className='mt-5'>
            <h2><b>Exchanges</b></h2>
          </div>
          <ul>
            <li><span>Call Customer Service:</span> +52 800 999 1807</li>
            <li><span>Delivery of your item:</span> Follow the instructions in the returns section for delivery of your order. Your return will be processed and your new item will be shipped.</li>
          </ul>

          <div className='mt-5'>
            <h2><b>Policy</b></h2>
          </div>
          <ul>
            <li>Free exchanges and returns within 30 days.</li>
            <li>Item in perfect condition and suitable for sale</li>
            <li>Original Packaging</li>
            <li>Original invoice, brochures and certificates</li>
            <li>Exchanges or returns are not allowed on personalized items, Now Yours, products with hot stamping, personalized sneakers, engraved products, custom-made items, watches and fine jewelry.</li>
          </ul>
        </div>
      </div>
    </article>
   );
}
 
export default ReturnsDel;