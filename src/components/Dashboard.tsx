import {Goal} from '../types/goal';

export default function Dashboard({
    goals,
    rate,
    loading,
    error,
    loastUpdated,
    onRefresh
}:{
    goals:Goal[];
    rate:number|null;
    loading:boolean;
    error:string|null;
    lastUpdated:string|null;
    onRefresh:()=>void;
}) {
    
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <p>Welcome to your dashboard! Here you can track your financial goals and progress.</p>
        </div>
    );
}