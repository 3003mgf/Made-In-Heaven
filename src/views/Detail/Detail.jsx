import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./Detail.module.css";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../features/products/productSlice';
import { GlobalContext } from '../../context/globalContext';
import { Translate } from 'react-auto-translate';
import { Dropdown } from 'primereact/dropdown';
import AccountHeader from '../../components/AccountHeader/AccountHeader';
import DetailColor from '../../modals/Detail/Color/DetailColor';
import { cartToggle, favToggle } from '../../features/user/userSlice';
import { TailSpin } from 'react-loader-spinner';
import AddedToCart from '../../modals/Cart/Added/Added';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import SpecsModal from '../../modals/Detail/Specs/Specs';
import DeliveriesModal from '../../modals/Detail/Deliveries/Deliveries';


const Detail = () => {

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { getPriceByCurrency, detailColor, setDetailColor, showSearchModal } = globalContext;

  const refToast = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const productState = useSelector(state => state.products);
  const { message, product: productFound } = productState;

  const userState = useSelector(state => state.user);
  const { user, message: userMessage } = userState;


  const [product, setProduct] = useState(null);
  const [sizeSelected, setSizeSelected] = useState("");
  const [sizeSource, setSizeSource] = useState([]);
  const [images, setImages] = useState([]);
  const [isInFav, setIsInFav] = useState(false);
  const [productAdded, setProductAdded] = useState(null);
  const [userCart, setUserCart] = useState([]);
  const [alreadyInCart, setAlreadyInCart] = useState(null);

  // MODALS
  const [colorModal, setColorModal] = useState(false);
  const [addedModal, setAddedModal] = useState(false);
  const [openSpecsModal, setOpenSpecsModal] = useState(false);
  const [openDelModal, setOpenDelModal] = useState(false);

  const addToFav = () =>{
    if(!user?.id){
      return refToast.current.show({life: 3000, severity: "info", summary: `Hi there!`, detail: `Please login to access this functionality`});
    }else{
      dispatch(favToggle({
        userId: user?.id,
        item: product
      }))
    }
  };

  const addToCart = () =>{
    if(!user?.id){
      // IF NOT LOGGED
      return refToast.current.show({life: 3000, severity: "info", summary: `Hi there!`, detail: `Please login to access this functionality`});
    }else{
      if(!sizeSelected && !alreadyInCart){
        return refToast.current.show({life: 3000, severity: "warn", summary: `Wait!`, detail: `Please select a size`});
      }else{
        dispatch(cartToggle({
          userId: user?.id,
          product: {
            ...product,
            color: detailColor,
            images,
            size: sizeSelected,
            quantity: 1
          }
        }));
      }
    }
  };

  useEffect(() => {
    if(id){
      dispatch(getProduct(id));
    };
  }, [id]);

  useEffect(() => {
    if(productFound){
      setProduct({...productFound, images: JSON.parse(productFound.images)});
      setDetailColor(productFound.colors[0]);

      let productSizes = [];
      productFound.sizes.map(size => {
        productSizes.push({
          name: size, code: size
        })
      });
      setSizeSource(productSizes);
    };
  }, [productFound]);

  useEffect(() => {
    if(detailColor){
      product?.images.map(obj => {
        if(obj.color.toLowerCase() === detailColor.toLowerCase()){
          setImages(obj.images);
        }
      })
    }
  }, [detailColor, productFound]);

  useEffect(() => {
    if(user && product){
      
      const userFavorites = typeof user.favorites === "string" ? JSON.parse(user.favorites) : !user.favorites ? [] : user.favorites;
      const inFavs = userFavorites.find(el => el.id === product.id);
      if(inFavs){
        setIsInFav(true);
      }else{
        setIsInFav(false);
      };

      const uCart = typeof user.cart === "string" ? JSON.parse(user.cart) : !user.cart ? [] : user.cart;
      setUserCart(uCart);
    }
  }, [user, product]);

  useEffect(() => {
    if(productAdded){
      setAddedModal(true);
    }else{
      setAddedModal(false);
    }
  }, [productAdded]);


  useEffect(() => {
    if(userMessage === "Item added to cart"){
      return setProductAdded({
        ...product,
        color: detailColor,
        size: sizeSelected
      });
    };
    if(userMessage === "Item removed from cart"){
      return refToast.current.show({life: 3000, severity: "success", summary: `Done!`, detail: `Item removed from cart`});
    };
  }, [userMessage]);

  useEffect(() => {
    const findProduct = userCart.find(el => el.id === product?.id);
    if(findProduct){
      setAlreadyInCart(true);
    }else{
      setAlreadyInCart(false);
    };
  }, [userCart]);


  return ( 
    <div className={`${styles.wrapper} createAccount`}>
      <Toast ref={refToast} position='top-left'></Toast>
      <AccountHeader absolute={true}/>
      <DetailColor setDetailColor={setDetailColor} detailColor={detailColor} product={product && product} colorModal={colorModal} setColorModal={setColorModal}/>
      
      <SpecsModal product={product && product} setOpenSpecsModal={setOpenSpecsModal} openSpecsModal={openSpecsModal}/>
      <DeliveriesModal setOpenDelModal={setOpenDelModal} openDelModal={openDelModal}/>
      {
        addedModal && <AddedToCart el={productAdded} setAddedModal={setAddedModal}/>
      }
      {
        (product && images.length && (alreadyInCart || !alreadyInCart)) ? (
          <div className={styles.container}>
            {/* POSITION FIXED */}
            
            <div className={styles.fixed}>
              <div className={styles.fTop}>
                <div className={styles.SKU}>
                  <span>{product?.SKU}</span>
                  {
                    userMessage === `Updating favorites ${product?.id}` ? (
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
                      isInFav ? (
                        <i className='bx bxs-heart' style={{color: "#1f1f1f"}} onClick={addToFav}></i>
                      ):(
                        <i className='bx bx-heart' onClick={addToFav}></i>
                      )
                    )
                  }
                </div>
                <span className={styles.name}>{product?.name}</span>
                <span className={styles.price}>{getPriceByCurrency(product?.price)}</span>
              </div>
              <div className={styles.fMiddle}>
                <div className={styles.fMiddleTop}>
                  <span className={styles.colorName}>Colors</span>
                  <div className={styles.colorSpanDiv} onClick={()=> setColorModal(true)} style={{cursor:"pointer"}}>
                    <span>{detailColor}</span>
                    <span className={`${styles.colorSpan} ms-1`} style={{backgroundColor: detailColor, boxShadow: (detailColor.toLowerCase() === "white" || detailColor.toLowerCase() === "ivory") ? "0 0 0.1rem #1f1f1f" : "none"}}></span>
                    <i className='bx bx-chevron-right'></i>
                  </div>
                </div>
                <div className={styles.fMiddleBottom}>
                  {/* SIZES */}
                  <div className={`${styles.loginInputGenre} ${styles.loginInput}`}>
                  <div className='position-relative'>
                  <Dropdown placeholder='Please select a size' value={{name: sizeSelected, code: sizeSelected}} onChange={(e) => setSizeSelected(e.value.name)} optionLabel='name' options={sizeSource} className='w-100' />
                    
                  </div>
                </div>
                </div>
              </div>

              <div className={styles.fButton} onClick={addToCart}>
                <button className='d-flex align-items-center justify-content-center'>
                  {
                    userMessage === `Updating cart ${product?.id}` ? (
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
                      alreadyInCart ? (
                        "Remove from cart"
                      ):(
                        "Place in Cart"
                      )
                    )
                  }
                </button>
              </div>
              <div className={styles.freeShipping}>
                <span>Free Shipping Available</span>
              </div>
              <div className={styles.extraLinks} style={{opacity: showSearchModal ? 0 : 1, visibility: showSearchModal ? "hidden" : "visible"}}>
                <span onClick={()=> setOpenSpecsModal(true)}>Product Details</span>
                <span onClick={()=> setOpenDelModal(true)}>Deliveries and Returns</span>
              </div>
            </div>

            <div className={styles.images}>
              {
                images.map(image => {
                    return(
                      <div className={`${styles.eachImage} ${product?.brand === "Louis Vuitton" && styles.backgroundImg}`}>
                        <div className='position-relative'>
                          <img src={image} alt="abc" />
                          {
                            product?.brand === "Dolce & Gabbana" && <div className={styles.fadeImage}></div>
                          }
                        </div>
                      </div>
                    );
                })
              }
            </div>
            <div className={styles.emptyDiv}>

            </div>
          </div>
        ):(
          <div className='d-flex align-items-center justify-content-center' style={{height: "100vh", width: "100vw"}}>
            <TailSpin
              height="80"
              width="80"
              color="#1f1f1f"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )
      }
    </div>
   );
}
 
export default Detail;