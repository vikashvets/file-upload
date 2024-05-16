import FileList from "../fileList/FileList";
import {Dispatch, SetStateAction} from "react";

interface Props  {
    setSnackbarOption: Dispatch<SetStateAction<{}>>
}

function FileUploadHome({setSnackbarOption}: Props) {
    return (
        <>
            <FileList setSnackbarOption={setSnackbarOption}/>
        </>
    );
}

export default FileUploadHome;
