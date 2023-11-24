<script setup lang="ts">
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { ref } from 'vue';


async function processar() {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm'

    console.log('processando')

    const ffmpeg = new FFmpeg();

    ffmpeg.on('progress', (progress) => {
        console.log('progress', progress)
    })

    ffmpeg.on('log', (log) => {
        console.log(log)
    })

    console.log('carregando ffmpeg')

    if (!ffmpeg.loaded) {
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
    }

    console.log('ffmpeg carregado', ffmpeg.loaded)

    await ffmpeg.writeFile('input.mp4', await fetchFile("/api/video/download/video/P2HtAN-cbJ0"));
    console.log('input.mp4 escrito');

    await ffmpeg.writeFile('input.webm', await fetchFile("/api/video/download/audio/P2HtAN-cbJ0"));
    console.log('input.webm escrito');

    let opt = [
        '-i', "input.mp4",
        '-i', 'input.webm',
        '-c', 'copy',
        '-c:a', 'aac',
        'output.mp4'
    ]

    var respon = await ffmpeg.exec(opt)

    console.log('respon', respon)

    console.log('processado')

    const data = await ffmpeg.readFile('output.mp4');

    console.log('data', data)

    const blob = new Blob([data], { type: 'video/mp4' });

    const url = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = url;
    a.download = 'video.mp4';
    a.click();


    console.log(url)

}

</script>
<template>
    <p></p>
    <button @click="processar">Download</button>
</template>