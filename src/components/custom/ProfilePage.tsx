import { ClassificationColors } from "@/_helpers/staticData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Link as LinkIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ProfilePage({ data, onPrintCard }: any) {
    return (
        <div className=" bg-background">
            <div className="relative">
                <div className="h-48 overflow-hidden rounded-t-lg profile-bg">
                    {/* <img
                        src="../../assets/shape-14.svg?height=192&width=768"
                        alt="Cover"
                        className="w-full object-cover"
                    /> */}
                </div>

                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    <Avatar className="w-24 h-24 border-4 border-background">
                        <AvatarImage
                            src="/placeholder.svg?height=96&width=96"
                            alt="Profile picture"
                        />
                        <AvatarFallback>{`${data.last_name[0]}${data.first_name[0]}`}</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <Card className="mt-16 border-0 shadow-none">
                <CardContent className="space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold">{`${data.last_name} ${data.first_name}`}</h1>
                        <p
                            style={{
                                backgroundColor:
                                    ClassificationColors[
                                        data.classification as keyof typeof ClassificationColors
                                    ],
                            }}
                            className="text-muted-foreground w-fit text-white m-auto px-4 py-1 rounded-full"
                        >
                            {data.classification}
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground w-full">
                        <div className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            Room number 132
                        </div>
                        <div className="flex items-center">
                            <LinkIcon className="mr-1 h-4 w-4" />
                            <a href="https://janedoe.com" className="hover:underline">
                                {data.gender}
                            </a>
                        </div>
                        {/* <div className="flex items-center">
                            <CalendarDays className="mr-1 h-4 w-4" />
                            Joined September 2021
                        </div>
                        <div className="flex items-center">
                            <Mail className="mr-1 h-4 w-4" />
                            jane.doe@example.com
                        </div> */}
                    </div>

                    <div className="space-y-2 text-center">
                        <h2 className="text-lg font-semibold">Church</h2>
                        <p className="text-muted-foreground">{data.church}</p>
                    </div>

                    {/* <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "UX Design",
                                "UI Design",
                                "Prototyping",
                                "User Research",
                                "HTML",
                                "CSS",
                                "JavaScript",
                                "React",
                                "Figma",
                                "Adobe XD",
                            ].map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div> */}
                    {onPrintCard && (
                        <div className="text-center">
                            <Button onClick={onPrintCard} variant="outline">
                                Print card
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
