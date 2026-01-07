import {Goal} from "../types/goal";
import {formatMoney} from "../utils/currency";

export default function GoalCard({
    goal,
    rate,
    onAdd
}:{
    goal: Goal;
    rate: number |null;
    onAdd: ()=>void;
}){
   const saved = goal.contributions.reduce((s,c)=>s+c.amount,0)
   const remaining = goal.target- saved
   const progress = Math.min(
    100,
    Math.round((saved/goal.target)*100
   ))

   const converted = goal.currency ==="USD"
                    ?goal.target*(rate ??1)
                    : goal.target / (rate ?? 1)
   
return (
    <div className = " bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
        <div className = "flex justify-between items-start mb-4">
            <div>
                <h3 className = "font-semibold text-slate-800 text-lg">{goal.name}</h3>
                <p className = "text-2xl font-bold text-indigo-600 mt-1">
                    {formatMoney(goal.target,goal.currency)}
                </p>
                <p className = "text-sm text-slate-400">
                    {formatMoney(converted, goal.currency ==="USD" ?"INR" :"USD")}
                </p>
            </div>
            <div className = "bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                {progress}%
            </div>

        </div>

        <div className = "mb-4">
            <div className = "flex justify-between text-sm text-slate-500 mb-2">
                <span>Progress</span>
                <span className = "text-slate-700 font-medium">{formatMoney(saved, goal.currency)}</span>
            </div>
            <div className ="h-2 bg-slate-100 rounded-full overflow-hidden" >
                <div 
                 className = "h-full bg-linear-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />

                </div>

            </div>


            <div className="flex justify-between text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">
        <span>{goal.contributions.length} contribution{goal.contributions.length !== 1 ? 's' : ''}</span>
        <span>{formatMoney(Math.max(0, remaining), goal.currency)} remaining</span>
      </div>
       

         <button
        onClick={onAdd}
        className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <span className="text-lg">+</span> Add Contribution
      </button>
    </div>
)
}