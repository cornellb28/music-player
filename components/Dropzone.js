import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useReqRest from "../hooks/useReqRest";
import { v4 as uuidv4 } from "uuid";

// Grabbing the Data from the mp3
const musicMetadata = require("music-metadata-browser");
function Dropzone() {
  const { insertArtists } = useReqRest();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "audio/*",
    minSize: 0,
    multiple: true,
    maxFiles: 50,
    onDrop: useCallback(async (acceptedFiles) => {
      const filesData = await Promise.all(
        acceptedFiles.map(async (file) => {
          let fileContents = {
            _id: uuidv4(),
            path: file.path,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
          };
          const meta = await musicMetadata.parseBlob(file);
          return { ...fileContents, ...meta.common };
        })
      );
      console.log(filesData);
      //insertArtists(filesData);
    }),
  });

  return (
    <div id="dropzone">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p className="uploader-text">
          Drag and Drop audio files here <br /> or click to select files
        </p>
      </div>
    </div>
  );
}

export { Dropzone };
