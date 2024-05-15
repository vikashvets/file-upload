import FileUploadForm from "../fileUploadForm/FileUploadForm";
import FileList from "../fileList/FileList";
import {Dispatch, SetStateAction} from "react";

interface Props  {
    setSnackbarOption: Dispatch<SetStateAction<{}>>
}

function FileUploadHome({setSnackbarOption}: Props) {
    return (
        <>
            <FileUploadForm setSnackbarOption={setSnackbarOption}/>
            <FileList setSnackbarOption={setSnackbarOption}/>
        </>
    );
}

export default FileUploadHome;
