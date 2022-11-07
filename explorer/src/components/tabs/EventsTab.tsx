import {JsonRpcProvider, Network} from "@mysten/sui.js";
import {useParams} from "react-router-dom";
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
            <div>
                <b><h2>Coin Balance Change</h2></b>
                <table>
                    <tr>
                        <td>Sender</td>
                        <td>
                            {
                                transactions &&
                                transactions.certificate &&
                                transactions.certificate.data &&
                                transactions.certificate.data.sender
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Balance Change Type</td>
                        <td>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[0] &&
                                transactions.effects.events[0].coinBalanceChange &&
                                transactions.effects.events[0].coinBalanceChange.changeType
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Coin Type</td>
                        <td>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[0] &&
                                transactions.effects.events[0].coinBalanceChange &&
                                transactions.effects.events[0].coinBalanceChange.coinType

                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Coin Object ID</td>
                        <td>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[0] &&
                                transactions.effects.events[0].coinBalanceChange &&
                                transactions.effects.events[0].coinBalanceChange.coinObjectId
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Version</td>
                        <td>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[0] &&
                                transactions.effects.events[0].coinBalanceChange &&
                                transactions.effects.events[0].coinBalanceChange.version
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Owner</td>
                        <td>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[0] &&
                                transactions.effects.events[0].coinBalanceChange &&
                                transactions.effects.events[0].coinBalanceChange.owner &&
                                transactions.effects.events[0].coinBalanceChange.owner.AddressOwner
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Amount</td>
                        <td>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[0] &&
                                transactions.effects.events[0].coinBalanceChange &&
                                transactions.effects.events[0].coinBalanceChange.amount
                            }
                        </td>
                    </tr>
                </table>
            </div>
            <div id="new_object_info">
                <b><h2>New Object</h2></b>
                <table>
                    <tr>
                        <td>Module</td>
                        <td>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[1] &&
                                transactions.effects.events[1].newObject &&
                                transactions.effects.events[1].newObject.transactionModule
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Sender, Recipient</td>
                        <td>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[1] &&
                                transactions.effects.events[1].newObject &&
                                transactions.effects.events[1].newObject.sender
                            } <span>→</span>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[1] &&
                                transactions.effects.events[1].newObject &&
                                transactions.effects.events[1].newObject.recipient &&
                                transactions.effects.events[1].newObject.recipient.AddressOwner
                            }
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <b><h2>Move Event</h2></b>
                <table>
                    <tr>
                        <td>Type</td>
                        <td>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[2] &&
                                transactions.effects.events[2].moveEvent &&
                                transactions.effects.events[2].moveEvent.type
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Sender</td>
                        <td>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[2] &&
                                transactions.effects.events[2].moveEvent &&
                                transactions.effects.events[2].moveEvent.sender
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>BCS</td>
                        <td>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[2] &&
                                transactions.effects.events[2].moveEvent &&
                                transactions.effects.events[2].moveEvent.bcs
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
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[2] &&
                                transactions.effects.events[2].moveEvent &&
                                transactions.effects.events[2].moveEvent.fields &&
                                transactions.effects.events[2].moveEvent.fields.creator
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[2] &&
                                transactions.effects.events[2].moveEvent &&
                                transactions.effects.events[2].moveEvent.fields &&
                                transactions.effects.events[2].moveEvent.fields.name
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>object_id</td>
                        <td>
                            {
                                transactions &&
                                transactions.effects &&
                                transactions.effects.events[2] &&
                                transactions.effects.events[2].moveEvent &&
                                transactions.effects.events[2].moveEvent.fields &&
                                transactions.effects.events[2].moveEvent.fields.object_id

                            }
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default EventsTab;