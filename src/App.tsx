import Dashboard from "./components/Dashboard";
import {useState} from "react";
import {Goal} from "./types/goal";
import {useExchangeRate} from "./hooks/useExchangeRate";
import {loadGoals} from "./utils/storage";


export default function App() {
  const [goals,setGoals] = useState<Goal[]>(loadGoals());
  const {rate,loading,error, lastUpdated,refresh} = useExchangeRate();

  return (
    <div className = "min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to indigo-100">
      <div className ="max-w-5xl mx-auto p-6">
        <header className = "text-center mb-8 pt-6">
          <h1 className = "text-2xl font-bold text-slate-800">Syfe Saving Planner</h1>
           <p className = "text-slate-500 text-sm">Track your financial goals and build your future</p>
        </header>


         <Dashboard
         goals={goals} 
          rate={rate} 
          loading={loading}
          error={error}
          lastUpdated={lastUpdated}
          onRefresh={refresh}
          />
      </div>
     
    </div>
  )
}


