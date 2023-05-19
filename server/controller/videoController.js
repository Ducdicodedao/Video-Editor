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
              };
              arr.length > 0 ? (temp.end = videos[i].start) : "";
              arr.pop();
              arr.push(temp);
              videoSrc = videos[i];
            } else {
              if (isZero) {
                let temp = cloneDeep(videos[i]);
                temp.start = arr[arr.length - 1].end;
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
    console.log(arr);
    console.log("--------------------------------");
    if (arr[arr.length - 1].start === 0 && arr.length > 0) arr.pop();
    console.log(arr);
    const videoData = arr.map((data) => {
      const s = new Creatomate.Video({
        track: 1,
        source: data.url,
        trimStart: data.frameSkip !== undefined ? data.frameSkip : 0,
        trimDuration: data.end - data.start,
      });
      return s;
    });
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

// Story
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
const TemplateVideo6 = async (req, res) => {
  const client = new Creatomate.Client(apiKey);

  const options = {
    template_id: "2ec77aeb-bc6b-41c4-8128-f14ba172ed5e",
    modifications: {
      "Main-Image": req.body.image1,
      Title: req.body.text1,
      Tagline: req.body.text2,
      "Slide-1-Image": req.body.image2,
      "Slide-1-Text": req.body.text3,
      "Slide-2-Image": req.body.image3,
      "Slide-2-Text": req.body.text4,
      "Slide-3-Image": req.body.image4,
      "Slide-3-Text": req.body.text5,
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
const TemplateVideo7 = async (req, res) => {
  const client = new Creatomate.Client(apiKey);

  const options = {
    template_id: "f69e64f9-183d-4e17-b62f-ee7964a3270e",
    modifications: {
      "Image-1": req.body.image1,
      "Text-1": req.body.text1,
      "Image-2": req.body.image2,
      "Text-2": req.body.text2,
      "Image-3": req.body.image3,
      "Text-3": req.body.text3,
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
const TemplateVideo8 = async (req, res) => {
  const client = new Creatomate.Client(apiKey);

  const options = {
    template_id: "d20c29fe-570e-4919-866e-e46698a28882",
    modifications: {
      "8d1365e6-427d-429e-b607-8ccdfc9c0421": req.body.image1,
      Caption: req.body.text1,
      Title: req.body.text2,
      "Winner's Name": req.body.text3,
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
  renderVideo,
  TrimVideo,
  AddWatermark,
  concatenate,
  TemplateVideo1,
  TemplateVideo2,
  TemplateVideo3,
  TemplateVideo4,
  TemplateVideo5,
  TemplateVideo6,
  TemplateVideo7,
  TemplateVideo8,
  testPostAPI,
};
