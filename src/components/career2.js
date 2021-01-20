import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link, NavLink } from "react-router-dom";

import { connect } from "react-redux";

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

import UClogo from './../assets/images/logo.png'

import linkArrow from './../assets/images/btn-link-arrow.png'

import downarrow from './../assets/images/downarrow.png'
import { ConsoleWriter } from "istanbul-lib-report";


class careerTwo extends Component {

  constructor(props) {
    super(props);
    
    this.submitClick = this.submitClick.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.searchJobs=this.searchJobs.bind(this);
    this.searchAllJobs=this.searchAllJobs.bind(this);
    this.state = {
        joblist:[],
        dept_selected:'',
        location_selected:'',
        filtered_joblist:[],
        viewAll:false,
    };
    if(props.match.params.Dept && typeof props.match.params.Dept !=="undefined" && props.match.params.Dept!==""){
      this.state.dept_selected = props.match.params.Dept;
console.log("param 1 present")
     
    }
    
    if(props.match.params.location && typeof props.match.params.location !=="undefined" && props.match.params.location!==""){
      this.state.location_selected = props.match.params.location;
      console.log("param 2 present")
     
    }
if(typeof props.match.params.location =="undefined" && typeof props.match.params.dept =="undefined"){
  this.state.viewAll=true
}
    console.log("param1")
    console.log(props.match.params.Dept)
    console.log("param2")
    console.log(props.match.params.location)
  }
  
  componentDidMount() {
var payload = JSON.parse(localStorage.getItem("joblist_payload"));
  
  console.log("localstorage prnting")
  if (payload) {
    this.setState({
        joblist: payload
    },() => {
      if(this.state.viewAll==true){
this.searchAllJobs()
      }else{
      this.searchJobs() }
    });
  }
  
  }
  searchAllJobs(){
    console.log("searchAllJobs")
    this.setState({
      filtered_joblist:this.state.joblist
    });
  }
  searchJobs(){
    console.log("search cald from")
    console.log(this.state.joblist.length)
    var dept=this.state.dept_selected
    var location=this.state.location_selected
    console.log("loc sele")
    console.log(this.state.location_selected)
    
        //console.log(event.target.value)
        let data=[];
         data = this.state.joblist.filter(function(item){
         //  console.log("filter")
         //  console.log(item.department)
          // console.log(dept)
          // console.log(item.location_city)
           if(dept=="-1"){
            return ( item.location_city.indexOf(location)>-1)  ;
           }else if(location=="-1"){
            return item.department == dept   ;
           }else{
           
            return (item.department == dept && item.location_city.indexOf(location)>-1)  ;
           }
       }).map(function({department,job_title,location_city,job_id}){
       
           return {department,job_title,location_city,job_id};
      
         
       });
       console.log("The list of data is ")
       console.log(data)
       this.setState({
        filtered_joblist:data
      });
  }
  submitClick=( ) =>{
     this.searchJobs()

  
  }
  onchangeLocation=(event ) =>{
      console.log("The locationn selecte di")
      console.log(event.target.value)
    this.setState({
        location_selected:event.target.value
    });
  }
  onchangeDepartment=(event ) =>{
    console.log(event.target.value)
   
   

   this.setState({
    
    dept_selected:event.target.value
  });
  }
  handleApply(job_id) {
      console.log("demo");
      //alert("job_id: ");
      //alert(job_id);
     console.log("The job id is")
     console.log(job_id)
     window.location.replace("/jobDetails/"+job_id );
    //alert("dfdf");
  }

  _getUniqueLocationName() {
    var a = [];
    var citylist=[];
    this.state.joblist.forEach(function(obj){
        
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
    const dept = this.state.joblist;
    const Departmentunique = [...new Set(dept.map(item => item.department))];
    console.log("Departmentunique careeer")
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

<section class="header container py-3">
        <img src={UClogo} alt="" class="img-fluid"/>
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
      <h3>Open <br></br>Positions</h3>
    
      <select name="cars" className="form-control d-inline-block mb-2 mb-md-0" value={this.state.dept_selected} onChange={this.onchangeDepartment}>
        <option value="-1">Filter by department</option>
        {DepartmentName}
      </select>
      <select name="cars" className="form-control d-inline-block" value={this.state.location_selected} onChange={this.onchangeLocation}>
        <option value="-1">Filter by location</option>
        {LocationName}
      </select>
     
      <button type="button" className="btn btn-primary d-inline-block" onClick={ this.submitClick}>Submit </button>
      <button type="button" className="btn btn-link d-inline-block">View All <img src={linkArrow} alt=""/></button>
    </div>
  </section>
  <section class="positionBox-row container py-5 position-relative">
        <div class="flex ">
            
        {this.state.filtered_joblist.length > 0 && this.state.filtered_joblist &&
                                this.state.filtered_joblist.map((itemcatFilter,k) => (

                                    <div className="white-boxes shadow">
                                       
                                    <h2>{itemcatFilter.job_title}</h2>
                                    <p>{itemcatFilter.location_city.location_city}</p>
                                    <p>{itemcatFilter.job_id}</p>
                                    <a class="btn btn-primary" onClick={() => this.handleApply(itemcatFilter.job_id)}>Apply</a>
                                </div>

                            ))}


            


            
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

export default connect(mapStateToProps)(careerTwo);