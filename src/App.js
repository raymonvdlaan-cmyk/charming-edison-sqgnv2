import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LockScreen() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <AnimatePresence>
        {!unlocked ? (
          <motion.img
            key="lights-off"
            src="/audi-off.png" // nieuwe afbeelding: lichten volledig uit
            alt="Audi A3 lights off"
            className="w-full h-full object-cover"
            initial={{ y: 0 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.y < -100) setUnlocked(true);
            }}
          />
        ) : (
          <motion.div
            key="lights-on"
            className="w-full h-full relative"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Auto met lichten aan (maar fade-in effect) */}
            <motion.img
              src="/audi-on.png"
              alt="Audi A3 lights on"
              className="w-full h-full object-cover"
              initial={{ filter: "brightness(40%)" }}
              animate={{ filter: "brightness(100%)" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {/* Glow flash effect */}
            <motion.div
              className="absolute inset-0 bg-white/30 blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!unlocked && (
        <div className="absolute bottom-10 w-full text-center text-white text-lg">
          ↑ Swipe omhoog om te ontgrendelen
        </div>
      )}
    </div>
  );
}
