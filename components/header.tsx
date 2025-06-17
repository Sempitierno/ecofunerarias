"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Leaf, Heart, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Métodos", href: "/#methods" },
    { name: "Directorio", href: "/#directory" },
    { name: "Contacto", href: "/#contact" },
    { name: "Ranking", href: "/dashboard"},
    
  ]

  return (
    <header
      className={`fixed top-0 left-0 w-full backdrop-blur-md z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-700">
          <Leaf className="h-6 w-6" />
          <span>EcoFunerarias</span>
        </Link>

        {/* Navegación para escritorio */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-gray-800 font-medium hover:text-emerald-600 transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botones de acción */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="hidden sm:inline-flex text-gray-600 hover:text-gray-900"
              >
                Salir
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button variant="outline" size="sm" className="hidden sm:flex border-emerald-200 text-emerald-700">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register" passHref className="hidden sm:block">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Registrarse
                </Button>
              </Link>
            </>
          )}

          {/* Menú móvil */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l-emerald-100">
              <div className="flex items-center gap-2 mb-8 mt-4">
                <Leaf className="h-5 w-5 text-emerald-600" />
                <span className="font-bold text-lg text-emerald-700">EcoFunerarias</span>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium py-2 hover:text-emerald-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                {user ? (
                  <>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <Button
                      variant="ghost"
                      className="justify-start px-0 text-lg font-medium hover:text-emerald-600 transition-colors"
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }}
                    >
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <Link href="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium py-2">
                      Iniciar Sesión
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700">Registrarse</Button>
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
