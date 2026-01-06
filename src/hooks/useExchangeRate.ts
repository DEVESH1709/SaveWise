import { useState, useEffect } from "react";
const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`


const CACHE_KEY = "exchange_rate_cache"
const CACHE_TTL = 12 * 60 * 60 * 1000 


export function useExchangeRate(){
  const [rate,setRate] = useState<number|null>(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState<string|null>(null);
  const [lastUpdated, setLastUpdated] = useState<string |null>(null)

  const fetchRate = async(force = false) =>{
    try{
        setLoading(true);
        setError(null);

        if(!force){
            const cached = localStorage.getItem(CACHE_KEY);
            if(cached){
                const {rate,timestamp} = JSON.parse(cached);

                if(Date.now()-timestamp < CACHE_TTL){
                    setRate(rate);
                    setLastUpdated(new Date(timestamp).toLocaleString())
                    setLoading(false);
                    return ;
            }
        }
    }

    const res = await fetch(API_URL);
    if(!res.ok) throw new Error();

    const data = await res.json();
    const inrRate = data.conversion_rates.INR;
    const timestamp = Date.now();

    localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({rate:inrRate, timestamp})
    )
    setRate(inrRate);
    setLastUpdated(new Date(timestamp).toLocaleString())

  }catch{
    setError('Failed to load exchange rate');
  } finally{
    setLoading(false);
  }
  }
  useEffect(() => {
    fetchRate()
  }, [])

  return {
    rate,
    loading,
    error,
    lastUpdated,
    refresh: () => fetchRate(true)
  }

}