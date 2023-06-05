// Header to include in all private request as a temp fix

import axios from "axios";

export async function getUserinfo() {
	let data_for_login = JSON.stringify({
		email: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…M0N30.pOrJCNd1PGcye7sIDWlQwwgjlumPMkl86uR8VdiINis',
	  });
	let config_for_login = {
		method: "get",
		maxBodyLength: Infinity,
		url: "http://localhost:5000/user/info",
		headers: {
			"Content-Type": "application/json",
			"authorization": localStorage.getItem("token"),
		},
		credentials: "include",
		data: data_for_login,
		withCredentials: true,
		
	};

	return axios
		.request(config_for_login)
		.then((response) => {
		
			// Handle success response from server
			const defaultWalletObj = response.data.data.walletids.wallets.find(
				(wallet) => wallet.walletAddress === response.data.data.walletids.defaultwallet
			);
			const data = {
				name: response.data.data.name,
				age: response.data.data.age,
				defaultWalletObj: defaultWalletObj,
				wallets: response.data.data.walletids.wallets,
				banned: response.data.data.banned,
				flagged: response.data.data.flagged,
				isAdmin: response.data.data.isAdmin,	
			}
			return data;
		})
		.catch((error) => {
			// Handle error response from server
			throw error;
		});
}
