import React from 'react'

export default function Currencyrow(props) {
   const {
      currencyOptions,
      insideCurrency,
      currencyChanged,
      inputChanged,
      amount
   } = props;
   return (
      <div>
         <input type="number" className="input" onChange= {inputChanged} value={amount}/>
         <select value= {insideCurrency} onChange={currencyChanged} >
            {  currencyOptions.map(option => 
            (<option key = {option} value={option}> {option} </option>)
         )}
         </select>
      </div>
   )
}
