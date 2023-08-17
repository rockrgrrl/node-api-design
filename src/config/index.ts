import merge from "lodash.merge";

// treat environemnts and stages separately
// ie, you may want to run a production version of your app locally on your computer
// in that example, the stage is 'local' and the environemtn is 'production'
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";

let envConfig;

if (stage === "production") {
  envConfig = require("./prod").default; // interop between es6 modules and non es6 modules (commonjs)
} else if (stage === "testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
}

// default config will have all the different variables that are needed in our app
// defaults can be overwritten depending on what environment we are in - for example,
// we can't use port 3001 for production, so we can set a port in our prod file specifically for our
// production environment
const defaultConfig = {
  stage,
  env: process.env.NODE_ENV,
  port: 3001,
  secrets: {
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL,
  },
};

// merge default config underneath envConfig
export default merge(defaultConfig, envConfig);
