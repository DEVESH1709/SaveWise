import {useState} from "react";
import { X } from "lucide-react";

export default function AddContributionModal ({
    onClose,
    onSave
}:{
    onClose:()=>void
    onSave:(amount:number,date:string) =>void
}){

    const [amount,setAmount]  = useState("")
    const [date,setDate] = useState(new Date().toISOString().split('T')[0])
    const [errors,setErrors] = useState<{amount?:string; date?:string}>({})

    const validate = ()=>{
        const newErrors : {amount?:string; date?:string} ={}

        const amountNum = Number (amount)
        if(!amount){
            newErrors.amount = "Amount is required"
        }
        else if(!amount){
            newErrors.amount = "Amount must be greater than 0"
        }
        else if(amountNum > 999999999){
            newErrors.amount = "Amount is too large"
        }

        if(!date){
            newErrors.date = "Date is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length ===0
    }

    const submit =()=>{
        if(!validate()) return 
        onSave(Number(amount),date)
        onClose()
    }
    return (
        <div className = "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className ="bg-white p-8 rounded-2xl w-96 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Add Contribution</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Amount</label>
            <input
              type="number"
              className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.amount ? "border-red-400" : "border-slate-200"
              }`}
              placeholder="e.g., 10000"
              value={amount}
              onChange={e => {
                setAmount(e.target.value)
                if (errors.amount) setErrors({ ...errors, amount: undefined })
              }}
              min="1"
              max="999999999"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Date</label>
            <input
              type="date"
              className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.date ? "border-red-400" : "border-slate-200"
              }`}
              value={date}
              onChange={e => {
                setDate(e.target.value)
                if (errors.date) setErrors({ ...errors, date: undefined })
              }}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="flex-1 bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
           
    )
}