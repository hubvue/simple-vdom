const renderElem = ({tagName, attrs, children} ) => {
    const el = document.createElement(tagName);

    //设置attrs
    for(let [k, v] of Object.entries(attrs)){
        el.setAttribute(k,v);
    }
    //设置children
    for(let child of children) {
        const childElement = render(child);
        el.appendChild(childElement);
    }
    return el;
}
//在真正的DOM中，有8中类型的节点。这里介绍两种：
//1、ElementNode，如<div>和<img>
//2、TextNode 纯文本。
const render = (vnode) => {
    if(typeof vnode === 'string') {
        return document.createTextNode(vnode);
    }
    return renderElem(vnode);
}

export default render;