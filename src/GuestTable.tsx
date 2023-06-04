import { MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { Guest } from "./Models/GuestTableModel";

interface GuestTableProps {
    guests: Guest[];
    handleInputChange?: (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleGenderChange?: (index: number, event: SelectChangeEvent<string>) => void;
}

const GuestTable = (props: GuestTableProps) => {
    const { guests, handleInputChange, handleGenderChange } = props;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Phone Number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {guests.map((guest, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {
                                    handleInputChange ?
                                        <TextField
                                            name="name"
                                            value={guest.name}
                                            onChange={(event) => handleInputChange(index, event)}
                                            fullWidth
                                        /> :
                                        <Typography>
                                            {guest.name}
                                        </Typography>
                                }
                            </TableCell>
                            <TableCell>
                                {handleGenderChange ?
                                    <Select
                                        name="gender"
                                        value={guest.gender}
                                        onChange={(event) => handleGenderChange(index, event)}
                                        fullWidth
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select> :
                                    <Typography>
                                        {guest.gender}
                                    </Typography>
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    handleInputChange ?
                                        <TextField
                                            name="phoneNumber"
                                            value={guest.phoneNumber}
                                            onChange={(event) => handleInputChange(index, event)}
                                            fullWidth
                                        /> :
                                        <Typography>
                                            {guest.phoneNumber}
                                        </Typography>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GuestTable;