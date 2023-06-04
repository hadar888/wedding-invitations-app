import React, { useContext, ChangeEvent } from "react";
import WordingBasicInfo from "./WordingBasicInfo";
import { AppContext } from "./AppContext";

const generateWazeLink = async (locationName: string) => {
    const encodedLocation = encodeURIComponent(locationName);
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodedLocation}&format=json&addressdetails=1&limit=1`
    );
    const data = await response.json();
    if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const encodedLabel = encodeURIComponent(display_name);
        console.log(`https://www.waze.com/ul?ll=${lat},${lon}&q=${encodedLabel}`);
        return `https://www.waze.com/ul?ll=${lat},${lon}&q=${encodedLabel}`;
    }
    return '';
};

const generateGoogleMapsLink = (weddingVenue: string) => {
    const baseUrl = 'https://www.google.com/maps/dir/?api=1&';
    const params = new URLSearchParams({
        destination: weddingVenue,
        travelmode: 'driving', // You can specify the travel mode: driving, walking, transit, or biking
    });

    return baseUrl + params.toString();
};

const WordingBasicInfoContainer = (): JSX.Element => {
    const { weddingInfo, setWeddingInfo } = useContext(AppContext);

    const handleWeddingDateChange = (date: Date | null) => {
        date && setWeddingInfo((prevInfo) => ({
            ...prevInfo,
            weddingDate: date,
        }));
    };

    const handleWeddingTimeChange = (date: Date | null) => {
        date && setWeddingInfo((prevInfo) => ({
            ...prevInfo,
            weddingTime: date,
        }));
    };

    const handleWeddingVenueChange = async (event: ChangeEvent<HTMLInputElement> | string) => {
        const weddingVenue = typeof (event) === "string" ? event : (event as ChangeEvent<HTMLInputElement>).target.value;
        const wazeLink = await generateWazeLink(weddingVenue);

        const googleMapsLink = await generateGoogleMapsLink(weddingVenue);
        setWeddingInfo((prevInfo) => ({
            ...prevInfo,
            weddingVenue: {
                name: weddingVenue,
                wazeLink: wazeLink,
                googleMapsLink: googleMapsLink,
            },
        }));
    };

    const handleRsvpDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setWeddingInfo((prevInfo) => ({
            ...prevInfo,
            rsvpDate: value,
        }));
    };

    const handleBrideAndGroomNamesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setWeddingInfo((prevInfo) => ({
            ...prevInfo,
            brideAndGroomNames: value,
        }));
    };

    return (
        <WordingBasicInfo
            weddingDate={weddingInfo.weddingDate}
            handleWeddingDateChange={handleWeddingDateChange}
            weddingTime={weddingInfo.weddingTime}
            handleWeddingTimeChange={handleWeddingTimeChange}
            weddingVenue={weddingInfo.weddingVenue}
            handleWeddingVenueChange={handleWeddingVenueChange}
            rsvpDate={weddingInfo.rsvpDate}
            handleRsvpDateChange={handleRsvpDateChange}
            brideAndGroomNames={weddingInfo.brideAndGroomNames}
            handleBrideAndGroomNamesChange={handleBrideAndGroomNamesChange}
        />
    );
};

export default WordingBasicInfoContainer;
