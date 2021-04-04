import * as path from "path"
import * as webpack from "webpack"

const config: webpack.Configuration = {
  mode: "production",
  entry: {
    "view": "./src/view.ts",
    "click": "./src/click.ts"
  },
  output: {
    path: path.resolve("../../deploy/dist/stats"),
    libraryTarget: "commonjs",
    filename: "[name].js"
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".js"]
  },
  optimization: {
    minimize: true
  },
  devtool: "source-map"
}

export default config
