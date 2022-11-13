import { provider } from "../utils/SDK";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

interface Column {
  id: "time" | "type" | "txId" | "addr" | "amt" | "gas";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface Row {
  time: string;
  type: string;
  txId: string;
  addr: string;
  amt: string;
  gas: string;
}

const columns: readonly Column[] = [
  { id: "time", label: "TIME", minWidth: 170 },
  { id: "type", label: "TYPE", minWidth: 100 },
  {
    id: "txId",
    label: "TRANSACTION ID",
    minWidth: 170,
  },
  {
    id: "addr",
    label: "ADDRESSES",
    minWidth: 170,
  },
  {
    id: "amt",
    label: "AMOUNT",
    minWidth: 170,
  },
  {
    id: "gas",
    label: "GAS",
    minWidth: 170,
  },
];

const Home = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
  };

  const handleClickRow = (row: Row, columnId: String) => {
    if (columnId === "txId") {
      navigate("/get-tx/" + row.txId.replaceAll("/", "!"));
    }
    if (columnId === "addr") {
      navigate("/get-addr/" + row.addr.replaceAll("/", "!"));
    }
  };

  useEffect(() => {
    async function getTxList() {
      const txTotalNumber = await provider.getTotalTransactionNumber();
      setTotalPages(Math.ceil(txTotalNumber / rowsPerPage));
      const tempTxIdList = await provider.getTransactionDigestsInRange(
        txTotalNumber - (page + 1) * rowsPerPage,
        txTotalNumber - (page + 1) * rowsPerPage + rowsPerPage
      );
      const tempTxList = await provider.getTransactionWithEffectsBatch(
        tempTxIdList
      );

      const currentTime = new Date().getTime();
      const tempRows = tempTxList.reverse().map((tx) => ({
        time: !!tx.timestamp_ms
          ? `${((currentTime - tx.timestamp_ms) / 1000).toFixed(2).toString()}s`
          : "--",
        type: !!tx.certificate.data.transactions[0]
          ? Object.keys(tx.certificate.data.transactions[0])[0]
          : "--",
        txId: !!tx.certificate.transactionDigest
          ? tx.certificate.transactionDigest
          : "--",
        addr: !!tx.certificate.data.sender ? tx.certificate.data.sender : "--",
        amt: "--",
        gas: !!tx.effects.events
          ? `${Number.parseFloat(
              (
                Math.abs(tx.effects.events[0].coinBalanceChange.amount) *
                0.000000001
              ).toString()
            ).toFixed(9)} sui`
          : "--",
      }));

      setRows(tempRows);
    }
    getTxList();
  }, [page, rowsPerPage]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.txId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        onClick={() => handleClickRow(row, column.id)}
                        style={{
                          cursor:
                            column.id === "txId" || column.id === "addr"
                              ? "pointer"
                              : "",
                          color:
                            column.id === "txId" || column.id === "addr"
                              ? "rgb(31 100 147)"
                              : "",
                        }}
                      >
                        {column.format && typeof value === "number"
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
        count={totalPages}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Home;
