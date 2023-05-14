import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faSearch,
	faBriefcase,
	faExchangeAlt,
	faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router";

function Header() {
	const navigate = useNavigate();
	return (
		<Navbar
			bg="primary"
			expand="md"
			className="p-3"
		>
			<LinkContainer to="/">
				<Navbar.Brand className="text-light">
					<b>DigitalRush</b>
				</Navbar.Brand>
			</LinkContainer>
			<Navbar.Toggle aria-controls="navbar-nav" />
			<Navbar.Collapse id="navbar-nav">
				<Nav className="mx-auto">
					<LinkContainer to="/">
						<Nav.Link className="mx-3 text-light">
							<FontAwesomeIcon icon={faHome} /> Home
						</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/search">
						<Nav.Link className="mx-3 text-light">
							<FontAwesomeIcon icon={faSearch} /> Search
						</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/portfolio">
						<Nav.Link className="mx-3 text-light">
							<FontAwesomeIcon icon={faBriefcase} /> Portfolio
						</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/trade">
						<Nav.Link className="mx-3 text-light">
							<FontAwesomeIcon icon={faExchangeAlt} /> Trade
						</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/faq">
						<Nav.Link className="mx-3 text-light">
							<FontAwesomeIcon icon={faQuestionCircle} /> FAQ
						</Nav.Link>
					</LinkContainer>
				</Nav>
				<Nav>
					<LinkContainer to="/login">
						<Button variant="light">Log In</Button>
					</LinkContainer>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Header;
