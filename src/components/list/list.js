import React, { Component } from 'react';

import styled from 'styled-components';


const Container = styled.div`
	${p => `
	@keyframes leftMove {
		from {
			transform:translate3d(0,0,0);
		}
		to {
			transform:translate3d(-${100*((p.toscroll)/p.slidetoshow)}%,0,0);
		}
	}
	
	@keyframes rightMove {
		from {
			transform:translate3d(-${((100/p.slidetoshow)*(p.toscroll+1))}%,0,0);
		}
		to {
			transform:translate3d(-${100*((p.toscroll)/p.slidetoshow)}%,0,0);
		}
	}`}
	white-space: nowrap;
	position: relative;
	animation-fill-mode: both;
	animation-timing-function: linear;
	transform: ${p=>`translate3d(-${100*((p.toscroll)/p.slidetoshow)}%,0,0)`};
	.img-item {
		position: relative;
		display: inline-block;
		text-align: center;
		width:${p => 100/(p.slidetoshow)}%;
		img {
				object-fit: scale-down;
				height: 700px;
				width: 100%;
		}
}`

import './list.scss';

class list extends React.Component {
  constructor(props) {
    super(props);
    const stlist = [];
	const enlist = [];
	const totallen = this.props.slides.length;
	const slidetoshow = parseFloat(this.props.slidetoshow) || 1;
	const toscroll = parseFloat(this.props.toscroll) || 1;
	for(let i=toscroll; i>0; i--){
		stlist.push(this.props.slides[totallen-i]);
	}
	for(let i=1; i<slidetoshow+toscroll; i++){
		enlist.push(this.props.slides[i]);
	}
	const list = [...stlist, this.props.slides[0], ...enlist];
	this.initranslate = `translate3d(-${100*toscroll/slidetoshow}%,0,0)`;
    const startindex = totallen-toscroll;
	const endindex = slidetoshow+toscroll-1;
	const dur = parseFloat(this.props.dur) || 1
    this.state = {
		renderimg:list,
		showIndex:0,
		itrval:0,
		endindex:endindex,
		startindex:startindex,
		isAnimating: false,
		dir: true,
		style :{
			"transform":this.initranslate,
			"animationDuration": `${dur*1000}ms`,
		}
	};
	this.dots = this.props.slides.map((sld,i) => ({
		index: i
	}))
	this.myRef = React.createRef();
  }

	goto(itr){
		const dir = itr>this.state.showIndex;
		if(itr===this.state.showIndex) {
			return
		}
		this.scroll(dir, Math.abs(itr-this.state.showIndex), 1);
		this.setState({
			dir: dir,
			showIndex: itr,
			toscrollSlide: 1
		})
	}

	
  async scroll(next, itr=0, toscrollSlide){
	  
	await this.updatePos(next, itr, itr-1);
	
  }
	updatePos (next, toscrollSlide=0) {

		return new Promise((resolve, reject) => {

			const slidetoshow = parseFloat(this.props.slidetoshow) || 1;
			const initToScroll = parseFloat(this.props.toscroll) || 1;
			const toscroll = toscrollSlide || parseFloat(this.props.toscroll) || 1;
			const dur = parseFloat(this.props.dur) || 1;

			const imgarr =this.props.slides;
			let start = this.state.startindex;
			let end = this.state.endindex;
			const len = imgarr.length;
			const renderimg = [...this.state.renderimg];
			let newarr =[];
			if(next){
				newarr = renderimg.slice(initToScroll,(slidetoshow+toscroll+1));
				end = end+toscroll;
				if(end > len-1) {
					end = end-len
				}
				start = end-(toscroll+slidetoshow);
				if(start <0) {
					start = len+start;
				}
				for(let i=0; i<toscroll; i++){
					newarr.push(imgarr[end-i]);
				}
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
						setTimeout(() => {
							resolve('update');
						}, dur*1000);
					}
				)
			} else {
				newarr = renderimg.slice(0,(slidetoshow+toscroll+1));
				start = start-toscroll;
				if(start <0) {
					start = len+start;
				}
				end = start+slidetoshow+toscroll;
				if(end > len-1) {
					end = end-len
				}

				const startArr = [];
				for(let i=0; i<toscroll; i++){
					startArr.push(imgarr[start+i]);
				}
				newarr = [...startArr,...newarr];
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
			if(this.props.autoplay){
				setTimeout(() => {
					this.scroll.call(this,true);
				});
			
			}
		}
	}

	componentDidMount() {
		if(this.props.autoplay){
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
					"transform": this.initranslate,
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
					"transform": this.initranslate,
					"animation": "none"
				}
			}));
			console.log('annimend',  performance.now())
		}, false);

	}

  render() {
	const slidetoshow = parseFloat(this.props.slidetoshow);
	const toscroll = parseFloat(this.props.toscroll);
	return (
      <div className="scroller">
        <div className="prev btn" onClick={this.scroll.bind(this,false)}>{'<'}</div>
		{this.dots.map(dot => (
			<span className='dots' onClick={this.goto.bind(this,dot.index)}>{dot.index}</span>
		))}
        <Container 
				style={this.state.style} 
				slidetoshow={slidetoshow}
				toscroll={toscroll}
				ref={this.myRef}>
          {this.state.renderimg.map((img,i)=>(
            <div className="img-item" key={img.id}>
				<p style={{"position":"absolute", "left":"100px","top":"100px", "fontSize": "30px", "color":"red"}}>arr:{i}:{img.id}</p>
              	<img src = {img.large}></img>
            </div>
          ))}
        </Container>
        <div className="next btn" onClick={this.scroll.bind(this,true)}>{'>'}</div>
      </div>
    );
  }
  
}
export default list;