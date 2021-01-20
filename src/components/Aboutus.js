import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link, NavLink } from "react-router-dom";

import { connect } from "react-redux";
import moment from 'moment';

import { clearMessage } from "./../actions/message";

import { history } from './../helpers/history';
import headers from './headers'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import sha512 from 'js-sha512'


import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

// import "./../../assets/css/bootstrap.min.css";
import  "./../assets/css/bootstrap.min.css"
import "./../assets/css/bootstrap.min.css";
import "./../assets/css/custom.css";
import "./../assets/css/font-awesome.min.css"
import "./../assets/css/custom.css"
import "./../assets/css/jquery.fancybox.min.css"

import "./../assets/css/slick.css"
import "./../assets/css/slick-theme.css"
// import "./../assets/js/style.js";
import "./../App.css";

import UClogo from './../assets/images/logo.png'
import img1png from './../assets/images/1.png'
import img2png from './../assets/images/2.png'
import img3png from './../assets/images/3.png'
import img4png from './../assets/images/4.png'
import img5png from './../assets/images/5.png'
import img6png from './../assets/images/6.png'
import img7png from './../assets/images/7.png'
import img8png from './../assets/images/8.png'
import img13png from './../assets/imagesUC/13.png'
import img33png from './../assets/images/33.png'
import img23png from './../assets/images/33.png'
import linkArrow from './../assets/images/btn-link-arrow.png'
import jaglan from './../assets/images/amit-jaglan.jpg'
import business2 from './../assets/images/business2.jpg'
import engineering2 from './../assets/images/engineering2.jpg'
import finance2 from './../assets/images/finance2.jpg'
import hr2 from './../assets/images/hr2.jpg'
import operations2 from './../assets/images/operations2.jpg'

import marketing2 from './../assets/images/marketing2.jpg'
import product2 from './../assets/images/product2.jpg'
import design2 from './../assets/images/design2.jpg'
import downarrow from './../assets/images/downarrow.png'

import { getJobList } from "./../actions/aboutus";

let depListGlobal = {};

class Aboutus extends Component {

