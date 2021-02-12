import Axios from "axios";
import React from "react";
import Resizer from "react-image-file-resizer";

const FileUpload = ({ images, setImages, setLoading, setOk }) => {
  const fileUploadAndResize = async (e) => {
    //   console.log(e.target.files);
    // resize
    let files = e.target.files;
    let allUploadedFiles = images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        await Resizer.imageFileResizer(
          files[i],
          300,
          300,
          "JPEG",
          100,
          0,
          async (uri) => {
            // console.log(uri);
            await Axios.post(`${process.env.REACT_APP_API}/uploadimages`, {
              image: uri,
            })
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                setOk(true);
                allUploadedFiles.push(res.data);
                setImages(allUploadedFiles);
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERROR", err);
              });
          },
          "base64"
        );
      }
    }
  };

  return (
    <>
      <label
        style={{
          backgroundColor: "#e87524",
          color: "white",
          marginRight: "1rem",
        }}
        className="btn btn-raised "
      >
        Choisir des Images
        <input
          style={{ width: "50%", height: "50px" }}
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </label>
    </>
  );
};

export default FileUpload;
