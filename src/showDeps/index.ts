import { window } from "vscode"

export function showDeps() {
  const plane = window.createWebviewPanel('viewType','依赖文件',1);
  plane.webview.html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h1>demo</h1>
  </body>
  </html>
  `;
}