import Creatomate from "creatomate";

const client = new Creatomate.Client(
    "78580d16366e4850bb4c65a66447bc80499df78ffb5d268393b893e01614bf4409c8ca2e9a11ed00a47f687ac372b071"
);

const source = new Creatomate.Source({
    outputFormat: "mp4",
    elements: [
        new Creatomate.Video({
            source: "https://creatomate-static.s3.amazonaws.com/demo/video4.mp4",
            trimStart: 1,
            trimDuration: 3,
        }),
    ],
});

console.log("Please wait while your video is being rendered...");

client
    .render({ source })
    .then((renders) => {
        console.log("Completed:", renders);
    })
    .catch((error) => console.error(error));
