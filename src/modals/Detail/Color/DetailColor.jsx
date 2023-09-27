import React from 'react';
import styles from "./DetailColor.module.css";


const DetailColor = ({colorModal, setColorModal, product, detailColor, setDetailColor}) => {
  
  const handleColor = (color) =>{
    if(detailColor !== color){
      setDetailColor(color);
      setTimeout(()=>{
        setColorModal(false);
      }, 300);
    };
  };
  
  return ( 
    <article className={styles.article} style={{right: colorModal ? "0px" : "-200vw"}}>
      <div className={styles.div}>
        <div className={styles.top}>
          <span>Color</span>
          <i className='bx bx-x' onClick={()=> setColorModal(false)}></i>
        </div>
        <div className={styles.container}>
          {
            product?.images.map(obj => {
              return(
                <div className={`${styles.card} ${detailColor === obj.color && styles.selected}`} onClick={()=> handleColor(obj.color)}>
                  <img src={obj.images[0]} alt="abc" />
                  <div className={styles.span}>
                    <span>{obj.color}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </article>
   );
}
 
export default DetailColor;