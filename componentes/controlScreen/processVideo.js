import ffmpeg from 'ffmpeg'

export default function processVideo(){
    try {
        const process = new ffmpeg("https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4");
        process.then((video) =>{
            console.log(video);
        }).catch(e =>{
            console.log(e);
        });

    }catch(e){
        console.log(e.code);
        console.log(e.msg);
    }
};