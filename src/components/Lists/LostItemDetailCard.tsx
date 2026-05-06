import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    FileText,
    MapPin,
    Phone,
    Calendar,
    User,
    Hash,
    ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { MapView } from "../component/MapView";

export type LostItemDetailType = {
    id: number;
    type: string;
    name: string;
    ref: string;
    date: string;
    location: string;
    contact: string;
    description: string;
    status: "trouvé" | "perdu";
    lat: number;
    lng: number;
};

type Props = {
    item: LostItemDetailType;
};

export default function LostItemDetailCard({ item }: Props) {
    return (
        <Card className="max-w-3xl mx-auto shadow-sm">

            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between">
                    <Button variant="outline" asChild>
                        <Link to="/">
                        <ArrowLeft /> Retour
                        </Link>
                    </Button>
                
                <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5" />
                    Détail de l'objet
                </CardTitle>

                <Badge
                    variant="secondary"
                    className={
                        item.status === "trouvé"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }
                >
                    {item.status}
                </Badge>
            </CardHeader>

            <CardContent className="space-y-6">

                {/* Infos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                    <div className="space-y-2">
                        <p className="flex items-center gap-2">
                            <FileText size={16} />
                            <strong>Type :</strong> {item.type}
                        </p>

                        <p className="flex items-center gap-2">
                            <User size={16} />
                            <strong>Nom :</strong> {item.name}
                        </p>

                        <p className="flex items-center gap-2">
                            <Hash size={16} />
                            <strong>ID :</strong> {item.ref}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="flex items-center gap-2">
                            <Calendar size={16} />
                            <strong>Date :</strong> {item.date}
                        </p>

                        <p className="flex items-center gap-2">
                            <MapPin size={16} />
                            <strong>Lieu :</strong> {item.location}
                        </p>

                        <p className="flex items-center gap-2">
                            <Phone size={16} />
                            <strong>Contact :</strong> {item.contact}
                        </p>
                    </div>
                </div>

                {/* Map placeholder */}
                <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <MapPin size={16} /> Localisation
                    </h4>
                    <div style={{ width: "100%" }} className="h-56 rounded-xl overflow-hidden">
                        <MapView
                            lat={item.lat}
                            lng={item.lng}
                            label={item.location}
                        />
                    </div>
                </div>
                

                {/* Description */}
                <div>
                    <h4 className="text-sm font-semibold mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">
                        {item.description}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    <Button variant="outline" asChild>
                        <Link to="/">
                        <ArrowLeft /> Retour
                        </Link>
                    </Button>
                    <Button>Contacter</Button>
                </div>
            </CardContent>
        </Card>
    );
}