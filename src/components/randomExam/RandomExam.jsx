import CloseButton from "../CloseButton";
import { Link } from "react-router-dom";
import RandomSelectedExamTask from "./RandomSelectedExamTask";
import { useMathSections } from "../../store/math_section-context";
import { useLanguage } from "../../store/language-context";
import { translations_exam } from "../../constants/translations";

export default function RandomExam({ randomTopicId, randomTaskNumber }) {
	const { mathSections } = useMathSections();

	const { language } = useLanguage();

	return (
		<section className="relative h-max bg-stone-200 w-8/12 flex items-start justify-start mt-6 px-1.5">
			<div className="mt-6 px-2">
				<h2 className="my-4 text-xl text-stone-700">
					{translations_exam[language].h2}
				</h2>
				<ul className="list-decimal ms-6 px-4 py-2">
					{mathSections.map((section) => (
						<li key={section.id}>
							<RandomSelectedExamTask
								section={section}
								randomTopicId={randomTopicId}
								randomTaskNumber={randomTaskNumber}
							/>
						</li>
					))}
				</ul>
			</div>
			<Link to="/main">
				<CloseButton>{translations_exam[language].closeButton}</CloseButton>
			</Link>
		</section>
	);
}
