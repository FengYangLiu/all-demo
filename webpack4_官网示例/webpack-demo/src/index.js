import _ from 'lodash';
import printMe from './print.js';
import './styles.css';
import { cube } from './math.js';

function component() {
    let element = document.createElement('div');

    // lodash（目前通过一个 script 引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    let btn = document.createElement('button');
    var pre = document.createElement('pre');
    btn.innerHTML = '点击这里，然后查看 console！';

    pre.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    btn.onclick = printMe;
    element.appendChild(btn);

    return element;
}

let element = component(); // 存储 element，以在 print.js 修改时重新渲染
document.body.appendChild(element);

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        // printMe();
        document.body.removeChild(element);
        element = component(); // Re-render the "component" to update the click handler
        element = component(); // 重新渲染 "component"，以便更新 click 事件处理函数
        document.body.appendChild(element);

    })
}