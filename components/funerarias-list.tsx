"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ExternalLink, MapPin, Phone } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useFavorites } from "@/context/favorites-context"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export type Funeraria = {
  id: number
  name: string
  method: string
  desc: string
  url: string
  location: string
  phone: string
  image: string
}

const funerarias: Funeraria[] = [
  {
    id: 1,
    name: "Servicios Funerarios Inmemoria",
    method: "Entierro Verde",
    desc: "Especialistas en entierros con ataúdes 100% biodegradables fabricados con materiales sostenibles.",
    url: "https://funerariainmemoria.cl/la-tendencia-de-los-entierros-verdes/",
    location: "Av. Francisco Bilbao 759, Providencia, Santiago de Chile ",
    phone: "+569 9224 3924",
    image: "/eco-funeral-home.png",
  },
  {
    id: 2,
    name: "BioFuneral",
    method: "Anfora árbol nativo",
    desc: "Planes personalizados para honrar la memoria de tus seres queridos, mediante una ceremonia única y ecológica.",
    url: "https://biofuneral.cl/",
    location: "Sergio Valdovinos 01614, Santiago, Quinta Normal, Región Metropolitana",
    phone: "+56 2 2765 4321",
    image: "/bio.funeral.jpg",
  },
  {
    id: 3,
    name: "EcoRest",
    method: "Resomación",
    desc: "Transformación alcalina y devolución de nutrientes al suelo mediante procesos naturales certificados.",
    url: "#",
    location: "Las Condes",
    phone: "+56 2 2987 6543",
    image: "/eco-funeral-alkaline-hydrolysis.png",
  },
  {
    id: 4,
    name: "BioUrnas CL",
    method: "Urnas Biodegradables",
    desc: "Urnas ecológicas para restos o cenizas que se integran completamente con la naturaleza.",
    url: "#",
    location: "Ñuñoa",
    phone: "+56 2 2345 6789",
    image: "/urnas.jpg",
  },
  {
    id: 5,
    name: "Naturaleza Eterna",
    method: "Entierro Verde",
    desc: "Opciones de bosques memoriales y entierros verdes en espacios naturales protegidos.",
    url: "#",
    location: "Valparaíso",
    phone: "+56 32 234 5678",
    image: "/placeholder.svg?height=400&width=600&query=memorial%20forest%20natural%20burial%20ground",
  },
  {
    id: 6,
    name: "Eco Memorial",
    method: "Urnas Biodegradables",
    desc: "Urnas que contienen semillas de árboles nativos para crear un legado vivo y duradero.",
    url: "#",
    location: "Concepción",
    phone: "+56 41 222 3344",
    image: "/placeholder.svg?height=400&width=600&query=tree%20urn%20planting%20ceremony%20in%20forest",
  },
]

export function FunerariasList({ showFavoriteButton = false }: { showFavoriteButton?: boolean }) {
  const [filter, setFilter] = useState("")
  const { user } = useAuth()
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const router = useRouter()
  const { toast } = useToast()

  // Filtrar funerarias según el método seleccionado
  const filteredFunerarias = funerarias.filter((f) => !filter || f.method === filter)

  const handleFavoriteToggle = (funeraria: Funeraria) => {
    if (!user) {
      toast({
        title: "Inicia sesión para guardar favoritos",
        description: "Necesitas una cuenta para guardar funerarias favoritas.",
        variant: "default",
      })
      router.push("/login")
      return
    }

    const isFavorite = favorites.some((fav) => fav.id === funeraria.id)
    if (isFavorite) {
      removeFavorite(funeraria.id)
      toast({
        title: "Eliminado de favoritos",
        description: `${funeraria.name} ha sido eliminado de tus favoritos.`,
        variant: "default",
      })
    } else {
      addFavorite(funeraria)
      toast({
        title: "Añadido a favoritos",
        description: `${funeraria.name} ha sido añadido a tus favoritos.`,
        variant: "default",
      })
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[200px]" id="methodFilter">
            <SelectValue placeholder="Todos los métodos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los métodos</SelectItem>
            <SelectItem value="Entierro Verde">Entierro Verde</SelectItem>
            <SelectItem value="Acuamación">Acuamación</SelectItem>
            <SelectItem value="Resomación">Resomación</SelectItem>
            <SelectItem value="Urnas Biodegradables">Urnas Biodegradables</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-500">
          Mostrando {filteredFunerarias.length} de {funerarias.length} funerarias
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredFunerarias.length === 0 ? (
          <p className="text-gray-500 col-span-2 text-center py-8">No se encontraron funerarias.</p>
        ) : (
          filteredFunerarias.map((funeraria) => {
            const isFavorite = favorites.some((fav) => fav.id === funeraria.id)
            return (
              <Card
                key={funeraria.id}
                className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={funeraria.image || "/placeholder.svg"}
                    alt={funeraria.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="mb-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                        {funeraria.method}
                      </Badge>
                      <CardTitle className="text-2xl">{funeraria.name}</CardTitle>
                    </div>
                    {showFavoriteButton && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className={isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"}
                        onClick={() => handleFavoriteToggle(funeraria)}
                      >
                        <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <p className="text-gray-700">{funeraria.desc}</p>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {funeraria.location}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Phone className="h-4 w-4 mr-1" />
                      {funeraria.phone}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline" className="text-emerald-700 border-emerald-200">
                    <a href={funeraria.url} className="flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Visitar sitio
                    </a>
                  </Button>
                  <Button asChild variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                    <a href={`/funerarias/${funeraria.id}`}>Ver detalles</a>
                  </Button>
                </CardFooter>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
