import { createContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("custom-light");

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "custom-light" ? "custom-dark" : "custom-light"));
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;





