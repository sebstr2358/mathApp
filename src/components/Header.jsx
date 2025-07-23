import NOTEBOOK from "../assets/no-projects.png";
import { Link } from "react-router-dom";
import { useLanguage } from "../store/language-context";
import { translations_header } from "../constants/translations";
export default function Header() {
	const { language } = useLanguage();

	return (
		<div className="flex flex-col items-center justify-stretch gap-2 w-8/12 px-4 mt-8">
			<div className="flex flex-col items-center mb-4">
				<img src={NOTEBOOK} className="w-32 h-32" alt="An empty notebook" />
				<p className="mt-2">{translations_header[language].firstParagraph}</p>
				<p>{translations_header[language].secondParagraph}</p>
			</div>
			<Link to="/main/exam">
				<button className="px-4 py-2 bg-blue-400 rounded-md text-blue-100 hover:bg-blue-600 text-stone-200">
					{translations_header[language].sheetButton}
				</button>
			</Link>
		</div>
	);
}
