import { useForm } from "react-hook-form";
import MATH from "../assets/matematyka-300x300.jpg";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../store/language-context";
import LanguageSwitcher from "./LanguageSwitcher"; // Importuj komponent
import { translations_form } from "../constants/translations";
import { useEffect, useState } from "react";

export default function CheckingForm({ onUserLogin }) {
	const { language } = useLanguage(); // Uzyskaj aktualny język
	const navigate = useNavigate();
	const [formVisible, setFormVisible] = useState(false); // Stan do kontroli widoczności formularza

	const inputClasses =
		"px-1 py-1 bg-stone-200 outline-none text-l focus:bg-stone-300 border-b border-b-solid border-b-stone-500 border-l border-l-solid border-l-stone-500"; // Twoje klasy CSS

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	function onSubmit(data) {
		console.log("Dane przesyłane z formularza: ", data);
		onUserLogin(data); // Przechowaj dane użytkownika
		navigate("/main");
	}

	const handleLanguageChange = () => {
		setFormVisible(true); // Aktywuj formularz po zatwierdzeniu języka
	};

	return (
		<div
			style={{ perspective: "1000px" }}
			className="h-screen flex justify-center items-center bg-stone-500 px-4 py-4 relative"
		>
			{!formVisible && (
				<LanguageSwitcher onLanguageChange={handleLanguageChange} />
			)}

			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				style={{
					transform: !formVisible ? "rotateX(75deg)" : "rotateX(0deg)", // Zastosowanie transformacji
					transition: "transform 1.5s ease-in-out", // Dodaj płynne przejście
				}}
				className={`max-w-md rounded-xl flex flex-col px-10 py-1 pb-4 border-2 border-solid border-black bg-stone-400 ${
					formVisible ? "" : "opacity-20 perspective-near pointer-events-none" // Przyciemnij i zablokuj formularz
				}`}
			>
				<header className="mb-8 py-2 flex flex-col justify-center items-center">
					<div className="mb-2 flex items-center gap-2">
						<h1 className="text-2xl">{translations_form[language].header}</h1>
						<img className="w-24 h-16 rounded-xl" src={MATH} />
					</div>
					<p>{translations_form[language].welcome}</p>
				</header>
				<h2 className="text-xl mb-0 text-center uppercase">
					{translations_form[language].login}
				</h2>
				{/* Pozostała część formularza */}
				<label className="text-l mt-3" htmlFor="name">
					{translations_form[language].username}
				</label>
				<input
					{...register("name", {
						required: translations_form[language].usernameRequired,
						maxLength: {
							value: 5,
							message: translations_form[language].usernameMaxLength,
						},
					})}
					className={inputClasses}
					id="name"
				/>
				{errors.name && (
					<span className="text-red-600 text-xs">{errors.name.message}</span>
				)}
				<label className="text-l mt-3" htmlFor="email">
					{translations_form[language].email}
				</label>
				<input
					{...register("email", {
						required: translations_form[language].emailRequired,
						pattern: {
							value: /^[a-z0-9]+\.?[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
							message: translations_form[language].emailPattern,
						},
					})}
					className={inputClasses}
					id="email"
					type="email"
				/>
				{errors.email && (
					<span className="text-red-600 text-xs">{errors.email.message}</span>
				)}
				<label className="text-l mt-3" htmlFor="indeks">
					{translations_form[language].index}
				</label>
				<input
					{...register("indeks", {
						required: translations_form[language].indexRequired,
						pattern: {
							value: /^[0-9]{6}$/,
							message: translations_form[language].indexPattern,
						},
					})}
					className={inputClasses}
					id="indeks"
				/>
				{errors.indeks && (
					<span className="text-red-600 text-xs">{errors.indeks.message}</span>
				)}
				<button
					type="submit"
					className="mt-6 w-5/12 self-end py-1 rounded-md bg-stone-500 text-stone-100 hover:bg-stone-600 hover:text-stone-200"
					disabled={!formVisible} // Zablokuj przycisk, dopóki formularz jest niewidoczny
				>
					{translations_form[language].submit}
				</button>
			</form>
		</div>
	);
}
