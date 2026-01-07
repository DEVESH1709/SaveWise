import {useState} from "react";
import {Goal, Currency} from "../types/goal";
import { X } from "lucide-react";


export default function ({
    onClose,
    onSave
}:{
    onClose :()=> void
    onSave :(goal :Goal)=> void
}){
    const [name,setName] = useState("");
    const  [target,setTarget] = useState("")
    const [currency, setCurrency] = useState<Currency>("INR")
    const [errors,setErrors] = useState<{name?:string; target?:string}>({})

    const validate  = ()=>{
         const newErrors: {name ?: string; target ?: string} = {}

         if(!name.trim()){
            newErrors.name = "Goal name is required"
         }else if (name.length >50){
            newErrors.name = "Name muat be less than 50 characters"
         }

         const amount =Number(target)
         if(!target){
            newErrors.target = "Target amount is required"
         }else if (amount <=0){
            newErrors.target = "Amount must be greater than 0"
         } else if (amount > 999999999){
            newErrors.target = "Amount is too large"
         }

         setErrors (newErrors)
         return Object.keys(newErrors).length ===0
    }

    const submit = ()=>{
        if(!validate()) return;

        onSave({
             id: crypto.randomUUID(),
           name: name.trim(),
            target: Number(target),
            currency,
            contributions: []
        })
        onClose();
    }

    return (
        <div className  = "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
<div className="bg-white p-8 rounded-2xl w-96 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Add New Goal</h2>
          <button
            onClick={onClose}
            className="text-slate-400 cursor-pointer hover:text-slate-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Goal Name</label>
            <input
              className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.name ? "border-red-400" : "border-slate-200"
              }`}
              placeholder="e.g., Trip to Japan"
              value={name}
              onChange={e => {
                setName(e.target.value)
                if (errors.name) setErrors({ ...errors, name: undefined })
              }}
              maxLength={50}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Target Amount</label>
            <input
              type="number"
              className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.target ? "border-red-400" : "border-slate-200"
              }`}
              placeholder="e.g., 500000"
              value={target}
              onChange={e => {
                setTarget(e.target.value)
                if (errors.target) setErrors({ ...errors, target: undefined })
              }}
              min="1"
              max="999999999"
            />
            {errors.target && (
              <p className="text-red-500 text-sm mt-1">{errors.target}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Currency</label>
            <select
              className="border border-slate-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              value={currency}
              onChange={e => setCurrency(e.target.value as Currency)}
            >
              <option value="INR">🇮🇳 INR - Indian Rupee</option>
              <option value="USD">🇺🇸 USD - US Dollar</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 border cursor-pointer border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="flex-1 bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Create Goal
          </button>
        </div>
        </div>
        </div>
    )

}