"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Funeraria } from "@/components/funerarias-list"
import { useAuth } from "./auth-context"

type FavoriteContextType = {
  favorites: (Funeraria & { comment?: string })[]
  addFavorite: (funeraria: Funeraria) => void
  removeFavorite: (id: number) => void
  updateComment: (id: number, comment: string) => void
}

const FavoritesContext = createContext<FavoriteContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<(Funeraria & { comment?: string })[]>([])
  const { user } = useAuth()

  // Cargar favoritos del localStorage cuando cambia el usuario
  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem(`favorites-${user.id}`)
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    } else {
      setFavorites([])
    }
  }, [user])

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites-${user.id}`, JSON.stringify(favorites))
    }
  }, [favorites, user])

  const addFavorite = (funeraria: Funeraria) => {
    setFavorites((prev) => {
      // Verificar si ya existe
      if (prev.some((f) => f.id === funeraria.id)) {
        return prev
      }
      return [...prev, { ...funeraria, comment: "" }]
    })
  }

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }

  const updateComment = (id: number, comment: string) => {
    setFavorites((prev) => prev.map((f) => (f.id === id ? { ...f, comment } : f)))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, updateComment }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites debe ser usado dentro de un FavoritesProvider")
  }
  return context
}
