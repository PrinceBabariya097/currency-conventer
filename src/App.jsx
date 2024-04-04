import { useEffect, useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");

  let currencyList = useCurrencyInfo(from);
  let keys = Object.keys(currencyList);
  let rate = currencyList[to];

  const currencyConvertor = () => {
    setConvertedAmount((amount * rate).toFixed(4));
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat text-white object-cover"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
     >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-black/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              currencyConvertor();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                selectCurrency={from}
                currencyOptions={keys}
                onCurrencyChange={(value) => {
                  setFrom(`${value}`);
                }}
                onAmountChange={(value) => setAmount(value)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2   rounded-md bg-purple-950 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                selectCurrency={to}
                currencyOptions={keys}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-950 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}  
            </button>
          </form>
        </div>
      </div>
      <div className="mt-0 text-xl text-orange-600 font-pr font">
        Converted amount is: <span className="text-orange-400">{convertedAmount}</span> 
      </div>
    </div>
  );
}

export default App;
