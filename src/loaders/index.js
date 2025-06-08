import mongooseLoader from './mongoose.js';
import expressLoader from './express.js';

export default async (app) => {
  console.log('🛠️ Starting mongooseLoader');
  await mongooseLoader();
  console.log('✅ Mongoose loaded');
  expressLoader(app);
  console.log('✅ Express loaded');
};

