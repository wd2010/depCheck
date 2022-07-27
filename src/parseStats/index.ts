import { window } from 'vscode'

export function parseStats(stats: any, filename: string) {
  const moduleArr = stats.modules; //获取模块数据的数组
  const moduleObj = {};
  moduleArr.forEach((ele: { nameForCondition: string | number; }) => {
    //将数组转换为对象的属性，key值为数组每一项的nameForCondition属性,方便之后查找到该module
    moduleObj[ele.nameForCondition] = ele;
  });
  const tree: Array<{name: string, children: any[]}> = [];
  //从改变的模块向上检索出树形的结构图
  function createTree(filename: string, tree) {
    const targetmodule = moduleObj[filename];
    if (!targetmodule) {
      console.log(`未获取到:${filename}模块`);
      window.showInformationMessage(`未获取到:${filename}模块的依赖关系`)
      return;
    }
    let isHaveTarget = tree.filter((item: { name: any; }) => {
      return item.name === targetmodule.nameForCondition;
    });
    if (isHaveTarget && isHaveTarget.length > 0) {
      return;
    }
    //将该模块放到该节点中
    tree.push({
      name: targetmodule.nameForCondition,
      children: [],
    });

    if (targetmodule.reasons && targetmodule.reasons.length > 0) {
      for (let item of targetmodule.reasons) {
        //判断终止条件
        if (
          item.type !== "entry" &&
          item.resolvedModuleIdentifier !== tree[tree.length - 1].name
        ) {
          createTree(
            item.resolvedModuleIdentifier,
            tree[tree.length - 1].children
          );
        }
      }
    } else {
      return;
    }
  }
  //以修改的组件为根节点创建一个树形结构数据
  createTree(filename, tree);
  //获取哪些组件依赖了该组件
  const pathArr: any[] = []; //存放所有路径的数组
  //打印树结构的所有路径组成的数组
  function getTreeAllPath(tree) {
    function getData(tree: any[], path: any[]) {
      tree.forEach((ele) => {
        if (ele.children && ele.children.length > 0) {
          path.push(ele.name);
          getData(ele.children, path);
          path.pop();
        } else {
          path.push(ele.name);
          pathArr.push(JSON.parse(JSON.stringify(path)));
          path.pop();
        }
      });
    }
    getData(tree, []);
  }

  getTreeAllPath(tree);
  //数组的每一项也都是数组，颠倒数组的顺序
  pathArr.forEach((item) => {
    item.reverse();
  });
  console.log(JSON.stringify(pathArr));

  return pathArr
}