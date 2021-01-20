import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link, NavLink } from "react-router-dom";

import { connect } from "react-redux";
import moment from 'moment';
import sha512 from 'js-sha512'
import { clearMessage } from "./../actions/message";

import { history } from './../helpers/history';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';



import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

// import "./../../assets/css/bootstrap.min.css";

import "./../assets/css/bootstrap.min.css";
import "./../assets/css/custom.css";
import "./../assets/css/font-awesome.min.css"
import "./../assets/css/custom.css"
import "./../assets/css/jquery.fancybox.min.css"

import "./../assets/css/slick.css"
import "./../assets/css/slick-theme.css"
// import "./../assets/js/style.js";
import "./../App.css";

import UClogo from './../assets/images/logo-black.png'

import { getJobDetails } from "./../actions/aboutus";


class careerFour extends Component {

  constructor(props) {
    super(props);


    this.state = {
      job_id:'',
      filtered_joblist:[]
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });

    this.state.job_id = props.match.params.jobid;

  }

  componentDidMount() {
    var timeStamp = ( moment('2009-07-15 00:00:00').unix() )*1000
    this.DisplayJobDtls(this.state.job_id)
  }

DisplayJobDtls(jobid){
  console.log("displaydtls cald")
  console.log(jobid)
  var emailid=process.env.REACT_APP_EMAIL_ID;
  var secretkey= process.env.REACT_APP_SECRET_KEY
  
  const { dispatch, history } = this.props;
 var unixtimestamp =moment().unix();

 var ciphertext = sha512('');

var shatext=emailid+secretkey+unixtimestamp


  dispatch(getJobDetails(unixtimestamp,sha512(shatext),jobid))
    .then((response) => {
      console.log(response)
      this.setState({
         filtered_joblist:response.data
      });
     
    
      console.log("The response recd in career")
      console.log(typeof(this.state.filtered_joblist))
      console.log(this.state.filtered_joblist)
    
    })
    .catch(() => {
console.log("something went wrong ")
    });
}
  render() {

    const { isLoggedIn, message } = this.props;

    return (
      <React.Fragment>

<section class="header container py-3 position-static">
    <img src={UClogo} alt="" class="img-fluid"/>
  </section>
  <section class="container pt-4 pt-md-5 pb-md-5 px-md-4">
    <h2 class="inner-header">AVP - Central Category Team - Appliance Repairs</h2>
    <p class="big">Gurgaon, Haryana</p>
  </section>
 <section class="container-fluid bg-gray mt-md-3">
     <div class="container apply-form-sec">
      <div class="row">
        <div class="col-lg-8">
          <div id="parentHorizontalTab">
          
            <div class="resp-tabs-container hor_1">
               
            
              <div>
           

                           

                           
                <div class="container bg-white rounded shadow my-md-4  px-0">
                  <h2 class="heading-text">Title:</h2>
                  <div class="container inner py-4">
                                <p>{this.state.filtered_joblist.job_title}</p>
                   
                  </div>
                  <h2 class="heading-text">Department:</h2>
                  <div class="container inner py-4">
                                <p>{this.state.filtered_joblist.department}</p>
                   
                  </div>


                  <h2 class="heading-text">Location:</h2>
                  <div class="container inner py-4">
                                <p>
                                {this.state.filtered_joblist.location}
                                </p>
                   
                  </div>

                  <h2 class="heading-text">Description:</h2>
                  <div class="container inner py-4">
                                <p>
                                {this.state.filtered_joblist.job_Description}
                                </p>
                   
                  </div>
                  <h2 class="heading-text">Experience Required:</h2>
                  <div class="container inner py-4">
                                <p>
                                {this.state.filtered_joblist.experience_from} to  {this.state.filtered_joblist.experience_to} years
                                </p>
                   
                  </div>
                 
                
                  
                  
                   
                  
                  
                  
                  
                  
                </div>
               
              </div>


            

            </div>
          </div>
        </div>
        <div class="col-lg-4 my-4 my-md-0">
          <div  >
        
           <a href={"https://careers.urbancompany.com/#jobs/"+this.state.job_id}> <button class="btn btn-primary-1 w-100" >Apply for this position
            </button></a>
          </div>
        </div>
      </div>
    </div>
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

export default connect(mapStateToProps)(careerFour);