import React, { useContext, useEffect, useRef, useState } from 'react';
import { Wallet } from "@mercadopago/sdk-react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import styles from "./PaymentSection.module.css"
import { GlobalContext } from '../../../context/globalContext';
import { createOrder, emptyCart } from '../../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import uniqId from "uniqid";
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import axios from "axios";
import { Translate } from 'react-auto-translate';


const Payment = ({total, userCart, refToast, shippingPrice}) => {


  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { refZipCode, setBillingInfo, setShowZipCodeModal, setSameAsShipping, sameAsShipping, setPayWithStripe, setShowPayment, setShowShipping, refTop, shippingInfo, billingInfo, shippingMethod, setClientSecret, clientSecret, refToastCheckoutAutocomplete } = globalContext;

  // HOOKS
  const state = useSelector(state => state.user);
  const { user, message: userMessage } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // STATES
  const [mpItems, setMpItems] = useState([]);

  useEffect(() => {
    if(userCart){
      let items = [];
      userCart.map(el =>{
        items.push({
          title: el.name,
          unit_price: el.price,
          quantity: 1,
          currency_id: "USD"
        })
      });

      setMpItems(items);
    };
  }, [userCart]);

  useEffect(() => {
    if(userMessage === "Order created"){
      refToast.current.show({life: 3000, severity: "success", summary: `Great!`, detail: `Thank you for your purchase ${user?.userName}`});
      setTimeout(()=>{
        dispatch(emptyCart(user?.id));
        navigate("/account/orders");
      }, 3100)
    }
  }, [userMessage]);


  // ------------ MERCADO PAGO ----->
  const [preferenceId, setPreferenceId] = useState(null);
  const [mpLoading, setMpLoading] = useState(false);
  

  // Mercado Pago calcula el precio total sumando la cantidad de Items y su unit_price. Por eso tenemos que agregar a "Items" el ShippingFee.
  const getPreferenceId = () => {
    
      fetch("http://localhost:3001/api/mp/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({items: mpItems, user}),
      })
        .then((response) => {
          return response.json();
        })
        .then((preference) => {
          setPreferenceId(preference.id);
        })
        .catch((error) => {
          console.error(error);
        })

  };

  const handleMp = () => {
    
      fetch("http://localhost:3001/api/mp/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({items: mpItems, user}),
      })
        .then((response) => {
          return response.json();
        })
        .then((preference) => {
          setPreferenceId(preference.id);
        })
        .catch((error) => {
          console.error(error);
        })
  };

  // MERCADO PAGO LO PONEMOS STAND BY PORQUE NO TIENE ON APPROVE COMO STRIPE Y PAYPAL
  // REDIRIJE AUTOMATICAMENTE A OTRA PAGINA EN VEZ DE DARNOS LOS PARAMETROS EN LA MISMA

  // ------------ MERCADO PAGO ENDS -------->




  const handleBillingInfo = (e) =>{
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value
    })
  };
  
  const handleOpenZipModal = () =>{
    setShowZipCodeModal(true);
  };




  // PAYMENT BUTTONS

  const [blockButtons, setBlockButtons] = useState(false);

  useEffect(() => {
    if(!sameAsShipping){
      if(!billingInfo.firstName || !billingInfo.lastName || !billingInfo.street || !billingInfo.streetNumber || !billingInfo.city || !billingInfo.state || !billingInfo.zipCode || !billingInfo.country){
        setBlockButtons(true)
      }else{
        setBlockButtons(false)
      }
    }else{
      setBlockButtons(false)
    }
  }, [sameAsShipping, billingInfo]);


  // User selects Billing Info same as Shipping Info
  const handleSameAsShipping = (e) =>{
    if(e.target.checked){
      setSameAsShipping(true);
    }else{
      setSameAsShipping(false);
    }
  };

  // Go back to previous section
  const handleGoBack = () =>{
    setShowPayment(false);
    setShowShipping(true);
  };

  // Disabled button alert
  const handleDisabledAlert = () =>{
    if(blockButtons){
      return refToast.current.show({life: 2500, severity: "warn", summary: `Wait!`, detail: "Please complete all fields to continue"});
    };
  };

  // Pay with Stripe
  const handlePayWithStripe = async() =>{
    const getClientSecret = await axios.post("https://rivelle-back.up.railway.app/api/stripe/create-payment-intent", {
      data: {
        currency: "usd",
        amount: Math.round(shippingPrice ? total + shippingPrice : total)
      }
    });

    setClientSecret(getClientSecret.data.clientSecret);

  };

  useEffect(() => {
    if(clientSecret){
      setPayWithStripe(true);
    }
  }, [clientSecret]);

  // MAIN UEF
  useEffect(() => {
    refTop.current?.scrollIntoView();
  }, []);
  
  return ( 
    <div className={styles.wrapper}>
      
      <div className={styles.goBackIcon} style={{width: "fit-content", cursor:"pointer"}}>
        <HiOutlineArrowNarrowLeft size={20} onClick={handleGoBack}/>
      </div>
      <div className={styles.sectionIndicator}>
        <div className={styles.stepIndicator}>
          <span>3</span>
        </div>
        <span className={styles.sectionTitle}><Translate>Payment Methods</Translate></span>
      </div>

      {/* BILLING ADDRESS  */}
      <div className='d-flex align-items-center justify-content-center'>
        <div className={styles.FormContainer}>
          <div className={styles.Form}>
          <div className={styles.useShippingAddress}>
            <input type="checkbox" id='useShipping' onClick={handleSameAsShipping}/>
            <label htmlFor="useShipping"><Translate>Use shipping address</Translate></label>
          </div>
          <div className='form-floating mb-1 w-100 p-1'>
            <input disabled={sameAsShipping ? true : false} type="text" id='city' className='form-control' name='firstName' onChange={handleBillingInfo} value={billingInfo.firstName} />
            <label htmlFor="city">First Name</label>
          </div>
          <div className='form-floating mb-1 w-100 p-1'>
            <input disabled={sameAsShipping ? true : false} type="text" id='city' className='form-control' name='lastName' onChange={handleBillingInfo} value={billingInfo.lastName} />
            <label htmlFor="city">Last Name</label>
          </div>
          <div className='form-floating mb-1 w-100 p-1'>
            <input disabled={sameAsShipping ? true : false} type="text" id='city' className='form-control' name='street' onChange={handleBillingInfo} value={billingInfo.street} />
            <label htmlFor="city">Street</label>
          </div>
          <div className='form-floating mb-1 w-100 p-1'>
            <input disabled={sameAsShipping ? true : false} type="text" id='city' className='form-control' name='streetNumber' onChange={handleBillingInfo} value={billingInfo.streetNumber} />
            <label htmlFor="city">Street Number</label>
          </div>
          <div className='form-floating mb-1 w-100 p-1'>
            <input disabled={sameAsShipping ? true : false} type="text" id='city' className='form-control' name='city' onChange={handleBillingInfo} value={billingInfo.city} />
            <label htmlFor="city">City</label>
          </div>
          <div className='form-floating mb-1 flex-grow-1 p-1'>
            <input disabled={sameAsShipping ? true : false} type="text" id='city' className='form-control' name='state' onChange={handleBillingInfo} value={billingInfo.state} />
            <label htmlFor="city">State</label>
          </div>
          <div className='form-floating mb-1 flex-grow-1 p-1 position-relative'>
            <input disabled={sameAsShipping ? true : false} ref={refZipCode} type="text" id='city' className='form-control' name='zipCode' onChange={handleBillingInfo} value={billingInfo.zipCode} />
            <div className={styles.infoZipCode} onClick={handleOpenZipModal}>
              <i className="fa-solid fa-circle-info" style={{color: "#1E3050"}}></i>
            </div>
            <label htmlFor="city">Zip Code</label>
          </div>
          <div className='form-floating mb-1 w-100 p-1'>
            <select defaultValue={"US"} disabled={sameAsShipping ? true : false} id='city' className='form-control form-select' name='country' onChange={handleBillingInfo}>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="AR">Argentina</option>
              <option value="ES">Spain</option>
              <option value="IT">Italy</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
            </select>
            <label htmlFor="city">Country</label>
          </div>
          </div>
        </div>
      </div>

      {/* PAY BUTTONS */}
      {/* Step */}
      {/* <div className={styles.stepDiv}> 
        <div className={styles.step}>
          <span>2</span>
        </div>
        <span>Please choose a payment method</span>
      </div> */}

      {/* Buttons */}
      {/* <div className='d-flex justify-content-center align-items-center'>
        <div className={styles.emptyFields} style={{opacity: blockButtons ? 1 : 0}}>
          <span>Payment Buttons will be disabled until you complete all fields</span>
        </div>
      </div> */}
      
      {/* BUTTONS */}
      <div className='d-flex align-items-center justify-content-center w-100'>
        <div className={styles.buttons} onClick={handleDisabledAlert}>
            {/* -------- PAYPAL ------> */}
            <div style={{width: "50%"}}>
              <PayPalButtons
                disabled={blockButtons ? true : false} 
                style={{layout: "horizontal", color:"black", shape: "rect", tagline: false}}
                createOrder={(data, actions) => {
                  return actions.order.create({
                      purchase_units: [
                          {
                              amount: {
                                  value: total + Number(shippingPrice)
                              },
                          },
                      ],
                  });
                }}
                onApprove={(data, actions) => {
                  // Once the payment is approved
                  // Redirect to Home for example
                  dispatch(createOrder({
                    belongsTo: user?.id,
                    orderId: uniqId(),
                    orderStatus: "Ordered",
                    totalPrice: total,
                    shippingAddress: `${shippingInfo.firstName} ${shippingInfo.lastName}. ${shippingInfo.street} ${shippingInfo.streetNumber} ${shippingInfo.apartment}. ${shippingInfo.country}, ${shippingInfo.city}. ${shippingInfo.state}, ${shippingInfo.zipCode}`,
                    billingAddress: sameAsShipping ? `${shippingInfo.firstName} ${shippingInfo.lastName}. ${shippingInfo.street} ${shippingInfo.streetNumber} ${shippingInfo.apartment}. ${shippingInfo.country}, ${shippingInfo.city}. ${shippingInfo.state}, ${shippingInfo.zipCode}` : `${billingInfo.firstName} ${billingInfo.lastName}. ${billingInfo.street} ${billingInfo.streetNumber} ${billingInfo.apartment}. ${billingInfo.country}, ${billingInfo.city}. ${billingInfo.state}, ${billingInfo.zipCode}`,
                    shippingMethod: shippingMethod,
                    items: userCart
                  }));
                }}

                onError={(data, actions)=>{
                  return refToast.current.show({life: 3000, severity: "error", summary: `We're sorry!`, detail: `We couldn't proccess your payment`});
                }}

                onCancel={(data, actions)=> {
                  return;
                }}

                showSpinner={true}
              />
            </div>

            {/* STRIPE */}
            <button onClick={handlePayWithStripe} className={styles.stripeButton} disabled={blockButtons ? true : false}>
              <i className="fa-brands fa-stripe" style={{color:"whitesmoke"}}></i>
            </button>


            {/* ------ MERCADO PAGO ------> */}
            {/* MP GET PREFERENCE BUTTON */}
            {/* {
              !preferenceId &&
                <button onClick={getPreferenceId} className={styles.mpButton} disabled={blockButtons ? true : false}>
                  <img src="/images/mercadoPagoLogo.png" alt="abc"/>
                </button>
            } */}

            {/* MP PAY BUTTON */}
            {/* {
              preferenceId &&
              <div id='wallet_container' onClick={handleMp}>
                <Wallet initialization={{ preferenceId, redirectMode: "blank"}} />
              </div>
            } */}
        </div>
      </div>
      
      {/* GO BACK */}
      {/* <div className={styles.goBack} onClick={handleGoBack}>
        <i className="fa-solid fa-caret-left fa-lg mt-5 ps-5"></i>
      </div> */}

      {/* PADDING DIV */}
      {/* <div style={{backgroundColor:"#eaeaea", height:"2.5rem", width:"100%"}}></div> */}

    </div>
   );
}
 
export default Payment;