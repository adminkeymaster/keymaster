const path = require('path');

module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_URI: 'mongodb+srv://geleg06:Annefrank123@cluster0.vhno6.mongodb.net/Keymaster?retryWrites=true&w=majority',
    NEXT_AUTH_SECRET: '0kNxq+LKd0wYn6qLYytVnFvB/nVHirH/2Ads0Hn9yeM=',
    NEXTAUTH_URL: 'https://keymaster.vercel.com/api/auth',
  },
  sassOptions: {
    // Making it easier to import variables & mixins via _global.scss;
    includePaths: [path.join(__dirname, 'sass')],
  },
};
