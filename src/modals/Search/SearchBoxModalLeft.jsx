import React, { useContext } from 'react';
import styles from "./SearchBoxModalLeft.module.css";
import { GlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { Translate } from 'react-auto-translate';


const SearchBoxModalLeft = () => {

  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const { showSearchModal, refToastCheckoutAutocomplete } = globalContext;

  const blogName = "LV Women's Fashion Show Spring-Summer 2023";
  const blog2Name = "Pharrell Williams";

  const handleComingSoon = () =>{
    refToastCheckoutAutocomplete.current.show({life: 2000, severity: "info", summary: `Coming soon!`, detail: `Our designers are working on this collection`});
  };

  return ( 
    <article className={styles.article} style={{left: showSearchModal ? "0px" : "-100vw"}}>
      <div className={styles.div}>
        <div className={styles.container}>
          <div className={styles.women}>
            <h6><Translate>WOMEN</Translate></h6>
            <span onClick={()=> window.location.assign("https://madeinheaven-mgf.netlify.app/ourStore?category=Bags")}><Translate>Bags</Translate></span>
            <span onClick={()=> window.location.assign("https://madeinheaven-mgf.netlify.app/ourStore?category=Heels")}><Translate>Heels</Translate></span>
            <span onClick={()=> window.location.assign("https://madeinheaven-mgf.netlify.app/ourStore?category=Sneakers")}><Translate>Sneakers</Translate></span>
            <span onClick={()=> window.location.assign("https://madeinheaven-mgf.netlify.app/ourStore?category=Sunglasses")}><Translate>Sunglasses</Translate></span>
            <span onClick={()=> window.location.assign("https://madeinheaven-mgf.netlify.app/ourStore?category=Accessories")}><Translate>Accessories</Translate></span>
          </div>
          <div className={styles.man}>
            <h6><Translate>MAN</Translate></h6>
            <span onClick={handleComingSoon}><Translate>Sneakers</Translate></span>
            <span onClick={handleComingSoon}><Translate>Accessories</Translate></span>
            <span onClick={handleComingSoon}><Translate>Sunglasses</Translate></span>
          </div>
        </div>

        <span className={styles.world}><Translate>MADE IN HEAVEN WORLD</Translate></span>
        <div className={styles.blogs}>
          <div className={styles.blog} onClick={()=> window.open("https://la.louisvuitton.com/esp-mx/magazine/articulos/women-spring-summer-2023-show-paris", "_blank")}>
            <div className={styles.blogImg}>
              <img src="https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/FrontAssets/Nacho/blogSpringSummer.jpg" alt="abc" />
            </div>
            <div className={styles.blogDetails}>
              <span><Translate>{blogName.length > 35 ? blogName.slice(0, 35) + "…" : blogName}</Translate></span>
              <span>09/29 - Parades</span>
            </div>
          </div>
          <div className={styles.blog} onClick={()=> window.open("https://la.louisvuitton.com/esp-mx/magazine/articulos/pharrell-williams", "_blank")}>
            <div className={styles.blogImg}>
              <img src="https://la.louisvuitton.com/images/is/image//content/dam/lv/editorial-content/world-of-louis-vuitton/la-maison/2045-pharrell-williams/2045_Pharrell_Williams_DI3.jpg?wid=490" alt="abc" />
            </div>
            <div className={styles.blogDetails}>
              <span>{blog2Name.length > 35 ? blog2Name.slice(0, 35) + "…" : blog2Name}</span>
              <span>02/13 - The House</span>
            </div>
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default SearchBoxModalLeft;