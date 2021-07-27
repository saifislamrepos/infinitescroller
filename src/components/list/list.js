import React, { Component } from 'react';

import styled from 'styled-components';


const Container = styled.div`
	${p => `
		@keyframes goToMove {
			0% {
				transform:translate3d(-${100*((p.itrVal)/p.slidetoshow)}%,0,0);
			}
		
			100% {
				transform:translate3d(-${100*((p.toscroll)/p.slidetoshow)}%,0,0);
			}
		}
		@keyframes goToRightMove {
			0% {
				transform:translate3d(-${((100/p.slidetoshow)*(p.toscroll+1))}%,0,0);
			}
		
			100% {
				transform:translate3d(-${100*((p.toscroll)/p.slidetoshow)}%,0,0);
			}
		}
	@keyframes leftMove {
		0% {
			transform:translate3d(0,0,0);
		}
	
		100% {
			transform:translate3d(-${100*((p.toscroll)/p.slidetoshow)}%,0,0);
		}
	}
	
	@keyframes rightMove {
		0% {
			transform:translate3d(-${((100/p.slidetoshow)*(2*p.toscroll))}%,0,0);
		}

		100% {
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
		const diff = itr-this.state.showIndex;
		const dir = diff>0;
		if(diff===0) {
			return
		}
		this.setState({
			dir: dir,
			showIndex: itr,
			itrval: itr,
			isAnimating: true,
		},()=>{
			this.scroll(dir, Math.abs(diff));
		});
		
	}

	
  async scroll(next, itr=0){
		await this.updatePos(next, itr);
  }

	updatePos (next, itrval) {
		return new Promise((resolve, reject) => {

			const slidetoshow = parseFloat(this.props.slidetoshow) || 1;
			const toscroll = parseFloat(this.props.toscroll) || 1;
			const dur = parseFloat(this.props.dur) || 1;
			const endScroll = itrval > 0 ? 1 : toscroll;
			const startScroll = itrval > 0 ? 1 : 0;

			const imgarr =this.props.slides;
			let start = this.state.startindex;
			let end = this.state.endindex;
			const len = imgarr.length;
			const renderimg = [...this.state.renderimg];
			let newarr =[];
			if(next){
				renderimg.splice(0,endScroll);
				end = end+endScroll;
				if(end > len-1) {
					end = end-len
				}
				start = start + endScroll;
				if(start > len-1) {
					start = start-len;
				}
				for(let i=endScroll-1; i>=0; i--){
					const pushIndex = end-i < 0 ? len+end-i : end-i
					renderimg.push(imgarr[pushIndex]);
				}
				this.setState(prevState => ({
						...prevState,
						renderimg:[...renderimg],
						startindex:start,
						endindex:end,
						showIndex: start+toscroll >=len ? start+toscroll-len:start+toscroll,
						isAnimating: true,
						style:{
							"animationName": itrval>0?'goToMove':'leftMove',
							"animationDuration": `${dur*1000}ms`
						}
					}), 
					()=> {
						setTimeout(() => {
							this.setState({
								itrval: itrval-1,
							})
						}, dur*1000);
					}
				)
			} else {
				renderimg.splice(renderimg.length-endScroll,(endScroll));
				start = start-endScroll;
				if(start <0) {
					start = len+start;
				}
				end = end-endScroll;
				if(end <0) {
					end = len+end;
				}

				const startArr = [];
				for(let i=0; i<endScroll; i++){
					const pushIndex = start+i > len-1 ? start+i-len : start+i
					startArr.push(imgarr[pushIndex]);
				}
				newarr = [...startArr,...renderimg];
				this.setState(prevState => ({
					...prevState,
					renderimg:newarr,
					startindex:start,
					endindex:end,
					showIndex: start+toscroll >=len ? start+toscroll-len:start+toscroll,
					isAnimating: true,
					style:{
						"animationName": itrval>0?'goToRightMove':'rightMove',
						"animationDuration": `${dur*1000}ms`,
						"animation-play-state": "running"
					}
				}), 
				()=> {
					setTimeout(() => {
						this.setState({
							itrval: itrval-1,
						})
					}, dur*1000);
					resolve('update');
				})
			}
		});
	}
	componentDidUpdate(prevProp, prevState){
		if(!this.state.isAnimating) {
			if(this.props.autoplay || this.state.itrval>0){
				setTimeout(() => {
					this.scroll.call(this,this.state.dir, this.state.itrval);
				});
			
			}
		}
		if(this.state.itrval !== prevState.itrval) {
			//this.animHandle();
		}
	}

	componentDidMount() {
		if(this.props.autoplay){
			setTimeout(() => {
				this.scroll.call(this,true);
			},0);
		}
		this.animHandle()

	}

	animHandle() {
		this.myRef.current.removeEventListener("animationiteration", this.animateListner.bind(this));
		this.myRef.current.removeEventListener("animationend", this.animateListner.bind(this));
		this.myRef.current.addEventListener("animationstart", ()=>{
			console.log('annimstart')
		}, false);
		this.myRef.current.addEventListener("animationiteration", this.animateListner.bind(this), false);
		this.myRef.current.addEventListener("animationend", this.animateListner.bind(this), false);
	}

	animateListner(){
		const slidetoshow = parseFloat(this.props.slidetoshow) || 1;
		const toscroll = parseFloat(this.props.toscroll) || 1;
		const initranslate = `translate3d(-${100*(this.state.itrval>0?1: toscroll)/slidetoshow}%,0,0)`;
		this.setState(prevState => ({
			...prevState,
			isAnimating: false,
			style:{
				"transform": initranslate,
				"animation": "none"
			}
		}));
	}

  render() {
	const slidetoshow = parseFloat(this.props.slidetoshow);
	const toscroll = parseFloat(this.props.toscroll);
	console.log(this.state.itrval>0? toscroll-1:0)
	return (
      <div className="scroller">
        <div className="prev btn" onClick={this.scroll.bind(this,false, 0)}>{'<'}</div>
				{this.dots.map(dot => (
					<span className='dots' onClick={this.goto.bind(this,dot.index)}>{dot.index}</span>
				))}
        <Container 
				style={this.state.style} 
				slidetoshow={slidetoshow}
				itrVal={this.state.itrval>0? toscroll-1:0}
				toscroll={toscroll}
				ref={this.myRef}>
          {this.state.renderimg.map((img,i)=>(
            <div className="img-item" key={img.id}>
							<p style={{"position":"absolute", "left":"100px","top":"100px", "fontSize": "30px", "color":"red"}}>arr:{i}:{img.id}</p>
              <img src = {img.large}></img>
            </div>
          ))}
        </Container>
        <div className="next btn" onClick={this.scroll.bind(this,true, 0)}>{'>'}</div>
      </div>
    );
  }
  
}
export default list;