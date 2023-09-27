import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./Checkout.module.css";
import{ loadStripe } from "@stripe/stripe-js";
import { STRIPE_P_KEY } from '../../utils/utilities';
import axios from "axios";
import { Elements } from '@stripe/react-stripe-js';
import Stripe from '../../components/Checkout/PayWithStripe/PayWithStripe';
import Payment from '../../components/Checkout/Payment/PaymentSection';
import { GlobalContext } from '../../context/globalContext';
import Information from '../../components/Checkout/Information/InfoSection';
import Shipping from '../../components/Checkout/Shipping/ShippingSection';
import ZipCode from '../../modals/Checkout/ZipCode/zipCode';
import CheckoutModal from '../../modals/Checkout/Products/Product';
import { Helmet } from 'react-helmet';
import CheckoutBreadcrumb from '../../components/Utils/CheckoutBreadcrumb/CheckoutBreadcrumb';
import ZoomProduct from '../../modals/Checkout/Products/ZoomProduct';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import Footer from '../../components/Footer/Footer';
import AccountHeader from '../../components/AccountHeader/AccountHeader';
import { CiZoomIn } from "react-icons/ci"
import { IoEyeOutline } from "react-icons/io5"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { PiCreditCardThin } from "react-icons/pi"
import { Link, useNavigate } from 'react-router-dom';
import PaymentsDel from "../../modals/Detail/Deliveries/Payment/Payment"; 
import ShippingDel from "../../modals/Detail/Deliveries/Shipping/Shipping"; 
import ReturnsDel from "../../modals/Detail/Deliveries/Returns/Returns"; 
import { Translate } from 'react-auto-translate';
import { cartToggle } from '../../features/user/userSlice';
import { TailSpin } from 'react-loader-spinner';

const stripePromise = loadStripe(STRIPE_P_KEY);


