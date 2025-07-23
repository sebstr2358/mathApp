import React, { createContext, useContext, useEffect, useState } from 'react';
import { getMathSections } from '../firebase/firestore'; // Ustal ścieżkę do funkcji
import { useLanguage } from './language-context';

const MathContext = createContext();

export const MathProvider = ({ children }) => {
    const [mathSections, setMathSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage();

    useEffect(() => {
        const fetchMathSections = async () => {
            setLoading(true);
            const sections = await getMathSections(language);
            setMathSections(sections || []);
            setLoading(false);
        };

        fetchMathSections();
    }, [language]); // Ponownie pobierz sekcje, gdy lang się zmienia

    return (
        <MathContext.Provider value={{ mathSections, loading }}>
            {children}
        </MathContext.Provider>
    );
};

export const useMathSections = () => useContext(MathContext);