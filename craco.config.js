const path = require("path");
const { whenDev, whenProd } = require("@craco/craco");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  webpack: {
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      ...whenDev(() => ({
        "../../github/githubAPI": path.resolve(
          __dirname,
          "./src/github/mockGithubAPI"
        )
      }))
    },
    plugins: [
      ...whenProd(() => {
        return process.env.REPORT === "true"
          ? [new BundleAnalyzerPlugin()]
          : [];
      }, [])
    ]
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
