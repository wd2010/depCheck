import { join } from "path";
import { existsSync, readFileSync } from "fs";
import { window, commands } from 'vscode'
import { runCommand, getDir, getConfigAction } from "../utils/index";
import { PATHS } from "../utils/type";

const getFileName = () => {
  const dir = getDir();
  const fileName = join(dir, PATHS.statsPath);
  return fileName;
};

export async function getStats(context) {
  const fileName = getFileName();

  if (!existsSync(fileName)) {
		const webpackConfigPath = await getConfigAction(context);
    runCommand("npx", ["webpack", "-c", webpackConfigPath]);
  }

  const statsJson = readFileSync(fileName, { encoding: "utf-8" });
  return JSON.parse(statsJson);
}
