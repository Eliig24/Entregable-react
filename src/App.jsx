import { Route, Routes } from "react-router-dom"
import styles from "./app.module.css"
import Iniciopage from "./Iniciopage"
import JellyPage from "./JellyPage"
import SuscripcionPage from "./SuscripcionPage"
import Navbar from "./Navigation"
import { useTheme } from "./Context/useTheme"

function App() {

  const { theme } = useTheme();

  return (
    <div className={styles[theme]}>
      <div className="text-red-500 min-h-screen p-10 font-bold">
      <Navbar />
      <Routes>
        <Route path="/" element={<Iniciopage />} />
        <Route path="/wiki" element={<JellyPage />} />
        <Route path="/suscripcion" element={<SuscripcionPage />} />
      </Routes>
    </div>
    </div>
  )
}

export default App
