import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link, NavLink } from "react-router-dom";

import { connect } from "react-redux";
import moment from 'moment';

import { clearMessage } from "./../actions/message";

import { history } from './../helpers/history';

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
import linkArrow from './../assets/images/btn-link-arrow.png'


import { getJobList } from "./../actions/aboutus";

let depListGlobal = {};

class Aboutus extends Component {

  constructor(props) {
    super(props);


    this.state = {
      DeptList:[],
      LocationList:[],
    
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
        localStorage.setItem("deplist", response.data);
        console.log("The response recd in component")
        console.log(this.state.DeptList)
      
      })
      .catch(() => {

      });
  }
  onchangeDepartment=(event ) =>{
    console.log(event.target.value)
    let data=[];
     data = this.state.DeptList.filter(function(item){
      return item.department == event.target.value;
   }).map(function({location_city}){
    if (data.indexOf(location_city.location_city) === -1) {
      return {location_city};
  }
  console.log({location_city})
       return {location_city};
  
     
   });
   const LocationUnique = [...new Set(data.map(item => item.location_city))];
   console.log("LocationUnique")
   console.log(LocationUnique);
   this.setState({
    LocationList:data
  });
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
      <h3>Open Positions</h3>
    
      <select name="cars" className="form-control d-inline-block mb-2 mb-md-0" onChange={this.onchangeDepartment}>
        <option selected="">Filter by department</option>
        {DepartmentName}
      </select>
      <select name="cars" className="form-control d-inline-block">
        <option selected="">Filter by location</option>
        {this.state.LocationList &&
                                this.state.LocationList.map(item => (
                                  <option >
                                    {item.location_city}
                                  </option>
                                ))}
      </select>
      <button className="btn btn-primary d-inline-block">Submit </button>
      <button className="btn btn-link d-inline-block">View All <img src={linkArrow} alt=""/></button>
    </div>
  </section>
 
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