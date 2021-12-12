import dbConnect from '@/utils/database'
import users from '@/models/users'
import { promises as fs } from "fs";
import formidable from "formidable";
import { getSession } from "next-auth/react"

dbConnect();

const requestModHandler = async (req, res) => {
    const {
        method,
        query: { id },
    } = req;
    const session = await getSession({ req })


    if (session.user.email) {
        switch (method) {
            case "GET":
                try {
                    const user = await users.findOne({ _id: id });
                    res.status(200).json({ success: true, data: user });

                } catch (error) {
                    console.log(error)
                    res.status(400).json({ success: false })
                }
                break;

            case "POST":
                try {
                    const form = new formidable.IncomingForm({ keepExtensions: true });

                    const formParsePhotoSuccess = await new Promise((resolve, reject) => {
                        form.parse(req, async (err, fields, files) => {

                            if (err) {
                                reject(err);
                                return;
                            }

                            const dateNow = new Date();

                            const photoUpload = {
                                oldpath: files.photoUpload.filepath,
                                link: `/assets/images/users/${dateNow.getTime()}-${files.photoUpload.originalFilename
                                    }`,
                                newpath: `./public/assets/images/users/${dateNow.getTime()}-${files.photoUpload.originalFilename
                                    }`,
                            };

                            resolve(photoUpload);
                        })
                    }).then(async (photoUpload) => {
                        let isSuccess = false;

                        await fs.rename(photoUpload.oldpath, photoUpload.newpath, (err) => {
                            if (err) {
                                console.log(err)
                                throw err;
                            }
                        }).then(async () => {
                            isSuccess = true;
                            await users.updateOne({ _id: id }, { photoLink: photoUpload.link });
                        });

                        return isSuccess;
                    });



                    if (formParsePhotoSuccess) {
                        return res.status(200).json({ success: true, msg: "Successfully added/changed photo" });
                    } else {
                        return res.status(200).json({ success: false, msg: "Error occured while uploading files" });
                    }





                } catch (error) {
                    console.log(error)
                    res.status(400).json({ success: false })
                }
                break;

            default:
                res.status(400).json({ success: false });
                break;
        }
    } else {
        return res.status(401).json({ success: false, msg: "You dont have a access" });
    }



};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default requestModHandler;
