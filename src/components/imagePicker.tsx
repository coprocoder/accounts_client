import {useState, useEffect} from "react";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

interface PickerProps {
  disabled?: boolean;
  url?: string | null;
  onChange?: (params: any) => any;
}

const ImagePicker = ({disabled, url, onChange}: PickerProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(url);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    } else if (url != imageUrl) {
      setImageUrl(url);
    }
  }, [selectedImage, url]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      console.log(file.size);
      if (file.size > 2048 * 1024) {
        alert("File size cannot exceed more than 2MB");
      } else {
        setSelectedImage(input.files[0]);
        onChange && onChange(e);
      }
    }
  };

  return (
    <>
      <input
        disabled={disabled}
        accept="image/*"
        type="file"
        id="select-image"
        style={{display: "none"}}
        onChange={onSelectFile}
      />
      <label htmlFor="select-image">
        <IconButton disabled={disabled} component="span">
          <Avatar
            src={imageUrl || ""}
            style={{
              width: "8rem",
              height: "8rem",
            }}
          />
        </IconButton>
      </label>
    </>
  );
};
export default ImagePicker;
