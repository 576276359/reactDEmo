require('normalize.css/normalize.css');
require('styles/App.scss');
import ReactDOM from 'react-dom';
import React from 'react';
import ImgFigure from './ImgFigure.jsx';
import ControllerUnit from './ControllerUnit.jsx';
//let yeomanImage = require('../images/yeoman.png');
//获取图片数据
var imgDatas= require('../data/imgdata.json');
//讲图片数据转为数据路径
imgDatas=(function getImgURL(imgDataArr){
  for(var i=0;i<imgDataArr.length;i++){
    var single=imgDataArr[i];
    single.imgURL=require('../images/' + single.filename);
    imgDataArr[i]=single;
  }
  return imgDataArr;
})(imgDatas)

//获取区间内的值
function getRangeRandom(low,high){
  return  Math.ceil(Math.random()*(high - low) + low)
}
//获取0-30度之间的任意正负值
function  get30DegRandom() {
  return  ((Math.random()>0.5?'':'-')+Math.ceil(Math.random()*30))
}



class Gellery extends React.Component{
  constructor(...args) {
    super(...args);
    this.Constant = {
      centerPos:{
        left:0,
        right:0
      },
      hPosRange:{//水平方向的取值范围
        leftSecX:[0,0],
        rightSexX:[0,0],
        y:[0,0]
      },
      vPosRange:{//垂直方向的取值范围
        X:[0,0],
        topY:[0,0]
      }

    }
    this.state={
      imgArrangeArr:[
        {
          //   pos:{
          //     left: 0,
          //     top: 0
          //   }

        }


      ]
    }
  }
  /*翻转图片*/
  inverse(index){
    return function () {
      var imgArrangeArr=this.state.imgArrangeArr;
      imgArrangeArr[index].isInverse=!imgArrangeArr[index].isInverse;
      this.setState({
        imgArrangeArr: imgArrangeArr
      })
    }.bind(this)
  }
  center(index){
    return function () {
      this.rearrang(index);
    }.bind(this)
  }
  rearrang(centerIndex){
    var imgArrangeArr= this.state.imgArrangeArr,
      Constant=this.Constant,
      centerPos=Constant.centerPos,
      hPosRange=Constant.hPosRange,
      vPosRange=Constant.vPosRange,
      hPosRangeLeftSecX=hPosRange.leftSecX,
      hPosRangeRightSecX=hPosRange.rightSexX,
      hPosRangY=hPosRange.y,
      vPosRangeTopY=vPosRange.topY,
      vPosRangeX=vPosRange.X,
      imgsArrangeTopArr=[],
      topImgNum=Math.floor(Math.random()*2),
      topImgSpliceIndex=0,
      imgsArrangeCenterArr=imgArrangeArr.splice(centerIndex,1);
    //首先居中 cenererIndex的图片
    imgsArrangeCenterArr[0]={
      pos:centerPos,
      rotate:0,
      isCenter:true
    }


    //取出要布局上侧的图片的状态信息
    topImgSpliceIndex=Math.ceil(Math.random()* (imgArrangeArr.length-topImgNum));
    imgsArrangeTopArr=imgArrangeArr.splice(topImgSpliceIndex,topImgNum);
    //布局位于上侧的图片
    imgsArrangeTopArr.forEach(function (value,index) {
      imgsArrangeTopArr[index]={
        pos:{
          top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
          left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
        },
        rotate:get30DegRandom(),
        isCenter:false
      }

    })
    //布局左右两侧的图片
    for (var i=0,j=imgArrangeArr.length,k=j/2;i<j;i++){
      var hPosRangeLORX=null;
      if(i<k){
        hPosRangeLORX=hPosRangeLeftSecX;
      }else{
        hPosRangeLORX=hPosRangeRightSecX
      }
      imgArrangeArr[i]={
        pos:{
          top:getRangeRandom(hPosRangY[0],hPosRangY[1]),
          left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
        },
        rotate:get30DegRandom(),
        isCenter:false
      }

    }
    if(imgsArrangeTopArr&&imgsArrangeTopArr[0]){
      imgArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0])
    }
    imgArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
    this.setState({
      imgArrangeArr: imgArrangeArr
    })
  }
  componentDidMount() {
    //首先拿到舞台大小
    var stageDom= ReactDOM.findDOMNode(this.refs.stage),
      stageW=stageDom.scrollWidth,
      stageH=stageDom.scrollHeight,
      halfStageW=Math.floor(stageW/2),
      halfStageH=Math.floor(stageH/2);
    var imgFigureDom=ReactDOM.findDOMNode(this.refs.imageFigure0),
      imgW=imgFigureDom.scrollWidth,
      imgH=imgFigureDom.scrollHeight,
      halfImgW=Math.floor(imgW/2),
      halfImgH=Math.floor(imgH/2);
    //计算中心图片的位置点
    this.Constant.centerPos={
      left:halfStageW-halfImgW,
      top:halfStageH-halfImgH
    }
    //计算左侧右侧区域的排布位置取值范围
    this.Constant.hPosRange.leftSecX[0]=-halfImgW;
    this.Constant.hPosRange.leftSecX[1]=halfStageW-halfImgW*3;
    this.Constant.hPosRange.rightSexX[0]=halfStageW+halfImgW;
    this.Constant.hPosRange.rightSexX[1]=stageW-halfImgW;
    this.Constant.hPosRange.y[0]=-halfImgH;
    this.Constant.hPosRange.y[1]=stageH-halfImgH;
    //计算上侧区域的排布位置取值范围
    this.Constant.vPosRange.topY[0]=(0-halfImgH);
    this.Constant.vPosRange.topY[1]=halfStageH-halfImgH*3;
    this.Constant.vPosRange.X[0]=halfStageW-imgW;
    this.Constant.vPosRange.X[1]=halfStageW;
    this.rearrang(0);
  }
  render(){

    let controllerUnits=[],imgFigures=[];
    imgDatas.forEach(function(value,index){
      if(!this.state.imgArrangeArr[index]){
        this.state.imgArrangeArr[index]={
          pos:{
            left:0,
            top:0
          },
          rotate:0,
          isInverse:false,
          isCenter:false
        }
      }
      imgFigures.push(<ImgFigure data={value} arrange={this.state.imgArrangeArr[index]} ref={'imageFigure'+index} inverse={this.inverse(index)} center={this.center(index)} key={index} />)
      controllerUnits.push(<ControllerUnit arrange={this.state.imgArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} key={index} />)
    }.bind(this));

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controlor">
          {controllerUnits}
        </nav>
      </section>
    )
  }
}
export default Gellery;
