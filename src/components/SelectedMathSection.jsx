import { Link } from "react-router-dom";
import CloseButton from "./CloseButton";
import Topic from "./Topic";
import { useLanguage } from "../store/language-context";
import { translations_selectedSection } from "../constants/translations";

export default function SelectedMathSection({ section, sectionName }) {

	const { language } = useLanguage();

	return (
		<section className="relative flex flex-col-reverse md:flex-row w-8/12 h-max py-4 px-1.5 justify-center md:justify-start md:ms-4 items-start bg-stone-200">
			<div className="mt-6 px-2">
				<h2 className="text-xl uppercase text-stone-700 my-4">
					{section.title}
				</h2>
				<ul className="list-disc ms-6">
					{section.topics.map((topic) => (
						<li key={topic.id}>
							<Topic topic={topic} sectionName={sectionName} />
						</li>
					))}
				</ul>
			</div>
			<Link to="/main">
				<CloseButton>{translations_selectedSection[language].closeButton}</CloseButton>
			</Link>
		</section>
	);
}
