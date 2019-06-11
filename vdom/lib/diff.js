//通过diff函数来计算两个虚拟树之间的差异，返回一个patch函数，该函数接受真实DOMoldElem，
//并对这个DOM执行适当的操作。让oldElem成为newElem

//整个diff过程中只是用来计算oldElem和newElem之间的差异，差异计算完之后
//返回patch方法，也可以称之为补丁，修改oldElem成为newElem的操作在patch中。

//整个diff的过程中可以分为四种情况：
//1、当newVTree是undefined的时候
    //返回patch，在patch中删除需要patch的节点。
//2、当oldVTree和newVTree都是字符串的时候。
    //如果二者相同，则不进行任何操作，
    //如果二者不同直接render(newVTree)
//3、当oldVTree和newVTree其中一个为TextNode，另一个为ElementNode的时候
    //它们连DOM类型都不相同，就不别提属性和children了，直接render(newVTree);
//4、oldVTree.tagName ！==  newVTree.tagName
    //当它们的tagName不同的时候，那么可以说新树旧树完全不同，就没有必要找到二者之间的差异，只需要render(newVTree)就可以了。
//5、其他情况
    //1、oldVTree和newVTree都是虚拟元素
    //2、它们有相同的tagName
    //3、它们可能有不同的attrs和children
import render from "./render";


const diff = (oldVTree, newVTree) => {
    //第一种情况
    if(newVTree === undefined) {
        return $node => {
            $node.remove();
            return $node;
        }
    }
    //第二种情况和第三种可以写在一起
    if(typeof oldVTree === 'string' || typeof newVTree === 'string') {
        if(oldVTree !== newVTree) {
            return $node => {
                const $newNode = render(newVTree);
                $node.replaceWith($newNode);
                return $newNode;
            }
        } else {
            return $node => $node;
        }
    }
    //第四种情况
    if(oldVTree.tagName !== newVTree.tagName) {
        return $node => {
            const $newNode  = render(newVTree);
            $node.replaceWith($newNode);
            return $newNode;
        } 
    }
    //其他情况
    const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs);
    const patchChildren = diffChildren(oldVTree.children, newVTree.children);

    return $node => {
        patchAttrs($node);
        patchChildren($node);
        return $node;
    }
}



// diffAttrs作用就是先把新的attr添加到元素上，然后遍历老的attr，如果在新的上没有就在元素上删除。
function diffAttrs(oldAttrs, newAttrs) {
    const patches  = new Set();
    //把new节点上的属性先patch到节点上。
    for(const [k, v] of Object.entries(newAttrs)){
        patches.add($node => {
            $node.setAttribute(k,v);
            return $node;
        })
    }
    //遍历old节点，如果old节点上的属性在new节点上没有就删除掉。
    for(const k in oldAttrs) {
        if(!(k in newAttrs)) {
            patches.add($node => {
                $node.removeAttribute(k);
                return $node;
            })
        }
    }
    //最终遍历整个patches更新属性。
    return $node => {
        for(const patch of patches) {
            patch($node);
        }
        return $node;
    }
}
const zip = (xs, ys) => {
    const zipped = [];
    console.log(xs.length, ys.length);
    for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
      zipped.push([xs[i], ys[i]]);
    }
    return zipped;
  };



//diffChildren有三种情况
    //当oldChildren.length === newChildren.length的时候，直接遍历从0 - length的diff(oldChildren[i], newChildren[i]);
    //当oldChildren.length > newChildren.length的时候，遍历oldChildren，执行diff(oldChildren[i],newChildren[i])
        //当超出newChildren.length时，diff(oldChildren[i],undefined) 恰好可以删除去掉的节点。
    //当oldChildren.length < newChildren.length 时，oldChildren.length前正常diff(oldChildren[i],newChildren[i]),超出oldChildren.length将基于newChildren[i]生成新的节点。
        //这里可以通过newChildren,slice(oldChildren.length)判断是否是超出的，从而返回newChildren超出的部分。
    //
function diffChildren (oldChildren, newChildren) {
    const patches = [];
    //oldChildren[i]存在的部分。
    oldChildren.forEach((oldChild, i) => {
        patches.push(diff(oldChild, newChildren[i]));
    });
    //oldChildren[i]不存在，newChildren[i]存在的部分。
    const additionalPatches = new Set();
    for(const additionalChild of newChildren.slice(oldChildren.length)){
        additionalPatches.add($node => {
            $node.appendChild(render(additionalChild));
        })
    }


    return $parent => {
        //遍历所有的child，对每一个child进行diff
        for (const [patch, child] of zip(patches, $parent.childNodes)) {
            patch(child);
          }
        for(const patch of additionalPatches) {
            patch($parent);
        }

        return $parent;
    }
}












export default diff;