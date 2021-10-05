import { useState, useEffect } from "react";
import axios from "axios";

// Helpers
// const FormData = require("form-data");
// const fs = require("fs");

// Loading Status
export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const restUrl = "api/artists";

export default function useReqRest() {
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function timeDelay() {
      try {
        const result = await axios.get(restUrl);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setData(result.data);
      } catch (error) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        setError(error);
      }
    }
    timeDelay();
  }, []);

  async function insertArtists(uploadedArtists, doneCallback) {
    const originalArtists = [...data];
    const newArtists = [...uploadedArtists, ...data];
    const uniqueData = [...new Set(newArtists)];
    async function timeDelay() {
      try {
        setData(uniqueData);
        
        await delay(1000);
      } catch (error) {
        console.log("error thrown inside delayFunction", error);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalArtists);
      }
    }
    timeDelay();
  }

  return {
    data,
    requestStatus,
    error,
    insertArtists,
  };
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500mb",
    },
  },
};
