import { useParams } from "react-router-dom";

const GetTx = () => {
  const { txId } = useParams();

  return <>{txId}</>;
};

export default GetTx;
