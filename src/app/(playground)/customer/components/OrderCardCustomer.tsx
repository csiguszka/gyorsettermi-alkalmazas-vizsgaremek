"use client";

import { Card } from "@/components/ui/card";
import { display } from "@/app/model/display-model";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const MotionCard = motion.create(Card);

function OrderCardCustomer({
  display,
  isFirstReload,
}: {
  display: display;
  isFirstReload: boolean;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {hasMounted && (
        <MotionCard
          initial={!isFirstReload ? { scale: 0 } : { scale: 1 }}
          animate={!isFirstReload && { scale: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="p-10 card"
        >
          <div className="flex w-full h-full justify-center items-center">
            <h1 className="text-5xl text-primary sm:text-8xl">
              {display.orderNumber}
            </h1>
          </div>
        </MotionCard>
      )}
    </AnimatePresence>
  );
}

export default OrderCardCustomer;
