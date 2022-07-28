// @ts-ignore

import { commands, window, workspace } from "vscode";
import type { ExtensionContext } from "vscode";
import { getStats } from "./getStats";
import { parseStats } from "./parseStats";
import { setConfigAction } from "./utils/index";
import { showDeps } from './showDeps/index';
export function activate(context: ExtensionContext) {

  const setConfig = commands.registerCommand("setConfig", async () => {
    await setConfigAction(context);
  });

  const depcheck = commands.registerCommand("depcheck", async fileUrl => {

    const stats = await getStats(context);
    
    const path = fileUrl ? (fileUrl.fsPath || fileUrl.original.fsPath) : window.activeTextEditor.document.uri.fsPath;

    const pathArr = parseStats(stats, path);

    showDeps({pathArr, fileName:path});

    
  });

  

  context.subscriptions.push(setConfig, depcheck);
}

export function deactivate() {}
