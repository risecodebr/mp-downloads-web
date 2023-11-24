import { sendStream } from "h3";
import ytdl from "ytdl-core";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;

  const videoStream = ytdl(id, {
    filter: "video",
    quality: "highestvideo",
  });

  setResponseHeader(event, "Content-Type", "video/mp4");

  return sendStream(event, videoStream);
});
