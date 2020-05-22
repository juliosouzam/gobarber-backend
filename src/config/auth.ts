export default {
  jwt: {
    secret: process.env.APP_SECRET || 'development',
    expiresIn: '1d',
  },
};
