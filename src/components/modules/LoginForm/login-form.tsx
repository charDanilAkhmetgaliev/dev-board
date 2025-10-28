import { Button } from "components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "components/ui/card.tsx";
import { Input } from "components/ui/input.tsx";
import { Label } from "components/ui/label.tsx";
import type React from "react";
import { cn } from "../../../lib/utils/utils.ts";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Войдите в аккаунт</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer">
                  Login
                </Button>
              </div>
            </div>
            {/*<div className="mt-4 text-center text-sm">*/}
            {/*  Don&apos;t have an account?{" "}*/}
            {/*  <a href="/#" className="underline underline-offset-4">*/}
            {/*    Sign up*/}
            {/*  </a>*/}
            {/*</div>*/}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
