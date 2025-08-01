import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowDownCircle, Github, Instagram } from "lucide-react";
import Link from "next/link";

const GetInTouch = () => {
  // TODO Buat menjadi sistem form yang bisa send langsung ke email saat klik button message me
  return (
    <div className="col-start-2 w-full h-full row-start-1">
      <Card className=" bg-background">
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
          <CardDescription>
            Want to know me more? Insert your email below!
          </CardDescription>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  size={"icon"}
                  variant={"default"}
                  className="border-primary border-2"
                >
                  <ArrowDownCircle className="text-primary-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-20 bg-background border-primary border-1">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href={"https://github.com/Neyrrs"}>Github</Link>
                    <DropdownMenuShortcut>
                      <Github className="text-foreground" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={"https://www.instagram.com/dwonvy"}>
                      Instagram
                    </Link>
                    <DropdownMenuShortcut>
                      <Instagram className="text-foreground" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col md:gap-4 gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input placeholder="Username" id="username" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Example@gmail.com"
              type="email"
              id="email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message </Label>
            <Textarea
              placeholder="Type your message here"
              className="resize-none md:h-30 h-20 text-sm"
              id="message"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-center w-full gap-2">
          <Button type="submit" variant={"default"} className="w-full">
            Message me
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GetInTouch;
