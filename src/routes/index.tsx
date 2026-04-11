import { createFileRoute, Link } from "@tanstack/react-router";
import '@fontsource-variable/outfit/wght.css';

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
                        <Link to="/app" className="btn btn-primary">Get Started</Link>

                        <Link to="/app" className="btn btn-neutral">Learn More</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
