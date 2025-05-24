import { useState } from "react";

export default function useDebouncer<T, K>(
   timeout: number,
   fn: (val: K) => T
) {
   const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>();

   return (val: K) => {
      if (timeoutID) clearTimeout(timeoutID);

      let id = setTimeout(() => {
         fn(val);
      }, timeout);

      setTimeoutID(id);
   };
}
