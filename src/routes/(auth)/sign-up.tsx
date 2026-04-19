import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Ellipsis, Eye, EyeOff, X } from "lucide-react";
import { Suspense, use, useState } from "react";
import { toastsStore } from "./route";
import { useSnapshot } from "valtio";

export const Route = createFileRoute("/(auth)/sign-up")({
    component: RouteComponent,
});

function RouteComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const toastsSnap = useSnapshot(toastsStore);

    const passwordRequirements: [string, (pwd: string) => Promise<boolean>][] =
        [
            [
                "8 characters or more",
                (pwd: string) => Promise.resolve(pwd.length >= 8 && pwd.length <= 128),
            ],
            [
                "Not a commonly used password",
                (pwd: string) =>
                    new Promise((res) => setTimeout(() => res(true), 500)),
            ],
            [
                "No spaces at the start or the end",
                (pwd: string) =>
                    Promise.resolve(pwd.trim() == pwd),
            ],
            
        ];

    return (
        <div className="flex w-full h-full items-center justify-center">
            <div className="w-[calc(100%-var(--spacing)*24)] bg-base-300 flex flex-col items-center p-8">
                <h1 className="text-3xl pt-4 pb-1 text-center">Sign Up</h1>
                <small className="text-xs pb-4">Already have an account? <Link to="/log-in" className="link link-primary">Log In</Link></small>
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
                        <button className="p-2" onClick={() => setPasswordVisible(s => !s)}>
                            {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </label>
                    
                    <p>Password Requirements:</p>
                    <ul className="flex flex-col gap-1">
                        {passwordRequirements.map(
                            ([requirementText, passwordCheckFn], i) => (
                                <PasswordRequirement
                                    key={i}
                                    text={requirementText}
                                    satisfied={
                                        password.length == 0
                                            ? null
                                            : passwordCheckFn(password)
                                    }
                                />
                            ),
                        )}
                    </ul>
                    <label className="label w-full text-wrap gap-2 mt-2">
                        <input type="checkbox" className="checkbox" />
                        <div className="inline">I agree to the <Link to="/terms-of-service" target="_blank" className="link link-primary">Terms of Services</Link> and the <Link to="/privacy-policy" target="_blank" className="link link-primary">Privacy Policy</Link>.</div>
                    </label>
                    <button className="btn btn-primary mt-2">Sign Up</button>
                </fieldset>
            </div>
        </div>
    );
}

function PasswordRequirement({
    satisfied,
    text,
}: {
    satisfied: Promise<boolean> | null;
    text: string;
}) {
    return (
        <li className="flex items-center gap-2">
            {satisfied != null ? (
                <Suspense fallback={<Ellipsis size={12} />}>
                    <PasswordRequirementIcon satisfied={satisfied}/>
                </Suspense>
            ) : (
                <Ellipsis size={12} />
            )}
            <div>{text}</div>
        </li>
    );
}
function PasswordRequirementIcon({ satisfied }: { satisfied: Promise<boolean> }) {
    return use(satisfied) ? <Check size={16} className="text-success" /> : <X size={16} className="text-error" />;
}
