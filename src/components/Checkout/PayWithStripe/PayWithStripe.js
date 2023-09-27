import React, { useContext, useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { GlobalContext } from '../../../context/globalContext';
import { createOrder, emptyCart } from '../../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import uniqId from "uniqid";


const Stripe = ({refToast, userCart, total}) => {

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { setPayWithStripe, shippingInfo, shippingMethod, billingInfo, sameAsShipping } = globalContext;

  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state.user);
  const { user, message } = state;

  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);


  useEffect(() => {
    if(message === "Order created"){
      refToast.current.show({life: 3000, severity: "success", summary: `Great!`, detail: `Thank you for your purchase ${user?.userName}`});
      setTimeout(()=>{
        dispatch(emptyCart(user?.id));
        navigate("/account/orders");
      }, 3100)
    };
  }, [message]);

  const handlePay = async() =>{

    if(!stripe || !elements){
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://madeinheaven-mgf/account"
      },
      redirect: "if_required",
    });

    if(error){
      // Action
      refToast.current.show({life: 3000, severity: "error", summary: "Ups!", detail: error.message});
    }else if(paymentIntent && paymentIntent.status === "succeeded"){
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
    }else{
      refToast.current.show({life: 3000, severity: "error", summary: "Ups!", detail: "Payment failed"});
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    if(!stripe){
      return;
    };

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if(clientSecret){
      stripe.retrievePaymentIntent(clientSecret)
      .then(({paymentIntent}) =>{
        console.log(paymentIntent.status);
      })
    }

  }, [stripe]);


  const handleBack = () =>{
    setPayWithStripe(false);
  };

  return ( 
    <div className='w-100 px-5'>
      <PaymentElement/>
      <div className='d-flex w-100 justify-content-between align-items-center mt-5'>
          <div onClick={handleBack} style={{width: "20px", height: "20px"}} className='d-flex align-items-center'>
            <i className="fa-solid fa-caret-left fa-lg ps-2" style={{color: "#777777", cursor: "pointer"}}></i>
          </div>
          <button disabled={isProcessing} onClick={handlePay} className='stripeButton'>
            <span>
              {
                isProcessing ? "Processing..." : "Pay now"
              }
            </span>
          </button>
      </div>
    </div>
   );
}
 
export default Stripe;