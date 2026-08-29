"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info } from "lucide-react";

interface ToastContextType {
  showToast: (message: string, type?: "success" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info";
    id: number;
  } | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "info" = "success") => {
      const id = Date.now();
      setToast({ message, type, id });
      setTimeout(() => {
        setToast((current) => (current?.id === id ? null : current));
      }, 3000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 w-full max-w-sm">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mx-auto flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#2C2520]/95 backdrop-blur-md text-ivory-50 border border-gold-400/40 shadow-xl text-xs font-sans tracking-wide"
            >
              {toast.type === "success" ? (
                <div className="w-4 h-4 rounded-full bg-gold-400/20 text-gold-300 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3" />
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full bg-ivory-200/20 text-ivory-100 flex items-center justify-center flex-shrink-0">
                  <Info className="w-3 h-3" />
                </div>
              )}
              <span className="font-medium">{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
