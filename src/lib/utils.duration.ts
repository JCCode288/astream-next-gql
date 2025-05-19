const type = {
   h: 3600,
   m: 60,
   s: 1,
};

type DurationKey = keyof typeof type;

export function durationToNumber(duration: string) {
   if (!duration || typeof duration !== "string") return 0;

   let totalDuration: number = 0; //in seconds

   let number = "";
   for (let i = 0; i < duration.length; i++) {
      const char = duration[i];
      if (!type[char as DurationKey]) {
         number += char;
         continue;
      }

      const durationNumber = +number;

      if (isNaN(durationNumber)) {
         totalDuration = 0;
         return totalDuration;
      }

      totalDuration += type[char as DurationKey] * durationNumber;
   }

   return totalDuration;
}

export function numberToHourMin(number: number) {
   let hour = Math.floor(number / type.h);
   let min = number / type.m;

   if (hour < 1) return `${min}m`;
   if (hour * 60 === min) return `${hour}h`;

   hour = hour;
   min = min - hour * 60;

   return `${hour}h ${min}m`;
}

export function durationToHourMin(duration: string) {
   return numberToHourMin(durationToNumber(duration));
}
