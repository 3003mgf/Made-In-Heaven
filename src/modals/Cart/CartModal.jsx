import React, { useContext, useEffect, useState } from 'react';
import styles from "./CartModal.module.css";
import { Translate } from 'react-auto-translate';
import { GlobalContext } from '../../context/globalContext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartToggle } from '../../features/user/userSlice';
import { TailSpin } from 'react-loader-spinner';



const CartModal = () => {

  const globalContext = useContext(GlobalContext);
  const { setShowCartModal, showCartModal, getPriceByCurrency } = globalContext;

  const dispatch = useDispatch();
  const state = useSelector(state => state.user);
  const { user, message } = state;
  const navigate = useNavigate();

  const [userCart, setUserCart] = useState([]);
  const [total, setTotal] = useState(null);

  const handleClick = () =>{
    if(userCart.length){
      setShowCartModal(false);
      navigate("/checkout");
    }else{
      setShowCartModal(false);
      navigate("/ourStore")
    }
  };

  const removeFromCart = (el) =>{
    dispatch(cartToggle({
      userId: user?.id,
      product: el
    }));
  };

  useEffect(() => {
    if(user){
      if(!user.cart){
        return setUserCart([]);
      };
      if(typeof user.cart === "string"){
        return setUserCart(JSON.parse(user.cart));
      }else{
        return setUserCart(user.cart);
      };
    }
  }, [user]);

  useEffect(() => {
    if(userCart.length){
      let totalPrice = 0;
      userCart.map(product => {
        return totalPrice += Number(product.price);
      });
      setTotal(totalPrice);
    };
  }, [userCart]);

  return ( 
    <article className={styles.article} style={{right: showCartModal ? "0px" : "-200vw"}}>
      <div className={styles.div}>
        {/* CLOSE BUTTON */}
        <div className={styles.closeModal} onClick={()=> setShowCartModal(false)}>
          <i className='bx bx-x'></i>
        </div>

        <div className={styles.container}>
          <div className={styles.title}>
            <h5><Translate>Your shopping cart</Translate> <span>({userCart.length})</span></h5>
          </div>
          <div className={styles.content}>
            <div className={styles.items}>
                {
                  userCart.length ? (
                    userCart.map((el, index) => {
                      return(
                        <div key={index} className={styles.eachItem} onClick={()=> window.location.assign(window.location.href.includes("netlify") ? `https://madeinheaven.netlify.app/product/${el.id}` : `http://localhost:3000/product/${el.id}`)}>
                          <div className={`${styles.eachItemImg} ${el.brand === "Louis Vuitton" && styles.lv}`}>
                            <img src={el.images[0]} alt="abc" width={117}/>
                          </div>
                          <div className={styles.eachItemContent}>
                            <div className={styles.close} onClick={(e)=> {e.stopPropagation() ; removeFromCart(el)}}>
                              {
                                message === `Updating cart ${el.id}` ? (
                                  <TailSpin
                                    height="12"
                                    width="12"
                                    color="#1f1f1f"
                                    ariaLabel="tail-spin-loading"
                                    radius="1"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                  />
                                ):(
                                  <i className='bx bx-x'></i>
                                )
                              }
                            </div>
                            <span className={styles.brand}>{el.brand}</span>
                            <span className={styles.eachItemSpan}>{el.name}</span>
                            <span>{getPriceByCurrency(el.price)}</span>
                          </div>
                          
                        </div>
                      )
                    })
                  ):(
                    <div className={styles.empty}>
                      <span>There are no current items in your cart</span>
                    </div>
                  )
                }
                <div className={styles.itemsPay}>
                  <div className={styles.itemsSeparator}></div>
                  {
                    userCart.length ? (
                      <div className={styles.itemsTotal}>
                        <span><Translate>Total</Translate></span>
                        <span>{getPriceByCurrency(total)}</span>
                      </div>
                    ):(
                      ""
                    )
                  }
                  <div className={styles.itemsButton} onClick={handleClick}>
                    <button><Translate>{userCart?.length ? "Checkout" : "Start Shopping"}</Translate></button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default CartModal;