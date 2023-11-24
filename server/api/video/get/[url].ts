import ytdl from "ytdl-core";

export default defineEventHandler(async (event) => {
  const url = getRouterParam(event, "url")!;

  let info = await ytdl.getInfo(url);
  let audioFormats = ytdl.filterFormats(info.formats, "video");

  return audioFormats;
});
