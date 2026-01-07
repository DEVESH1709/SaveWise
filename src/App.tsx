import Dashboard from "./components/Dashboard";
import {useState} from "react";
import {Goal} from "./types/goal";
import {useExchangeRate} from "./hooks/useExchangeRate";
import {loadGoals, saveGoals} from "./utils/storage";
import GoalCard from "./components/GoalCard";
import AddGoalModal from "./components/AddGoalModal";
import AddContributionModal from "./components/AddContributionModal";

export default function App() {
  const [goals,setGoals] = useState<Goal[]>(loadGoals());
  const {rate,loading,error, lastUpdated,refresh} = useExchangeRate();
  const [showGoal,setShowGoal] = useState(false);
 const [activeGoal,setActiveGoal] = useState<Goal | null>(null);
  const updateGoals  = (g: Goal[])=>{
    setGoals(g)
    saveGoals(g);
  }

  return (
    <div className = "min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <div className ="max-w-5xl mx-auto p-6">
        <header className = "flex items-center justify-center gap-2 mb-2">
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

          <div className = "flex justify-between items-center mb-6">
            <h2 className ="text-xl font-semibold text-slate-800">Your Goals</h2>
            
          <button
            onClick={() => setShowGoal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
          >
            <span className="text-lg">+</span> Add Goal
          </button>
          </div>

          <div className = "grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map(g=>(
              <GoalCard
               key = {g.id}
               goal = {g}
               rate = {rate}
               onAdd = {()=>setActiveGoal(g)}
              />
            ))}
          </div>

          {goals.length ===0 && (
            <div className = "text-center py-12 text-slate-400">
              <p> No goals yet. Click "Add Goal" to get started!</p>
            </div>
          )}

          {showGoal && (
            <AddGoalModal
            onClose ={()=>setShowGoal(false)}
            onSave = {g =>updateGoals([...goals,g])}
            />
          )}

          {activeGoal && (
            <AddContributionModal
             onClose = {()=>setActiveGoal(null)}
             onSave={(amount,date)=>
              updateGoals(
                goals.map(g=>
                  g.id ===activeGoal.id
                  ?{...g,
                    contributions:[...g.contributions,{amount,date}]
                  }
                  :g
                )
              )
             }
            />
          )}
      </div>
     
    </div>
  )
}


