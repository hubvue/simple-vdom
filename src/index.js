import createElement from "../vdom/lib/createElement";
import render from "../vdom/lib/render";
import mount from "../vdom/lib/mount";
const App = createElement("div",{
    attrs: {
        id: "app",
    },
    children : [
        createElement("input"),
        String("132"),
        createElement("img",{
            attrs: {
                src: "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg"
            }
        })
    ]
})
const node = mount(
    render(App), 
    document.querySelector("#root"),
)
console.log(node);