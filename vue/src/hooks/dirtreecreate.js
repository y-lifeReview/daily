const dirTreeCre = function (titleAry) {
    const dirTree = [];
    let preDir = null;
    titleAry.forEach((hDom, index) => {
        const sIndex = hDom.indexOf('id="'),
            eIndex = hDom.indexOf('">');
        if (sIndex != -1 && eIndex != -1) {
            const domId = hDom.slice(sIndex + 4, eIndex);
            let re = /<h([1-6]{1})[^>]*>([\s\S]*?)<\/h[1-6]{1}>/;
            let hLevel = Number(hDom.replace(re, "$1"));
            let title = hDom
                .replace(re, "$2")
                .replaceAll(/<([\s\S]*?)>|<\/[\s\S]*?>/g, "");
            const currentDir = {
                id: index + 1,
                title,
                domId,
                hLevel,
            };
            if (preDir) {
                if (currentDir.hLevel > preDir.hLevel) {
                    currentDir.pid = preDir.id;
                } else if (currentDir.hLevel < preDir.hLevel) {
                    currentDir.pid = 0;
                } else {
                    currentDir.pid = preDir.pid;
                }
            } else {
                currentDir.pid = 0;
            }

            preDir = currentDir;
            dirTree.push(currentDir);
        }
    });
    dirTree.forEach((item) => {
        if (item.pid !== 0) {
            const findParent = dirTree.find((i) => i.id === item.pid);
            if (findParent) {
                if (!Array.isArray(findParent.children)) {
                    findParent.children = [];
                }
                findParent.children.push(item);
            }
        }
    });
    return dirTree.filter((i) => i.pid === 0);
}
export {
    dirTreeCre
}