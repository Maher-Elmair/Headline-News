import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface LoaderProps {
  message?: string;
}

export function Loader({ message = 'Loading...' }: LoaderProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation slightly before component unmounts
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 500); // Start exit 500ms before unmount

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-9999 flex items-center justify-center bg-background"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-16">
          {/* Animated Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center gap-4"
          >
            {/* Logo Columns Container */}
            <div className="relative flex items-center justify-center gap-2">
              {/* Left Vertical Column - animates height with faster, more dynamic motion */}
              <motion.div
                animate={
                  isExiting
                    ? { scaleY: 1 }
                    : {
                        scaleY: [0.5, 1.05, 0.5],
                      }
                }
                transition={
                  isExiting
                    ? { duration: 0.3 }
                    : {
                        duration: 1.2,
                        repeat: Infinity,
                        ease: [0.45, 0, 0.55, 1], // Custom easing for more dynamic feel
                      }
                }
                className="w-3.5 h-14 bg-foreground rounded-[1px] origin-center"
              />

              {/* Right Vertical Column - animates height with offset timing */}
              <motion.div
                animate={
                  isExiting
                    ? { scaleY: 1 }
                    : {
                        scaleY: [0.5, 1.05, 0.5],
                      }
                }
                transition={
                  isExiting
                    ? { duration: 0.3 }
                    : {
                        duration: 1.2,
                        repeat: Infinity,
                        ease: [0.45, 0, 0.55, 1],
                        delay: 0.2,
                      }
                }
                className="w-3.5 h-14 bg-foreground rounded-[1px] origin-center"
              />

              {/* Horizontal Red Bar - moves from left to right and fades out on exit */}
              <motion.div
                animate={
                  isExiting
                    ? {
                        x: [0, 200],
                        opacity: [1, 0],
                      }
                    : {
                        scaleX: [1, 1.15, 1],
                        opacity: [0.8, 1, 0.8],
                      }
                }
                transition={
                  isExiting
                    ? {
                        duration: 0.8,
                        ease: 'easeInOut',
                      }
                    : {
                        duration: 1.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                }
                className="absolute top-[35%] w-14 h-2.5 bg-primary rounded-[1px]"
                style={{ left: '-1px' }}
              />
            </div>

            {/* Logo Text */}
            <motion.span
              animate={
                isExiting
                  ? { opacity: 1 }
                  : {
                      opacity: [0.7, 1, 0.7],
                    }
              }
              transition={
                isExiting
                  ? { duration: 0.3 }
                  : {
                      duration: 1.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              className="font-serif text-4xl font-bold pt-1"
            >
              Headline
            </motion.span>
          </motion.div>

          {/* Loading Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-8"
          >
            <p className="text-lg font-medium text-muted-foreground">
              {message}
            </p>

            {/* Loading Dots - Bigger, faster, with color gradient based on position */}
            <div className="flex items-center gap-3.5 mt-2">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  animate={
                    isExiting
                      ? { y: 0, scale: 1, opacity: 1 }
                      : {
                          y: [0, -16, 0],
                          opacity: [0.4, 1, 0.4],
                        }
                  }
                  transition={
                    isExiting
                      ? { duration: 0.2 }
                      : {
                          duration: 0.6,
                          repeat: Infinity,
                          ease: [0.45, 0, 0.55, 1], // Custom easing for snappier feel
                          delay: index * 0.12,
                        }
                  }
                  className="h-4 w-4 rounded-full bg-primary"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
