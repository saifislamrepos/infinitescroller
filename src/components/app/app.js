import React, { Component } from 'react';
import Header from '../header/header.js'
import List from '../list/list.js'
import Text from '../text/text.js'
import appcss from './app.scss';
class App extends Component{
   state = {
      images : [
         {
           large: 'https://stimg.cardekho.com/images/car-images/large/Skoda/Skoda-Rapid/1464/1549455048226/Candy-White.jpg',
           small: 'https://stimg.cardekho.com/images/car-images/large/Skoda/Skoda-Rapid/1464/1549455048226/Candy-White.jpg',
            id:'1'
         },
         {
           large: 'https://www.mgmotor.co.in/content/dam/mgmotor/mghector/overviewOption-mobilePortrait.jpg',
           small: 'https://www.mgmotor.co.in/content/dam/mgmotor/mghector/overviewOption-mobilePortrait.jpg',
            id:'2'
         },
         {
           large: 'https://imgd.aeplcdn.com/642x361/cw/ec/40842/Vision-M-Next-Concept-161133.jpg?wm=1&q=85',
           small: 'https://imgd.aeplcdn.com/642x361/cw/ec/40842/Vision-M-Next-Concept-161133.jpg?wm=1&q=85',
            id:'3'
         },

         {
           large: 'https://shift.com/images/car_diagram/car_inspection@2x.2L3fzwdF.png',
           small: 'https://shift.com/images/car_diagram/car_inspection@2x.2L3fzwdF.png',
            id:'4'
         },
         {
           large: 'https://image.cnbcfm.com/api/v1/image/106010244-1562708838619bencon-1.jpg',
           small: 'https://image.cnbcfm.com/api/v1/image/106010244-1562708838619bencon-1.jpg',
            id:'5'
         },
         {
           large: 'http://silodrome.com/wp-content/uploads/2013/09/iPhone-4-4S.jpg',
           small: 'http://silodrome.com/wp-content/uploads/2013/09/iPhone-4-4S.jpg',
            id:'6'
         },
         {
           large: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV4-Rwo5Agz9jjlIepyZhO9DPVivJOlvVsHdiqpk9ZWO-_fvvv',
           small: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV4-Rwo5Agz9jjlIepyZhO9DPVivJOlvVsHdiqpk9ZWO-_fvvv',
            id:'7'
         },
         {
           large: 'https://i.pinimg.com/736x/57/01/4b/57014bd04a3726198d343be1e8b2c193--aston-martin-db-classic-aston-martin.jpg',
           small: 'https://i.pinimg.com/736x/57/01/4b/57014bd04a3726198d343be1e8b2c193--aston-martin-db-classic-aston-martin.jpg',
            id:'8'
         },
         {
           large: 'https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/2019/05/30163913/Ferrari_SF90_Stradale_3.jpg',
           small: 'https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/2019/05/30163913/Ferrari_SF90_Stradale_3.jpg',
            id:'9'
         },
         {
           large: 'https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/2019/05/30163930/Ferrari_SF90_Stradale_7.jpg',
           small: 'https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/2019/05/30163930/Ferrari_SF90_Stradale_7.jpg',
            id:'10'
         },
         {
           large: 'https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/2019/05/30163707/Ferrari_SF90_Stradale_5.jpg',
           small: 'https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/2019/05/30163707/Ferrari_SF90_Stradale_5.jpg',
            id:'11'
         },
         {
           large: 'https://miro.medium.com/max/5040/1*aJfK7a2mbXb6uT8yMKS1uw.jpeg',
           small: 'https://miro.medium.com/max/5040/1*aJfK7a2mbXb6uT8yMKS1uw.jpeg',
            id:'12'
         },
       ]
   }
	 componentDidMount(){
		this.state.images.forEach(imgEl => {
			var img = document.createElement('img');
			img.src = imgEl.large;
			
		})
	}

   render(){
      return(
         <div>
            <List 
            slides = {this.state.images}
            slidetoshow={4}
            toscroll='3'
            dur='0.3'
            autoplay={false}/>
         </div>
      );
   }
}
export default App;