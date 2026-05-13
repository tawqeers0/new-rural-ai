import { motion } from 'framer-motion';

export const AudioWave = ({ isPlaying }) => {
  return (
    <div className="flex items-center gap-1 h-4">
      {[1, 2, 3, 4, 5].map((bar) => (
        <motion.div
          key={bar}
          className="w-1 bg-cyan-500 rounded-full"
          animate={{
            height: isPlaying ? ["20%", "100%", "20%"] : "20%",
          }}
          transition={{
            duration: 0.6,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
            delay: bar * 0.1,
          }}
          style={{ height: '20%' }}
        />
      ))}
    </div>
  );
};
