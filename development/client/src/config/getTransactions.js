// Header to include in all private request as a temp fix
// "Cookie": "access-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDYwOGRmYTFmODFlNzVmZDZlZDljZDciLCJpYXQiOjE2ODQwNzMyMTQsImV4cCI6MTY4NDI0NjAxNH0.uhmpoA7yF-pixBRj1Y_PRilI5t18i72ufU0_A0kXToI; Path=/; Expires=Tue, 16 May 2023 14:06:54 GMT; HttpOnly"

import axios from "axios";

export async function getTransactions() {
	let config_for_login = {
		method: "get",
		maxBodyLength: Infinity,
		url: "http://localhost:5000/transaction/history",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		withCredentials: true,
	};

	return axios
		.request(config_for_login)
        .then((response) => {
            console.log(response.data.data);
			return response.data.data;
		})
		.catch((error) => {
			// Handle error response from server
			throw error;
		});
}
