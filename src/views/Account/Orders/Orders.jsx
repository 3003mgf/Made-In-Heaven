import React, { useContext, useEffect, useState } from 'react';
import styles from "./Orders.module.css";
import AccountHeader from '../../../components/AccountHeader/AccountHeader';
import Footer from '../../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import OrderCard from '../../../components/Orders/OrderCard';
import { Translate } from 'react-auto-translate';
import { GlobalContext } from '../../../context/globalContext';


const Orders = () => {

  // FIX SECTION
  const [fixSections, setFixSections] = useState(false);

  const { ref: refHeader, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.01,
  });

  useEffect(() => {
    if(inView){
      setFixSections(false);
    }else{
      setFixSections(true);
    }
  }, [inView]);
  // -------------------


  const globalContext = useContext(GlobalContext);
  const { refToastCheckoutAutocomplete } = globalContext;

  const navigate = useNavigate();
  const state = useSelector(state => state.user);
  const { userOrders, user } = state;
  const productState = useSelector(state => state.products);
  const { products } = productState;

  const [currentOrders, setCurrentOrders] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  
  const handleReviews = () =>{
    refToastCheckoutAutocomplete.current.show({life: 2000, severity: "info", summary: `Hey ${user?.userName}!`, detail: `Our robots are working on this functionality`});
  };

  useEffect(() => {
    if(userOrders.length){
      let currentOrdersFound = [];
      let purchaseHistoryFound = [];

      userOrders.map(order => {
        if(order.orderStatus === "Delivered" || order.orderStatus === "Returned" || order.orderStatus === "Canceled"){
          return purchaseHistoryFound.push(order);
        }else{
          return currentOrdersFound.push(order);
        };
      });

      setCurrentOrders(currentOrdersFound);
      setPurchaseHistory(purchaseHistoryFound);
    }
  }, [userOrders]);


  const handleInvoice = (order) =>{
    var props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: "myRivellePurchase",
      orientationLandscape: false,
      compress: true,
      logo: {
          src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
          type: 'PNG', //optional, when src= data:uri (nodejs case)
          width: 53.33, //aspect ratio = width/height
          height: 26.66,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      stamp: {
          inAllPages: true, //by default = false, just in the last page
          src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
          type: 'JPG', //optional, when src= data:uri (nodejs case)
          width: 20, //aspect ratio = width/height
          height: 20,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      business: {
          name: "Rivelle Company",
          address: "Fashionlandia, BLS Street 3003. Paris, TKM1994.",
          phone: "+1 (786) 3003 2000",
          email: "rivellecompany@gmail.com",
          email_1: "rivellesupport@gmail.com",
          website: "rivelle.netlify.app",
      },
      contact: {
          label: "Invoice issued for:",
          name: user?.firstName + " " + user?.lastName,
          address: order.shippingAddress,
          email: user?.email
      },
      invoice: {
          label: "Order #: ",
          num: order.orderId,
          invDate: new Date().toLocaleDateString(),
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            {
              title: "#", 
              style: { 
                width: 10 
              } 
            }, 
            { 
              title: "Title",
              style: {
                width: 30
              } 
            }, 
            { 
              title: "Brand",
              style: {
                width: 50
              } 
            }, 
            { title: "Price",
              style: {
                height: 50
              }
            },
            { title: "Quantity",
              style: {
                height: 50
              }
            },
            { title: "SKU",
              style: {
                height: 50
              }
            },
            { title: "Total",
              style: {
                height: 50
              }
            }
          ],
          table: Array.from(order.items, (item, index)=>([
              index + 1,
              item.name,
              item.brand,
              "$" + Number(item.price),
              Number(item.quantity),
              "lgh398d",
              "$" + Number(item.price) * Number(item.quantity)
          ])),
          additionalRows: [{
              col1: 'Total:',
              col2: "$" + order.totalPrice.toString(),
              style: {
                  fontSize: 12 //optional, default 12
              }
          }],
          invDescLabel: `Thank you ${user?.userName}!`,
          invDesc: "Thank you for choosing Rivélle, where luxury meets style. Your purchase not only supports our passion for high fashion but also allows us to continue curating exceptional pieces for discerning individuals like you.",
      },
      footer: {
          text: "All rights reserved @ Rivelle 2023",
      },
      pageEnable: true,
      pageLabel: "Page ",
    };

    const pdfCreated = jsPDFInvoiceTemplate(props); 

    const pdfObject = pdfCreated.jsPDFDocObject;

    console.log(pdfObject);
  };

  useEffect(() => {
    const paymentId = new URLSearchParams(window.location.search).get("payment_id");

    if(paymentId){
      fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers:{
          'Authorization': `Bearer TEST-5560570626097728-072022-b846d996aec1526cb840190799711653-307905530`
        }
      })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => console.log(json))
      .catch(error => console.log(error));
    }
  }, []);
 


  return ( 
    <div className={styles.wrapper}>
      <AccountHeader refHeader={refHeader} light={true} moreTop={true}/>
      {/* SECTIONS */}
      <div className={`${styles.sections} ${fixSections && styles.fixed}`}>
        <div className={styles.logo}>
          <span>My</span>
          <h5>MIH</h5>
        </div>
        <div className={styles.section} style={{borderLeft:"1px solid #eae8e4"}} onClick={()=> navigate("/account")}>
          <span><Translate>Overview</Translate></span>
        </div>
        <div className={styles.section} onClick={()=> navigate("/account/profile")}>
          <span><Translate>My Profile</Translate></span>
        </div>
        <div className={styles.section} onClick={()=> navigate("/account/orders")} style={{borderBottom:"2.5px solid #1f1f1f"}}>
          <span><Translate>My Orders</Translate></span>
        </div>
        <div className={styles.section} onClick={()=> navigate("/account/wishlist")}>
          <span><Translate>My Wishlist</Translate></span>
        </div>
        <div className={styles.section} onClick={handleReviews}>
          <span><Translate>My Reviews</Translate></span>
        </div>
      </div>
      <div className={styles.content} style={{marginTop: fixSections ? "87.5px" : "0px"}}>
        <h2 className={styles.title}><Translate>My Orders</Translate></h2>
        <h2 className={styles.subTitle}><Translate>Current Orders</Translate></h2>
        <div className={styles.container}>
          {
            currentOrders.length ? (
              <div className={styles.order}>
                {
                  currentOrders.map((order, index) => {
                    return <OrderCard order={order} key={index}/>
                  })
                }
              </div>
            ):(
              <div className={styles.emptyOrders}>
                <p><Translate>There are no current orders</Translate></p>
              </div>
            )
          }
        </div>
        <h2 className={styles.subTitle}><Translate>Purchase History</Translate></h2>
        <div className={styles.container}>
            {
              purchaseHistory.length ? (
                <div className={styles.order}>
                  {
                    purchaseHistory.map((order, index)=>{
                      return <OrderCard order={order} key={index}/>
                    })
                  }
                </div>
              ):(
                <div className={styles.emptyOrders}>
                  <p><Translate>There are no historic orders</Translate></p>
                </div>
              )
            }
        </div>
      </div>
      <Footer/>
    </div>
   );
}
 
export default Orders;