import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {getFileList} from "../../api";
import {File} from "../../interfaces/File";
import FileCard from "../fileCard/FileCard";

interface Props  {
    setSnackbarOption: Dispatch<SetStateAction<{}>>
}

function FileList({ setSnackbarOption }: Props) {
    const [files, setFiles] = useState<File[] | null>(null);

    useEffect(() => {
        getFileList().then((response) => {
            setFiles(response.data);
        }).catch((error) => {
            setSnackbarOption({ snackbar: { open: true },  alert: { severity: 'error' }, content: error.message});
        });
    }, [setSnackbarOption]);

    return (
        <>
            {files && files.map((file: File) => (<FileCard file={file} key={file.id}/>))}
        </>
    );
}

export default FileList;
