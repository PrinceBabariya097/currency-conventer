import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setdata] = useState({})
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((res) => setdata(res[currency]))
    },[currency])
    return data
}

export default useCurrencyInfo