const Checkout = () => {



  // Checkout Grid
  const [showInList, setShowInList] = useState(false);

  const refToast = useRef();
  const state = useSelector(state => state.user);
  const { user, message } = state;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userCart, setUserCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [shippingPrice, setShippingPrice] = useState("");

  useEffect(() => {
    if(user){
      if(typeof user.cart === "string"){
        setUserCart(JSON.parse(user.cart));
      }else{
        setUserCart(user.cart)
      }
    };
  }, [user]);

  useEffect(() => {
    if(userCart.length){
      let totalSum = 0;

      userCart.map(el => {
        totalSum += Number(el.price);
      });

      setTotalCart(totalSum);
    };
  }, [userCart]);


  useEffect(() => {
    if(message === "Item removed from cart" && !userCart.length){
      navigate("/account");
    };
  }, [message, userCart]);

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { 
    payWithStripe, 
    showInfo,
    showShipping,
    showPayment,
    setShowInfo,
    setShowShipping,
    setShowPayment,
    setShowProductModal,
    setShowZoomProduct,
    getPriceByCurrency,
    shippingMethod,
    setShippingMethod,
    clientSecret,
    setClientSecret
  } = globalContext;


  // STRIPE IMPLEMENTATION
  

  // useEffect(() => {
  //   // STRIPE PAYMENT IMPLEMENTATION
  //   if(totalCart > 0){
  //     (async()=>{
  //       const getClientSecret = await axios.post("https://rivelle-back.up.railway.app/api/stripe/create-payment-intent", {
  //         data: {
  //           currency: "usd",
  //           amount: shippingPrice ? totalCart + shippingPrice : totalCart
  //         }
  //       });
    
  //       setClientSecret(getClientSecret.data.clientSecret);
  //     })()
  //   }
  // }, [totalCart, shippingPrice]);
  // ------- STRIPE ENDS ----------->


  const [openPayment, setOpenPayment] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);
  const [openReturns, setOpenReturns] = useState(false);


  const handleAdvance = () =>{
    setShowInfo(true);
  };

  const handleDeleteItem = (product) =>{
    dispatch(cartToggle({
      userId: user?.id,
      product
    }))
  };

  useEffect(() => {
    if(shippingMethod === "Free"){
      setShippingPrice("");
    }else if(shippingMethod === "Express"){
      setShippingPrice(7);
    }else if(shippingMethod === "Fasty"){
      setShippingPrice(12)
    }
  }, [shippingMethod]);


  return ( 
    <div className={`checkout ${styles.wrapper} create-account`}>
    <Helmet title='Checkout'/>
    <Toast ref={refToast} position='top-left'></Toast>
    <AccountHeader light={true} moreTop={true}/>
      {/* ------ MODALS ----> */}
        <ZipCode/>
        <CheckoutModal/>
        <ZoomProduct/>

        <PaymentsDel openPayment={openPayment} setOpenPayment={setOpenPayment}/>
        <ShippingDel openShipping={openShipping} setOpenShipping={setOpenShipping}/>
        <ReturnsDel openReturns={openReturns} setOpenReturns={setOpenReturns}/>        
      {/* ------------- */}
        <div className={styles.goBack}>
          <i className="fa-solid fa-angle-left"></i>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.left}>
            {
              (!showInfo && !showPayment && !showShipping) ? (
                <>
                  <div className={styles.titleNDiv}>
                    <div className={styles.titleN}>
                      <h2><Translate>My Shopping Cart</Translate></h2>
                      <span>({userCart.length})</span>
                    </div>
                    {/* <Link to="/ourStore">Keep Buying</Link> */}
                  </div>
                  <div className={styles.leftItems}>
                    {/* ITEMS */}

                    {
                      showInList ? (
                        userCart.length && userCart.map((el, index) => {
                          return(
                            <div className={styles.leftEachImgList}>
                              <div className={styles.leftEachImgListSub}>
                                <div className={`${styles.leftEachImg} ${el.brand === "Dolce & Gabbana" && styles.dolceSmall}`} onClick={()=> setShowZoomProduct(el.images)}>
                                  <div className={styles.hiddenSmall}>
                                    <img src={el.images[0]} alt="abc"/>
                                  </div>
                                </div>
                                <div className={styles.leftEachImgListSub2}>
                                  <span>{el.name}</span>
                                  <span>{el.brand}</span>
                                </div>
                              </div>
                              <div className={styles.leftEachImgListSub3}>
                                <span>{getPriceByCurrency(el.price)}</span>
                              </div>
                            </div>
                          )
                        })
                      ):(
                        userCart.length && userCart.map(el => {
                          return(
                            <div className={`${styles.leftEachImg} ${styles.louiCard} ${el.brand === "Dolce & Gabbana" && styles.dolce}`}>
                              <div className={styles.hidden}>
                                <img src={el.images[0]} alt="abc"/>
                                <div className={styles.zoom}>
                                  <CiZoomIn size={19} onClick={()=> setShowZoomProduct(el.images)}/>
                                </div>
                              </div>
                              <div className={styles.hiddenDet}>
                                <div className={styles.hiddenDetTop}>
                                  <span>{el.SKU}</span>
                                  <span>{el.name}</span>
                                </div>
                                <div className={styles.hiddenDetMiddle}>
                                  <div className={styles.hiddenDetSize}>
                                    <span>Size</span>
                                    <div className={styles.sizeContainer}>
                                      <span>{el.size}</span>
                                    </div>
                                  </div>
                                  <div className={styles.hiddenDetPrice}>
                                    <span>x{el.quantity}</span>
                                    <span>{getPriceByCurrency(el.price)}</span>
                                  </div>
                                </div>
                                <div className={styles.hiddenDetBottom}>
                                  <button onClick={()=> setShowProductModal(el)}>
                                    <IoEyeOutline size={15}/>
                                    <Translate>See details</Translate>
                                  </button>
                                  <button onClick={()=> handleDeleteItem(el)} className='d-flex align-items-center justify-content-center'>
                                    {
                                      message === `Updating cart ${el.id}` ? (
                                        <TailSpin
                                          height="15"
                                          width="15"
                                          color="#1f1f1f"
                                          ariaLabel="tail-spin-loading"
                                          radius="1"
                                          wrapperStyle={{}}
                                          wrapperClass=""
                                          visible={true}
                                        />
                                      ):(
                                        <>
                                          <AiOutlineCloseCircle size={15}/>
                                          <Translate>Eliminate</Translate>
                                        </>
                                      )
                                    }
                                  </button>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      )
                    }
                    <div className={styles.advanceButton2} onClick={handleAdvance}>
                      <button><Translate>Advance to Payment</Translate></button>
                    </div>
                    
                  </div>
                </>
              ):(
                ""
              )
            }

            {
              showInfo && !payWithStripe && <Information/>
            }
            {
              showPayment && !payWithStripe && <Payment refToast={refToast} total={totalCart} userCart={userCart} shippingPrice={shippingPrice}/> 
            }
            {
              showShipping && !payWithStripe && <Shipping/>
            }
            {
              payWithStripe && stripePromise && clientSecret &&
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <div className={styles.stripeDiv}>
                  <div>
                    <img src="/images/stripeLogo.svg" alt="abc" width={100}/>
                  </div>
                  <Stripe total={totalCart} shippingPrice={shippingPrice} refToast={refToast} userCart={userCart}/>
                </div>
              </Elements>
            }
            
          </div>

          <div className={styles.right}>
            <div className={styles.right1}>
              <span><Translate>Subtotal</Translate></span>
              <span>{getPriceByCurrency(totalCart)}</span>
            </div>
            <div className={styles.right2}>
              <span><Translate>Shipping</Translate></span>
              <span>
                {
                  shippingPrice ? getPriceByCurrency(Number(shippingPrice)) : "-"
                }
              </span>
            </div>
            <div className={styles.right3}>
              <span><Translate>Total</Translate></span>
              <span>{shippingPrice ? getPriceByCurrency(totalCart + shippingPrice) : getPriceByCurrency(totalCart)}</span>
            </div>
            <div className={styles.advancePayment}>
              <button onClick={handleAdvance}><Translate>Advance to Payment</Translate></button>
            </div>

            <div className={styles.cut}></div>

            <div className={styles.right4}>
                {/* PAYMENT MODAL */}
                <div className={styles.paymentOpener} onClick={()=> setOpenPayment(true)}>
                  <PiCreditCardThin size={30}/>
                  <div className={styles.paymentOpenerSub}>
                    <span><Translate>Payments</Translate></span>
                    <span><Translate>Accepted credit cards: Visa, American Express and MasterCard</Translate></span>
                  </div>
                  <div className={styles.copy}>
                    <i className='bx bx-copy'></i>
                  </div>
                </div>
                {/* SHIPPING MODAL */}
                <div className={styles.paymentOpener} onClick={()=> setOpenShipping(true)}>
                  <PiCreditCardThin size={30}/>
                  <div className={styles.paymentOpenerSub}>
                    <span><Translate>Shipping</Translate></span>
                    <span><Translate>Accepted credit cards: Visa, American Express and MasterCard</Translate></span>
                  </div>
                  <div className={styles.copy}>
                    <i className='bx bx-copy'></i>
                  </div>
                </div>
                {/* RETURNS MODAL */}
                <div className={styles.paymentOpener} onClick={()=> setOpenReturns(true)}>
                  <PiCreditCardThin size={30}/>
                  <div className={styles.paymentOpenerSub}>
                    <span><Translate>Returns & Exchanges</Translate></span>
                    <span><Translate>Free of charge</Translate></span>
                  </div>
                  <div className={styles.copy}>
                    <i className='bx bx-copy'></i>
                  </div>
                </div>
            </div>
            {
              // THESE ARE THE STEPS
              // ((showInfo || showShipping || showPayment) && !payWithStripe) &&
              // <CheckoutBreadcrumb/>
            }
            {/* {
              showInfo && !payWithStripe &&
              <Information/>
            }
            {
              showShipping && !payWithStripe &&
              <Shipping/>
            }
            {
              showPayment && !payWithStripe && 
              <Payment refToast={refToast} total={totalCart} userCart={userCart}/>
            }



            {
              payWithStripe && stripePromise && clientSecret &&
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <div className={styles.stripeDiv}>
                  <div>
                    <img src="/images/stripeLogo.svg" alt="abc" width={100}/>
                  </div>
                  <Stripe total={totalCart} refToast={refToast} userCart={userCart}/>
                </div>
              </Elements>
            } */}
          </div>
        </div>

        <Footer/>
    </div>
   );
}
 
export default Checkout;