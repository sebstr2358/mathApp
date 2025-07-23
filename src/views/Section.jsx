import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FlexContainer from "../components/FlexContainer";
import SelectedMathSection from "../components/SelectedMathSection";
import ProjectSideBar from "../components/ProjectSideBar";
import { useMathSections } from "../store/math_section-context";

export default function Section() {
	const { sectionName } = useParams();
	const { mathSections } = useMathSections();
	const [selectedSection, setSelectedSection] = useState(null);

	useEffect(() => {
		// Ustawienie section tylko wtedy, gdy zmienia się sectionName
		const section = mathSections.find((sec) => sec.path === sectionName);
		setSelectedSection(section);
	}, [sectionName, mathSections]); // Run this effect when sectionName or mathSections change

	return (
		<FlexContainer>
			<ProjectSideBar />
			{selectedSection ? (
				<SelectedMathSection
					section={selectedSection}
					sectionName={sectionName}
				/>
			) : (
				<p>Wybierz dział, aby zobaczyć szczegóły.</p> // Komunikat dla użytkownika
			)}
		</FlexContainer>
	);
}
