import { Link, useParams } from "react-router-dom";
import Task from "../components/Task"; // Importuj komponent zadania
import FlexContainer from "../components/FlexContainer";
import ProjectSideBar from "../components/ProjectSideBar";
import CloseButton from "../components/CloseButton";
import { useMathSections } from "../store/math_section-context";
import { useLanguage } from "../store/language-context";
import { translations_topicDetail } from "../constants/translations";

export default function TopicDetail() {
	const { sectionName, topicId } = useParams(); // Pobierz nazwy sekcji oraz temat

	const { mathSections } = useMathSections();
	const selectedSection = mathSections.find(
		(section) => section.path === sectionName
	);
	const selectedTopic = selectedSection.topics.find(
		(topic) => topic.id === parseFloat(topicId)
	);

	const { language } = useLanguage();

	return (
		<FlexContainer>
			<ProjectSideBar />
			<div className="relative flex flex-col w-8/12 h-max py-4 px-2 md:px-1.5 justify-center md:justify-start md:ms-4 items-start bg-stone-200">
				<h2 className="text-xl uppercase text-stone-700 my-4">
					{selectedTopic.topicTitle}
				</h2>
				<div>
					{selectedTopic.tasks.map((task) => (
						<Task key={task.text} task={task} />
					))}
				</div>
				<Link to={`/main/${sectionName}`}>
					<CloseButton>
						{translations_topicDetail[language].backButton}
					</CloseButton>
				</Link>
			</div>
		</FlexContainer>
	);
}
