import { useContext } from "react";
import CheckingForm from "../components/CheckingForm";
import { SectionContext } from "../store/login-data-context";

export default function Login() {
	const { updateUser } = useContext(SectionContext); // Użyj kontekstu

	const handleUserLogin = (data) => {
		updateUser(data); // Zaktualizuj dane użytkownika
	};

	return <CheckingForm onUserLogin={handleUserLogin} />;
}
