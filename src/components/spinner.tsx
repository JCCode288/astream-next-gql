export interface ISpinnerProps {
   dim:
      | {
           [screen: string]: number;
        }
      | number;
}

export default function Spinner({ dim }: ISpinnerProps) {
   const BASE_CLASS =
      "border rounded-full border-t-transparent animate-spin";
   if (typeof dim === "number")
      return <div className={`h-${dim} w-${dim} ${BASE_CLASS}`} />;

   const dims = Object.entries(dim).reduce((prev, curr) => {
      const [scr, val] = curr;
      if (scr === "base") return prev + " " + `h-${val} w-${val}`;

      return prev + " " + `${scr}:h-${val} ${scr}:w-${val}`;
   }, "");

   return <div className={`${BASE_CLASS} ${dims}`} />;
}
