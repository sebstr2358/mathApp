import { useState, useEffect } from "react";
import Header from "./components/Header";
import RandomExam from "./components/randomExam/RandomExam";
import RandomSelectedExamTask from "./components/randomExam/RandomSelectedExamTask";
import ProjectSideBar from "./components/ProjectSideBar";
import SelectedMathSection from "./components/SelectedMathSection";
import CheckingForm from "./components/CheckingForm";
import { SectionContext } from "./store/section-cart-context";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { addDataOnce } from "./firebase/firestore";


function App() {
    const [showUsers, setShowUsers] = useState({
        showCheckForm: true,
        users: [],
    });
    const [showChosenSection, setShowChosenSection] = useState({
        selectedSectionId: undefined,
    });
    const [MATH_SECTIONS, setMathSections] = useState([]); // Stan do przechowywania sekcji
    const [loading, setLoading] = useState(true); // Stan ładowania

    useEffect(() => {
        const initializeData = async () => {
            await addDataOnce(); // Dodaj dane do Firestore
            fetchMathSections(); // Następnie pobierz sekcje
        };

        initializeData();
    }, []); // Pusta tablica jako zależność, aby wywołać raz po załadowaniu

    const fetchMathSections = async () => {
        const db = getFirestore();
        const docRef = doc(db, "mathSections", "sections");

        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setMathSections(data.MATH_SECTIONS);
            } else {
                console.log("Dokument nie istnieje.");
            }
        } catch (error) {
            console.error("Błąd przy pobieraniu dokumentu:", error);
        } finally {
            setLoading(false);
        }
    };

    function handleShowChosenSection(id) {
        setShowChosenSection((prevState) => ({
            ...prevState,
            selectedSectionId: id,
        }));
    }

    function handleShowRandomTest() {
        setShowChosenSection((prevState) => ({
            ...prevState,
            selectedSectionId: null,
        }));
    }

    function handleCancelSection() {
        setShowChosenSection((prevState) => ({
            ...prevState,
            selectedSectionId: undefined,
        }));
    }

    function handleCancelCheckForm(userData) {
        setShowUsers((prevState) => {
            const newUser = { ...userData };
            return {
                ...prevState,
                showCheckForm: false,
                users: [prevState.users, newUser],
            };
        });
    }

    function handleLogOut() {
        setShowUsers((prevState) => ({
            ...prevState,
            users: [],
            showCheckForm: true,
        }));
        handleCancelSection();
        window.location.reload();
    }

    const selectedSection = MATH_SECTIONS.find(
        (section) => section.id === showChosenSection.selectedSectionId
    );

    let content;
    if (loading) {
        content = <div>Loading...</div>; // Komponent ładowania
    } else if (showChosenSection.selectedSectionId === undefined) {
        content = <Header />;
    } else if (showChosenSection.selectedSectionId === null) {
        content = (
            <RandomExam>
                {MATH_SECTIONS.map((section) => (
                    <li key={section.id}>
                        <RandomSelectedExamTask section={section} />
                    </li>
                ))}
            </RandomExam>
        );
    } else {
        content = <SelectedMathSection section={selectedSection} />;
    }

    const randomTopicId = Math.floor(2 * Math.random() + 1);
    const randomTaskNumber = Math.floor(2 * Math.random() + 1);
    const ctxSectionValue = {
        cancelCheckForm: handleCancelCheckForm,
        showTest: handleShowRandomTest,
        cancelSection: handleCancelSection,
        showChosenSection: handleShowChosenSection,
        onLogOut: handleLogOut,
        randomTopicId: randomTopicId,
        randomTaskNumber: randomTaskNumber,
        users: showUsers,
        mathSections: MATH_SECTIONS, // użycie pobranych sekcji
        showChosenSection: showChosenSection,
    };

    return (
        <SectionContext.Provider value={ctxSectionValue}>
            {showUsers.showCheckForm ? (
                <CheckingForm />
            ) : (
                <main className="flex bg-stone-200">
					
                    <ProjectSideBar>
                        {MATH_SECTIONS.map((section) => (
							
                            <li className="ms-0.5 md:ms-2 py-1 md:py-0.5" key={section.id}>
								
                                <button
                                    className="flex text-start wrap"
                                    onClick={() => handleShowChosenSection(section.id)}
                                >
                                    {section.title}
                                </button>
                            </li>
                        ))}
                    </ProjectSideBar>
                    {content}
                </main>
            )}
        </SectionContext.Provider>
    );
}

export default App;
