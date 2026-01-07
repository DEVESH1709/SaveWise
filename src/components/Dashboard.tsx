import {Goal} from '../types/goal';
import {formatMoney} from '../utils/currency';
export default function Dashboard({
    goals,
    rate,
    loading,
    error,
    lastUpdated,
    onRefresh
}:{
    goals:Goal[];
    rate:number|null;
    loading:boolean;
    error:string|null;
    lastUpdated:string|null;
    onRefresh:()=>void;
}) {
    const totals = goals.reduce(
        (acc,g)=>{
            const saved = g.contributions.reduce((s,c)=> s+c.amount,0);
            acc.saved += g.currency === "USD" ? saved * (rate ?? 1) :saved
            acc.target += g.currency ==="USD" ? g.target * (rate ?? 1) : g.target
            acc.savedUSD += g.currency === "USD" ? saved : saved / (rate ?? 1)
            acc.targetUSD += g.currency === "USD" ? g.target : g.target / (rate ?? 1)
            return acc;
        },
        {saved:0,target:0,savedUSD:0,targetUSD:0}
    )

    const progress = totals.target ? Math.round((totals.saved / totals.target)* 100) :0;
    return (
        <div className = "bg-linear-to-r from-indigo-600 via-indigo-500 to-blue-500 rounded-2xl p-6 mb-8 shadow-xl">
           <div className  ="flex justify-between items-center mb-6">
            <div className = "flex items-center gap-2">
                <span className = "text-white/80"></span>
                <span className = "text-white font-medium"> Financial Overview</span>

            </div>
            <button 
            onClick = {onRefresh}
            className = "bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors flex items-center gap-2"
            >
                Refresh Rates
            </button>
           </div>

           <div className = "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <p className="text-white/80 text-sm">Total Targets</p>
          </div>
          <p className="text-2xl font-bold text-white">
            {formatMoney(totals.target, "INR")}
          </p>
          <p className="text-white/60 text-sm">
            ${totals.targetUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
           </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            <p className="text-white/80 text-sm">Total Saved</p>
          </div>
          <p className="text-2xl font-bold text-white">
            {formatMoney(totals.saved, "INR")}
          </p>
          <p className="text-white/60 text-sm">
            ${totals.savedUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
        </div>

         <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <p className="text-white/80 text-sm">Overall Progress</p>
          </div>
          <p className="text-2xl font-bold text-white">{progress}%</p>
          <p className="text-white/60 text-sm">Total goals completion</p>
        </div>
            </div>
<div className="flex justify-between items-center pt-4 border-t border-white/20">
        <div className="text-white/60 text-sm">
          {loading && "Loading exchange rate..."}
          {error && <span className="text-red-300">{error}</span>}
          {!loading && !error && rate && (
            <span>Exchange Rate: 1 USD = ₹{rate.toFixed(2)}</span>
          )}
        </div>
        <div className="text-white/60 text-sm">
          {lastUpdated && `Last updated: ${lastUpdated}`}
        </div>
      </div>
        </div>

    );
}