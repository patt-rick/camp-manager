import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import IdCard from "@/IdCard";

function QrCodeGenerator() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [church, setChurch] = useState("");
    const [qrIsVisible, setQrIsVisible] = useState<string | null>(null);
    const handleQrCodeGenerator = () => {
        const userData = {
            firstName,
            lastName,
            church,
        };
        setQrIsVisible(JSON.stringify(userData));
    };
    return (
        <div className="">
            <h1 className="font-bold my-2">Card Generator</h1>
            <div className="">
                <div className="">
                    <Card className="max-w-lg">
                        <CardHeader>
                            <CardTitle className="text-xl">Add Member</CardTitle>
                            <CardDescription>
                                Enter your information to create a card
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="first-name">First name</Label>
                                        <Input
                                            id="first-name"
                                            placeholder="Max"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="last-name">Last name</Label>
                                        <Input
                                            id="last-name"
                                            placeholder="Robinson"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Church</Label>
                                    <Input
                                        id="church"
                                        type="text"
                                        placeholder="Temple"
                                        required
                                        value={church}
                                        onChange={(e) => setChurch(e.target.value)}
                                    />
                                </div>
                                <Button onClick={handleQrCodeGenerator} className="w-full">
                                    Generate Card
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {!!qrIsVisible && (
                    <IdCard
                        codeValue={qrIsVisible}
                        firstName={firstName}
                        lastName={lastName}
                        church={church}
                    />
                )}
            </div>
        </div>
    );
}
export default QrCodeGenerator;
