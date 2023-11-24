import { sendStream } from "h3";
import ytdl from "ytdl-core";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id")!;

  console.log("Downloading audio for video", id);

  const videoStream = ytdl(id, {
    filter: "audio",
    quality: "highestaudio",
  });

  setResponseHeader(event, "Content-Type", "audio/webm");

  return sendStream(event, videoStream);
});
