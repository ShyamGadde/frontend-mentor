const fs = require("fs");
const path = require("path");

// Get all directories
const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

// Get all directories with an index.html file
const challengeDirs = getDirectories(".").filter((dir) =>
  fs.existsSync(path.join(dir, "index.html"))
);

const toTitleCase = (str) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

// Generate the list items for the HTML and Markdown files
const htmlListItems = challengeDirs
  .map(
    (dir) => `\
      <li class="list-group-item">
        <div class="project-item">
          <h5>${toTitleCase(dir)}</h5>
          <a href="./${dir}" class="btn btn-light"
            >Go to Solution</a
          >
        </div>
      </li>`
  )
  .join("\n");

// Update index.html
const indexPath = path.join(__dirname, "../..", "index.html");
let indexHtml = fs.readFileSync(indexPath, "utf8");
indexHtml = indexHtml.replace(
  /<ul class="list-group" id="project-list">[\s\S]*?<\/ul>/,
  `<ul class="list-group" id="project-list">\n${htmlListItems}\n</ul>`
);
fs.writeFileSync(indexPath, indexHtml);
