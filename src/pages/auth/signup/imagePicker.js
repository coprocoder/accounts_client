import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import {useState, useEffect} from "react";

const ImagePicker = ({onChange}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const onSelectFile = (e) => {
    // if (file.size > 1024) {
    //   alert("File size cannot exceed more than 1MB");
    // } else {
    setSelectedImage(e.target.files[0]);
    onChange(e);
    // }
  };

  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{display: "none"}}
        onChange={onSelectFile}
      />
      <label htmlFor="select-image">
        <IconButton variant="contained" component="span">
          <Avatar
            src={imageUrl || ""}
            style={{
              width: "5em",
              height: "5em",
            }}
          />
        </IconButton>
      </label>
    </>
  );
};

export default ImagePicker;
