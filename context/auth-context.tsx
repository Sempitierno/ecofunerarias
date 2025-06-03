"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un usuario en localStorage al cargar la página
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulación de login
    // En una implementación real, esto sería una llamada a una API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulamos credenciales válidas para cualquier combinación
        const newUser = {
          id: "user-" + Math.random().toString(36).substr(2, 9),
          name: email.split("@")[0],
          email,
        }
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
        resolve()
      }, 1000)
    })
  }

  const register = async (name: string, email: string, password: string) => {
    // Simulación de registro
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // En una implementación real, esto sería una llamada a una API
        resolve()
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
