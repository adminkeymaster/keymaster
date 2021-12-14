




export const cloudinary = () => {

    const cloudinary = require('cloudinary');
    cloudinary.config({
        cloud_name: "keymaster123",
        api_key: "357121876529977",
        api_secret: "iFHdaY3pUNhl3Di1m-gS2KlrOVk"
    });
    return cloudinary
}