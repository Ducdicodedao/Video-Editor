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
                source: req.body.source,
                trimStart: req.body.trimStart,
                trimDuration: req.body.trimDuration,
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

const concatenate = async (req, res) => {
    const client = new Creatomate.Client(apiKey);
    const source = new Creatomate.Source({
        outputFormat: "mp4",
        width: 1280,
        height: 720,
        elements: [
            new Creatomate.Video({
                track: 1,
                source: req.body.source1,
            }),

            new Creatomate.Video({
                track: 1,
                source: req.body.source2,

                // Add a transition like this:
                // transition: new Creatomate.Fade({ duration: 1 }),
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

const AddOutro = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const source = new Creatomate.Source({
        outputFormat: "mp4",
        width: 1280,
        height: 720,

        // By default, the output frame rate is adjusted to the input material. That means if your input video is 30 fps,
        // your output will be 30 fps too. In this case, we're going to enforce 60 fps for a more smooth transition animation
        frameRate: 60,

        elements: [
            // Main video
            new Creatomate.Video({
                track: 1,
                source: req.body.videoSource,
            }),

            // Outro
            new Creatomate.Composition({
                // Having the outro composition on the same track as the video makes it play after it
                track: 1,

                duration: 2.5,
                elements: [
                    new Creatomate.Text({
                        width: "90%",
                        height: "10%",
                        text: req.body.text,
                        fontFamily: "Cabin",
                        fontWeight: "700",
                        xAlignment: "50%",
                        yAlignment: "50%",
                        fillColor: "#fff",
                    }),

                    // Place any other element here
                ],

                // Transition between the previous element (the video) and this one
                transition: new Creatomate.CircularWipe({
                    duration: 0.5,
                }),
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

const ConvertToGIF = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const source = new Creatomate.Source({
        outputFormat: "gif",

        // Set to 'fast' or 'best' depending on your preference
        gifQuality: "best",

        // Compression level ranging from 0 to 200 (0 means no compression, 200 means heavy compression)
        gifCompression: 30,

        // Frame rate of the GIF
        frameRate: 15,

        // GIF width
        width: 480,

        // GIF height
        height: 272,

        elements: [
            new Creatomate.Video({
                source: req.body.videoSource,
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

const Create2By2VideoWall = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const source = new Creatomate.Source({
        outputFormat: "mp4",
        duration: 3,

        elements: [
            new Creatomate.Video({
                x: "25%",
                y: "25%",
                width: "50%",
                height: "50%",
                source: req.body.videoSource1,
            }),

            new Creatomate.Video({
                x: "75%",
                y: "25%",
                width: "50%",
                height: "50%",
                source: req.body.videoSource2,
            }),

            new Creatomate.Video({
                x: "25%",
                y: "75%",
                width: "50%",
                height: "50%",
                source: req.body.videoSource3,
            }),

            new Creatomate.Video({
                x: "75%",
                y: "75%",
                width: "50%",
                height: "50%",
                source: req.body.videoSource4,
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

const SplitVideo = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const source = new Creatomate.Source({
        outputFormat: "mp4",
        width: 1280,
        height: 720,
        duration: 3,
        elements: [
            new Creatomate.Video({
                source: req.body.videoSource1,
                x: "25%",
                width: "50%",
            }),
            new Creatomate.Video({
                source: req.body.videoSource2,
                x: "75%",
                width: "50%",
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

//TEMPLATE-------------------------------------------------------------------------------------------------------------
//Banner
const TemplateVideo1 = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const options = {
        template_id: "549b6875-5e76-4fa5-bbb0-8655172c2dc3",
        modifications: {
            "ecf1a01d-ff16-4b5f-a58c-a4998b02e502": req.body.image1,
            "Text-1": req.body.text1,
            "Text-2": req.body.text2,
        },
    };

    console.log("Please wait while your video is being rendered...");

    client
        .render(options)
        .then((renders) => {
            res.status(200).send({ data: renders });
        })
        .catch((error) => console.error(error));
};

const TemplateVideo2 = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const options = {
        template_id: "8cdebf26-22a4-4106-b134-a531c050dd33",
        modifications: {
            "Product Image": req.body.image1,
            Caption: req.body.text1,
            "Call To Action": req.body.text2,
        },
    };
    console.log("Please wait while your video is being rendered...");

    client
        .render(options)
        .then((renders) => {
            res.status(200).send({ data: renders });
        })
        .catch((error) => console.error(error));
};

const TemplateVideo3 = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const options = {
        template_id: "639e9a5e-c588-486f-a012-df18cc901359",
        modifications: {
            "Background Image": req.body.image1,
            "Product Image": req.body.image2,
            "Call To Action": req.body.text1,
        },
    };
    console.log("Please wait while your video is being rendered...");

    client
        .render(options)
        .then((renders) => {
            res.status(200).send({ data: renders });
        })
        .catch((error) => console.error(error));
};

const TemplateVideo4 = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const options = {
        template_id: "7931db2a-92f4-4612-886b-7647ffc38b43",
        modifications: {
            "0dac167e-ca39-414b-8d88-1b08c8489bd6": req.body.image1,
            Title: req.body.text1,
            Caption: req.body.text2,
            Discount: req.body.text3,
        },
    };
    console.log("Please wait while your video is being rendered...");

    client
        .render(options)
        .then((renders) => {
            res.status(200).send({ data: renders });
        })
        .catch((error) => console.error(error));
};

const TemplateVideo5 = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const options = {
        template_id: "34671373-59b9-4c13-8762-e79a55335d74",
        modifications: {
            Photo: req.body.image1,
            "090694a5-d715-40a4-a92c-2285240ed5d1": req.body.text1,
            "791fb67a-ac00-47e9-8d85-36e9ea3d1fd5": req.body.text2,
        },
    };
    console.log("Please wait while your video is being rendered...");

    client
        .render(options)
        .then((renders) => {
            res.status(200).send({ data: renders });
        })
        .catch((error) => console.error(error));
};

const testPostAPI = (req, res) => {
    res.status(200).send({ body: req.body });
};
module.exports = {
    TrimVideo,
    AddWatermark,
    TurnImagesIntoVideo,
    AddProgressBar,
    AddOutro,
    ConvertToGIF,
    Create2By2VideoWall,
    SplitVideo,
    concatenate,
    TemplateVideo1,
    TemplateVideo2,
    TemplateVideo3,
    TemplateVideo4,
    TemplateVideo5,
    testPostAPI,
};
