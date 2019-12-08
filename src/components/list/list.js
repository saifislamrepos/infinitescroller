import React, { Component } from 'react';
import './list.scss';
class list extends React.Component {
  constructor(props) {
    super(props);
    const list = [];
    const totallen =this.props.images.length;
    list.push(this.props.images[totallen-1]);
    list.push(this.props.images[0]);
    list.push(this.props.images[1]);
    const startindex = totallen-1;
    const endindex = 1;
    this.state = {
      renderimg:list,
      endindex:endindex,
      startindex:startindex,
      style :{
        "transform":"translateX(-100%)",
        "transition":"transform 0.3s"
      }
    };
   
  }
  scroll(next){
    const imgarr =this.props.images;
    let start = this.state.startindex;
    let end = this.state.endindex;
    const len = imgarr.length;
    const renderimg = [...this.state.renderimg];
    let newarr =[];
    if(next){
      newarr = renderimg.slice(1,3);
      end = end+1;
      if(end > len-1) {
        end = len-end
      }
      start = end-2;
      if(start <0) {
        start = len+start;
      }
      newarr.push(imgarr[end]);
      this.setState(prevState => ({
        ...prevState,
        renderimg:newarr,
        style:{
          "transform":"translateX(0%)",
          "transition":"none"
        }
      }))
    } else {
      newarr = renderimg.slice(0,2);
      start = start-1;
      if(start <0) {
        start = len+start;
      }
      end = start+2;
      if(end > len-1) {
        end = len-end
      }
      newarr = [imgarr[start],...newarr];
      this.setState(prevState => ({
        ...prevState,
        renderimg:newarr,
        style:{
          "transform":"translateX(-200%)",
          "transition":"none"
        }
      }))
    }
    setTimeout(() => {
      this.setState(prevState => ({
        ...prevState,

        startindex:start,
        endindex:end,
        style:{
          "transform":"translateX(-100%)",
          "transition":"transform 0.3s"
        }
      }))
    },0);

  }
  render() {
    return (
      <div className="scroller">
        <div className="prev btn" onClick={this.scroll.bind(this,false)}>{'<'}</div>
        <div className="container" style={this.state.style}>
          {this.state.renderimg.map(img=>(
            <div className="img-item" key={img.id}>
              <img src = {img.large}></img>
            </div>
          ))}
        </div>
        <div className="next btn" onClick={this.scroll.bind(this,true)}>{'>'}</div>
      </div>
    );
  }
  
}
export default list;