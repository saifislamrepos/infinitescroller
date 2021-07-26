import React, { Component } from 'react';


const dur = 2

const slidetoshow=2;
const toscroll=2;

const autoplay = false
import './list.scss';
let a=1;
class list extends React.Component {
  constructor(props) {
    super(props);
    const list = [];
    const totallen =this.props.images.length;
		list.push(this.props.images[totallen-3]);
		list.push(this.props.images[totallen-2]);
		list.push(this.props.images[totallen-1]);
    list.push(this.props.images[0]);
    list.push(this.props.images[1]);
		list.push(this.props.images[2]);
		list.push(this.props.images[3]);
    const startindex = totallen-1;
    const endindex = 1;
    this.state = {
		renderimg:list,
		endindex:endindex,
		startindex:startindex,
		isAnimating: false,
		style :{
			"transform":"translate3d(-100%,0,0)",
			"animationDuration": `${dur*1000}ms`,
		}
    };
	this.myRef = React.createRef();
   
  }
  async scroll(next){
	const res = await this.updatePos(next);
		
  }
	updatePos (next) {

		return new Promise((resolve, reject) => {
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
					renderimg:[...newarr],
					startindex:start,
					endindex:end,
					isAnimating: true,
					style:{
						"animationName":'leftMove',
						"animationDuration": `${dur*1000}ms`
					}
				}), 
				()=> {
					resolve('update');
				})
			} else {
				newarr = renderimg.slice(0,2);
				start = start-1;
				if(start <0) {
					start = len+start;
				}
				end = start+2;
				if(end > len-1) {
					end = end-len
				}
				newarr = [imgarr[start],...newarr];
				console.log(newarr)
				this.setState(prevState => ({
					...prevState,
					renderimg:newarr,
					startindex:start,
					endindex:end,
					isAnimating: true,
					style:{
						"animationName":'rightMove',
						"animationDuration": `${dur*1000}ms`,
						"animation-play-state": "running"
					}
				}), 
				()=> {
					resolve('update');
				})
			}
		});
	}
	componentDidUpdate(prevProp, prevState){
		if(!this.state.isAnimating) {
			if(autoplay){
				setTimeout(() => {
					this.scroll.call(this,true);
				});
			
			}
		}
	}

	componentDidMount() {
		if(autoplay){
			setTimeout(() => {
				this.scroll.call(this,true);
			},0);
		}

		this.myRef.current.addEventListener("animationstart", ()=>{
			console.log('annimstart')
		}, false);
		this.myRef.current.addEventListener("animationiteration", ()=>{
			this.setState(prevState => ({
				...prevState,
				isAnimating: false,
				style:{
					"transform": "translate3d(-100%,0,0)",
					"animation": "none"
				}
			}));
			console.log('annimsitr')
		}, false);
		this.myRef.current.addEventListener("animationend", ()=>{
			this.setState(prevState => ({
				...prevState,
				isAnimating: false,
				style:{
					"transform": "translate3d(-100%,0,0)",
					"animation": "none"
				}
			}));
			console.log('annimend')
		}, false);
	}

  render() {
	return (
      <div className="scroller">
        <div className="prev btn" onClick={this.scroll.bind(this,false)}>{'<'}</div>
        <div className="container" style={this.state.style} ref={this.myRef}>
          {this.state.renderimg.map((img,i)=>(
            <div className="img-item" key={img.id}>
				<p style={{"position":"absolute", "left":"100px","top":"100px", "fontSize": "30px", "color":"red"}}>arr:{i}:{img.id}</p>
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