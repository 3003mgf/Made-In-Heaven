import React, { useContext, useEffect, useState } from 'react';
import styles from "./Landing.module.css";
import { Dropdown } from 'primereact/dropdown';
import { GlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import HelmetMeta from '../../components/Utils/Helmet';


const countrySelectItems = [
  {label: 'United States', value: 'USD'},
  {label: 'Cánada', value: 'CAD'},
  {label: 'Argentina', value: 'ARS'},
  {label: 'Australia', value: 'AUD'},
  {label: 'Europe', value: 'EUR'}
];


const Landing = () => {


  const navigate = useNavigate();

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { currency, setCurrency } = globalContext;


  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // OPACITY EFFECT
    setTimeout(()=>{
      setMounted(true)
    },100)
  }, []);

  const handleNavigate = () =>{
    if(currency){
      navigate("/home");
    }else{
      return;
    }
  }

  return ( 
    <div>
      <HelmetMeta title={"Welcome to Made in Heaven"}/>
      <div className={styles.backgroundImg}></div>
      <div className={styles.container}>
        <h1 style={{marginTop: mounted ? "3rem" : "-1rem", opacity: mounted ? 1 : 0}}>Made In Heaven</h1>
        <span style={{opacity: mounted ? 1 : 0}}>Welcome to Made In Heaven</span>
        <div className={styles.location} style={{marginLeft: mounted ? "0px" : "-200px", opacity: mounted ? 1 : 0}}>
          <span>Please select a location to continue</span>
          <div className={styles.dropDown} id='landing'>
            <Dropdown 
            className='landingDropdown'
            options={countrySelectItems} 
            onChange={(e) => setCurrency(e.value)} 
            placeholder={currency === "USD" ? "United States" : currency === "CAD" ? "Cánada" : currency === "EUR" ? "Europe" : currency === "ARS" ? "Argentina" : currency === "AUD" ? "Australia" : "Please choose a location"}/>
          </div>
        </div>
        <div className={styles.button}>
          <button onClick={handleNavigate} style={{backgroundColor: currency.length ? "#000000b1" : "transparent", color: currency.length ? "whitesmoke" : "#f5f5f5a1", border: currency.length ? "1px solid transparent" : "1px solid #f7f7f78c"}}>CONTINUE</button>
        </div>
      </div>
    </div>
   );
}
 
export default Landing;