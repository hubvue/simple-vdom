export default (vnode, target) =>  {
    target.replaceWith(vnode);
    return vnode;
}