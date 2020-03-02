const { whenProd } = require("@craco/craco");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  webpack: {
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat"
    },
    plugins: [
      whenProd && process.env.REPORT === "true" && new BundleAnalyzerPlugin()
    ].filter(Boolean)
  },
  devServer: {
    open: false
  },
  eslint: {
    configure: {
      settings: {
        react: {
          version: "16.12"
        }
      }
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^react$": "preact/compat",
        "^react-dom/test-utils$": "preact/test-utils",
        "^react-dom$": "preact/compat"
      }
    }
  }
};
