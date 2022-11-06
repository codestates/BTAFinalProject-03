import { JsonRpcProvider, Network } from "@mysten/sui.js";

const Home = () => {
  const provider = new JsonRpcProvider(Network.LOCAL);
  provider.getTransactionDigestsInRange(0, 10).then((res) => {
    const transactions = res;
    console.log(transactions);
  });
  return <>Home</>;
};

export default Home;
