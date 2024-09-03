const path = require("path");

module.exports = {
  entry: "./src/main.js", // Punto de entrada
  output: {
    filename: "bundle.js", // Archivo de salida
    path: path.resolve(__dirname, "public/js"), // Carpeta de salida
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
};
