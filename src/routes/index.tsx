import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: IndexRouteComponent,
});

function IndexRouteComponent() {
    return (
        <div className="flex flex-col items-center bg-background">
            <div className="w-full h-160 flex flex-col items-center">
                <div className="w-10/12 flex flex-col h-full justify-center items-center">
                    <h1 className="text-center text-4xl font-extrabold overflow-hidden text-pretty">
                        Take back control of your life.
                    </h1>
                    <p className="text-center pt-2">
                        Never forget a conversation again.
                        <br /> Works with any earbud.
                    </p>
                    <div className="flex gap-5 pt-3">
                        <Button asChild className="gap-2">
                            <Link to="/app">Get Started</Link>
                        </Button>

                        <Button asChild className="gap-2" variant="secondary">
                            <Link to="/app">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
