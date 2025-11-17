export default function StatCard({ title, value, icon: Icon, color, targetRef }){
    const handleCardClick = () => {
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'       
      });
    }
  };
   return (
    <button
      onClick={handleCardClick}
      className={`p-5 rounded-xl shadow-lg flex items-center justify-between text-white transition-transform duration-300 hover:scale-[1.03] w-full focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-${color.split('-')[1]}-400 ${color}`}
    >
      <div>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <Icon className="w-8 h-8 opacity-50" />
    </button>
  );
}