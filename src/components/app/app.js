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
           large: 'https://www.ericsson.com/4ade1c/assets/content/74caa85fd1c140b6bd150639a23c495a/en/volvo-interior-view.jpg?w=1212',
           small: 'https://www.ericsson.com/4ade1c/assets/content/74caa85fd1c140b6bd150639a23c495a/en/volvo-interior-view.jpg?w=1212',
            id:'2'
         },
         {
           large: 'https://www.mgmotor.co.in/content/dam/mgmotor/mghector/overviewOption-mobilePortrait.jpg',
           small: 'https://www.mgmotor.co.in/content/dam/mgmotor/mghector/overviewOption-mobilePortrait.jpg',
            id:'3'
         },
         {
           large: 'https://imgd.aeplcdn.com/642x361/cw/ec/40842/Vision-M-Next-Concept-161133.jpg?wm=1&q=85',
           small: 'https://imgd.aeplcdn.com/642x361/cw/ec/40842/Vision-M-Next-Concept-161133.jpg?wm=1&q=85',
            id:'4'
         },
         {
           large: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiZ6vKno7zjAhULbisKHdTxDN4QjRx6BAgBEAU&url=https%3A%2F%2Fshift.com%2Fbuy&psig=AOvVaw2k1OPyk7Id0s7v9_iDcssP&ust=1563463932603306',
           small: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiZ6vKno7zjAhULbisKHdTxDN4QjRx6BAgBEAU&url=https%3A%2F%2Fshift.com%2Fbuy&psig=AOvVaw2k1OPyk7Id0s7v9_iDcssP&ust=1563463932603306',
            id:'5'
         },
         {
           large: 'https://shift.com/images/car_diagram/car_inspection@2x.2L3fzwdF.png',
           small: 'https://shift.com/images/car_diagram/car_inspection@2x.2L3fzwdF.png',
            id:'6'
         },
         {
           large: 'https://image.cnbcfm.com/api/v1/image/106010244-1562708838619bencon-1.jpg',
           small: 'https://image.cnbcfm.com/api/v1/image/106010244-1562708838619bencon-1.jpg',
            id:'7'
         },
         {
           large: 'http://silodrome.com/wp-content/uploads/2013/09/iPhone-4-4S.jpg',
           small: 'http://silodrome.com/wp-content/uploads/2013/09/iPhone-4-4S.jpg',
            id:'8'
         },
         {
           large: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV4-Rwo5Agz9jjlIepyZhO9DPVivJOlvVsHdiqpk9ZWO-_fvvv',
           small: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV4-Rwo5Agz9jjlIepyZhO9DPVivJOlvVsHdiqpk9ZWO-_fvvv',
            id:'9'
         },
         {
           large: 'https://i.pinimg.com/736x/57/01/4b/57014bd04a3726198d343be1e8b2c193--aston-martin-db-classic-aston-martin.jpg',
           small: 'https://i.pinimg.com/736x/57/01/4b/57014bd04a3726198d343be1e8b2c193--aston-martin-db-classic-aston-martin.jpg',
            id:'10'
         },
         {
           large: 'https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/2019/05/30163913/Ferrari_SF90_Stradale_3.jpg',
           small: 'https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/2019/05/30163913/Ferrari_SF90_Stradale_3.jpg',
            id:'11'
         },
         {
           large: 'https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/2019/05/30163930/Ferrari_SF90_Stradale_7.jpg',
           small: 'https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/2019/05/30163930/Ferrari_SF90_Stradale_7.jpg',
            id:'12'
         },
         {
           large: 'https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/2019/05/30163707/Ferrari_SF90_Stradale_5.jpg',
           small: 'https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/2019/05/30163707/Ferrari_SF90_Stradale_5.jpg',
            id:'13'
         },
         {
           large: 'https://miro.medium.com/max/5040/1*aJfK7a2mbXb6uT8yMKS1uw.jpeg',
           small: 'https://miro.medium.com/max/5040/1*aJfK7a2mbXb6uT8yMKS1uw.jpeg',
            id:'14'
         },
       ]
   }
   render(){
      return(
         <div>
            <List images = {this.state.images}/>
         </div>
      );
   }
}
export default App;