import { Grid, TextField } from "@mui/material";
import { ChangeEventHandler, useContext } from "react";
import { AppContext } from "./AppContext";

interface WordingContainerProps {
    initialWordingValue: string;
    hanldeWordingChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const WordingContainer = (props: WordingContainerProps) => {
    const { initialWordingValue, hanldeWordingChange } = props;
    const { weddingInfo } = useContext(AppContext);

    return (
        <Grid item xs={12}>
            <TextField
                multiline
                rows={9}
                defaultValue={initialWordingValue}
                fullWidth
                onChange={hanldeWordingChange}
            />
            <a
                href={weddingInfo.weddingVenue.wazeLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                {"waze link"}
            </a>
            {
                " "
            }
            <a
                href={weddingInfo.weddingVenue.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                {"google map link"}
            </a>
        </Grid>
    );
}

export default WordingContainer;