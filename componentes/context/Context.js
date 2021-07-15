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
                return error;
            });
        return result;
    } 
}

const State = {
    loading:false,
    logging:false
}

export const appStateContext = {
    appResponse:Response,
    appRequest:Request,
    appState:State
}

export const Context = React.createContext();
