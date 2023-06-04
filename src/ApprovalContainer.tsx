import { Grid, Link, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import { Guest } from "./Models/GuestTableModel";
import GuestTable from "./GuestTable";

interface ApprovalContainerProps {
    wording: string;
}

const ApprovalContainer = (props: ApprovalContainerProps) => {
    const { wording } = props;
    const { weddingInfo } = useContext(AppContext);

    const finelWording = wording
        .replace('[waze link]', 'WazeLink')
        .replace('[google maps link]', 'GoogleMapsLink');
    const beforeLinks = finelWording.split('WazeLink, GoogleMapsLink')[0];
    const afterLinks = finelWording.split('WazeLink, GoogleMapsLink')[1];

    return (
        <Grid container spacing={3}>
            <Grid item>
                <Typography variant="body1">
                    {beforeLinks}
                    <Link href={weddingInfo.weddingVenue.wazeLink}>waze link, </Link>
                    <Link href={weddingInfo.weddingVenue.googleMapsLink}>google maps link </Link>
                    <br />
                    {afterLinks}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <GuestTable guests={weddingInfo.guests.filter((guest)=>{return guest.phoneNumber !== ''})} />
            </Grid>
        </Grid>
    );
}

export default ApprovalContainer;