import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./ShippingSection.module.css";
import { GlobalContext } from '../../../context/globalContext';
import ShippingCard from '../../Utils/CheckoutShipping/CheckoutShip';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { Translate } from 'react-auto-translate';

const Shipping = ({totalCart, shippingPrice}) => {

  const globalContext = useContext(GlobalContext);
  const { refTop, shippingInfo, setShippingInfo, setShowPayment, setShowShipping, refToastCheckoutAutocomplete, setShowInfo } = globalContext;

  const handleManualAddress = (e) =>{
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    })
  };

  const handleNext = () =>{
    if(shippingInfo.firstName && shippingInfo.lastName){
      setShowShipping(false);
      setShowPayment(true);
    }else{
      refToastCheckoutAutocomplete.current.show({life: 3000, severity: "warn", summary: "Wait!", detail: "Please complete all fields"});
    }
  };

  // Go back to previous section
  const handleGoBack = () =>{
    setShowInfo(true);
    setShowShipping(false);
  };


  // MAIN UEF
  useEffect(() => {
    refTop.current?.scrollIntoView();
  }, []);



  return ( 
    <div className={styles.wrapper}>

      <div className={styles.goBackIcon} style={{width: "fit-content", cursor:"pointer"}}>
        <HiOutlineArrowNarrowLeft size={20} onClick={handleGoBack}/>
      </div>
      <div className={styles.whiteContainer}>
          <div className={styles.sectionIndicator}>
            <div className={styles.stepIndicator}>
              <span>2</span>
            </div>
            <span className={styles.sectionTitle}><Translate>Delivery Options</Translate></span>
          </div>
          
          <div className={styles.form}>
          <div className='form-floating mb-1 w-100 p-1'>
            <input type="text" id='city' className='form-control' name='firstName' onChange={handleManualAddress} value={shippingInfo.firstName} />
            <label htmlFor="city">First Name</label>
          </div>
          <div className='form-floating mb-1 w-100 p-1'>
            <input type="text" id='city' className='form-control' name='lastName' onChange={handleManualAddress} value={shippingInfo.lastName} />
            <label htmlFor="city">Last Name</label>
          </div>
          {/* <div className='form-floating mb-1 w-100 p-1'>
            <input type="text" id='city' className='form-control' name='email' onChange={handleManualAddress} value={shippingInfo.email} />
            <label htmlFor="city">Email</label>
          </div> */}
          </div>

          <div className={styles.methodsDiv}>
            {/* STEP 2 INFO */}
            <ShippingCard 
              title="Free"
              description={"Your purchase will be delivered in 5 - 7 business days."}
              price={"0"}
            />
            <ShippingCard 
              title="Express"
              description={"Your purchase will be delivered in 3 - 5 business days."}
              price={"5.50"}
            />
            <ShippingCard 
              title="Fasty"
              description={"Your purchase will be delivered in 1 - 3 business days."}
              price={"8.99"}
            />
          </div>

          {/* BUTTON */}
          <div className={styles.next}>
            <button onClick={handleNext}><Translate>Continue</Translate></button>
          </div>
      </div>
      
      
      {/* PADDING DIV */}
      {/* <div style={{backgroundColor:"#eaeaea", height:"1.5rem", width:"100%"}}></div> */}

    </div>
   );
}
 
export default Shipping;