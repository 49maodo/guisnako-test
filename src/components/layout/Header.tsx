import { Mail, Phone } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"


function Header() {
  return (
    <header className="sticky top-0 z-50">
        <div className="bg-muted">
      <div className="py-4 container mx-auto">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                <Phone />
                <div>
                (+221) 33 892 66 14
                </div>
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <Mail />
                    <div>
                    info@guisnaako.com
                    </div>
                </div>
            </div>
            </div>
            <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
            <Link to="/login">
                Connexion 
            </Link>
            </Button>
            <Button size="sm" asChild>
                <Link to="/register">
                S'inscrire
                </Link>
            </Button>
        </div>
        </div>
      </div>
      </div>
    </header>
  )
}

export default Header