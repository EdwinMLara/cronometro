import React from 'react'
import axios from 'axios'

const Response = {
    control1:0,
    tempo:{
      cTA:0,
      cTE:0,
      state:0,
      time:0
    }
}

const Request = {
    url:'http://192.168.69.93/',
    bodyRequest:{
        control:'1100',
        cT:3216,
        des:5
    },
    requestAxios : async (url,body) => {
        let confBodyRequest = (body === undefined) ?
            {
                method:'GET',
                url:url,
                timeout:5000,
            } : 
            {
                method:'POST',
                url:url,
                data:body,
                headers:{
                    'Content-type': 'text/plain'
                },
                timeout:5000,
            }
        result = await axios(confBodyRequest)
            .then(response => {
                return response.data;
            })
            .catch(error =>{
                console.log(error);
                throw error;
            });
        return result;
    } 
}

const State = {
    loading:false,
    logging:false,
    seconds2Time : (seconds) => {
        let hours = Math.floor(seconds/3600);
        let min = Math.floor((seconds - (hours * 3600)) / 60);
        let sec = seconds - (hours * 3600) - (min * 60);
        if (hours   < 10) {hours   = "0"+hours;}
        if (min < 10) {min = "0" + min;}
        if (sec < 10) {sec = "0" + sec;}
        return hours+':'+min+':'+sec;
    },
    defase:0
}

export const appStateContext = {
    appResponse:Response,
    appRequest:Request,
    appState:State
}

export const Context = React.createContext();
