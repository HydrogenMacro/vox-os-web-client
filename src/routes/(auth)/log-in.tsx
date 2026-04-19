import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { toastsStore } from "./route";

export const Route = createFileRoute("/(auth)/log-in")({
    component: RouteComponent,
});

function RouteComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const toastsSnap = useSnapshot(toastsStore);
    
    const navigate = useNavigate();
    const onSubmit = async () => {
        try {
            const res = await fetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                })
            });
            if (res.status >= 400) {
                const { error, message, details }: Partial<{ 
                    error: string,
                    message: string,
                    details: Record<string, any>
                }> = await res.json();
                if (!(error && message && details)) throw new Error("Invalid response body");
                return;
            }
            navigate({ to: "/app" })
        } catch(e) {
            console.error("Error:", e);
            toastsSnap.addToast(JSON.stringify(e))
        }
    }

    const passwordRequirements: [string, (pwd: string) => Promise<boolean>][] =
        [
            [
                "8 characters or more",
                (pwd: string) =>
                    Promise.resolve(pwd.length >= 8 && pwd.length <= 128),
            ],
            [
                "Not a commonly used password",
                (pwd: string) =>
                    new Promise((res) => setTimeout(() => res(true), 500)),
            ],
            [
                "No spaces at the start or the end",
                (pwd: string) => Promise.resolve(pwd.trim() == pwd),
            ],
        ];
    
    return (
        <div className="flex w-full h-full items-center justify-center">
            <div className="w-[calc(100%-var(--spacing)*24)] bg-base-300 flex flex-col items-center p-8">
                <h1 className="text-3xl pt-4 pb-1 text-center">Log In</h1>
                <small className="text-xs pb-4">Need an account? <Link to="/sign-up" className="link link-primary">Sign Up</Link></small>
                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">Email</legend>
                    <input
                        type="email"
                        className="input"
                        placeholder="Enter Email..."
                                                value={email}
                        onChange={(evt) => setEmail(evt.target.value)}
                    />
                    <legend className="fieldset-legend">Password</legend>
                    <label className="input pr-0">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            className="grow"
                            placeholder="Enter Password..."
                            value={password}
                            onChange={(evt) => setPassword(evt.target.value)}
                        />
                        <button
                            className="p-2"
                            onClick={() => setPasswordVisible((s) => !s)}
                        >
                            {passwordVisible ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </label>

                    <button className="btn btn-primary mt-6" onClick={onSubmit}>Log In</button>
                </fieldset>
            </div>
        </div>
    );
}
