// createElement方法，这个方法就简单的返回一个虚拟元素。
const createElement = (tagName,{attrs = {}, children = []} = {}) => {
    
    const vElem = Object.create(null);
    Object.assign(vElem, {
        tagName,
        attrs,
        children,
    })
    return vElem;
    //不使用下面方式的原因：当在render或者diff的时候通常会遍历元素属性上的所有属性，
    //由于{}继承自Object,这很容易就会遍历Object上去，而且对象也变得很重，
    //为了创建一个轻量级的虚拟元素，采用Object.create(null),再把属性添加上去。
    // return {
    //     tagName,
    //     attrs,
    //     children,
    // }
}

export default createElement;