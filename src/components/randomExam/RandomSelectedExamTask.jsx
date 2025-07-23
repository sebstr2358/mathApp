import { useState } from "react";
import Button from "../Button";
import { useLanguage } from "../../store/language-context";
import { translations_examTask } from "../../constants/translations";

export default function RandomSelectedExamTask({ section, randomTopicId, randomTaskNumber }) {
	const [showTaskResult, setShowTaskResult] = useState(false);

	const chosenTask = section.topics
		.find((topic) => topic.id === parseFloat(`${section.id}.${randomTopicId}`))
		.tasks.find((task) => task.number === randomTaskNumber);

	const { language } = useLanguage();
	

	function handleShowResult() {
		setShowTaskResult(true);
	}
	return (
		<div className="flex flex-col gap-1 mb-6">
			<p>{chosenTask.text}</p>
			<p>
				{showTaskResult ? (
					<span className="ms-3 text-l font-bold">
						{translations_examTask[language].span} {chosenTask.result}
					</span>
				) : (
					<Button onClick={handleShowResult}>{translations_examTask[language].answerButton}</Button>
				)}
			</p>
		</div>
	);
}
