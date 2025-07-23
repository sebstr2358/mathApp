import { useState, useContext } from "react"; // Importujemy useContext
import LOG_OUT from "../assets/log-out-2355227_640.png";
import { Link } from "react-router-dom";
import { SectionContext } from "../store/login-data-context"; // Importuj kontekst
import { useLanguage } from "../store/language-context";
import { translations_logOut } from "../constants/translations";

export default function LogOutMenu() {
	const [showLogOutOption, setShowLogOutOption] = useState(false);
	const { user } = useContext(SectionContext); // Uzyskaj dostęp do user z kontekstu

	const { language } = useLanguage();

	function handleShowLogOut() {
		setShowLogOutOption(true);
	}

	function handleHideLogOut() {
		setShowLogOutOption(false);
	}

	return (
		<div className="mr-2 flex absolute end-0 py-1 lg:py-2">
			<div className="flex flex-col items-center gap-0 text-blue-300">
				{user && user.name ? ( // Warunek, aby sprawdzić obecność i wartość
					<>
						<p className="text-l">{user.name}</p>
						<span className="text-xs">{user.indeks}</span>
					</>
				) : (
					<p className="text-l">Użytkownik niezalogowany</p> // Informacja, gdy brak danych użytkownika
				)}
			</div>
			<Link to="/login">
				<button
					className="w-12 h-12 mt-1 flex flex-col items-center"
					onMouseOut={handleHideLogOut}
					onMouseOver={handleShowLogOut}
				>
					<img className="w-9 h-7" src={LOG_OUT} />
					{showLogOutOption && (
						<span className="text-[0.6rem] text-center">
							{translations_logOut[language].span}
						</span>
					)}
				</button>
			</Link>
		</div>
	);
}
