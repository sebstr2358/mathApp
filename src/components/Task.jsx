import { useState } from "react";
import Button from "./Button";
import { useLanguage } from "../store/language-context";
import { translations_task } from "../constants/translations";

export default function Task({ task }) {
	const [showScore, setShowScore] = useState(false);

	const { language } = useLanguage();

	function handleShowScore() {
		setShowScore(true);
	}
	return (
		<div className="flex flex-col md:flex-row mb-4 md:mb-2 gap-1">
			<p key={task.text}>
				{task.number}. {task.text}
			</p>
			{showScore ? (
				<span className="ms-3 font-bold">
					{translations_task[language].span} {task.result}
				</span>
			) : (
				<Button onClick={handleShowScore}>
					{translations_task[language].answerButton}
				</Button>
			)}
		</div>
	);
}
