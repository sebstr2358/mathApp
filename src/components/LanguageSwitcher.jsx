// src/components/LanguageSwitcher.jsx
import React, { useState } from "react";
import { useLanguage } from "../store/language-context";

const LanguageSwitcher = ({ onLanguageChange }) => {
	const { language, switchLanguage } = useLanguage();
	const [selectedLanguage, setSelectedLanguage] = useState(language);

	const handleChange = (event) => {
		setSelectedLanguage(event.target.value); // Ustawienie wybranego języka
	};

	const handleSubmit = () => {
		switchLanguage(selectedLanguage); // Zmiana języka w kontekście
		onLanguageChange(selectedLanguage); // Wywołanie funkcji po zatwierdzeniu języka
	};

	const containerClasses =
		"w-48 md:w-64 xl:80 absolute flex flex-col gap-2 justify-around items-center mb-5 px-8 pb-8 pt-6 rounded-xl border-2 border-solid border-black bg-stone-400 z-10";
	const selectClasses =
		"px-1 py-1 bg-stone-200 outline-none text-l focus:bg-stone-300 border-b border-b-solid border-b-stone-800 border-l border-l-solid border-l-stone-500"; // Twoje klasy CSS
	const buttonClasses =
		"px-2 md:px-6 py-1 md:py-3 mx-auto mt-6 bg-blue-500 rounded-md text-blue-300 hover:bg-blue-600 text-stone-200";

	return (
		<div className={containerClasses}>
			<label className="text-xl md:text-2xl lg:text-3xl">Wybierz język</label>
			<select
				value={selectedLanguage}
				onChange={handleChange}
				className={selectClasses}
			>
				<option value="pl">Polski</option>
				<option value="en">English</option>
			</select>
			<button className={buttonClasses} onClick={handleSubmit}>
				Zatwierdź
			</button>
		</div>
	);
};

export default LanguageSwitcher;
