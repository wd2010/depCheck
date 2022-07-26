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
    const { stdout } = spawnSync(command, args, { cwd, encoding:'utf-8' });
    return stdout;
};
