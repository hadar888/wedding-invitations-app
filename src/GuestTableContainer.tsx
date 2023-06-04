import { useContext, useState } from "react";
import { Guest } from "./Models/GuestTableModel";
import { SelectChangeEvent } from "@mui/material";
import GuestTable from "./GuestTable";
import { AppContext } from "./AppContext";

const GuestTableContainer = () => {
    const { weddingInfo, setWeddingInfo } = useContext(AppContext);

    const handleRowUpdate = (index: number, updatedGuests: Guest[]) => {
        const isLastRow = index === updatedGuests.length - 1;
        const { name, gender, phoneNumber } = updatedGuests[index];
        const isRowEmpty = name === '' && gender === 'Other' && phoneNumber === '';

        if (isLastRow && !isRowEmpty) {
            updatedGuests.push({ name: '', gender: 'Other', phoneNumber: '' });
        }

        setWeddingInfo((prevInfo) => ({
            ...prevInfo,
            guests: updatedGuests,
        }));

        if (!isLastRow && isRowEmpty) {
            const filteredGuests = updatedGuests.filter((guest, idx) => idx !== index);
            setWeddingInfo((prevInfo) => ({
                ...prevInfo,
                guests: filteredGuests,
            }));
        }
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const updatedGuests = [...weddingInfo.guests];
        updatedGuests[index][name] = value;

        handleRowUpdate(index, updatedGuests);
    };

    const handleGenderChange = (index: number, event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        const updatedGuests = [...weddingInfo.guests];
        updatedGuests[index]['gender'] = value;

        handleRowUpdate(index, updatedGuests);
    };

    return (
        <GuestTable guests={weddingInfo.guests} handleInputChange={handleInputChange} handleGenderChange={handleGenderChange} />
    );
};

export default GuestTableContainer;