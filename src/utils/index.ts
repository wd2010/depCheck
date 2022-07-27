import { window, workspace } from "vscode";
import { spawnSync } from "child_process";

export const getDir = () => {
  let dir = __dirname;
  if (typeof window.createTerminal === "function") {
    const folders = workspace.workspaceFolders || [];
    dir = folders[0].uri.fsPath;
  }

  if (dir) {
    dir = dir.replace(/\\/g, "\\\\");
  }

  return dir;
};

export const runCommand = (
  command: string,
  args: string[],
  cwd: string = getDir()
) => {
  const { stdout } = spawnSync(command, args, { cwd, encoding: "utf-8" });
  return stdout;
};

export const setConfigAction = async (context) => {
  const result = await window.showInputBox({
    title: "温馨提醒",
    value: "",
    placeHolder: "请输入你的打包配置的完整路径",
  });

  context.workspaceState.update("webpackConfigPath", result);

  return result;
};

export const getConfigAction = async (context) => {
  let webpackConfigPath = context.workspaceState.get("webpackConfigPath");

  if (!webpackConfigPath) {
    webpackConfigPath = await setConfigAction(context);
  }

  return webpackConfigPath;
};
