export const Badge = ({ children, variant = 'default', className = '', onClick }) => {
  const variants = {
    default: "bg-cyan-50 text-cyan-700 border-cyan-200",
    secondary: "bg-gray-100 text-gray-700 border-gray-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    premium: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent",
  };

  return (
    <span 
      onClick={onClick}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variants[variant]} ${className} ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
    >
      {children}
    </span>
  );
};
