const path = require("path");

module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_URI: 
      "mongodb+srv://geleg06:Annefrank123@cluster0.vhno6.mongodb.net/Keymaster?retryWrites=true&w=majority"
  },
  sassOptions: {
    // Making it easier to import variables & mixins via _global.scss;
    includePaths: [path.join(__dirname, "sass")],
  },
};
