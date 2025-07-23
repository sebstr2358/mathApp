import FlexContainer from "../components/FlexContainer";
import Header from "../components/Header";
import ProjectSideBar from "../components/ProjectSideBar";

export default function MainPage() {
	return (
		<FlexContainer>
			<ProjectSideBar />
			<Header />
		</FlexContainer>
	);
}
