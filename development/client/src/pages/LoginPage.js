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
				localStorage.setItem("token", data.data.token);
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
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">
								{register ? "Register" : "Login"}
							</h5>

							{register && (
								<div className="mb-3">
									<label
										htmlFor="name"
										className="form-label"
									>
										Name
									</label>
									<input
										type="text"
										id="name"
										className="form-control"
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
							)}

							<div className="mb-3">
								<label
									htmlFor="email"
									className="form-label"
								>
									Email
								</label>
								<input
									type="text"
									id="email"
									className="form-control"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							{register && (
								<div className="mb-3">
									<label
										htmlFor="age"
										className="form-label"
									>
										Age
									</label>
									<input
										type="number"
										id="age"
										className="form-control"
										min="18"
										max="120"
										onChange={(e) => setAge(e.target.value)}
									/>
								</div>
							)}

							<div className="mb-3">
								<label
									htmlFor="password"
									className="form-label"
								>
									Password
								</label>
								<input
									type="password"
									id="password"
									className="form-control"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							{register && (
								<div className="mb-3">
									<label
										htmlFor="confirmPassword"
										className="form-label"
									>
										Confirm Password
									</label>
									<input
										type="password"
										id="confirmPassword"
										className="form-control"
										value={confirmpassword}
										onChange={(e) =>
											setConfirmpassword(e.target.value)
										}
									/>
								</div>
							)}

							<div className="mb-3">
								{register ? (
									<Link
										className="btn btn-link"
										to={"../login"}
										onClick={() => setErrors("")}
									>
										Have an account
									</Link>
								) : (
									<Link
										className="btn btn-link"
										to={"../register"}
										onClick={() => setErrors("")}
									>
										New user/Register now
									</Link>
								)}
							</div>

							{errors && <p className="text-danger">{errors}</p>}

							<button
								className="btn btn-primary"
								onClick={register ? handleRegister : handleLogin}
							>
								{register ? "REGISTER" : "LOGIN"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
