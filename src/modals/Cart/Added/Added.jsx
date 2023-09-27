import React, { useContext, useEffect, useState } from 'react';
import styles from "./Added.module.css";
import AccountHeader from '../../../components/AccountHeader/AccountHeader';
import { GlobalContext } from '../../../context/globalContext';
import { clearUserMessage } from '../../../features/user/userSlice';
import { useDispatch } from 'react-redux';


const AddedToCart = ({el, setAddedModal}) => {

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { getPriceByCurrency, setShowCartModal } = globalContext;

  const dispatch = useDispatch();

  const handleShowCart = () =>{
    setShowCartModal(true);
    dispatch(clearUserMessage());
    setAddedModal(false);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return ( 
    <article className={styles.article}>
      <div className={styles.div}>
        <AccountHeader light={true}/>
        <div className={styles.container} style={{top: mounted ? "86.5px" : "110px", opacity: mounted ? 1 : 0}}>

          {/* TITLE */}
          <div className={styles.title}>
            <span>Added To Cart</span>
            <i className='bx bx-x' onClick={()=> {dispatch(clearUserMessage()) ; setAddedModal(false)}}></i>
          </div>

          {/* DETAILS */}
          <div className={styles.details}>
            <div className={styles.img}>
              <img src={el.images[0].images[0]} alt="abc" />
            </div>
            <div className={styles.description}>
              <span className={styles.SKU}>{el.SKU}</span>
              <span className={styles.name}>{el.name}</span>
              <span className={styles.color} style={{backgroundColor: el.color}}></span>
              <span className={styles.size}>{el.size}</span>
              <span className={styles.price}>{getPriceByCurrency(el.price)}</span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className={styles.buttons}>
            <button onClick={handleShowCart}>See my cart</button>
            <button onClick={()=> {dispatch(clearUserMessage()) ; setAddedModal(false)}}>Keep buying</button>
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default AddedToCart;