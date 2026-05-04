import ListLost from "@/components/Lists/ListLost"
import ListProduct from "@/components/Lists/ListProduct"
import ListService from "@/components/Lists/ListService"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"


function SearchResults() {
  const typeQuery = new URLSearchParams(window.location.search).get("type")
  // const searchQuery = new URLSearchParams(window.location.search).get("q")
  const navigate = useNavigate()
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 max-w-3xl  mx-auto">
      <img onClick={() => navigate("/")} className="justify-content align-middle" src="guisnako_logo.jpg" 
        alt="Guisnaako Logo" width={80} />
        <InputGroup className="">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Rechercher..."
            // value={searchQuery}
            required
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </div>
      <div>
        {/* {typeQuery === "P" && <ListProduct />}
        {typeQuery === "S" && <ListService />} */}
        {typeQuery === "L" ? <ListLost /> : typeQuery === "S" ? <ListService /> : <ListProduct />}
      </div>
    </div>
  )
}

export default SearchResults