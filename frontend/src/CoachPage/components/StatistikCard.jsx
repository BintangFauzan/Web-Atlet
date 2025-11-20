import { Users, Calendar, Clock, PlusCircle } from 'lucide-react';
import StatCard from '../../ManagerPage/component/StatCard';

export default function StatistikCard({dataCount}){
    return(
        <>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Atlet Tim" 
          value={dataCount.athlete_count} 
          icon={Users} 
          color="bg-purple-600" 
        />
        <StatCard 
          title="Latihan Mendatang" 
          value={dataCount.upcoming_practices.length} 
          icon={Calendar} 
          color="bg-teal-600" 
        />
        <StatCard 
          title="Pertandingan Mendatang" 
          value={dataCount.upcoming_matches.length} 
          icon={Clock} 
          color="bg-orange-600" 
        />
      </div>
        </>
    )
}