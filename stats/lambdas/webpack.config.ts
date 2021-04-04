import * as path from "path"
import * as webpack from "webpack"

const config: webpack.Configuration = {
  mode: "production",
  entry: {
    "view": "./src/routes/view.ts",
    "click": "./src/routes/click.ts"
  },
  output: {
    path: path.resolve(__dirname, "..", "dist/stats"),
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
