// @ts-ignore

import { commands, window } from "vscode";
import type { ExtensionContext } from "vscode";
import { getStats } from "./getStats";
import { parseStats } from "./parseStats";
import { setConfigAction } from "./utils/index";

const targetPath = "/Users/viki/Documents/demo/webpack-demo/src/d.js";

export function activate(context: ExtensionContext) {
  const setConfig = commands.registerCommand("setConfig", async () => {
    await setConfigAction(context);
  });

  const depcheck = commands.registerCommand("depcheck", async () => {
    const stats = await getStats(context);
    const pathArr = parseStats(stats, targetPath);
  });

  context.subscriptions.push(setConfig, depcheck);
}

export function deactivate() {}
