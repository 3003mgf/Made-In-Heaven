import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./WishlistCard.module.css";
import { GlobalContext } from '../../../context/globalContext';
import {
  PinterestShareButton,
  TwitterShareButton,
  FacebookShareButton,
  EmailShareButton,
  PinterestIcon,
  TwitterIcon,
  FacebookIcon,
  EmailIcon
} from "react-share";
import { useDispatch, useSelector } from 'react-redux';
import { cartToggle, clearUserMessage, favToggle } from '../../../features/user/userSlice';
import { TailSpin } from 'react-loader-spinner';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import AddedToCart from '../../../modals/Cart/Added/Added';


const WishlistCard = ({el, index, userId}) => {
 
  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { getPriceByCurrency } = globalContext;
  
  // HOOKS
  const dispatch = useDispatch();
  const refToast = useRef();
  const state = useSelector(state => state.user);
  const { message, user, message2 } = state;

  // STATES
  const [flipped, setFlipped] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const [userCart, setUserCart] = useState([]);
  const [alreadyInCart, setAlreadyInCart] = useState(null);
  const [colorSelected, setColorSelected] = useState("");
  const [sizeSelected, setSizeSelected] = useState("");
  const [images, setImages] = useState([]);

  // Added to cart modal states
  const [productAdded, setProductAdded] = useState(false);
  const [addedModal, setAddedModal] = useState(false);


  const placeInCart = () => {
    if(!alreadyInCart){
      if(!colorSelected){
        return refToast.current.show({life: 3000, severity: "warn", summary: `Wait!`, detail: `Please select a color`})
      };
      if(!sizeSelected){
        return refToast.current.show({life: 3000, severity: "warn", summary: `Wait!`, detail: `Please select a size`})
      };
      dispatch(cartToggle({
        userId: user?.id,
        product: {
          ...el,
          color: colorSelected,
          images,
          size: sizeSelected,
          quantity: 1
        }
      }));
    }else{
      dispatch(cartToggle({
        userId: user?.id,
        product: {
          ...el,
          color: colorSelected,
          images,
          size: sizeSelected,
          quantity: 1
        }
      }));
    }
  };

  const handleColor = (color) =>{
    if(colorSelected !== color){
      setColorSelected(color);
    }else{
      setColorSelected("")
    }
  };

  const handleSize = (size) =>{
    if(sizeSelected === size){
      setSizeSelected("");
    }else{
      setSizeSelected(size);
    }
  };
 


  useEffect(() => {
    if(colorSelected && el){
      el?.images.map(obj => {
        if(obj.color.toLowerCase() === colorSelected.toLowerCase()){
          setImages(obj.images);
        }
      })
    }
  }, [colorSelected, el]);

  useEffect(() => {
    if(message2 === `Item added to cart ${el.id}`){
      setProductAdded({
        ...el,
        color: colorSelected,
        size: sizeSelected
      });
      dispatch(clearUserMessage());
    };
     if(message2 === `Item removed from cart ${el.id}`){
      refToast.current.show({life: 3000, severity: "success", summary: `Done!`, detail: `Item removed from cart`});
      dispatch(clearUserMessage());
      
    };
  }, [message2]);

  useEffect(() => {
    if(user){
      const uCart = typeof user.cart === "string" ? JSON.parse(user.cart) : !user.cart ? [] : user.cart;
      setUserCart(uCart);
    };
  }, [user]);

  useEffect(() => {
    const findProduct = userCart.find(item => item.id === el?.id);
    if(findProduct){
      setAlreadyInCart(true);
    }else{
      setAlreadyInCart(false);
    };
  }, [userCart]);

  useEffect(() => {
    if(productAdded){
      setAddedModal(true);
    }else{
      setAddedModal(false);
    }
  }, [productAdded]);


  return ( 
    <div className={styles.wishlistItem} key={index}>
      <Toast ref={refToast} position='top-left'></Toast>
      {
        addedModal && <AddedToCart el={productAdded} setAddedModal={setAddedModal}/>
      }
      {/* FLIP */}
      <div className={styles.flip} onClick={()=> setFlipped(!flipped)}>
        <img src="/images/triangle.svg" alt="abc" />
      </div>

      {/* CLOSE */}
      <div className={styles.close} onClick={()=> dispatch(favToggle({userId, item: el}))}>
        {
          message === `Updating favorites ${el.id}` ? (
            <TailSpin
              height="16"
              width="16"
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
      <div className={`${styles.wItemImg} ${el.brand === "Fendi" && styles.background} ${el.brand === "Dolce & Gabbana" && styles.dolce}`}>
        <img src={el.images[0].images[0]} alt="abc" />
      </div>
      <div className={styles.wItemDetails}>
        <span>{el.name}</span>
        <span>{getPriceByCurrency(el.price)}</span>
      </div>

      {/* FLIP DIV */}
      <div className={styles.flippedDiv} style={{display: flipped ? "flex" : "none"}}>    
        {/* FLIP */}
        <div className={styles.flip} onClick={()=> {setFlipped(!flipped) ; setShowTooltip(false)}}>
          <img src="/images/triangle.svg" alt="abc" />
        </div>

        <span className={styles.sku}>{el.SKU || "1AC3C78"}</span>
        <p className={styles.flipName}>{el.name}</p>
        <div className={styles.colorsDiv}>
          <span className={styles.span}>Colors:</span>
          <div className={styles.colors}>
            {
              el.colors.map((color, index) => <span key={index} style={{backgroundColor: color, boxShadow: (color.toLowerCase() === "white" || color.toLowerCase() === "ivory") ? "0 0 0.1rem #1f1f1f" : "none"}} className={`${styles.colorSpan} ${colorSelected === color && styles.colorSelected}`} onClick={()=> handleColor(color)}></span>)
            }
          </div>
        </div>
        <div className={styles.sizesDiv}>
          <span className={styles.span}>Sizes:</span>
          <div className={styles.sizes}>
            {
              el.sizes.map((size, index) => <span key={index} className={`${styles.sizeSpan} ${sizeSelected === size && styles.sizeSelected}`} onClick={()=> handleSize(size)}>{size.replaceAll(",", ".")}</span>)
            }
          </div>
        </div>
        
        <div className={styles.buttons}>
          <div className={styles.placeCart}>
            <button onClick={placeInCart}>
              {
                message === `Updating cart ${el?.id}` ? (
                  <TailSpin
                    height="16"
                    width="16"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                ):(
                  alreadyInCart ? "Remove from Cart" : "Place in Cart"
                )
              }
            </button>
          </div>
          <div className={styles.wrapButtons}>
            <button className={`${styles.share} ${showTooltip && styles.showTooltip}`} onClick={()=> setShowTooltip(true)}>
              <i className='bx bxs-share-alt' ></i>
              Share
              <div className={styles.tooltip}>
                <PinterestShareButton url={`https://madeinheaven-mgf.netlify.app/detail/${el.id}`}>
                  <PinterestIcon size={25} borderRadius={50}/>
                </PinterestShareButton>
                <TwitterShareButton url={`https://madeinheaven-mgf.netlify.app/detail/${el.id}`}>
                  <TwitterIcon size={25} borderRadius={50}/>
                </TwitterShareButton>
                <FacebookShareButton url={`https://madeinheaven-mgf.netlify.app/detail/${el.id}`}>
                  <FacebookIcon size={25} borderRadius={50}/>
                </FacebookShareButton>
                <EmailShareButton url={`https://madeinheaven-mgf.netlify.app/detail/${el.id}`}>
                  <EmailIcon size={25} borderRadius={50}/>
                </EmailShareButton>
                <div className={styles.closeTooltip} onClick={(e)=> {e.stopPropagation() ; setShowTooltip(false)}}>
                  <i className='bx bx-x'></i>
                </div>
              </div>
            </button>
            <button className={styles.details} onClick={()=> window.location.assign(`https://madeinheaven-mgf.netlify.app/product/${el.id}`)}>
              <i className='bx bx-plus'></i>
              All details
            </button>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default WishlistCard;