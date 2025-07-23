import { useState } from "react";
import { Link } from "react-router-dom";
import Task from "./Task";
import { useLanguage } from "../store/language-context";
import { translations_topic } from "../constants/translations";
export default function Topic({ topic, sectionName }) {
	const [showTasks, setShowTasks] = useState(false);

	const { language } = useLanguage();

	function handleShowTasks() {
		setShowTasks(true);
	}

	return (
		<div className="relative">
			{showTasks ? (
				<div className="flex flex-col gap-2 mb-8">
					<h3 className="text-l">{topic.topicTitle}</h3>
					<div className="flex flex-col">
						{topic.tasks.map((task) => (
							<Task key={task.text} task={task} />
						))}
					</div>
				</div>
			) : (
				<div className="flex flex-col md:flex-row gap-1 md:gap-2 items-start md:items-center mb-4 md:mb-2">
					<h3 className="text-l">{topic.topicTitle}</h3>
					<Link to={`/main/${sectionName}/topic/${topic.id}`}>
						<button
							className="px-2 py-1 bg-stone-400 rounded-md text-stone-100 hover:bg-stone-600 hover:text-stone-200"
							onClick={handleShowTasks}
						>
							{translations_topic[language].tasksButton} ↓↓
						</button>
					</Link>
				</div>
			)}
		</div>
	);
}
