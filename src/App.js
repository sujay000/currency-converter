import React from 'react';
import { useEffect,useState } from 'react/cjs/react.development';
import './App.css';
import Currencyrow from './Currencyrow';

const BASE_URL = "http://api.exchangeratesapi.io/v1/latest?access_key=14b71ca916a3b04b41093c276353d912&format=1"


function App() {
  
  const [currencyOptions,setCurrencyOptions] = useState([]);
  const [firstCurrency,setFirstCurrency] = useState();
  const [toCurrency,setToCurrency] = useState();
  const [amount,setamount] = useState(1);
  const [amountFromCurrency, setAmountFromCurrency] = useState(true);
  const [exchangeRate,setexchangeRate] = useState();

  var famount, tamount;
  if(amountFromCurrency){
    famount = amount;
    tamount = amount * exchangeRate;
  }
  else{
    tamount = amount;
      famount = amount/exchangeRate;
  }


  useEffect(()=>{
    if(firstCurrency!= null && toCurrency!= null){
      fetch(`${BASE_URL}?base=${firstCurrency}&symbols=${toCurrency}`)
      .then(res=>res.json())
      .then(data=> setexchangeRate(data.rates[toCurrency]))
    }
  },[firstCurrency,toCurrency])


  useEffect(()=>{

    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      setCurrencyOptions([data.base,...Object.keys(data.rates)])
      setFirstCurrency( data.base      );
      setToCurrency(Object.keys(data.rates)[0]);
      setexchangeRate(data.rates[Object.keys(data.rates)[0]]);
    })


},[])

function handleFamount(e){
    setAmountFromCurrency(true);
    setamount(e.target.value);
}

function handleTamount(e){
  setAmountFromCurrency(false);
  setamount(e.target.value);
}


return (
  
  <>
        <h1>Convert</h1>  
        <Currencyrow currencyOptions= {currencyOptions} insideCurrency={firstCurrency}  currencyChanged={(e)=>{setFirstCurrency(e.target.value)}}
         amount={famount} inputChanged={handleFamount}  />
        <div className="equals">=</div>
        <Currencyrow currencyOptions= {currencyOptions} insideCurrency ={toCurrency} currencyChanged={(e)=>{setToCurrency(e.target.value)}} 
        amount= {tamount} inputChanged={handleTamount} />

  </>

  );
}

export default App;
