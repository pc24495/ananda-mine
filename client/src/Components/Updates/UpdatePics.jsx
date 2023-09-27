import classes from "./UpdatePics.module.scss";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "../../config/axiosConfig.js";
import Compressor from "compressorjs";
import { setPic1Url } from "../../../redux/slice.js";
import { useNavigate } from "react-router-dom";
// import axios from "../../config/axiosConfig.js";
// import { setPics } from "../../../redux/slice.js";

const UpdatePics = () => {
  const { handleSubmit, control } = useForm({
    pic1: null,
    pic2: null,
    pic3: null,
    pic4: null,
    pic5: null,
    pic6: null,
  });
  const [previewImages, setPreviewImages] = useState({});
  const [fileState, setFileState] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setPreviewImages({
      pic1: user.pic1Url,
      pic2: user.pic2Url,
      pic3: user.pic3Url,
      pic4: user.pic4Url,
      pic5: user.pic5Url,
      pic6: user.pic6Url,
    });
  }, []);

  const onSubmit = async (data) => {
    data = fileState;
    const formData = new FormData();

    // Append user id to FormData
    // formData.append("userId", "someUserId"); // Replace with actual user id

    // Append files to FormData
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    formData.append("token", token);

    // Send FormData with POST request
    await axios
      .patch("/user/pics-token", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        user.pic1Url = response.data.pic1Url;
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setPic1Url({ pic1Url: response.data.pic1Url }));
        navigate("/app/recs");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];

    if (file) {
      // Use CompressorJS to compress the file
      const fileSizeInMB = file.size / (1024 * 1024);
      const quality = 0.5 / fileSizeInMB;
      // const quality = 0.1;
      new Compressor(file, {
        quality: quality < 1 ? quality : 1,
        checkOrientation: false, // Compression quality, value should be between 0 and 1
        success: (compressedFile) => {
          // Create a FileReader to read the compressed file
          const reader = new FileReader();

          reader.onloadend = () => {
            // Set preview images
            setPreviewImages((prev) => ({
              ...prev,
              [name]: reader.result,
            }));
          };

          // Read compressed file
          reader.readAsDataURL(compressedFile);

          // Set file state
          setFileState((prev) => ({
            ...prev,
            [name]: compressedFile, // Use the compressed file
          }));
        },
        error(err) {
          console.error("CompressorJS Error:", err.message);
        },
      });
    }
  };

  return (
    <div className={classes.Update}>
      <div className={classes.UpdateInner}>
        <p>Add pictures</p>
        <div className={classes.PicsDiv}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.PicsInputsSection}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className={classes.PicDiv}>
                  <Controller
                    name={`pic${num}`}
                    control={control}
                    render={({ field }) => (
                      <div className={classes.PicDivInner}>
                        <label
                          className={classes.FileInputWrapper}
                          htmlFor={field.name}
                        >
                          {previewImages[field.name] ? (
                            <img
                              src={previewImages[field.name]}
                              alt={field.name}
                              className={classes.UploadedImage}
                            />
                          ) : (
                            <div className="plusSign">+</div>
                          )}
                        </label>
                        <input
                          {...field}
                          id={field.name}
                          className={classes.FileInput}
                          type="file"
                          onChange={(e) => {
                            handleFileChange(e, field.name);
                            field.onChange(e);
                          }}
                        />
                      </div>
                    )}
                  />
                </div>
              ))}
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePics;
