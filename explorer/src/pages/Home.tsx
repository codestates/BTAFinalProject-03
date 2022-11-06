import {JsonRpcProvider, Network} from "@mysten/sui.js";
import {useNavigate, Link} from 'react-router-dom';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
    id: 'time' | 'type' | 'txId' | 'addr' | 'amt' | 'gas';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {id: 'time', label: 'Name', minWidth: 170},
    {id: 'type', label: 'TYPE', minWidth: 100},
    {
        id: 'txId',
        label: 'TRANSACTION ID',
        minWidth: 170
    },
    {
        id: 'addr',
        label: 'ADDRESSES',
        minWidth: 170
    },
    {
        id: 'amt',
        label: 'AMOUNT',
        minWidth: 170
    },
    {
        id: 'gas',
        label: 'GAS',
        minWidth: 170
    },
];

interface Data {
    time: string;
    type: string;
    txId: string;
    addr: string;
    amt: string;
    gas: string;
}

function createData(
    time: string,
    type: string,
    txId: string,
    addr: string,
    amt: string,
    gas: string,
): Data {
    return {time, type, txId, addr, amt, gas};
}

const substitution = (txId: string): string => {
    txId.replaceAll('\/', '!')
    return txId.replaceAll('\/', '!')
};

const rows = [
    createData('1s', 'Call', '/LYICDtQC+oXAjrQPIQR2GRP0/0ZVb0sEoieOW2O6E0=', '0x562e68a011bc3cd29b001962cd789809eea9c817', '--', '0.000001038SUI'),
];


const Home = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const navigate = useNavigate();
    // const onClick = (txId: string) => {
    //     navigate(`/get-tx/${substitution(txId)}`);
    // }
    // rows.map((row) => {
    //     if (row.txId.includes('/')){
    //         console.log("1")
    //         row.txId = substitution(row.txId)
    //         console.log(row.txId)
    //     }
    // })

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.txId}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                column.id == 'txId' ?
                                                    <Link to={'/get-tx/' + row.txId.replaceAll('\/', '!')} state={{txId: row.txId}}>
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    </Link>
                                                    :
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default Home;
