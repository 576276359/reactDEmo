import React from 'react';
class ImgFigure extends React.Component{
  handleClick(e){
    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();

  }
  render(){
    let styleObj={};
    if (this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }
    if(this.props.arrange.rotate){
      ['MozTransform','msTransform','WebkitTransform','transform'].forEach(function (value) {
        styleObj[value]='rotate('+this.props.arrange.rotate+'deg)';
      }.bind(this))
    }
    if(this.props.arrange.isCenter){
      styleObj.zIndex=11;
    }
    var imgFigureClassName='imgFigure';
    imgFigureClassName+=this.props.arrange.isInverse? ' isInverse':''
    return(
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
        <img src={this.props.data.imgURL}/>
        <figcaption>
          <h2 className="imgTitle">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick.bind(this)}>
            <p>{this.props.data.desc}</p>
          </div>
        </figcaption>
      </figure>
    )
  }
}
export default ImgFigure;
