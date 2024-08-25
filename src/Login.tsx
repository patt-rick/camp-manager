import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeLoginRequest } from "./_helpers/auth";
import { useToast } from "./components/ui/use-toast";

export function Login() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        setLoading(true);
        let resp: any = await makeLoginRequest({ email, password });
        if (resp.error) {
            toast({ title: "Error", description: resp.error, variant: "destructive" });
        } else {
            sessionStorage.setItem("USER_TOKEN", JSON.stringify(resp.data?.access_token));
            sessionStorage.setItem("CAMP_ID", JSON.stringify(resp.data?.camp_id));
            navigate("/");
            toast({ title: "Success", description: "You are now logged in." });
        }
        setLoading(false);
        //make request to backend
    };
    return (
        <div className="login flex justify-center items-start min-h-svh bg-muted">
            <Card className="w-full max-w-sm m-8">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email and password below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            disabled={loading}
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            disabled={loading}
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    {loading ? (
                        <Button className="w-full" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                            Please wait
                        </Button>
                    ) : (
                        <Button onClick={handleLogin} className="w-full">
                            Sign in
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
