const Creatomate = require("creatomate");
const { cloneDeep } = require("lodash");
const apiKey = process.env.CREATOMATE_APIKEY;
if (!apiKey) {
  // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
  console.error(
    "\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY"
  );
  process.exit(1);
}
// 0 44 10 29 0
const renderVideo = async (req, res) => {
  try {
    const client = new Creatomate.Client(apiKey);
    const videos = req.body.videos;
    console.log(videos);
    console.log("--------------------------------");

    const audio = req.body.audio;
    let videoSrc = null;
    let arr = [];
    let isZero = false;
    const duration = Math.max(...videos.map((o) => parseFloat(o.end)));
    for (let frame = 0; frame < duration; frame++) {
      for (var i = 0; i < videos.length; i++) {
        if (frame >= videos[i]?.start && frame < parseFloat(videos[i]?.end)) {
          if (videos[i] !== videoSrc) {
            if (i === 0 && arr.length > 0) {
              isZero = true;
              const temp = {
                start: arr[arr.length - 1].start,
                end: arr[arr.length - 1].end,
                content: arr[arr.length - 1].content,
                url: arr[arr.length - 1].url,
                frameSkip: arr[arr.length - 1].frameSkip,
              };
              arr.length > 0 ? (temp.end = videos[i].start) : "";
              arr.pop();
              arr.push(temp);
              videoSrc = videos[i];
            } else {
              if (isZero) {
                let temp = cloneDeep(videos[i]);
                temp.start = arr[arr.length - 1].end;
                temp.frameSkip = temp.start;
                videoSrc = temp;
                isZero = false;
              } else {
                videoSrc = videos[i];
              }
            }
            arr.push(videoSrc);
          }
          break;
        }
      }
    }

    if (arr[arr.length - 1].start === 0 && arr.length > 1) arr.pop();
    console.log(arr);
    console.log("--------------------------------");
    const videoData = arr.map((data) => {
      const s = new Creatomate.Video({
        track: 1,
        source: data.url,
        trimStart: data.frameSkip !== undefined ? data.frameSkip : 0,
        trimDuration: data.end - data.start,
      });
      return s;
    });
    console.log(videoData);
    console.log("--------------------------------");

    for (var i = 0; i < audio.length; i++) {
      const temp = new Creatomate.Audio({
        time: audio[i]?.start,
        source: audio[i].url,
      });
      videoData.push(temp);
    }

    const source = new Creatomate.Source({
      outputFormat: "mp4",
      width: 1280,
      height: 720,
      elements: videoData,
    });
    // for (let index = 0; index < videoData.length; index++) {
    //   temp.push(videoData[index].video);
    // }
    client
      .render({ source })
      .then((renders) => {
        res.status(200).send({
          name: "video Render",
          duration: renders[0].duration,
          url: renders[0].url,
        });
        console.log(renders);
      })
      .catch((error) => {
        // res.status(401).send({ msg: error })
        console.log(error);
      });
  } catch (error) {
    console.log(error.message);
  }
};

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
        source:
          "https://res.cloudinary.com/dccblvpyz/video/upload/v1683904093/videos/xtllmppkfkiajh0cs5mq.mp4",
        trimStart: 0,
        trimDuration: 10,
      }),

      new Creatomate.Video({
        track: 1,
        source:
          "https://res.cloudinary.com/dccblvpyz/video/upload/v1683904018/videos/ew2hia3h0dqqfj37wgl0.mp4",
        trimStart: 0,
        trimDuration: 27.866666666666667 - 10,
        // Add a transition like this:
        // transition: new Creatomate.Fade({ duration: 1 }),
      }),
      new Creatomate.Video({
        track: 1,
        source:
          "https://res.cloudinary.com/dccblvpyz/video/upload/v1683904093/videos/xtllmppkfkiajh0cs5mq.mp4",
        trimStart: 14.27,
        trimDuration: 54.86666666666667 - 27.866666666666667,
        // Add a transition like this:
        // transition: new Creatomate.Fade({ duration: 1 }),
      }),
    ],
  });
  console.log(typeof source.properties.elements[0]);
  console.log("Please wait while your video is being rendered...");

  // client
  //   .render({ source })
  //   .then((renders) => {
  //     res.status(200).send({ data: renders });
  //   })
  //   .catch((error) => res.status(401).send({ msg: error }));
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
  renderVideo,
};
