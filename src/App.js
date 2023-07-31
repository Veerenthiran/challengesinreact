import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState("");
  const [isFrom, setIsFrom] = useState("EUR");
  const [isTo, setIsTo] = useState("USD");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function Convert() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${isFrom}&to=${isTo}`
        );
        const data = await res.json();
        setOutput(data.rates[isTo]);
        console.log(data.rates[isTo]);
        setIsLoading(false);
      }
      if (isFrom === isTo) return setOutput(amount);
      Convert();
    },
    [amount, isFrom, isTo]
  );
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isLoading}
      />
      <select
        value={isFrom}
        onChange={(e) => setIsFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={isTo}
        onChange={(e) => setIsTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output}

        {isTo}
      </p>
    </div>
  );
}
