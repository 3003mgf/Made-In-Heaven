import React, { useContext, useEffect } from 'react';
import styles from "./CheckoutShip.module.css";
import { GlobalContext } from '../../../context/globalContext';
import { Translate } from 'react-auto-translate';


const ShippingCard = ({title, img, description, price}) => {
  
  const globalContext = useContext(GlobalContext);
  const { shippingMethod, setShippingMethod } = globalContext;

  return ( 
    <div className={styles.wrapper}>
      <div onClick={()=> setShippingMethod(title)} className={`${styles.container} ${shippingMethod === title && styles.selected}`}>
        <div className={styles.left}>
          <h4>{title}</h4>
          <p><Translate>{description}</Translate></p>
        </div>
        <div className={styles.right}>
          <div className={styles.img}>
            {
              title === "Free" ? <i className="fa-solid fa-dolly"></i> : title === "Express" ? <i className="fa-solid fa-truck-fast"></i> : <i className="fa-solid fa-plane-departure"></i>
            }
          </div>
          <div className={styles.price}>
            <span>${price}</span>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default ShippingCard;