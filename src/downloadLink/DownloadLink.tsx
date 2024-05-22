import { Link } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface Props  {
    href: string,
    name?: string
}

function DownloadLink({ href, name}: Props) {

    return (
        <Link download={name} href={`${href}`} color={'secondary.dark'}><DownloadIcon/></Link>
    )
}

export default DownloadLink;
