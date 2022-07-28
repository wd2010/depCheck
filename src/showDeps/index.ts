import { window } from "vscode";
import { readFileSync } from "fs";
import { join } from "path";
import { render } from "ejs";

interface IData {
  pathArr: string[]
  fileName: string
}

const getRenderHtml = (data: IData) => {
  const htmlStr = readFileSync(join(__dirname, "../src/static/index.ejs"), {
    encoding: "utf-8",
  });
  return render(htmlStr, data);
};

export function showDeps(data: IData) {
  if (!data.pathArr.length) {
    return;
  }
  const plane = window.createWebviewPanel("viewType", "依赖文件", 1);
  plane.webview.html = getRenderHtml(data);
}
