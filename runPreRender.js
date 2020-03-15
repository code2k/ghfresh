const { createWebpackProdConfig } = require("@craco/craco");
const webpack = require("webpack");
const cracoConfig = require("./craco.config.js");

const config = {
  webpack: {
    alias: { ...cracoConfig.webpack.alias },

    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.entry = "./src/preRender.tsx";
      webpackConfig.target = "node";

      webpackConfig.output = {
        filename: "./index.js",
        path: __dirname + "/.prerender",
        libraryTarget: "commonjs"
      };

      webpackConfig.optimization = {
        minimize: false
      };

      webpackConfig.node = {
        __dirname: false
      };

      webpackConfig.externals = {
        "clean-css": "commonjs clean-css"
      };

      const plugins = ["DefinePlugin", "ForkTsCheckerWebpackPlugin"];
      webpackConfig.plugins = [
        new webpack.ProgressPlugin(),
        ...webpackConfig.plugins.filter(p =>
          plugins.includes(p.constructor.name)
        )
      ];

      return webpackConfig;
    }
  },

  eslint: {
    ...cracoConfig.eslint
  }
};

const webpackConfig = createWebpackProdConfig(config);

// console.log(webpackConfig);
// return;

webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  if (stats.hasErrors()) {
    stats.toJson().errors.forEach(error => console.log(error));
    return;
  }
  if (stats.hasWarnings()) {
    stats.toJson().warnings.forEach(warning => console.log(warning));
  }

  const prerender = require("./.prerender").default;
  prerender();
});
