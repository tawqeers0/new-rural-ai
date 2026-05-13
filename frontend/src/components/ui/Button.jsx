import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export const Button = forwardRef(({ children, variant = 'primary', size = 'md', className = '', style, ...props }, ref) => {
  const base = "inline-flex items-center justify-center font-bold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary: "text-white border-0 shadow-[0_4px_20px_rgba(15,23,42,0.15)]",
    secondary: "bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]",
    outline: "border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#0F172A]",
    ghost: "bg-transparent hover:bg-[#F1F5F9] text-[#475569]",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm rounded-lg gap-1.5",
    md: "h-10 px-4 text-sm rounded-xl gap-2",
    lg: "h-12 px-6 text-base rounded-xl gap-2",
  };

  const primaryStyle = variant === 'primary'
    ? { background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)', ...style }
    : style;

  return (
    <motion.button
      ref={ref}
      whileHover={variant === 'primary'
        ? { y: -3, boxShadow: '0 15px 30px rgba(15,23,42,0.2)' }
        : { scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      style={primaryStyle}
      {...props}
    >
      {children}
    </motion.button>
  );
});
Button.displayName = 'Button';
