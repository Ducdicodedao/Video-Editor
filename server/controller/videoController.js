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

module.exports = {
    TrimVideo,
    AddWatermark,
};
