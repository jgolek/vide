var config = module.exports;

config["My tests"] = {
  environment: "node",
  rootPath: "./",
  tests: [
    "modules/**/tests/**/test*.js",
    "modules/**/test.js"
  ]
}