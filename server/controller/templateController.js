const Template = require("../models/TemplateModel.js");
const Creatomate = require("creatomate");
const apiKey = process.env.CREATOMATE_APIKEY;
if (!apiKey) {
    // Your API key can be found under project settings: https://creatomate.com/docs/api/rest-api/authentication
    console.error(
        "\n\n⚠️  To run this example, please specify your API key as follows: node index.js YOUR_API_KEY"
    );
    process.exit(1);
}
const addTemplate = async (req, res) => {
    try {
        const template = new Template(req.body);
        await template.save().then((template) => {
            res.status(200).send(template);
        });
    } catch (error) {
        res.status(401).send({ msg: error.message });
    }
};
const getAllTemplate = async (req, res) => {
    try {
        const templates = await Template.find();
        res.status(200).send({
            status: "success",
            templates,
        });
    } catch (error) {
        res.status(401).send({ msg: error.message });
    }
};
//TEMPLATE-------------------------------------------------------------------------------------------------------------
//Banner
const TemplateVideo1 = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const options = {
        template_id: "0117fc0a-4686-4542-a1e2-d10fae5e5356",
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
        template_id: "3417109e-7afc-4d57-8a0a-cdffe1e3049c",
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
        template_id: "d16b719d-e065-4c63-b0ab-8d9a46625f6a",
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
        template_id: "9243b2de-83fe-4b5d-8da8-1bb69faca60a",
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
        template_id: "4363d25f-7b38-4aa3-9798-bc8bab7100a0",
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
const TemplateVideo9 = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const options = {
        template_id: "0538935c-dce2-452c-8071-36724c0ed9cf",
        modifications: {
            "aa8e8152-de69-4288-8418-ffdfebcdc9a6": req.body.text1,
            Testimonial: req.body.text2,
            Picture: req.body.image1,
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
const TemplateVideo10 = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const options = {
        template_id: "78185a67-ba9a-4518-8dac-56b55225010a",
        modifications: {
            Message: req.body.text2,
            Handle: req.body.text1,
            Picture: req.body.image1,
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
const TemplateVideo11 = async (req, res) => {
    const client = new Creatomate.Client(apiKey);

    const options = {
        template_id: "81a4e85e-971d-4e6e-a329-7384818a48fd",
        modifications: {
            "a9592213-a19c-45fa-a31d-450616da919e": req.body.text1,
            "a0765701-790f-49e6-8436-4aafab92e064": req.body.text2,
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
    addTemplate,
    getAllTemplate,
    TemplateVideo1,
    TemplateVideo2,
    TemplateVideo3,
    TemplateVideo4,
    TemplateVideo5,
    TemplateVideo6,
    TemplateVideo7,
    TemplateVideo8,
    TemplateVideo9,
    TemplateVideo10,
    TemplateVideo11,
    testPostAPI,
};
