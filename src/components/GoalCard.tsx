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
        <div className = "flex justify-between item-start mb-4">
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

        
    </div>
)
}