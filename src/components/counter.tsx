"use client";

import counterStore from "@/lib/stores/counter.store";

export default function Counter() {
   const counter = counterStore().counter;
   const increment = counterStore().increment;
   const decrement = counterStore().decrement;

   const handleIncrement = () => increment();
   const handleDecrement = () => decrement();

   return (
      <div className="flex flex-col w-full justify-center">
         <div>{counter}</div>
         <div className="flex w-fit gap-2 justify-center items-center">
            <button onClick={handleDecrement}>Decrement</button>
            <button onClick={handleIncrement}>Increment</button>
         </div>
      </div>
   );
}
