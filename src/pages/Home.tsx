import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [typeQuery, setTypeQuery] = useState<"P" | "S" | "L">("P")

  const handleSearch = () => {
    // navigate to search results page with query parameters search-results?q=bd&type=L
    navigate(`/search-results?q=${searchQuery}&type=${typeQuery}`)
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto items-center justify-center gap-4 mt-4">
        <img className="justify-content align-middle" src="guisnako_logo.jpg" 
        alt="Guisnaako Logo" width={200} />
        <h2>Bienvenue sur Guisnaako</h2>
        <InputGroup className="h-10 border">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Rechercher..."
            value={searchQuery}
            required
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <div className="flex gap-2">
          <RadioGroup className="flex gap-5" defaultValue="P" onValueChange={(value) => setTypeQuery(value as "P" | "S" | "L") }>
          
          <div className="flex items-center gap-3">
            <RadioGroupItem value="L" id="L" />
            <Label htmlFor="L">Perdus</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="S" id="S" />
            <Label htmlFor="S">Services</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="P" id="P" />
            <Label htmlFor="P">Produit</Label>
          </div>
        </RadioGroup>
        </div>
        <Button onClick={handleSearch}>Rechercher</Button>
    </div>
  )
}

export default Home