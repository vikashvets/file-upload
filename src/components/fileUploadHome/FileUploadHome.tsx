import React from "react";
import FileList from "../fileList/FileList";
import {Dispatch, SetStateAction} from "react";
import {SnackbarConfig} from "../../interfaces/SnackbarConfig";

interface Props  {
    setSnackbarOption: Dispatch<SetStateAction<SnackbarConfig>>
}

function FileUploadHome({setSnackbarOption}: Props) {
    return (
        <>
            <FileList setSnackbarOption={setSnackbarOption}/>
        </>
    );
}

export default FileUploadHome;
