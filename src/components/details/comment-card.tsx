import { Heart } from "lucide-react";

export default function CommentCard({ index }: { index: number }) {
   const usernames = ["AnimeGuru", "OtakuMaster", "SlayerFan2023"];
   const comments = [
      "This anime is absolutely incredible! The animation quality is top-notch and the story is so engaging. I can't wait for the next season!",
      "Tanjiro's character development throughout the series is amazing. The way he balances compassion with determination makes him one of my favorite protagonists.",
      "The fight scenes in this show are on another level. The breathing techniques and the unique animation style for each character make every battle feel special.",
   ];

   return (
      <div className="flex gap-4">
         <div className="shrink-0">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
               {usernames[index % usernames.length].charAt(0)}
            </div>
         </div>
         <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
               <span className="font-medium">
                  {usernames[index % usernames.length]}
               </span>
               <span className="text-xs text-zinc-400">
                  {index + 1} day{index > 0 ? "s" : ""} ago
               </span>
            </div>
            <p className="text-zinc-300">
               {comments[index % comments.length]}
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-zinc-400">
               <button className="hover:text-white transition-colors">
                  Like
               </button>
               <button className="hover:text-white transition-colors">
                  Reply
               </button>
               <div className="flex items-center">
                  <Heart className="h-3 w-3 mr-1" />
                  <span>{12 + index * 5}</span>
               </div>
            </div>
         </div>
      </div>
   );
}
