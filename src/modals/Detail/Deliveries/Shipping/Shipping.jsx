import React from 'react';
import styles from "./Shipping.module.css";
import { Translate } from 'react-auto-translate';

const ShippingDel = ({openShipping, setOpenShipping}) => {
  return ( 
    <article className={styles.article} style={{right: openShipping ? "0px" : "-200vw", opacity:openShipping ? 1 : 0}}>
      <div className={styles.div}>
        <div className={styles.title}>
          <i className='bx bx-chevron-left' onClick={()=> setOpenShipping(false)}></i>
          <span><Translate>Shipping</Translate>></span>
        </div>
        <div className={styles.container}>
          {/* IMPORTANT DATA */}
          <h2><b><Translate>Important data</Translate>></b></h2>
          <ul>
            <li><span className={styles.underline}>Orders may take 24 to 36 hours to process</span> , once your order has been processed you will receive an email confirming that your order has been shipped</li>
            <li><span className={styles.underline}>Shipping costs and delivery time begin</span> when you receive the shipping confirmation email.</li>
            <li><span className={styles.underline}>Additional validation</span> may be required on some orders and this may delay delivery.</li>
            <li><span className={styles.underline}>A signature is required</span> for all deliveries over 1000 USD</li>
            <li><span className={styles.underline}>To track your order</span> , visit your MIH account or the shipping confirmation email</li>
          </ul>

          {/* SHIPPING COST  */}
          {/* ecological delivery */}
          <h2 className={styles.title2}><b>Shipping Costs & Delivery Time</b></h2>
          <div className={styles.subTitle}>
            <span className={styles.subTitle}>ECOLOGICAL DELIVERY</span>
          </div>
          <ul>
            <li><span></span>This ground delivery option has the least impact on the environment, as it emits 92% less CO2 than air delivery.</li>
            <li><span>Rate:</span> No cost for all orders</li>
            <li><span>Delivery time:</span> 2-5 business days from receiving the shipping confirmation email</li>
            <li className={styles.subLi}>
            <span>Exceptions:</span>
            <ul>
              <li>If a standard order is placed over the weekend, the earliest it will ship is Monday</li>
              <li>Additional validation may be required on your order and this may delay delivery.</li>
            </ul>
            </li>
          </ul>

          {/* express delivery */}
          <div className={styles.subTitle}>
            <span>EXPRESS DELIVERY</span>
          </div>
          <ul>
            <li><span>Rate:</span> No cost for all orders</li>
            <li><span>Delivery time:</span> 1-4 business days from receiving the shipping confirmation email</li>
            <li className={styles.subLi}>
            <span>Exceptions:</span>
            <ul>
              <li>Some zip codes are not available for this service</li>
              <li>Additional validation may be required on your order and this may delay delivery.</li>
            </ul>
            </li>
          </ul>

          {/* now yours products */}
          <div className={styles.subTitle}>
            <span>NOW YOURS PRODUCTS</span>
          </div>
          <ul>
            <li><span>Rate:</span> No cost for all orders</li>
            <li><span>Delivery time:</span>Please allow up to 8 weeks for bags and small leather items and 12 weeks for travel luggage for delivery from the time you receive your order confirmation email</li>
            <li className={styles.subLi}>
              <span>Exceptions:</span> Express shipping is not available. Additional validation may be required on your order and this may delay delivery.
            </li>
          </ul>

          {/* engraving */}
          <div className={styles.subTitle} style={{paddingBottom:"0.8rem"}}>
            <span>ENGRAVING OF FRAGANCES</span>
          </div>
          <span className={styles.spanThin}>Please allow us one additional business day processing time for all bottle engraving orders.</span>
        
          {/* store pickup */}
          <h2 style={{paddingTop:"5rem", paddingBottom:"0.5rem"}}>STORE PICKUP</h2>
          <span className={styles.spanThin}>Not available at the moment</span>
        
          {/* signature required */}
          <h2 style={{paddingTop:"4rem", paddingBottom:"1rem"}}>Signature Required</h2>
          <span className={styles.spanThin}>Due to the high value of our products, a signature will be required on all orders over 1000 USD regardless of the delivery service.</span>
          <div className='mt-3'>
            <span className={styles.spanThin}>The processing and delivery costs mentioned above are for the merchandise shown and described on madeinheaven.com; Costs are calculated according to the total cost of the merchandise in your order. All orders are shipped via MIH.</span>
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default ShippingDel;