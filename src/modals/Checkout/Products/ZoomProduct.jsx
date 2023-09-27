import React, { useContext } from 'react';
import styles from "./ZoomProduct.module.css"
import { GlobalContext } from '../../../context/globalContext';

const ZoomProduct = () => {

  const globalContext = useContext(GlobalContext);
  const { showZoomProduct, setShowZoomProduct } = globalContext;  

  return ( 
    <article className={styles.article} style={{bottom: showZoomProduct ? "0px" : "-1400px", opacity: showZoomProduct ? 1 : 0}}>
      <div className={styles.div}>
        <div className={styles.close} onClick={()=> setShowZoomProduct(false)}>
          <i className="fa-solid fa-circle-xmark fa-sm"></i>
        </div>
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            {
              showZoomProduct && showZoomProduct.map((image, index) => {
                if(index === 0){
                  return <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                }else{
                  return <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={`${index.toString()}`} aria-label={`Slide ${index + 1}`}></button>
                }
              })
            }
          </div>
          <div class="carousel-inner">
            {
              showZoomProduct && showZoomProduct.map((image, index) => {
                return (
                  <div class={`carousel-item ${index === 0 && "active"}`}>
                    {
                      image.includes("mp4") ? (
                        <video src={image.trim()} muted controls loop className='d-block w-100' style={{cursor:"pointer"}}></video>
                      ):(
                        image.slice(0, 2) === "hh" ? <img src={"h" + image.slice(2, image.length).trim()} class="d-block w-100" alt="..."  /> : <img src={image.trim()} class="d-block w-100" alt="..."  />
                      )
                    }
                  </div>
                )
              })
            }
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </article>
   );
}
 
export default ZoomProduct;