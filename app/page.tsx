
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FunerariasList } from "@/components/funerarias-list"
import { Leaf } from "lucide-react"
import { createDataBase } from "@/lib/database"

export default async function Home() {
  await createDataBase()
  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner con gradiente mejorado */}
      <section className="relative min-h-[85vh] bg-gradient-to-br from-emerald-600 to-teal-400 flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/abstract-green-pattern.png')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 max-w-[700px] px-4 animate-fadeIn">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <Leaf className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Honramos la vida, <span className="text-emerald-100">cuidando el planeta.</span>
          </h1>
          <p className="text-xl mb-10 opacity-90 max-w-[600px] mx-auto">
            Explora funerarias que adoptan procesos ecológicos y sostenibles para un adiós responsable con la
            naturaleza.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#directory" passHref>
              <Button
                size="lg"
                variant="secondary"
                className="font-bold px-8 py-6 rounded-xl shadow-lg hover:translate-y-[-3px] transition-transform"
              >
                Ver Directorio
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button
                size="lg"
                variant="outline"
                className="font-bold px-8 py-6 rounded-xl shadow-lg border-white text-black hover:bg-white/20 hover:text-white hover:translate-y-[-3px] transition-transform"
              > Crear cuenta
                
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-[-1px] left-0 w-full leading-[0] z-[1]">
          <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path d="M0,0 C600,100 600,100 1200,0 L1200,100 L0,100 Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Contenido principal */}
      <main className="bg-white rounded-t-2xl shadow-lg -mt-[5px] pt-24 pb-16 px-5 relative z-[2]">
        {/* Métodos Ecológicos */}
        <section id="methods" className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Métodos Ecológicos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre las diferentes alternativas sostenibles para honrar a tus seres queridos mientras respetas el
              medio ambiente.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <MethodCard
              title="Entierro Verde"
              description="Ataúdes biodegradables y naturales, sin químicos ni lacas que dañen el ecosistema."
              icon="leaf"
            />
            <MethodCard
              title="Acuamación"
              description="Reducción con agua alcalina: proceso con menor consumo energético y sin emisiones tóxicas."
              icon="droplet"
            />
            <MethodCard
              title="Resomación"
              description="Disolución alcalina que devuelve nutrientes al suelo de forma natural y sostenible."
              icon="recycle"
            />
            <MethodCard
              title="Urnas Biodegradables"
              description="Materiales naturales que se integran al entorno, permitiendo nueva vida."
              icon="flower"
            />
          </div>
        </section>

        {/* Directorio */}
        <section id="directory" className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Directorio de Funerarias Ecológicas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Encuentra funerarias comprometidas con el medio ambiente en todo Chile.
            </p>
          </div>
          <FunerariasList showFavoriteButton={true} />
        </section>

        {/* Testimonios */}
        <section className="max-w-6xl mx-auto mb-20 py-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimonios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experiencias de familias que eligieron opciones ecológicas para sus seres queridos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Elegir un entierro verde para mi padre fue una forma de honrar su amor por la naturaleza. El proceso fue respetuoso y significativo."
              author="María González"
              location="Santiago"
            />
            <TestimonialCard
              quote="Las urnas biodegradables nos permitieron esparcir las cenizas de mi abuela en su jardín favorito, donde ahora florece nueva vida."
              author="Carlos Mendoza"
              location="Valparaíso"
            />
            <TestimonialCard
              quote="El equipo de la funeraria nos guió con sensibilidad a través de todas las opciones ecológicas disponibles, haciendo un momento difícil mucho más llevadero."
              author="Ana Fuentes"
              location="Concepción"
            />
          </div>
        </section>

        {/* Contacto */}
        <section id="contact" className="max-w-6xl mx-auto bg-emerald-50 p-10 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Contacto</h2>
          <p className="max-w-[600px] mx-auto mb-6 text-gray-600">
            ¿Tienes preguntas o deseas más información? Escríbenos y encontrarás el servicio perfecto para tus
            necesidades ecológicas.
          </p>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <a href="mailto:info@ecofunerarias.cl">info@ecofunerarias.cl</a>
          </Button>
        </section>
      </main>
    </div>
  )
}

function MethodCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: "leaf" | "droplet" | "recycle" | "flower"
}) {
  const icons = {
    leaf: <Leaf className="h-10 w-10 text-emerald-600" />,
    droplet: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-600"
      >
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
      </svg>
    ),
    recycle: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-600"
      >
        <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
        <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
        <path d="m14 16-3 3 3 3" />
        <path d="M8.293 13.596 4.875 9.5l3.418-4.096" />
        <path d="m7.079 9.5 9.391 0" />
      </svg>
    ),
    flower: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-600"
      >
        <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m3 4.5a4.5 4.5 0 1 0 4.5-4.5M12 16.5V15m4.5-3a4.5 4.5 0 1 1-4.5-4.5M16.5 12H15" />
        <circle cx="12" cy="12" r="3" />
        <path d="m8 16 1.5-1.5" />
        <path d="M14.5 9.5 16 8" />
        <path d="m8 8 1.5 1.5" />
        <path d="M14.5 14.5 16 16" />
      </svg>
    ),
  }

  return (
    <Card className="bg-white border border-gray-100 shadow-md hover:shadow-xl hover:translate-y-[-6px] transition-all duration-300 overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      <CardHeader className="pb-2 flex flex-col items-center">
        <div className="mb-4 p-3 bg-emerald-50 rounded-full">{icons[icon]}</div>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-center">{description}</p>
      </CardContent>
    </Card>
  )
}

function TestimonialCard({ quote, author, location }: { quote: string; author: string; location: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <svg className="h-8 w-8 text-emerald-400 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
      </svg>
      <p className="text-gray-600 mb-4">{quote}</p>
      <div className="font-medium">
        <p className="text-emerald-600">{author}</p>
        <p className="text-gray-500 text-sm">{location}</p>
      </div>
    </div>
  )
}
