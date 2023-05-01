import Creatomate from "creatomate";

const client = new Creatomate.Client(
    "78580d16366e4850bb4c65a66447bc80499df78ffb5d268393b893e01614bf4409c8ca2e9a11ed00a47f687ac372b071"
);

console.log("waiting............");

client
    .render({
        templateId: "28ff229a-dcea-47e1-813b-34556084b2ef",
        modifications: {
            Background:
                "https://cdn.creatomate.com/files/assets/06d0457b-94b4-4a63-b950-c942fc1a9be0",
            "Text 1.text.name": "CNPM Hướng đối tượng",
            "Text 2": "Vũ Thanh Sang",
            "Text 3": "Nguyễn Minh Đức",
            "Text 4": "creatomate.com/docs",
        },
    })
    .then((renders) => {
        console.log("Completed", renders);
    });
