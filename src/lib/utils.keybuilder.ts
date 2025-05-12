import { IKeyInterface } from "./api/api.interface";

export default function keyBuilder({
   animeId,
   episodeId,
   segment,
   data,
}: IKeyInterface) {
   return `${animeId ?? ""}:${episodeId ?? ""}:${segment ?? ""}:${
      data ?? ""
   }`;
}
