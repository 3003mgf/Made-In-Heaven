import React, { useContext } from 'react';
import styles from "./LVHeader.module.css";
import { GlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../../modals/Login/Login';
import CartModal from '../../modals/Cart/CartModal';
import CollectionsModal from '../../modals/Collections/CollectionsModal';
import LanguageModal from '../../modals/Language/Language';
import SearchModal from '../../modals/Search/SearchModal';
import SearchBoxModalLeft from '../../modals/Search/SearchBoxModalLeft';
import SearchBoxModalRight from '../../modals/Search/SearchBoxModalRight';
import { Translate } from 'react-auto-translate';


const LVHeader = ({refHeader, showCol}) => {

  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const { setShowLoginModal, logged, setShowCartModal, setShowCollectionModal, showCollectionModal, setShowSearchModal, setCurrency, currency, showCurrencyDropdown, setShowCurrencyDropdown, showLanguageModal, setShowLanguageModal, showSearchModal} = globalContext;

  const handleShowLogin = () =>{
    if(logged){

    }else{
      setShowLoginModal(true);
    }
  }

  const handleOpenBag = () =>{
    if(logged){
      setShowCartModal(true);
    }else{
      return;
    }
  };

  const handleOpenStore = () =>{
    if(logged){
      navigate("/ourStore");
    }else{
      return;
    }
  };

  const handleCollections = () =>{
    if(showCol){
      setShowCollectionModal(true);
    }else{
      navigate("/home");
    }
  };

  return ( 
    <div className={styles.wrapper} ref={refHeader}>
      
      <LoginModal/>
      <CartModal/>
      <CollectionsModal/>
      <LanguageModal/>
      <SearchModal/>
      <SearchBoxModalLeft/>
      <SearchBoxModalRight/>

      <div className={styles.header}>
        <div className={styles.left}>
          {/* <i className='bx bx-menu'></i> */}
          <div className={styles.world} style={{opacity: showCollectionModal ? 0 : 1}} onClick={()=> setShowLanguageModal(!showLanguageModal)}>
            <i className='bx bx-world'></i>
          </div>

          <div className={styles.currency} style={{opacity: showLanguageModal ? 0 : 1}}>
            <div className={styles.currentCurrency} onClick={()=> setShowCurrencyDropdown(!showCurrencyDropdown)}>
              <div className='d-flex align-items-start justify-content-start w-100'>
                <span className={styles.currencySpan}>{currency}</span>
              </div>
              <div className={styles.currencyToggle}>
                <i className='bx bx-chevron-right bx-xs' style={{transform: showCurrencyDropdown ? "scaleY(-1) rotate(90deg)" : "scaleY(-1) rotate(-90deg)", marginTop: showCurrencyDropdown ? "-1px" : "-4px"}}></i>
              </div>
            </div>
            <div className={styles.currencyDropdown} style={{opacity: showCurrencyDropdown ? "1" : "0", visibility: showCurrencyDropdown ? "visible" : "hidden"}}>
              <ul>
                <li onClick={()=> setCurrency("USD")}>USD</li>
                <li onClick={()=> setCurrency("EUR")}>EUR</li>
                <li onClick={()=> setCurrency("CAD")}>CAD</li>
                <li onClick={()=> setCurrency("AUD")}>AUD</li>
                <li onClick={()=> setCurrency("ARS")}>ARS</li>
              </ul>
            </div>
          </div>          
          <span className={styles.linkSpan} onClick={handleCollections} style={{opacity: showLanguageModal ? "0" : "1"}}><Translate>COLLECTIONS</Translate></span>
          <span className={`${styles.linkSpan} ${styles.searchSpan}`} style={{opacity: showLanguageModal ? "0" : "1", zIndex: showCollectionModal ? "0" : "1001"}} onClick={()=> setShowSearchModal(!showSearchModal)} data-search><Translate>SEARCH</Translate></span>
        </div>
        <div className={styles.middle} onClick={()=> navigate("/")} style={{opacity: showSearchModal ? 0 : 1}}>
          <h2>MADE IN HEAVEN</h2>
        </div>
        <div className={styles.right}>
          <span onClick={handleOpenStore}><Translate>OUR STORE</Translate></span>
          <span onClick={handleShowLogin}><Translate>ACCOUNT</Translate></span>
          <span onClick={handleOpenBag}><Translate>BAG</Translate></span>
        </div>
      </div>
    </div>
   );
}
 
export default LVHeader;