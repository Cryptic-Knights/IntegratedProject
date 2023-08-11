import axios from "axios";

export function send(senderWallet, recieverWallet, amount) {
	let data_for_login = JSON.stringify({
		senderWallet: senderWallet,
        recieverWallet: recieverWallet,
        amount: amount,
            coinId: 'BTC',
            coinName: 'bitcoin',
	});

	let config_for_login = {
		method: "post",
		maxBodyLength: Infinity,
		url: "http://localhost:5000/transaction/send",
		headers: {
			"Content-Type": "application/json",
			"authorization": localStorage.getItem("token"),
		},
        credentials: "include",
        withCredentials: true,
		data: data_for_login,
	};

	return axios
		.request(config_for_login)
		.then((response) => {
			// Handle success response from server
			return response.data;
		})
		.catch((error) => {
			// Handle error response from server
			throw error;
		});
}
