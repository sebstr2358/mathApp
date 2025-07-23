import "./index.css";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import Login from "./views/Login.jsx";
import MainPage from "./views/MainPage.jsx";
import Exam from "./views/Exam.jsx";
import Section from "./views/Section.jsx";
import TopicDetail from "./views/TopicDetail.jsx"; // Nowy komponent dla szczegółów tematu
import { SectionProvider } from "./store/login-data-context.jsx";
import { MathProvider } from "./store/math_section-context.jsx";
import { LanguageProvider } from "./store/language-context.jsx";


const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/main",
		element: <MainPage />,
	},
	{
		path: "/main/exam",
		element: <Exam />,
	},
	{
		path: "/main/:sectionName",
		element: <Section />,
	},
	{
		path: "/main/:sectionName/topic/:topicId", // Dodanie id tematu
		element: <TopicDetail />, // Komponent do wyświetlania zadań
	},
	{
		path: "/", // Domyślna ścieżka
		element: <Navigate to="/login" />, // Przekierowanie do /login
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<LanguageProvider>
			<MathProvider>
				<SectionProvider>
					<RouterProvider router={router}></RouterProvider>
				</SectionProvider>
			</MathProvider>
		</LanguageProvider>
	</StrictMode>
);
