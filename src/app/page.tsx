import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center text-foreground">
            ROPA GENERATOR
            <Button>
                <Link href="/generator">
                    Generate now
                </Link>
            </Button>
        </div>
    );
}
