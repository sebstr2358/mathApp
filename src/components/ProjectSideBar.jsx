import { NavLink } from "react-router-dom";
import LogOutMenu from "./LogOutMenu";
import { useMathSections } from "../store/math_section-context";
import { useLanguage } from "../store/language-context";
import { translations_sidebar } from "../constants/translations";

export default function ProjectSideBar() {
	const { mathSections, loading } = useMathSections();
	console.log("mathSections:", mathSections);
	const { language } = useLanguage();

	if (loading) {
		return <div>Ładowanie sekcji...</div>; // Informacja o ładowaniu
	}

	return (
		<section className="flex flex-col gap-4 xl:flex-row w-4/12 pe-0.5 pb-2 bg-stone-700 text-stone-100 relative">
			<div className="flex flex-col px-4 justify-space mt-6">
				<h2 className="uppercase font-bold mt-10 xl:mt-0 mb-1 text-xl">
					{translations_sidebar[language].h2}
				</h2>
				<ul className="list-disc ps-1.5 sm:ps-2 md:ps-2.5">
					{mathSections.map((section) => (
						<li
							className="ms-0.5 md:ms-2 py-1 md:py-0.5 hover:text-blue-400"
							key={section.id}
						>
							<NavLink
								to={`/main/${section.path}`}
								className={
									({ isActive }) =>
										`flex text-start wrap ${
											isActive ? "text-blue-500 font-bold" : ""
										} overflow-wrap break-words` // Dodano tutaj
								}
							>
								{section.title}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
			<LogOutMenu />
		</section>
	);
}
