import { RegisterForm } from "@/components/forms/RegisterForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


function Register() {
  return (
    
        <div className="flex min-h-svh w-full mt-10 justify-center px-6 md:px-10">
          <div className="w-full max-w-3xl">
            {/* <LoginForm /> */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex flex-col items-center gap-4">
                    <img className="justify-content align-middle" src="guisnako_logo.jpg"
                      alt="Guisnaako Logo" width={100} />
                    <div>
                      <h2>Nouveau membre</h2>
                    </div>
                  </div>
                </CardTitle>
                <CardDescription className="text-center">
                Remplissez le formulaire pour rejoindre notre réseau.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegisterForm />
              </CardContent>
            </Card>
          </div>
        </div>
  )
}

export default Register