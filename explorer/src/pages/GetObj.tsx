import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Divider,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import DataObjectOutlinedIcon from "@mui/icons-material/DataObjectOutlined";
import { provider } from "../utils/SDK";

const Div = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const GetObj = () => {
  const objId = useParams();
  const jsonId = JSON.stringify(objId);
  const resultId = JSON.parse(jsonId);

  const [transactions, setTransactions] = useState<any>({});
  const [data, setData] = useState<any>(true);
  const isMounted = useRef(false);

  useEffect(() => {
    // 마운트 하지 않아도 실행 하는 소스
    getTransaction(resultId.objId);
  }, [resultId.objId]);

  useEffect(() => {
    if (isMounted.current) {
      setData(false);
    } else {
      isMounted.current = true;
    }
  }, [transactions]);

  const getTransaction = async (objId: string) => {
    const resultObj = await provider.getObject(objId);
    const resultJson = JSON.stringify(resultObj);
    const parseResult = JSON.parse(resultJson);
    setTransactions(parseResult);
  };

  return (
    <>
      {data && <LinearProgress />}

      <Div>
        <Typography variant="subtitle1" gutterBottom>
          <DataObjectOutlinedIcon sx={{ width: 15, height: 15 }} /> Object
        </Typography>
        <Typography variant="h5" gutterBottom>
          {transactions &&
            transactions.details &&
            transactions.details.data &&
            transactions.details.data.fields &&
            transactions.details.data.fields.id &&
            transactions.details.data.fields.id.id}
        </Typography>
        <Divider />
        <Box bgcolor="info" p={2}>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Description
          </Typography>
          <TableContainer>
            <Table sx={{ width: 1000 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="overline" display="block" gutterBottom>
                      Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" display="block" gutterBottom>
                      {transactions &&
                        transactions.details &&
                        transactions.details.data &&
                        transactions.details.data.type}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="overline" display="block" gutterBottom>
                      Object ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" display="block" gutterBottom>
                      {transactions &&
                        transactions.details &&
                        transactions.details.data &&
                        transactions.details.data.fields &&
                        transactions.details.data.fields.id &&
                        transactions.details.data.fields.id.id}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="overline" display="block" gutterBottom>
                      Last Transaction ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" display="block" gutterBottom>
                      {transactions &&
                        transactions.details &&
                        transactions.details.previousTransaction}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="overline" display="block" gutterBottom>
                      Version
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" display="block" gutterBottom>
                      {transactions &&
                        transactions.details &&
                        transactions.details.reference &&
                        transactions.details.reference.version}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="overline" display="block" gutterBottom>
                      Owner
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {transactions &&
                    transactions.details &&
                    transactions.details.owner &&
                    transactions.details.owner.Shared ? (
                      <span>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Shared
                        </Typography>
                      </span>
                    ) : (
                      <span>
                        {transactions &&
                          transactions.details &&
                          transactions.details.owner &&
                          transactions.details.owner.AddressOwner}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Typography variant="subtitle2" display="block" gutterBottom>
            Properties
          </Typography>
          <TableContainer>
            <Table sx={{ width: 1000 }} aria-label="simple table">
              <TableBody>
                {transactions &&
                  transactions.details &&
                  transactions.details.data &&
                  transactions.details.data.fields &&
                  transactions.details.data.fields.balance && (
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="overline"
                          display="block"
                          gutterBottom
                        >
                          Balance
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {transactions.details.data.fields.balance}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                {transactions &&
                  transactions.details &&
                  transactions.details.data &&
                  transactions.details.data.fields &&
                  transactions.details.data.fields.description && (
                    <TableRow>
                      <TableCell>description</TableCell>
                      <TableCell>
                        {transactions.details.data.fields.description}
                      </TableCell>
                    </TableRow>
                  )}
                {transactions &&
                  transactions.details &&
                  transactions.details.data &&
                  transactions.details.data.fields &&
                  transactions.details.data.fields.url && (
                    <TableRow>
                      <TableCell>url</TableCell>
                      <TableCell>
                        {transactions.details.data.fields.url}
                      </TableCell>
                    </TableRow>
                  )}
                {transactions &&
                  transactions.details &&
                  transactions.details.data &&
                  transactions.details.data.fields &&
                  transactions.details.data.fields.issued_counter && (
                    <TableRow>
                      <TableCell>issued_counter</TableCell>
                      <TableCell>
                        {transactions.details.data.fields.issued_counter}
                      </TableCell>
                    </TableRow>
                  )}
                {transactions &&
                  transactions.details &&
                  transactions.details.data &&
                  transactions.details.data.fields &&
                  transactions.details.data.fields.supply && (
                    <TableRow>
                      <TableCell>supply</TableCell>
                      <TableCell>
                        {transactions.details.data.fields.supply}
                      </TableCell>
                    </TableRow>
                  )}
                {transactions &&
                  transactions.details &&
                  transactions.details.data &&
                  transactions.details.data.fields &&
                  transactions.details.data.fields.network_first_day && (
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="overline"
                          display="block"
                          gutterBottom
                        >
                          network_first_day
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {transactions.details.data.fields.network_first_day}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Div>
    </>
  );
};

export default GetObj;
