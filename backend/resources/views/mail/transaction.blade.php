<h1 style="color: green;">
    {{ $body['title']}}
</h1>
<div style="margin-bottom: 50;">
    Dear {{ $body['name'] }},<br/>
    The following transaction was made on your account
</div>

<table cellspacing="0" border="1" border-color="gray" cellpadding="20" style="
        display: table;
        width: 100%;
        border-color: gray;
        text-align: left;
        margin-top: 20px;
    ">
    <thead>
        <tr style="background-color: #333; color: white">
            <td colSpan="2" style="border: 1px solid gray; padding: 20px; font-weight: bold">
                Transaction Deatils
            </td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Order ID</th>
            <td>{{ $body['reference'] }}</td>
        </tr>
        <tr>
            <th>Price</th>
            <td>{{ $body['price'] }}</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>{{ $body['name'] }}</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>{{ $body['description'] }}</td>
        </tr>
        <tr>
            <th>Balance After</th>
            <td>{{ $body['balance'] }}</td>
        </tr>
    </tbody>
</table>

<p>
    <h3>
        If this was not initiated by not you, please contact us at: <br/>
        <a href="mailto:{{ env('MAIL_USERNAME') }}">{{ env('MAIL_USERNAME') }}</a>
    </h3>
</p>
