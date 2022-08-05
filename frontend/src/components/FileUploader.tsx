import { useRef } from "react";
import { Button } from "react-bootstrap";

const fileInputStyles = {
  display: "inline-block",
  marginBottom: "9px",
};

const thumbnailStyles = {
  display: "inline-block",
  marginBottom: "10px",
  overflow: "hidden",
  verticalAlign: "middle",
  maxWidth: "370px",
  maxHeight: "250px",
};

export const FileUploader = ({
  handleFile,
}: {
  handleFile: (fileUploaded: File) => void;
}) => {
  const hiddenFileInput = useRef<any>(null);

  const handleFileInputClick = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    hiddenFileInput.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = e?.target?.files![0];
    handleFile(fileUploaded);
  };

  return (
    <div>
      <div style={fileInputStyles} className="text-center">
        <div style={thumbnailStyles}>
          <img src="https://demos.creative-tim.com/paper-kit-pro/assets/img/image_placeholder.jpg" />
        </div>
      </div>

      <Button onClick={handleFileInputClick}>Upload File</Button>
      <input
        type="file"
        style={{ display: "none" }}
        ref={hiddenFileInput}
        onChange={handleFileInputChange}
      />
    </div>
  );
};
