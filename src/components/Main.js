require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//let yeomanImage = require('../images/yeoman.png');
//获取图片数据
//var imgDatas=require('../data/imgdata.json');
//讲图片数据转为数据路径
//imgDatas=(function getImgURL(imgDataArr){
//		for(var i=0;i<imgDataArr.length;i++){
//			var single=imgDataArr[i];
//			single.imgURL=require('../images/'+single.fileName);
//			imgDataArr[i]=single;
//		}
//		return imgDataArr;
//})(imgDatas)

//class AppComponent extends React.Component {
//render() {
//  return (
//    <div className="index">
//      <img src={yeomanImage} alt="Yeoman Generator" />
//      <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
//    </div>
//  );
//}
//}

class AppComponent extends React.Component {
render() {
    return (
     <section className="stage">
     		<section className="img-sec"></section>
     		<nav className="controlor"></nav>
     </section>
    );
}
}

AppComponent.defaultProps = {
};

export default AppComponent;
