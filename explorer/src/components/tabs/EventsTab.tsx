import {JsonRpcProvider, Network} from "@mysten/sui.js";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

/*
* sui devnet endpoint URI : https://fullnode.devnet.sui.io
*/
const provider = new JsonRpcProvider(Network.DEVNET);

const substitution = (txId: string): string => {
    return txId.replaceAll('!', '\/')
};

const EventsTab = () => {
    const txId = useParams();
    const jsonId = JSON.stringify(txId);
    const resultId = JSON.parse(jsonId);

    const [transactions, setTransactions] = useState<any>({});

    useEffect(() => {  // 마운트 하지 않아도 실행 하는 소스
        getTransaction(substitution(resultId.txId));
    }, [])

    const getTransaction = async (txId: string) => {
        const resultObj = await provider.getTransactionWithEffects(txId);
        const resultJson = JSON.stringify(resultObj);
        const parseResult = JSON.parse(resultJson);
        setTransactions(parseResult);
    }
    console.log(transactions);

    return (
        <div className="tab_info">
            {
                transactions &&
                transactions.effects &&
                transactions.effects.events &&
                transactions.effects.events.map((item: any) => {
                    if (item.coinBalanceChange) {
                        return (
                            <div>
                                <b><h2>Coin Balance Change</h2></b>
                                <table>
                                    <tr>
                                        <td>Sender</td>
                                        {
                                            transactions.certificate &&
                                            <Link to={'/get-addr/' + transactions.certificate.data.sender}
                                                  state={{addr: transactions.certificate.data.sender}}>
                                                <td>
                                                    {
                                                        transactions &&
                                                        transactions.certificate &&
                                                        transactions.certificate.data &&
                                                        transactions.certificate.data.sender
                                                    }
                                                </td>
                                            </Link>
                                        }
                                    </tr>
                                    <tr>
                                        <td>Balance Change Type</td>
                                        <td>
                                            {
                                                item &&
                                                item.coinBalanceChange &&
                                                item.coinBalanceChange.changeType
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Coin Type</td>
                                        <td>
                                            {
                                                item &&
                                                item.coinBalanceChange &&
                                                item.coinBalanceChange.coinType
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Coin Object ID</td>
                                        <Link to={'/get-obj/' + item.coinBalanceChange.coinObjectId}
                                              state={{objId: item.coinBalanceChange.coinObjectId}}>
                                            <td>
                                                {
                                                    item &&
                                                    item.coinBalanceChange &&
                                                    item.coinBalanceChange.coinObjectId
                                                }
                                            </td>
                                        </Link>
                                    </tr>
                                    <tr>
                                        <td>Version</td>
                                        <td>
                                            {
                                                item &&
                                                item.coinBalanceChange &&
                                                item.coinBalanceChange.version
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Owner</td>
                                        <Link to={'/get-addr/' + item.coinBalanceChange.owner.AddressOwner}
                                              state={{addr: item.coinBalanceChange.owner.AddressOwner}}>
                                            <td>
                                                {
                                                    item &&
                                                    item.coinBalanceChange &&
                                                    item.coinBalanceChange.owner &&
                                                    item.coinBalanceChange.owner.AddressOwner
                                                }
                                            </td>
                                        </Link>
                                    </tr>
                                    <tr>
                                        <td>Amount</td>
                                        <td>
                                            {
                                                item &&
                                                item.coinBalanceChange &&
                                                item.coinBalanceChange.amount
                                            }
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        )
                    } else if (item.mutateObject) {
                        return (
                            <div>
                                <b><h2>Mutate Object</h2></b>
                                <table>
                                    <tr>
                                        <td>Object Type</td>
                                        <td>
                                            {
                                                item &&
                                                item.mutateObject &&
                                                item.mutateObject.objectType
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Object ID</td>
                                        <td>
                                            <Link to={'/get-obj/' + item.mutateObject.objectId}
                                                  state={{objId: item.mutateObject.objectId}}>
                                                {
                                                    item &&
                                                    item.mutateObject &&
                                                    item.mutateObject.objectId
                                                }
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Version</td>
                                        <td>
                                            {
                                                item &&
                                                item.mutateObject &&
                                                item.mutateObject.version
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sender</td>
                                        <td>
                                            <Link to={'/get-addr/' + item.mutateObject.sender}
                                                  state={{addr: item.mutateObject.sender}}>
                                                {
                                                    item &&
                                                    item.mutateObject &&
                                                    item.mutateObject.sender
                                                }
                                            </Link>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        )
                    } else if (item.newObject) {
                        return (
                            <div>
                                <b><h2>New Object</h2></b>
                                <table>
                                    <tr>
                                        <td>Module</td>
                                        <td>
                                            {
                                                item &&
                                                item.newObject &&
                                                item.newObject.transactionModule
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sender, Recipient</td>
                                        <td>
                                            <Link to={'/get-addr/' + item.newObject.sender}
                                                  state={{addr: item.newObject.sender}}>
                                                {
                                                    item &&
                                                    item.newObject &&
                                                    item.newObject.sender
                                                }
                                            </Link>
                                            <span>→</span>
                                            <Link to={'/get-addr/' + item.newObject.recipient.AddressOwner}
                                                  state={{addr: item.newObject.recipient.AddressOwner}}>
                                                {
                                                    item &&
                                                    item.newObject &&
                                                    item.newObject.recipient &&
                                                    item.newObject.recipient.AddressOwner
                                                }
                                            </Link>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        )
                    } else if (item.moveEvent) {
                        return (
                            <div>
                                <b><h2>Move Event</h2></b>
                                <table>
                                    <tr>
                                        <td>Type</td>
                                        <td>
                                            {
                                                item &&
                                                item.moveEvent &&
                                                item.moveEvent.type
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sender</td>
                                        <Link to={'/get-addr/' + item.moveEvent.sender}
                                              state={{addr: item.moveEvent.sender}}>
                                            <td>
                                                {
                                                    transactions &&
                                                    transactions.effects &&
                                                    item &&
                                                    item.moveEvent &&
                                                    item.moveEvent.sender
                                                }
                                            </td>
                                        </Link>
                                    </tr>
                                    <tr>
                                        <td>BCS</td>
                                        <td>
                                            {
                                                item &&
                                                item.moveEvent &&
                                                item.moveEvent.bcs
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fields</td>
                                    </tr>
                                    <tr>
                                        <td>creator</td>
                                        <td>
                                            {
                                                item &&
                                                item.moveEvent &&
                                                item.moveEvent.fields &&
                                                item.moveEvent.fields.creator
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>name</td>
                                        <td>
                                            {
                                                item &&
                                                item.moveEvent &&
                                                item.moveEvent.fields &&
                                                item.moveEvent.fields.name
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>object_id</td>
                                        <td>
                                            {
                                                item &&
                                                item.moveEvent &&
                                                item.moveEvent.fields &&
                                                item.moveEvent.fields.object_id
                                            }
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

export default EventsTab;