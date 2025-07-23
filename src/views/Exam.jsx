import FlexContainer from "../components/FlexContainer";
import ProjectSideBar from "../components/ProjectSideBar";
import RandomExam from "../components/randomExam/RandomExam";

export default function Exam() {
	const randomTopicId = Math.floor(2 * Math.random() + 1);
	const randomTaskNumber = Math.floor(2 * Math.random() + 1);
	return (
		<FlexContainer>
			<ProjectSideBar />
			<RandomExam
				randomTaskNumber={randomTaskNumber}
				randomTopicId={randomTopicId}
			/>
		</FlexContainer>
	);
}
