import { Link } from "react-router-dom";
import React, { useState } from "react";
import { checklogin } from "../config/login";
import { registerUser } from "../config/register";

const LoginPage = ({ register }) => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmpassword] = useState("");

	const [errors, setErrors] = useState("");

	const handleLogin = () => {
		checklogin(email, password)
			.then((data) => {
                console.log(data);
                window.location.replace("http://localhost:3000/");
                setErrors("");
			})
			.catch((error) => {
				console.error(error.response.data);
				setErrors(error.response.data.error[0]);
			});
	};

	const handleRegister = () => {
		registerUser(email, name, age, password, confirmpassword)
			.then((data) => {
                console.log(data);
                window.location.replace("http://localhost:3000/");
                setErrors("");
			})
			.catch((error) => {
				console.error(error.response.data.error);

				let errorElements = [];
				for (let prop in error.response.data.error[0]) {
					errorElements.push(
						<div key={prop}>{error.response.data.error[0][prop]}</div>
					);
				}
				setErrors(errorElements);
			});
	};

	return (
		<div className="">
			<div className="">
				<div className="">{register ? "Register" : "Login"}</div>

				{register && (
					<div className="">
						<label>Name</label>
						<input
							type="text"
							onChange={(e) => setName(e.target.value)}
						></input>
					</div>
				)}

				<div className="">
					<label> Email </label>
					<input
						type="text"
						onChange={(e) => setEmail(e.target.value)}
					></input>
				</div>

				{register && (
					<div className="">
						<label>Age</label>
						<input
							type="number"
							min="18"
							max="120"
							onChange={(e) => setAge(e.target.value)}
						/>
					</div>
				)}

				<div className="">
					<label> Password </label>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
					></input>
				</div>

				{register && (
					<div className="">
						<label>Confirm Password</label>
						<input
							type="password"
							value={confirmpassword}
							onChange={(e) => setConfirmpassword(e.target.value)}
						></input>
					</div>
				)}

				<div className="">
					{register ? (
						<Link
							className=""
							to={"../login"}
							onClick={() => setErrors("")}
						>
							Have an account
						</Link>
					) : (
						<Link
							className=""
							to={"../register"}
							onClick={() => setErrors("")}
						>
							New user/Register now
						</Link>
					)}
					{errors && <p className="">{errors}</p>}

					<button
						className=""
						onClick={register ? handleRegister : handleLogin}
					>
						{register ? "REGISTER" : "LOGIN"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
