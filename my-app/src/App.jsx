import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Cart from './Cart'
import './App.css'
import { Layout } from './components/Layout'

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState("Dilip")
  return <UserContext.Provider value={{ user, setUser }}>
    <Layout/>
    </UserContext.Provider>
  }


export default App
