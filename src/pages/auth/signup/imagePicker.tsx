import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import {useState, useEffect} from "react";

interface PickerProps {
  image?: string | null;
  onChange: (params: any) => any;
}

const ImagePicker = ({image, onChange}: PickerProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(image);

  console.log({image});

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    // if (file.size > 1024) {
    //   alert("File size cannot exceed more than 1MB");
    // } else {
    if (input.files?.length) {
      setSelectedImage(input.files[0]);
      onChange(e);
    }
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
        <IconButton component="span">
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
