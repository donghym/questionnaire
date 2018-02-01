import axios from 'axios'
import qs from 'qs'

// export const getquestion = (json) =>new axios.get("/api/questionlist",{'params':json});// -列表
export const getquestion = (json) =>new axios.get("/api/questionlist");
// document.cookie = 'PHPSESSID=30hmb2l2rru82nsqb3ka5fedp3; LoginSystemCookie=1; LoginNameCookie=demo; OrgCodeCookie=%28default%29%40001';

// export const getquestion    = (json) =>new axios.get("/api/test1.php?dbname=UFDATA_001_2017");// -列表
// 发送数据
// export const submitquestion = (json) =>new axios.post("/api/test1.php?dbname=UFDATA_001_2017",qs.stringify(json));// -列表
