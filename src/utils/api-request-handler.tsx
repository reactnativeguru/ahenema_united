import axios from 'axios';
import {API_ENDPOINTS} from '../api/wp';

type Config = {
  method: string;
  url: string;
  data?: object;
  headers?: object;
};

export const API_REQUEST_HANDLER = async (
  endpoint: string,
  method: string,
  body?: object,
  header?: object,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const CONFIG = {
        method: method,
        url: API_ENDPOINTS.BASE_URL.WP_BASE_URL_DEV + endpoint,
      } as Config;
      const HEADERS = header ? header : {'Content-Type': 'application/json'};
      if (body) {
        CONFIG.data = body;
      }
      CONFIG.headers = HEADERS;
      axios(CONFIG)
        .then(response => {
          console.log({apiRequestHandlerresponse: response.data});
          if (response) {
            if (response && response.status) {
              switch (response.status) {
                case 200:
                  return resolve(response.data);
                case 201:
                  return resolve(response.data);
                default:
                  return reject({status: response.status, data: response.data});
              }
            } else {
              reject({status: 404, message: 'No data found'});
            }
          } else {
            reject({status: 400, message: 'error'});
          }
        })
        .catch(error => {
          reject({
            status: 400,
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Error: Something went wrong!!',
          });
        });
    } catch (error) {
      reject({status: 400, message: error});
    }
  });
};
