import { LoginForm } from "@/components/forms/LoginForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


function Login() {
  return (
    <div className="flex min-h-svh w-full mt-10 justify-center px-6 md:px-10">
      <div className="w-full max-w-md">
        {/* <LoginForm /> */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col items-center gap-4">
                <img className="justify-content align-middle" src="guisnako_logo.jpg"
                  alt="Guisnaako Logo" width={100} />
                <div>
                  <h2>Connexion</h2>
                </div>
              </div>
            </CardTitle>
            <CardDescription className="text-center">
              Connectez-vous à votre compte pour accéder à toutes les fonctionnalités de Guisnaako
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login