  constructor(props) {
    super(props);


    this.state = {
      DeptList:[],
      LocationList:[],
      dept:'-1',
      location:'-1',
    
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    var timeStamp = ( moment('2009-07-15 00:00:00').unix() )*1000
    this.getJobList();
  }
 sha512(str) {
  return str.split('').reduce((prevHash, currVal) =>
  (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
  }
  getJobList() {
    var emailid=process.env.REACT_APP_EMAIL_ID;
    var secretkey= process.env.REACT_APP_SECRET_KEY
    
    const { dispatch, history } = this.props;
   var unixtimestamp =moment().unix();
 
   var ciphertext = sha512('');
  
  var shatext=emailid+secretkey+unixtimestamp
 

    dispatch(getJobList(unixtimestamp,sha512(shatext)))
      .then((response) => {
        console.log(response)
        this.setState({
          DeptList:response.data
        });
       
        localStorage.setItem("joblist_payload", JSON.stringify(response.data));
        console.log("The response recd in component")
        console.log(this.state.DeptList)
      
      })
      .catch(() => {
console.log("something went wrong ")
      });
  }
  

  handleViewAllClick(event) {
   
    
    window.location.replace("/careertwo/" );
   
   // 
  
  }
  handlePrevPageClick(event) {
    console.log("dpt about us")
    console.log(this.state.dept)
    console.log("location about us")
    console.log(this.state.location)
    
    window.location.replace("/careertwo/"+this.state.dept +"/"+this.state.location );
   
   // 
  
  }
  onchangeLocation=(event ) =>{
    this.setState({
      location:event.target.value
    });
  }
  onchangeDepartment=(event ) =>{
    console.log(event.target.value)
   /* let data=[];
     data = this.state.DeptList.filter(function(item){
      return item.department == event.target.value;
   }).map(function({location_city}){
    if (data.indexOf(location_city.location_city) === -1) {
      return {location_city};
  }
  console.log({location_city})
       return {location_city};
  
     
   }); */
   

   this.setState({
    
    dept:event.target.value
  });
  }

  _getUniqueLocationName() {
    var a = [];
    var citylist=[];
    this.state.DeptList.forEach(function(obj){
        
        obj.location_city.forEach(function(item,k){
       
           if(item!="" && item!=" ")  {
              
        
        if(a.indexOf(item)==-1){
        
            a.push(item);
          
           }
        }
        })
       
        
    })
    return a.map((depts, index) => (
        <option key={index}>{depts}</option>
      ));
   
    console.log("fdfdfdfdfdfdfdffdfd")
console.log(a)

  }
  _getUniqueCampusName() {
    const dept = this.state.DeptList;
    const Departmentunique = [...new Set(dept.map(item => item.department))];
    console.log("Departmentunique")
    console.log(Departmentunique);
    return Departmentunique.map((depts, index) => (
      <option key={index}>{depts}</option>
    ));
  }
  
  render() {

    const { isLoggedIn, message } = this.props;
    const DepartmentName = this._getUniqueCampusName();
    const LocationName=this._getUniqueLocationName();
    return (
      <React.Fragment>

        <h4>About Us Page</h4>
        <section className="header container py-3">
    <img src={UClogo} alt="" className="img-fluid"/>
  </section>
  <section className="career-top-banner container-fluid  text-center">
    <div className="text-white container">
      <h3>Build the future of Services</h3>
      <p>At Urban Company, we're looking for hard-working, <br></br>
        passionate people to help us create the next million jobs in India.</p>
    </div>
  </section>
  <section className="position-fields container mt-n5  ">
    <div className="bg-white rounded shadow-lg py-xl-5 py-4 px-4 text-center ">
      <h3>Open <br></br> Positions</h3>
    
      <select name="cars" className="form-control d-inline-block mb-2 mb-md-0" onChange={this.onchangeDepartment}>
        <option value="-1">Filter by department</option>
        {DepartmentName}
      </select>
      <select name="cars" className="form-control d-inline-block" onChange={this.onchangeLocation}>
        <option value="-1">Filter by location</option>
       {LocationName}
      </select>
     
      <button className="btn btn-primary d-inline-block" onClick={event => this.handlePrevPageClick(event)}>Submit </button>
      <button className="btn btn-link d-inline-block" onClick={event => this.handleViewAllClick(event)}>View All <img src={linkArrow} alt=""/></button>
    </div>
  </section>
  
  <section className="container whyUrban-row px-md-5 ">
    <h2 className="heading">Why Urban Company</h2>
    <p>Urban Company (Formerly UrbanClap) was launched in Nov 2014. It is the largest home services platform in India
      and UAE, with recent expansion to Australia and Singapore. The platform helps customers book reliable home
      services – from beauty services to massage therapy, appliance repair to plumbing etc. Since its inception in
      November 2014, Urban Company has delivered 14 million service orders across 22 cities through a fleet of nearly
      30,000 service professionals and has raised $215m in capital from marquee investors such Accel Partners, SAIF
      Partners, VY Capital and Ratan Tata to name a few.</p>
  </section>
  <section className=" container pb-3">
    <div className="slider1">
      <div className="text-center">
        <img src={img1png} alt="" className="rounded mb-3"/>
        <h3>Competitive & Salary  Incentives</h3>
        <p>Because we're all about the perks!
          Join us to know more **wink wink**</p>
      </div>
      <div className="text-center">
        <img src={img2png} alt="" className="rounded mb-3"/>
        <h3>Young  Passionate Team</h3>
        <p>Bunch of dreamers  realists changing
          the world, one happy customer at a time</p>
      </div>
      <div className="text-center">
        <img src={img3png} alt="" className="rounded mb-3"/>
        <h3>A Rocking Medical Policy</h3>
        <p>Cuts, wounds  bruises or something
          more serious, we cover them all!</p>
      </div>
      <div className="text-center">
        <img src={img4png} alt="" className="rounded mb-3"/>
        <h3>Unlimited Growth Opportunities</h3>
        <p>Whether you're a root or a shoot,
          your growth is important to us</p>
      </div>
      <div className="text-center">
        <img src={img5png} alt="" className="rounded mb-3"/>
        <h3>Free Shuttle Service</h3>
        <p>We pick you up from a common pickup location to our office</p>
      </div>
      <div className="text-center">
        <img src={img6png} alt="" className="rounded mb-3"/>
        <h3>Amazing Hackathons</h3>
        <p>Solve world peace or plot world dominion, within Urban Company of course
</p>
      </div>
      <div className="text-center">
        <img src={img7png} alt="" className="rounded mb-3"/>
        <h3>Hustle Your Way Forward</h3>
        <p>When dreaming big, ain’t no way but to do things fast</p>
      </div>
      <div className="text-center">
        <img src={img8png} alt="" className="rounded mb-3"/>
        <h3>Lunch  Dinner On The House</h3>
        <p>Enjoy yummy food that is bound to leave you re-energized</p>
      </div>
    </div>
  </section>
  <section className="team-row container-fluid mt-2 mt-md-5">
    <div className="container">
      <h2>Meet the Team</h2>
      <div className="team-slider bg-white rounded py-4 px-3 px-md-5 shadow-lg">
        <div>
          <div className="row">
            <div className="col-md-5 d-flex align-items-center"><img src={jaglan} alt="" className="img-fluid"/>
            </div>
            <div className="col-md-7 d-flex flex-column justify-content-center pt-4">
              <span> &#x201C; </span>
              <p>Knowing how your work is helping shape up future India, is just beyond words. Designing at Urban Company
                feels just like that and much more. We move fast, break big problems and create huge impact. Nothing
                more
                one can ask for.</p>
              <h3>Amit Jaglan</h3>
              <h4>Lead - Product Design</h4>
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-md-5 d-flex align-items-center"><img src={jaglan} alt="" className="img-fluid"/>
            </div>
            <div className="col-md-7 d-flex flex-column justify-content-center pt-4">
              <span> &#x201C; </span>
              <p>Building the Finance function and working with some of the finest people has been a fantastic experience. It's few organisations that allow for such meaningful and challenging opportunities!</p>
              <h3>Ashish Bansal</h3>
              <h4>VP of Finance</h4>
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-md-5 d-flex align-items-center"><img src={jaglan} alt="" className="img-fluid"/>
            </div>
            <div className="col-md-7 d-flex flex-column justify-content-center pt-4">
              <span> &#x201C; </span>
              <p>Hands down, one of the best places to work at. While I get to work on challenging problems, it is also a very friendly and warm workplace that I enjoy coming to every day.</p>
              <h3>Ritika Tawani</h3>
              <h4>Director of Product</h4>
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-md-5 d-flex align-items-center"><img src={jaglan} alt="" className="img-fluid"/>
            </div>
            <div className="col-md-7 d-flex flex-column justify-content-center pt-4">
              <span> &#x201C; </span>
              <p>It is really heartening to see smart, passionate people working together, working hard to solve some very complex problems. Every day is a new, challenging day and I am eagerly waiting for what tomorrow holds for me.</p>
              <h3>Kanav Arora</h3>
              <h4>VP Engineering</h4>
            </div>
          </div>
        </div>
		<div>
          <div className="row">
            <div className="col-md-5 d-flex align-items-center"><img src={jaglan} alt="" className="img-fluid"/>
            </div>
            <div className="col-md-7 d-flex flex-column justify-content-center pt-4">
              <span> &#x201C; </span>
              <p>One is given the freedom to fail and gets to work with the brightest minds in the country. The growth curve here is exponential.</p>
              <h3>Rahul Deorah</h3>
              <h4>VP of Marketing</h4>
            </div>
          </div>
        </div>
		<div>
          <div className="row">
            <div className="col-md-5 d-flex align-items-center"><img src={jaglan} alt="" className="img-fluid"/>
            </div>
            <div className="col-md-7 d-flex flex-column justify-content-center pt-4">
              <span> &#x201C; </span>
              <p>I have had the envious opportunity to work with the best people at Urban Company - passionate people you can learn from every day and people who support you consistently as you navigate your way through the fantastical growth journey here - building and creating impact daily.</p>
              <h3>Sana Nayyar</h3>
              <h4>VP of Human Resources</h4>
            </div>
          </div>
        </div>
		<div>
          <div className="row">
            <div className="col-md-5 d-flex align-items-center"><img src={jaglan} alt="" className="img-fluid"/>
            </div>
            <div className="col-md-7 d-flex flex-column justify-content-center pt-4">
              <span> &#x201C; </span>
              <p>This place is a roller coaster ride. This is a organisation is for those who are hungry for work and like to be challenged. It for those who do something meaningful in their lives.</p>
              <h3>Anand Dureja</h3>
              <h4>VP of Salon</h4>
            </div>
          </div>
        </div>
		<div>
          <div className="row">
            <div className="col-md-5 d-flex align-items-center"><img src={jaglan} alt="" className="img-fluid"/>
            </div>
            <div className="col-md-7 d-flex flex-column justify-content-center pt-4">
              <span> &#x201C; </span>
              <p>Thinking, planning, raw execution, evaluation and having fun at the same time. We are Hustlers and we are simple. We are guided by only one thing and that is ‘Pure Passion’</p>
              <h3>Manoj Sharma</h3>
              <h4>VP of Customer Experience</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="videos-row container py-5">
    <div className="row py-3">
      <div className="col-md-4 d-flex align-items-center mb-2 mb-md-0">
       {/* <!-- <img src="images/play.png" alt="" class="play-btn">--> */}
        <a className="custom" data-fancybox="film" href="https://www.youtube.com/watch?v=WAyoHjvEAno">
        <img src={img13png} alt="" className="rounded w-100"/>
      </a>
      </div>
      <div className="col-md-4 d-flex align-items-center mb-2 mb-md-0">
        {/* <!-- <img src="images/play.png" alt="" class="play-btn">-->*/}
        <a className="custom" data-fancybox="film" href="https://www.youtube.com/watch?v=58X0v93nyxc&feature=youtu.be">
          <img src={img23png} alt="" className="rounded w-100"/>
        </a>
      </div>
      <div className="col-md-4 d-flex align-items-center mb-2 mb-md-0">
      {/*   <!-- <img src="images/play.png" alt="" class="play-btn">-->*/}
        <a className="custom" data-fancybox="film" href="https://www.youtube.com/watch?v=gMfLRco27g0&feature=youtu.be">
          <img src={img33png} alt="" className="rounded w-100"/>
        </a>
      </div>
    </div>
  </section>


  <section className="life-row container py-5 position-relative px-2">
<h2>Life at Urban Company</h2>
<div className="flex ">

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={business2} alt=""/>
   <p> <mark>Brainstorming over virtual meeting</mark></p>
    </a>
  </div>

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={design2} alt=""/>
    <p><mark>Work @ Home - Product Design style</mark></p>
  </a>
  </div>

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={engineering2} alt=""/>
    <p><mark>Evolving with the times</mark></p>
  </a>
  </div>

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={finance2} alt=""/>
    <p><mark>Festivity times @UrbanCompany</mark></p>
  </a>
  </div>

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={hr2} alt=""/>
    <p><mark>Brainstorming over virtual meeting</mark></p>
  </a>
  </div>

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={marketing2} alt=""/>
    <p><mark>Work @ Home - Product Design style</mark></p>
  </a>
  </div>

  <div className="content"> 
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={operations2} alt=""/>
    <p><mark>Evolving with the times</mark></p>
  </a>
  </div>

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={product2} alt=""/>
    <p><mark>Festivity times @UrbanCompany</mark></p>
  </a>
  </div>

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={business2} alt=""/>
    <p><mark>Brainstorming over virtual meeting</mark></p>
  </a>
  </div>

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={design2} alt=""/>
    <p><mark>Work @ Home - Product Design style</mark></p>
  </a>
  </div>

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={engineering2} alt=""/>
    <p><mark>Evolving with the times</mark></p>
  </a>
  </div>

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={finance2}alt=""/>
    <p><mark>Festivity times @UrbanCompany</mark></p>
  </a>
  </div>

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={hr2} alt=""/>
    <p><mark>Brainstorming over virtual meeting</mark></p>
  </a>
  </div>

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={marketing2} alt=""/>
    <p><mark>Work @ Home - Product Design style</mark></p>
  </a>
  </div>

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={operations2} alt=""/>
    <p><mark>Evolving with the times</mark></p>
  </a>
  </div>

  <div className="content">
    <a className="custom" data-fancybox="film" href="images/business2.jpg">  
    <img src={product2}alt=""/>
    <p><mark>Festivity times @UrbanCompany</mark></p>
    </a>
  </div>
</div>
<a href="#" id="loadMore">Load more <img src={downarrow} alt=""/></a>
<div className="gradient"></div>
    </section>
  
      <h4>Frmo page</h4>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {

  const { user } = state.auth;
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    user,
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Aboutus);