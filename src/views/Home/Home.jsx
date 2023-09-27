import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./Home.module.css";
import { GlobalContext } from '../../context/globalContext';
import HelmetMeta from '../../components/Utils/Helmet';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useInView } from 'react-intersection-observer';
import { Translate } from 'react-auto-translate';



const Home = () => {

  const navigate = useNavigate();

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { refHeader, refLV, refLVVideo, refGucci, refGucciVideo, refFendi, refFendiVideo, refDolce, refDolceVideo, refJimmy, refJimmyVideo, refToastCheckoutAutocomplete } = globalContext;


  // MAIN UEF
  useEffect(() => {
    if(refLVVideo.current){
      refLVVideo.current.play();
    }
    if(refGucciVideo.current){
      refGucciVideo.current.play();
    }
    if(refFendiVideo.current){
      refFendiVideo.current.play();
    }
    if(refDolceVideo.current){
      refDolceVideo.current.play();
    }
    if(refJimmyVideo.current){
      refJimmyVideo.current.play();
    }

    const notAuthorized = new URLSearchParams(window.location.search).get("alert");
    if(notAuthorized === "notauthorized"){
      refToastCheckoutAutocomplete.current.show({life: 3000, severity: "info", summary: `We're sorry!`, detail: `You must be logged in order to access that section`});
    };
  }, []);


// -------- GUCCI VIDEO INTERSECTING --------->
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
       threshold: 0.8
   };
 
   useEffect(() => {
     // LV VIDEO OBSERVER
     const lvObserver = new IntersectionObserver(lvCb, options);
     if(refLV.current) lvObserver.observe(refLV.current);
     
     if(!refLV.current) lvObserver.unobserve(refLV.current);
     
     if(lvVisible){
        refHeader.current.style.backgroundColor = "transparent";
     }else{
        refHeader.current.style.backgroundColor = "#00000033";
     }

   }, [refLV, lvVisible]);



  // VIDEO REFS (PLAY VIDEO AND MUTE IT WHEN IS NOT BEING SEEN AT 100%)
  const { ref: gucciRef, inView: gucciView, entry: gucciEntry } = useInView({
    /* Optional options */
    threshold: 0.01,
  });
  const { ref: lvRef, inView: lvView, entry: lvEntry } = useInView({
    /* Optional options */
    threshold: 0.01,
  });
  const { ref: fendiRef, inView: fendiView, entry: fendiEntry } = useInView({
    /* Optional options */
    threshold: 0.01,
  });
  const { ref: dolceRef, inView: dolceView, entry: dolceEntry } = useInView({
    /* Optional options */
    threshold: 0.01,
  });
  const { ref: jimmyRef, inView: jimmyView, entry: jimmyEntry } = useInView({
    /* Optional options */
    threshold: 0.01,
  });


  useEffect(() => {
    // Louis Vuitton
    if(!lvView){
      if(!muteLVVideo){
        setMuteLVVideo(true);
      };
      if(!playLVVideo){
        setPlayLVVideo(true);
      };
    };
    // Gucci
    if(!gucciView){
      if(!muteGucciVideo){
        setMuteGucciVideo(true);
      };
      if(!playGucciVideo){
        setPlayGucciVideo(true);
      };
    };
    // Fendi
    if(!fendiView){
      if(!muteFendiVideo){
        setMuteFendiVideo(true);
      };
      if(!playFendiVideo){
        setPlayFendiVideo(true);
      };
    };
    // Dolce
    if(!dolceView){
      if(!muteDolceVideo){
        setMuteDolceVideo(true);
      };
      if(!playDolceVideo){
        setPlayDolceVideo(true);
      };
    };
    // Jimmy
    if(!jimmyView){
      if(!muteJimmyVideo){
        setMuteJimmyVideo(true);
      };
      if(!playJimmyVideo){
        setPlayJimmyVideo(true);
      };
    };
  }, [gucciView, lvView, fendiView, dolceView, jimmyView]);

  // VIDEO REFS ENDS

  // LV TIME UPDATE
  const [lvTimeUpdate, setLvTimeUpdate] = useState(0);
  const [playLVVideo, setPlayLVVideo] = useState(true);
  const [muteLVVideo, setMuteLVVideo] = useState(true);

  const handleTimeUpdateLV = (e) =>{
    setLvTimeUpdate((e.target.currentTime / e.target.duration) * 100);
  };

  useEffect(() => {
    if(playLVVideo){
      refLVVideo?.current?.play();
    }else{
      refLVVideo?.current?.pause();
    }
  }, [playLVVideo]);   



  // GUCCI TIME UPDATE
  const [gucciTimeUpdate, setGucciTimeUpdate] = useState(0);
  const [playGucciVideo, setPlayGucciVideo] = useState(true);
  const [muteGucciVideo, setMuteGucciVideo] = useState(true);

  const handleTimeUpdateGucci = (e) =>{
    setGucciTimeUpdate((e.target.currentTime / e.target.duration) * 100);
  };

  useEffect(() => {
    if(playGucciVideo){
      refGucciVideo?.current?.play();
    }else{
      refGucciVideo?.current?.pause();
    }
  }, [playGucciVideo]);


  // FENDI TIME UPDATE
  const [fendiTimeUpdate, setFendiTimeUpdate] = useState(0);
  const [playFendiVideo, setPlayFendiVideo] = useState(true);
  const [muteFendiVideo, setMuteFendiVideo] = useState(true);

  const handleTimeUpdateFendi = (e) =>{
    setFendiTimeUpdate((e.target.currentTime / e.target.duration) * 100);
  };

  useEffect(() => {
    if(playFendiVideo){
      refFendiVideo?.current?.play();
    }else{
      refFendiVideo?.current?.pause();
    }
  }, [playFendiVideo]);


   // DOLCE TIME UPDATE
   const [dolceTimeUpdate, setDolceTimeUpdate] = useState(0);
   const [playDolceVideo, setPlayDolceVideo] = useState(true);
   const [muteDolceVideo, setMuteDolceVideo] = useState(true);
 
   const handleTimeUpdateDolce = (e) =>{
     setDolceTimeUpdate((e.target.currentTime / e.target.duration) * 100);
   };
 
   useEffect(() => {
     if(playDolceVideo){
       refDolceVideo?.current?.play();
     }else{
       refDolceVideo?.current?.pause();
     }
   }, [playDolceVideo]);


   // JIMMY TIME UPDATE
   const [jimmyTimeUpdate, setJimmyTimeUpdate] = useState(0);
   const [playJimmyVideo, setPlayJimmyVideo] = useState(true);
   const [muteJimmyVideo, setMuteJimmyVideo] = useState(true);
 
   const handleTimeUpdateJimmy = (e) =>{
     setJimmyTimeUpdate((e.target.currentTime / e.target.duration) * 100);
   };
 
   useEffect(() => {
     if(playJimmyVideo){
       refJimmyVideo?.current?.play();
     }else{
       refJimmyVideo?.current?.pause();
     }
   }, [playJimmyVideo]);

 

  return ( 
    <div className={styles.wrapper}>
      <HelmetMeta title={"Made in Heaven • Home"}/>
      <div className={styles.lv} id='lvSection' ref={refLV} data-collection="LV">
        <div className={styles.lvTitle}>
          <span>Louis Vuitton</span>
          <div className={styles.lvExplore}>
            <button onClick={()=> navigate("/collection/louisVuitton")}><Translate>Explore Collection</Translate></button>
          </div>
        </div>
        <div className={styles.lvVideo} ref={lvRef}>
          <video 
            onTimeUpdate={handleTimeUpdateLV}
            muted={muteLVVideo}
            autoPlay
            ref={refLVVideo} 
            playsInline 
            src='https://lv-vod.fl.freecaster.net/vod/louisvuitton/5ysm8hs4iN_HD.mp4' 
            loop>
          </video>
        </div>
        <div className={styles.controls}>
          <div className={styles.volume}>
            {
              muteLVVideo ? (
                <i className='bx bxs-volume-mute' onClick={()=> setMuteLVVideo(!muteLVVideo)}></i>    
              ):(
                <i className='bx bxs-volume-full' onClick={()=> setMuteLVVideo(!muteLVVideo)}></i>
              )
            }
          </div>
          <div className={styles.play}>
            <progress className={styles.progress} max="100" value={lvTimeUpdate}></progress>
            {
              playLVVideo ? (
                <i className='bx bx-pause' onClick={()=> setPlayLVVideo(!playLVVideo)}></i>
              ):(
                <i className='bx bx-play' onClick={()=> setPlayLVVideo(!playLVVideo)}></i>  
              )
            }
          </div>
        </div>
      </div>
      <div className={styles.gucci} id='gucciSection' ref={refGucci} data-collection="Gucci">
        <div className={styles.gucciTitle}>
          <span>Gucci</span>
          <div className={styles.gucciExplore}>
            <button onClick={()=> navigate("/collection/gucci")}><Translate>Explore Collection</Translate></button>
          </div>
        </div>
        <div className={styles.gucciVideo} ref={gucciRef}>
          <video 
            onTimeUpdate={handleTimeUpdateGucci}
            muted={muteGucciVideo}
            autoPlay
            ref={refGucciVideo}
            playsInline 
            src='https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/FrontAssets/Nacho/Gucci+Summer+Stories.mp4' 
            loop>
          </video>
        </div>
        <div className={styles.controls}>
          <div className={styles.volume}>
            {
              muteGucciVideo ? (
                <i className='bx bxs-volume-mute' onClick={()=> setMuteGucciVideo(!muteGucciVideo)}></i>    
              ):(
                <i className='bx bxs-volume-full' onClick={()=> setMuteGucciVideo(!muteGucciVideo)}></i>
              )
            }
          </div>
          <div className={styles.play}>
            <progress className={styles.progress} max="100" value={gucciTimeUpdate}></progress>
            {
              playGucciVideo ? (
                <i className='bx bx-pause' onClick={()=> setPlayGucciVideo(!playGucciVideo)}></i>
              ):(
                <i className='bx bx-play' onClick={()=> setPlayGucciVideo(!playGucciVideo)}></i>  
              )
            }
          </div>
        </div>
      </div>
      <div className={styles.fendi} id='fendiSection' ref={refFendi} data-collection="Fendi">
        <div className={styles.fendiTitle}>
          <span>Fendi</span>
          <div className={styles.fendiExplore}>
            <button onClick={()=> navigate("/collection/fendi")}><Translate>Explore Collection</Translate></button>
          </div>
        </div>
        <div className={styles.fendiVideo} ref={fendiRef}>
          <video 
            onTimeUpdate={handleTimeUpdateFendi}
            muted={muteFendiVideo}
            autoPlay
            ref={refFendiVideo} 
            playsInline 
            src='https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/FrontAssets/Nacho/Fendi+Fall_Winter+2023+Campaign+(1).mp4' 
            loop>
          </video>
        </div>
        <div className={styles.controls}>
          <div className={styles.volume}>
            {
              muteFendiVideo ? (
                <i className='bx bxs-volume-mute' onClick={()=> setMuteFendiVideo(!muteFendiVideo)}></i>    
              ):(
                <i className='bx bxs-volume-full' onClick={()=> setMuteFendiVideo(!muteFendiVideo)}></i>
              )
            }
          </div>
          <div className={styles.play}>
            <progress className={styles.progress} max="100" value={fendiTimeUpdate}></progress>
            {
              playFendiVideo ? (
                <i className='bx bx-pause' onClick={()=> setPlayFendiVideo(!playFendiVideo)}></i>
              ):(
                <i className='bx bx-play' onClick={()=> setPlayFendiVideo(!playFendiVideo)}></i>  
              )
            }
          </div>
        </div>
      </div>
      <div className={styles.dolce} id='dolceSection' ref={refDolce} data-collection="Dolce">
        <div className={styles.dolceTitle}>
          <span>Dolce & Gabanna</span>
          <div className={styles.dolceExplore}>
            <button onClick={()=> navigate("/collection/dolce&Gabbana")}><Translate>Explore Collection</Translate></button>
          </div>
        </div>
        <div className={styles.dolceVideo} ref={dolceRef}>
          <video 
            onTimeUpdate={handleTimeUpdateDolce}
            muted={muteDolceVideo}
            autoPlay
            ref={refDolceVideo} 
            playsInline 
            src='https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/FrontAssets/Nacho/K%26Q+by+Dolce%26Gabbana.mp4' 
            loop>
          </video>
        </div>
        <div className={styles.controls}>
          <div className={styles.volume}>
            {
              muteDolceVideo ? (
                <i className='bx bxs-volume-mute' onClick={()=> setMuteDolceVideo(!muteDolceVideo)}></i>    
              ):(
                <i className='bx bxs-volume-full' onClick={()=> setMuteDolceVideo(!muteDolceVideo)}></i>
              )
            }
          </div>
          <div className={styles.play}>
            <progress className={styles.progress} max="100" value={dolceTimeUpdate}></progress>
            {
              playDolceVideo ? (
                <i className='bx bx-pause' onClick={()=> setPlayDolceVideo(!playDolceVideo)}></i>
              ):(
                <i className='bx bx-play' onClick={()=> setPlayDolceVideo(!playDolceVideo)}></i>  
              )
            }
          </div>
        </div>
      </div>
      <div className={styles.jimmy} id='jimmySection' ref={refJimmy} data-collection="Jimmy">
        <div className={styles.jimmyTitle}>
          <span>Jimmy Choo</span>
          <div className={styles.jimmyExplore}>
            <button onClick={()=> navigate("/collection/jimmyChoo")}><Translate>Explore Collection</Translate></button>
          </div>
        </div>
        <div className={styles.jimmyVideo} ref={jimmyRef}>
          <video 
            onTimeUpdate={handleTimeUpdateJimmy}
            muted={muteJimmyVideo}
            autoPlay
            ref={refJimmyVideo} 
            playsInline 
            src='https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/FrontAssets/Nacho/Introducing+Summer+2022+_+New+Collection+_+Jimmy+Choo.mp4' 
            loop>
          </video>
        </div>
        <div className={styles.controls}>
          <div className={styles.volume}>
            {
              muteJimmyVideo ? (
                <i className='bx bxs-volume-mute' onClick={()=> setMuteJimmyVideo(!muteJimmyVideo)}></i>    
              ):(
                <i className='bx bxs-volume-full' onClick={()=> setMuteJimmyVideo(!muteJimmyVideo)}></i>
              )
            }
          </div>
          <div className={styles.play}>
            <progress className={styles.progress} max="100" value={jimmyTimeUpdate}></progress>
            {
              playJimmyVideo ? (
                <i className='bx bx-pause' onClick={()=> setPlayJimmyVideo(!playJimmyVideo)}></i>
              ):(
                <i className='bx bx-play' onClick={()=> setPlayJimmyVideo(!playJimmyVideo)}></i>  
              )
            }
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Home;


// window.addEventListener("scroll", ()=>{
    //   console.log({WIN: window.scrollY, EL: document.querySelector("#lvSection").getBoundingClientRect()});
    // })
    // Si se ve al 100% se borra el listener