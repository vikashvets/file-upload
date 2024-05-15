import {File} from "../../interfaces/File";
import {Card, CardActions, CardContent, Collapse, IconButton, Typography} from "@mui/material";
import {useState} from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DownloadIcon from '@mui/icons-material/Download';

interface Props  {
    file: File
}

function FileList({ file }: Props) {
    const [open, setOpen] = useState(false);

    return (
            <Card sx={{ minWidth: 275 }} key={file.id}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {file.fileName}
                    </Typography>
                    <Typography variant="body2">
                        {file.fileType}
                    </Typography>
                    <Typography variant="body2">
                        {file.fileSize}
                    </Typography>
                    <CardActions>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Typography variant="body2">
                                {file.compressedFileData ?
                                    'Compressed file is ready for download' :
                                    'Processing in progress: compressed file will be available for download soon.'}
                            </Typography>
                            <Typography variant="body2">
                                {file.compressedFileData ? file.compressedFileSize : 'Processing in progress: compressed file will be available for download soon.'}
                            </Typography>
                            {file.compressedFileData &&
                                <a download={file.fileName} href={`${file.compressedFileData}`}><DownloadIcon/></a>
                            }
                        </Collapse>
                    </CardActions>
                </CardContent>
            </Card>
    )
}

export default FileList;
