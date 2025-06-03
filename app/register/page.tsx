import type { Metadata } from "next"
import Link from "next/link"
import { RegisterForm } from "@/components/register-form"

export const metadata: Metadata = {
  title: "Registro | EcoFunerarias Hub",
  description: "Crea una cuenta en EcoFunerarias Hub",
}

export default function RegisterPage() {
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Crea tu cuenta</h1>
          <p className="text-sm text-muted-foreground">Ingresa tus datos para registrarte en EcoFunerarias Hub</p>
        </div>
        <RegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="hover:text-brand underline underline-offset-4 text-primary">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
