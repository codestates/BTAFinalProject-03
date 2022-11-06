const EventsTab = () => {
    return (
        <div className="tab_info">
            <div>
                <b><h2>Coin Balance Change</h2></b>
                <table>
                    <tr>
                        <td>Sender</td>
                        <td>Sender DATA</td>
                    </tr>
                    <tr>
                        <td>Balance Change Type</td>
                        <td>Balance Change Type DATA</td>
                    </tr>
                    <tr>
                        <td>Coin Type</td>
                        <td>Coin Type DATA</td>
                    </tr>
                    <tr>
                        <td>Coin Object ID</td>
                        <td>Coin Object ID DATA</td>
                    </tr>
                    <tr>
                        <td>Version</td>
                        <td>Version DATA</td>
                    </tr>
                    <tr>
                        <td>Owner</td>
                        <td>Owner DATA</td>
                    </tr>
                    <tr>
                        <td>Amount</td>
                        <td>Amount DATA</td>
                    </tr>
                </table>
            </div>
            <div id="new_object_info">
                <b><h2>New Object</h2></b>
                <table>
                    <tr>
                        <td>Module</td>
                        <td>Module DATA</td>
                    </tr>
                    <tr>
                        <td>Sender, Recipient</td>
                        <td>Sender, Recipient DATA</td>
                    </tr>
                </table>
            </div>
            <div>
                <b><h2>Move Event</h2></b>
                <table>
                    <tr>
                        <td>Type</td>
                        <td>Type DATA</td>
                    </tr>
                    <tr>
                        <td>Sender</td>
                        <td>Sender DATA</td>
                    </tr>
                    <tr>
                        <td>BCS</td>
                        <td>BCS DATA</td>
                    </tr>
                    <tr>
                        <td>Fields</td>
                        <td>Fields DATA</td>
                    </tr>
                    <tr>
                        <td>creator</td>
                        <td>creator DATA</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td>name DATA</td>
                    </tr>
                    <tr>
                        <td>object_id</td>
                        <td>object_id DATA</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default EventsTab;