import { createContext, useState } from 'react';

// Utworzenie kontekstu
export const SectionContext = createContext();

// Utworzenie dostawcy kontekstu
export const SectionProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stan do zarządzania danymi użytkownika

    const updateUser = (data) => {
        setUser(data); // Ustawia dane użytkownika
    };

    const onLogOut = () => {
        setUser(null); // Czyści dane użytkownika przy wylogowaniu
    };

    return (
        <SectionContext.Provider value={{ user, updateUser, onLogOut }}>
            {children}
        </SectionContext.Provider>
    );
};