import React from 'react';
import styles from "./Specs.module.css";
import { Link } from 'react-router-dom';


const SpecsModal = ({product, setOpenSpecsModal, openSpecsModal}) => {
  return ( 
    <article className={styles.article} style={{right: openSpecsModal ? "0px" : "-200vw", opacity: openSpecsModal ? 1 : 0}}>
      <div className={styles.div}>
        <div className={styles.title}>
          <span>Product Details</span>
          <i className='bx bx-x' onClick={()=> setOpenSpecsModal(false)}></i>
        </div>
        <div className={styles.container}>
          <div className={styles.description}>
            {product?.description}
          </div>
          <div className={styles.specifications}>
            <span className={styles.specsTitle}>Specifications:</span>
            <ul>
              {
                product?.specifications.split("@").map((el, index) => {
                  if(index !== 0){
                    return(
                      <li>{el}</li>
                    )
                  }
                })
              }
            </ul>
          </div>
          <div className={styles.legalNotice}>
            <span>
              Legal notice: Made In Heaven updates the component lists of its products periodically. Before using a Made In Heaven product, we recommend that you read the list of ingredients on the packaging to ensure that they are suitable for your personal use.
            </span>
          </div>
          <div className={styles.link}>
            <span>
              Discover our <Link to="/ourStore">Women's Collection.</Link>
            </span>
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default SpecsModal;