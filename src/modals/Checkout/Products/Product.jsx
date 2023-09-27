import React, { useContext, useEffect } from 'react';
import styles from "./Product.module.css";
import { GlobalContext } from '../../../context/globalContext';

const CheckoutModal = () => {
  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { setShowProductModal, showProductModal, getPriceByCurrency } = globalContext;

 

  return ( 
    <article className={styles.article} style={{top: showProductModal ? "0px" : "-1000px", opacity: showProductModal ? 1 : 0}}>
      <div className={styles.div}>
        {/* CLOSE BUTTON */}
        <div className={styles.close} onClick={()=> setShowProductModal(false)}>
          <i className="fa-solid fa-sm fa-circle-xmark"></i>
        </div>
        <div className={styles.left}>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {
              showProductModal && showProductModal.images.map((image, index) => {
                return(
                  <div className={`carousel-item ${index === 0 && "active"}`}>
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
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        </div>
        <div className={styles.right}>
          <h4>{showProductModal?.name}</h4>
          <div className={styles.brand}>
            <span>{showProductModal?.brand}</span>
          </div>
          {/* <p className={styles.price}>{getPriceByCurrency(showProductModal?.price)}</p> */}
          <div className={`${styles.overview} mt-5`}>
            <span>Overview</span>
            <p>{showProductModal?.description?.length > 433 ? showProductModal?.description.slice(0, 433) + "…" : showProductModal?.description}</p>
          </div>
          <div className={styles.total}>
            <div className={styles.quantity}>
              <span>Quantity: 1</span>
            </div>
            <div className={styles.totalPrice}>
              <span>{getPriceByCurrency(showProductModal?.price)}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default CheckoutModal;