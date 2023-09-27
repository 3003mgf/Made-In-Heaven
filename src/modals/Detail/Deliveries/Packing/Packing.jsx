import React from 'react';
import styles from "./Packing.module.css";


const PackingDel = ({openPacking, setOpenPacking}) => {
  return ( 
    <article className={styles.article} style={{right: openPacking ? "0px" : "-200vw", opacity: openPacking ? 1 : 0}}>
      <div className={styles.div}>
        <div className={styles.title}>
          <i className='bx bx-chevron-left' onClick={()=> setOpenPacking(false)}></i>
          <span>Packing</span>
        </div>
        <div className={styles.container}>
          <h2 className='mb-3'><b>Louis Vuitton</b></h2>
          <img src="https://www.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--box_gift_cards_DI3.jpg?wid=1090" alt="abc" />
          <span className={styles.spanThin}>
            All Louis Vuitton orders are presented in an iconic gift box in the distinctive "Safran Impérial" shade. Playing with contrast, the boxes are accented with touches of blue, reminiscent of the House's ribbons and the historical color used for personalization since 1854. The chromatic harmony creates a timeless charm with a contemporary touch, in an ode to age travel gold.
          </span>

          <h2 className='mb-3 mt-5 pt-5'><b>Gucci</b></h2>
          <img src="https://media.gucci.com/content/WrappingPdp_Standard_528x398/1640700909/WrappingPdp_EcoGreenBoxes_001_Default.jpg" alt="abc" />
          <span className={styles.spanThin}>
            Innovatively designed to be recyclable, Gucci’s emblematic packaging channels the House’s fascination with vintage-inspired designs. An online exclusive reusable cotton tote is included with most Gucci.com orders.
          </span>


          <h2 className='mb-3 mt-5 pt-5'><b>Fendi</b></h2>
          <img src="https://static.fendi.com/cms/resource/image/572806/landscape_ratio16x9/1920/1080/f6405a16c80c832d802b9ed75ceea178/D915E8542FB3833F121CCE58104545F0/responsible-packaging.jpg" alt="abc" />
          <span className={styles.spanThin}>
            Fendi extend their sustainable sourcing commitment to a distinctive element of their brand’s image – packaging. All paper and cardboard used for FENDI’s shoppers and boxes are 100% recyclable and are 100% Forest Stewardship Council® certified.
          </span>


          <h2 className='mb-3 mt-5 pt-5'><b>Dolce & Gabbana</b></h2>
          <img src="https://d2dalh4h075hii.cloudfront.net/wp-content/uploads/2023/04/dolce-and-gabbana-policy-ecofur-banner-white-featured-image.jpg" alt="abc" />
          <span className={styles.spanThin}>
            The standard Dolce & Gabbana packaging is composed of a rigid black box which is sealed with black satin ribbon and personalized with the Dolce&Gabbana logo. For some product categories, there is an additional customised protective packaging, in which the item is wrapped. The items thus presented are packaged and delivered with an external Havana cardboard box.
          </span>


          <h2 className='mb-3 mt-5 pt-5'><b>Jimmy Choo</b></h2>
          <img src="/images/jimmyPackage.jpeg" alt="abc" />
          <span className={styles.spanThin}>
            Jimmy Choo only provide one dust bag per product. Their small leather goods arrive with their own dust bags, and sunglasses in their own branded case. Should you receive an order with a missing dust bag or damaged packaging, please contact Customer Services.
          </span>
        </div>
      </div>
    </article>
   );
}
 
export default PackingDel;