import { Button } from "./button";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

export function HeroSection() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-24">
      <div className="container relative">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                MakerSpace Exploration Accreditation
              </h1>
              <p className="text-lg text-muted-foreground">
                Setting global standards for educational institutions and makerspaces. 
                Join our network of excellence in innovation and hands-on learning.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => setLocation(user ? "/apply" : "/auth")}
              >
                Start Accreditation
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <img
              src="https://images.unsplash.com/photo-1705354154386-2951ff6efa90"
              alt="Modern classroom"
              className="rounded-lg shadow-lg w-full aspect-[4/3] object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1515923256482-1c04580b477c"
              alt="Makerspace"
              className="rounded-lg shadow-lg w-full aspect-[4/3] object-cover mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}