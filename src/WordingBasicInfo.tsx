import { Grid, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import LocationMap from "./LocationMap";
import { useState } from "react";
import { WeddingInfoLocation } from "./Models/WeddingInfo";

interface WordingBasicInfoProps {
  weddingDate: Date;
  handleWeddingDateChange: (date: Date | null) => void;
  weddingTime: Date;
  handleWeddingTimeChange: (date: Date | null) => void;
  weddingVenue: WeddingInfoLocation;
  handleWeddingVenueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rsvpDate: string;
  handleRsvpDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  brideAndGroomNames: string;
  handleBrideAndGroomNamesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const WordingBasicInfo = (props: WordingBasicInfoProps) => {
  const { weddingDate, handleWeddingDateChange, weddingTime, handleWeddingTimeChange,
    weddingVenue, handleWeddingVenueChange, rsvpDate, handleRsvpDateChange, brideAndGroomNames,
    handleBrideAndGroomNamesChange } = props;

  const [isweddingVenueLoading, setIsweddingVenueLoading] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Wedding Details</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Wedding Date"
            className="datepicker"
            value={dayjs(weddingDate) as any}
            onChange={handleWeddingDateChange}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Wedding Time"
            className="datepicker"
            value={dayjs(weddingTime) as any}
            onChange={handleWeddingTimeChange}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Wedding Venue"
          value={isweddingVenueLoading ? "Loading..." : weddingVenue.name}
          onChange={handleWeddingVenueChange}
          disabled={isweddingVenueLoading}
          fullWidth
        />
        <LocationMap
          weddingVenue={weddingVenue.name}
          setWeddingVenue={handleWeddingVenueChange}
          setIsweddingVenueLoading={setIsweddingVenueLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">RSVP Details</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="RSVP Date"
          value={rsvpDate}
          onChange={handleRsvpDateChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Bride and groom Names"
          value={brideAndGroomNames}
          onChange={handleBrideAndGroomNamesChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

export default WordingBasicInfo;