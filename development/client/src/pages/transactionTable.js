import React from "react";

export const TransactionTable = ({ transactions }) => {
	return (
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Transaction ID</th>
					<th>Date</th>
					<th>From</th>
                    <th>To</th>
                    <th>CoinName</th>
                    <th>Amount</th>
                    <th>Status</th>
				</tr>
			</thead>
			<tbody>
				{transactions.map((transaction) => (
					<tr key={transaction._id}>
						<td>{transaction._id}</td>
						<td>{transaction.createdAt}</td>
                        <td>{transaction.from.walletId}</td>
                        <td>{transaction.to.walletId}</td>
                        <td>{transaction.item.coinName}</td>
                        <td>{transaction.item.coinQuantity.$numberDecimal}</td>
                        <td>{transaction.status}</td>

					</tr>
				))}
			</tbody>
		</table>
	);
};
