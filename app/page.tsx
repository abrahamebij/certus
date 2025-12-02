import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Globe, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: "Private & Secure",
      description: "All predictions are confidential and cryptographically protected.",
    },
    {
      icon: Zap,
      title: "Automated Outcomes",
      description: "Events are resolved automatically using verified data sources.",
    },
    {
      icon: Globe,
      title: "Real-World Data",
      description: "Results come from trusted, verified real-world information.",
    },
    {
      icon: TrendingUp,
      title: "Track Performance",
      description: "Monitor your prediction accuracy and improve over time.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen py-12 flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-hero opacity-5 rounded-full blur-[80px]" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-linear(rgba(232,92,13,0.03)_1px,transparent_1px),linear-linear(90deg,rgba(232,92,13,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Privacy-First Predictions
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight animate-fade-in">
              Predict with{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse">
                  Certainty
                </span>
                <div className="absolute inset-0 blur-2xl bg-linear-to-r from-primary to-secondary opacity-30" />
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Privacy-first prediction markets powered by verified real-world
              data.
              <span className="block mt-2 text-lg text-muted-foreground/80">
                Automated outcomes. Transparent results. Zero compromises.
              </span>
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Button
                asChild
                size="lg"
                className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 shadow-hover transition-smooth relative group overflow-hidden"
              >
                <Link href="/login">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-smooth" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-10 py-7 border-2 border-primary/30 hover:border-transparent hover:bg-white transition-smooth"
              >
                <Link href="/markets">Explore Markets</Link>
              </Button>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-12 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  1000+
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Users
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-secondary">
                  500+
                </div>
                <div className="text-sm text-muted-foreground">Markets</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  99%
                </div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of prediction markets with privacy,
              automation, and real-world verification.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-smooth hover:shadow-hover group"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <Card className="border-2 border-primary/20 bg-linear-card shadow-card max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Start Predicting?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of users making informed predictions on
                real-world events.
              </p>
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
              >
                <Link href="/login">Create Account</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 Certus. Built for the Hackathon.
            </div>
            <div className="flex gap-6">
              <a
                href="#about"
                className="text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                Contact
              </a>
              <a
                href="#hackathon"
                className="text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                Hackathon
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
