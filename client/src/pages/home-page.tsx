import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/ui/hero-section";
import { NavigationBar } from "@/components/ui/navigation-bar";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

export default function HomePage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen">
      <NavigationBar />
      <HeroSection />

      <section className="py-24 bg-primary/5">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Get Accredited?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-background rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Global Recognition</h3>
              <p className="text-muted-foreground">
                Join a network of quality institutions recognized worldwide for their
                commitment to excellence.
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
              <p className="text-muted-foreground">
                Demonstrate your institution's adherence to international standards
                and best practices.
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Growth Opportunities</h3>
              <p className="text-muted-foreground">
                Access resources, partnerships, and opportunities for institutional
                development.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Excellence in Education & Innovation
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're a traditional educational institution or a modern
                makerspace, our accreditation process is designed to validate and
                enhance your quality standards.
              </p>
              <Button
                size="lg"
                onClick={() => setLocation(user ? "/apply" : "/auth")}
              >
                Start Your Application
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1705354153781-6ca38674a88b"
                alt="Modern classroom"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1529678407585-55ac0053aa47"
                alt="Makerspace"
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About MSX Boca Chica</h2>
            <p className="text-lg text-muted-foreground mb-8">
              MSX Boca Chica is at the forefront of innovative education and maker culture. 
              Our accreditation program sets the standard for excellence in hands-on learning 
              and technological education.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('https://msxbocachica.org', '_blank')}
            >
              Visit MSX Boca Chica
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}