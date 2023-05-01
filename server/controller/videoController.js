const Creatomate = require("creatomate");

const apiKey = process.env.CREATOMATE_APIKEY;
if (!apiKey) {
    // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
    console.error(
        "\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY"
    );
    process.exit(1);
}

const TrimVideo = async (req, res) => {
    const client = new Creatomate.Client(apiKey);
    const source = new Creatomate.Source({
        outputFormat: "mp4",
        elements: [
            new Creatomate.Video({
                source: "https://res.cloudinary.com/dgfsdhshs/video/upload/v1682911789/videos/y95iaf66slyqq7gfd7va.mp4",
                trimStart: 1,
                trimDuration: 3,
            }),
        ],
    });
    console.log("Please wait while your video is being rendered...");

    client
        .render({ source })
        .then((renders) => {
            res.status(200).send({ data: renders });
        })
        .catch((error) => res.status(401).send({ msg: error }));
};

const AddWatermark = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const source = new Creatomate.Source({
        outputFormat: "mp4",

        elements: [
            new Creatomate.Video({
                source: req.body.videoSource,
            }),

            // Add logo to the upper right corner
            new Creatomate.Image({
                source: req.body.imageSource,
                fit: "contain",
                width: "60 vmin",
                height: "60 vmin",
                x: "100%",
                y: "0%",
                xAnchor: "100%",
                yAnchor: "0%",
                xAlignment: "100%",
                yAlignment: "0%",
                xPadding: "7 vmin",
                yPadding: "7 vmin",
                shadowColor: "rgba(0,0,0,0.66)",
            }),
        ],
    });

    client
        .render({ source })
        .then((renders) => {
            res.status(200).send({ data: renders });
        })
        .catch((error) => res.status(401).send({ msg: error }));
};

const TurnImagesIntoVideo = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const source = new Creatomate.Source({
        outputFormat: "mp4",
        frameRate: 30,
        width: 1280,
        height: 720,
        elements: [
            // Image 1
            new Creatomate.Image({
                track: 1,
                duration: 5,
                source: req.body.imageSource1,
                animations: [
                    new Creatomate.PanCenter({
                        startScale: "100%",
                        endScale: "120%",
                        easing: "linear",
                    }),
                ],
            }),

            // Image 2
            new Creatomate.Image({
                track: 1,
                duration: 5,
                source: req.body.imageSource2,
                animations: [
                    new Creatomate.PanLeftWithZoom({
                        startScale: "100%",
                        endScale: "120%",
                        easing: "linear",
                    }),
                ],
                transition: new Creatomate.Fade(),
            }),

            // Image 3
            new Creatomate.Image({
                track: 1,
                duration: 5,
                source: req.body.imageSource3,
                animations: [
                    new Creatomate.PanRightWithZoom({
                        startScale: "100%",
                        endScale: "120%",
                        easing: "linear",
                    }),
                ],
                transition: new Creatomate.Fade(),
            }),

            // Background music
            new Creatomate.Audio({
                source: "https://creatomate-static.s3.amazonaws.com/demo/music1.mp3",
                // Make the audio track as long as the output
                duration: null,
                // Fade out for 2 seconds
                audioFadeOut: 2,
            }),
        ],
    });

    client
        .render({ source })
        .then((renders) => {
            res.status(200).send({ data: renders });
        })
        .catch((error) => res.status(401).send({ msg: error }));
};

const AddProgressBar = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const source = new Creatomate.Source({
        outputFormat: "mp4",

        elements: [
            new Creatomate.Video({
                source: req.body.videoSource,
            }),

            new Creatomate.Rectangle({
                x: "0%",
                y: "0%",
                width: "100%",
                height: "3%",
                xAnchor: "0%",
                yAnchor: "0%",
                fillColor: "rgba(224,241,59,0.88)",
                animations: [
                    new Creatomate.Wipe({
                        xAnchor: "0%",
                        fade: false,
                        easing: "linear",
                    }),
                ],
            }),
        ],
    });

    client
        .render({ source })
        .then((renders) => {
            res.status(200).send({ data: renders });
        })
        .catch((error) => res.status(401).send({ msg: error }));
};

module.exports = {
    TrimVideo,
    AddWatermark,
    TurnImagesIntoVideo,
    AddProgressBar,
};
