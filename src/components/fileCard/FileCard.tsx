import {File} from "../../interfaces/File";
import {Box, Card, CardContent, Collapse, Divider, Grid, IconButton, Typography} from "@mui/material";
import {useState} from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DownloadIcon from '@mui/icons-material/Download';

interface Props  {
    file: File
}

function FileList({ file }: Props) {
    const [open, setOpen] = useState(false);
    const propsToDisplay = ['fileType', 'fileSize', 'compressRatio'];

    return (
        <Card
            key={file.id}
            sx={{borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.1)'}}
        >
            <Typography fontWeight={'600'} textTransform={'capitalize'} pt='2' fontSize='xs' padding={2}>
                {file.fileName}
            </Typography>
            <CardContent>
                <Grid
                    gridTemplateColumns={'repeat(auto-fill, minmax(100px, 1fr))'}
                    gap={2}
                >
                    <Box padding={'0px 8px 24px 8px'}>
                    {propsToDisplay.filter(prop => prop !== "name").map((item:string) => (
                        <Box key={item} alignItems={'center'} display={'flex'}>
                            <Typography fontWeight={'600'} textTransform={'capitalize'} key={item} pt='2' fontSize='xs'>
                                {`${item}:`}
                            </Typography>
                            <Typography paddingLeft={1} pt='2' fontSize='xs' fontWeight={'200'}>
                                {/*@ts-ignore*/}
                                { file[item]}
                            </Typography>
                        </Box>
                    ))}
                    </Box>
                    <Divider/>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start'}}>
                        <Collapse in={open} timeout="auto" unmountOnExit sx={{padding: '16px 8px 0px 8px'}}>
                            <Typography variant="body2">
                                {file.compressedFileData ?
                                    `Compressed file is ready for download, compressed file size - ${file.compressedFileSize}` :
                                    'Processing in progress: compressed file will be available for download soon.'}
                            </Typography>
                            {file.compressedFileData &&
                                <a download={file.fileName} href={`${file.compressedFileData}`}><DownloadIcon/></a>
                            }
                        </Collapse>
                        <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    </Box>
                </Grid>
            </CardContent>
        </Card>)
}

export default FileList;
