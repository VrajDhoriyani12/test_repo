import axios from "axios";
import EncryptionUtil from "./EncryptionUtils";

// admin APIs
export const adminApiHandlerWithoutToken = async (method, url, requestBody = {}) => {

  try {
    const baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`;
    const data = {
      method,
      url: baseURL,
      data: requestBody,
    };
    return axios(data)
      .then((response) => response)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    return error;
  }
};

export const adminApiHandler = async (method, url, requestBody = {}) => {
  var Token = localStorage.getItem('botSailorToken');
  try {
    const baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`;
    const data = {
      method,
      url: baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
      data: requestBody,
    };
    return axios(data)
      .then((response) => response)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   AdminRefreshTokenApi();
        // }
        return error;
      });
  } catch (error) {
    return error;
  }
};

export const adminApiHandlerWithFile = async (method, url, requestBody = {}) => {
  var Token = localStorage.getItem('botSailorToken');
  try {
    const baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`;
    const data = {
      method,
      url: baseURL,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
      data: requestBody,
    };
    return axios(data)
      .then((response) => response)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   AdminRefreshTokenApi();
        // }
        return error;
      });
  } catch (error) {
    return error;
  }
};


export const adminDownloadApiHandler = async (method, url, requestBody = {}) => {
  var AdminToken = EncryptionUtil.decryptionAES(localStorage.getItem('adminToken'));
  try {
    const baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`;
    const data = {
      method,
      url: baseURL,
      responseType: "blob",
      headers: {
        'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        Authorization: `Bearer ${AdminToken}`,
      },
      data: requestBody,
    };
    return axios(data)
      .then((response) => response)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   AdminRefreshTokenApi();
        // }
        return error;
      });
  } catch (error) {
    return error;
  }
};