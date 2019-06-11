import createElement from "../vdom/lib/createElement";
import render from "../vdom/lib/render";
import mount from "../vdom/lib/mount";
import diff from "../vdom/lib/diff";

const createApp = count => createElement("div", {
    attrs: {
        id: "app",
        // dataCount: count,
    },
    children: [
        "This current count is :",
        String(count),
        createElement("input"),
        ...Array.from({length: count}, () => createElement('img', {
            attrs: {
                src: "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg"
            }
        })),
    ]
})

let count = Math.floor(Math.random() * 20);

let vApp = createApp(count);
const $app = render(vApp);
let $rootElem = mount($app,document.querySelector("#root"));
setInterval(() => {
    count = Math.floor(Math.random() * 20);
    const vNewApp = createApp(count);
    const patch = diff(vApp,vNewApp);
    $rootElem = patch($rootElem);
    vApp = vNewApp;
}, 1000)
