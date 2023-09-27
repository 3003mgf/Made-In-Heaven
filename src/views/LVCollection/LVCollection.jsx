import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./LVCollection.module.css";
import LVHeader from '../../components/LVHeader/LVHeader';
import CollectionCard from '../../components/Utils/CollectionCardd/CollectionCard';
import { useNavigate, useParams } from 'react-router-dom';
import { Translate } from 'react-auto-translate';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { brandsData } from '../../utils/utilities';


const LVCollection = () => {



  const refVideo = useRef();
  const refVideoContainer = useRef();
  const refHeader = useRef();
  const refBags = useRef();
  const { collection } = useParams();
  const [brandSelected, setBrandSelected] = useState(null);

  useEffect(() => {
    if(refVideo){
      refVideo.current.play();
    };
  }, []);

  const [lvVisible, setLvVisible] = useState(false);
   
  const lvCb = (entries) =>{
      const [ entry ] = entries;
      if(entry.isIntersecting){
      console.log(entry);
          setLvVisible(true);
        }else{
          setLvVisible(false);
      }
  };

  const options = {
      threshold: 0.70
  };
 
   useEffect(() => {
     // LV VIDEO OBSERVER
     const lvObserver = new IntersectionObserver(lvCb, options);
     if(refVideoContainer.current) lvObserver.observe(refVideoContainer.current);
     
     if(!refVideoContainer.current) lvObserver.unobserve(refVideoContainer.current);
     
     if(lvVisible){
        // refHeader.current.style.opacity = "1";
        // refHeader.current.style.visibility = "visible";
        refHeader.current.style.backgroundColor = "transparent"
     }else{
        // refHeader.current.style.opacity = "0"; 
        // refHeader.current.style.visibility = "hidden";
        refHeader.current.style.backgroundColor = "#19110b"
     }

   }, [refVideoContainer, lvVisible]);

// --------------------

  const refShop = useRef();

  //  USE STATES
  const state = useSelector(state => state.products);
  const { products } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if(collection){
      setBrandSelected(brandsData[collection]);
    }
  }, [collection]);

  return ( 
    <div className={styles.wrapper}>
      <LVHeader refHeader={refHeader} showCol={true}/>
      <div className={styles.videoContainer} ref={refVideoContainer}>
        <div className={styles.video}>
          <video 
            loop
            ref={refVideo}
            playsInline
            autoPlay
            muted
            src={
              collection === "louisVuitton" ? "https://lv-vod.fl.freecaster.net/vod/louisvuitton/E8wcyy1dZg_HD.mp4" : collection === "gucci" ? "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/FrontAssets/Fall+Winter+2023.mp4" : collection === "fendi" ? "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/FrontAssets/%23FendiBaguette.mp4" : collection === "jimmyChoo" ? "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/FrontAssets/Introducing+Summer+2023+Collection+_+Jimmy+Choo.mp4" : collection === "dolce&Gabbana" ? "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/FrontAssets/%23DGHolidays+-+Covent+Garden+Dolce%26Gabbana+Pop-up+Store.mp4" : ""
            }
          ></video>
        </div>
        <div className={styles.title}>
          <h1>{collection === "louisVuitton" ? <Translate>{"Louis Vuitton Collection"}</Translate> : collection === "gucci" ? <Translate>{"Gucci Collection"}</Translate> : collection === "fendi" ? <Translate>{"Fendi Collection"}</Translate> : collection === "jimmyChoo" ? <Translate>{"Jimmy Choo Collection"}</Translate> : collection === "dolce&Gabbana" ? <Translate>{"Dolce & Gabbana Collection"}</Translate> : ""}</h1>
          <div className='d-flex align-items-center w-100 gap-5'>
            <button onClick={()=> navigate(`/seeAll/${collection}`)}><Translate>Store</Translate></button>
            <button onClick={()=> refShop?.current.scrollIntoView()}><Translate>Shop</Translate></button>
          </div>
        </div>
        <div ref={refShop} className={styles.fadeBottom}></div>
      </div>

      <div className={styles.collectionTitle}>
        <h2>
        {
          collection === "louisVuitton" && "LOUIS VUITTON"
        }
        {
          collection === "gucci" && "GUCCI"
        }
        {
          collection === "fendi" && "FENDI"
        }
        {
          collection === "dolce&Gabbana" && "DOLCE & GABBANA"
        }
        {
          collection === "jimmyChoo" && "JIMMY CHOO"
        }
        </h2>
      </div>

      {/* BAGS*/}
      <div className={styles.collectionContainer}>
        <div className={styles.collectionCover}>
          {
            collection === "louisVuitton" && <div className={styles.imgCover}>
            <img src="/images/lvbags2.avif" alt="abc" />
            <img src="/images/lvbags4.avif" alt="abc" />
            </div>
          }
          {
            collection === "gucci" && <div className={styles.imgCover}>
            <img src="/images/gbags1.webp" alt="abc" />
            <img src="/images/gbags5.webp" alt="abc" />
            </div>
          }
          {
            collection === "fendi" && <div className={styles.imgCover}>
            <img src="/images/bagsfendi2.avif" alt="abc" />
            <img src="/images/bagsfendi1.jpg" alt="abc" />
            </div>
          }
          {
            collection === "dolce&Gabbana" && <div className={styles.imgCover}>
            <img src="/images/dgbags1.jpg" alt="abc" />
            <img src="/images/dgbags3.jpg" alt="abc" />
            </div>
          }
          {
            collection === "jimmyChoo" && <div className={styles.imgCover}>
            <img src="/images/jcbags5.webp" alt="abc" />
            <img src="/images/jcbags15.webp" alt="abc" />
            </div>
          }
          <div className={styles.fadeBottom2}></div>
          <div className={styles.collectionIntro}>
            <h4><Translate>{brandSelected?.collections[0].title}</Translate></h4>
            <div className={styles.cut}></div>
            <span><Translate>{brandSelected?.collections[0].subTitle}</Translate></span>
            <button onClick={()=> navigate(`/seeAll/${collection}/Bags`)}><Translate>Explore</Translate></button>
          </div>
        </div>
      </div>

      {/* HEELS */}
      <div className={styles.collectionContainer}>
        <div className={styles.collectionCover}>
          {
            collection === "louisVuitton" && <div className={styles.imgCover}>
            <img src="/images/lvheels4.webp" alt="abc" />
            <img src="/images/lvheels5.webp" alt="abc" />
            </div>
          }
          {
            collection === "gucci" && <div className={styles.imgCover}>
            <img src="/images/gheels6.webp" alt="abc" />
            <img src="/images/gheels3.webp" alt="abc" />
            </div>
          }
          {
            collection === "fendi" && <div className={styles.imgCover}>
            <img src="/images/fendih1.jpg" alt="abc" />
            <img src="/images/fendih4.jpg" alt="abc" />
            </div>
          }
          {
            collection === "dolce&Gabbana" && <div className={styles.imgCover}>
            <img src="/images/dgheels4.jpg" alt="abc" />
            <img src="/images/dgheels2.jpg" alt="abc" />
            </div>
          }
          {
            collection === "jimmyChoo" && <div className={styles.imgCover}>
            <img src="/images/jcheels5.webp" alt="abc" />
            <img src="/images/jcheels9.jpg" alt="abc" />
            </div>
          }
          <div className={styles.fadeBottom2}></div>
          <div className={styles.collectionIntro}>
            <h4><Translate>{brandSelected?.collections[1].title}</Translate></h4>
            <div className={styles.cut}></div>
            <span><Translate>{brandSelected?.collections[1].subTitle}</Translate></span>
            <button onClick={()=> navigate(`/seeAll/${collection}/Heels`)}>Explore</button>
          </div>
        </div>
      </div>

      {/* ACCESSORIES */}
      <div className={styles.collectionContainer}>
        <div className={styles.collectionCover}>
          {
            collection === "louisVuitton" && <div className={styles.imgCover}>
            <img src="/images/lvacce8.avif" alt="abc" />
            <img src="/images/lvacce9.avif" alt="abc" />
            </div>
          }
          {
            collection === "gucci" && <div className={styles.imgCover}>
            <img src="/images/gacce1.webp" alt="abc" />
            <img src="/images/gacce2.webp" alt="abc" />
            </div>
          }
          {
            collection === "fendi" && <div className={styles.imgCover}>
            <img src="/images/fendiacc2.avif" alt="abc" />
            <img src="/images/fendiacc3.avif" alt="abc" />
            </div>
          }
          {
            collection === "dolce&Gabbana" && <div className={styles.imgCover}>
            <img src="/images/dgacc4.jpg" alt="abc" />
            <img src="/images/dgacc1.jpg" alt="abc" />
            </div>
          }
          {
            collection === "jimmyChoo" && <div className={styles.imgCover}>
            <img src="/images/jcacc6.jpg" alt="abc" />
            <img src="/images/jcacc4.jpg" alt="abc" />
            </div>
          }
          <div className={styles.fadeBottom2}></div>
          <div className={styles.collectionIntro}>
          <h4><Translate>{brandSelected?.collections[3].title}</Translate></h4>
            <div className={styles.cut}></div>
            <span><Translate>{brandSelected?.collections[3].subTitle}</Translate></span>
            <button onClick={()=> navigate(`/seeAll/${collection}/Accessories`)}>Explore</button>
          </div>
        </div>
      </div>
      
      {/* SUNGLASSES */}
      <div className={styles.collectionContainer}>
        <div className={styles.collectionCover}>
          {
            collection === "louisVuitton" && <div className={styles.imgCover}>
            <img src="/images/lvsun2.avif" alt="abc" />
            <img src="/images/lvsun4.avif" alt="abc" />
            </div>
          }
          {
            collection === "gucci" && <div className={styles.imgCover}>
            <img src="/images/gsun2.webp" alt="abc" />
            <img src="/images/gsun3.webp" alt="abc" />
            </div>
          }
          {
            collection === "fendi" && <div className={styles.imgCover}>
            <img src="/images/fendisun1.avif" alt="abc" />
            <img src="/images/fendisun3.avif" alt="abc" />
            </div>
          }
          {
            collection === "dolce&Gabbana" && <div className={styles.imgCover}>
            <img src="/images/dgsun1.jpg" alt="abc" />
            <img src="/images/dgsun4.jpg" alt="abc" />
            </div>
          }
          {
            collection === "jimmyChoo" && <div className={styles.imgCover}>
            <img src="/images/jcsun1.jpg" alt="abc" />
            <img src="/images/jcsun4.jpg" alt="abc" />
            </div>
          }
          <div className={styles.fadeBottom2}></div>
          <div className={styles.collectionIntro}>
            <h4><Translate>{brandSelected?.collections[4].title}</Translate></h4>
            <div className={styles.cut}></div>
            <span><Translate>{brandSelected?.collections[4].subTitle}</Translate></span>
            <button onClick={()=> navigate(`/seeAll/${collection}/Sunglasses`)}>Explore</button>
          </div>
        </div>
      </div>

      {/* SNEAKERS */}
      <div className={styles.collectionContainer}>
        <div className={styles.collectionCover}>
          {
            collection === "louisVuitton" && <div className={styles.imgCover}>
            <img src="/images/lvsne3.webp" alt="abc" />
            <img src="/images/lvsne8.webp" alt="abc" />
            </div>
          }
          {
            collection === "gucci" && <div className={styles.imgCover}>
            <img src="/images/snea3.webp" alt="abc" />
            <img src="/images/snea4.webp" alt="abc" />
            </div>
          }
          {
            collection === "fendi" && <div className={styles.imgCover}>
            <img src="/images/fendis4.jpg" alt="abc" />
            <img src="/images/fendis2.jpg" alt="abc" />
            </div>
          }
          {
            collection === "dolce&Gabbana" && <div className={styles.imgCover}>
            <img src="/images/dgsne4.jpg" alt="abc" />
            <img src="/images/dgsne1.jpg" alt="abc" />
            </div>
          }
          {
            collection === "jimmyChoo" && <div className={styles.imgCover}>
            <img src="/images/jcsnea.jpg" alt="abc" />
            <img src="/images/jcsnea6.jpg" alt="abc" />
            </div>
          }
          <div className={styles.fadeBottom2}></div>
          <div className={styles.collectionIntro}>
            <h4><Translate>{brandSelected?.collections[2].title}</Translate></h4>
            <div className={styles.cut}></div>
            <span><Translate>{brandSelected?.collections[2].subTitle}</Translate></span>
            <button onClick={()=> navigate(`/seeAll/${collection}/Sneakers`)}>Explore</button>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
   );
}
 
export default LVCollection;