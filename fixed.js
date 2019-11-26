const fs = require("fs-extra");

try {
  fs.copySync(
    "./dist/win-unpacked/resources/node_modules",
    "./dist/win-unpacked/resources/app/node_modules"
  );
  console.log("success!");
} catch (err) {
  console.error(err);
}
