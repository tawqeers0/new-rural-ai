export const Progress = ({ value, max = 100, className = '', colorClass = 'bg-cyan-500' }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={`w-full bg-gray-100 rounded-full h-2.5 overflow-hidden ${className}`}>
      <div 
        className={`h-2.5 rounded-full ${colorClass} transition-all duration-500 ease-out`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
