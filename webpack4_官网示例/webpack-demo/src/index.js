import _ from 'lodash';
import './style.css';
import Icon from './timg.jpeg';
import Data from './data.xml';

function component() {
    let element = document.createElement('div');
  
    // lodash（目前通过一个 script 引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack','测试字体'], ' ');
    element.classList.add('hello');

    // 添加图片
    let image = new Image();
    image.src = Icon;
    element.appendChild(image);

    console.log(Data);
    
    return element;
  }
  
  document.body.appendChild(component());