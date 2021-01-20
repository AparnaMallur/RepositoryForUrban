import axios from "axios";


/*import * as globalSettings from './../globalSettings';

const API_URL = globalSettings.API_URL;*/


class AboutUsService {
 

    getJobList(unixtimestamp, hashcode) {
        
var uid=process.env.REACT_APP_UID
var url='https://integrations1.darwinbox.in/JobsApiv3/Joblist'
const dt = JSON.stringify({ Uid:uid,timestamp:unixtimestamp,hash:hashcode});
return axios.post(url, dt)
.then((response) =>{
  return response
});


    
  }

  getJobDetails(unixtimestamp, hashcode,jobId) {
        console.log("job details oooooo")
    var uid=process.env.REACT_APP_UID
    var url='https://integrations1.darwinbox.in/JobsApiv3/Jobdetail'
    const dt = JSON.stringify({ Uid:uid,timestamp:unixtimestamp,hash:hashcode,job_id: jobId });
    return axios.post(url, dt)
    .then((response) =>{
      return response
    });
    
    
        
      }


}

export default new AboutUsService();
