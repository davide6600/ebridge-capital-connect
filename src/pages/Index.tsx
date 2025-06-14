import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Shield, TrendingUp, Users, Bitcoin, Building2, Globe2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/components/AuthProvider';

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect authenticated users
  if (user) {
    if (user.email === "admin@ebridge.ee") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
    return null;
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        setIsLoginOpen(false);
        
        // Navigation will be handled by the auth state change
        if (email === "admin@ebridge.ee") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Registration Successful",
          description: "Please check your email for verification (if enabled).",
        });
        setIsSignupOpen(false);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        toast({
          title: "Google Login Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        title: "Google Login Failed",
        description: "An error occurred during Google login.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">E-Bridge Capital</span>
          </div>
          <div className="flex space-x-3">
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Login to E-Bridge Capital</DialogTitle>
                  <DialogDescription>
                    Enter your credentials to access your account
                  </DialogDescription>
                </DialogHeader>
                <LoginForm onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />
              </DialogContent>
            </Dialog>

            <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                  Sign Up
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Your Account</DialogTitle>
                  <DialogDescription>
                    Join E-Bridge Capital and start your investment journey
                  </DialogDescription>
                </DialogHeader>
                <SignupForm onSignup={handleSignup} onGoogleLogin={handleGoogleLogin} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Bridge to
            <span className="text-yellow-400"> Digital Wealth</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional investment management for Bitcoin, ETFs, and premium stocks. 
            Trusted by investors across Europe with cutting-edge technology and personalized service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8 py-4 text-lg"
              onClick={() => setIsSignupOpen(true)}
            >
              Start Investing Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-4 text-lg"
              onClick={() => setIsLoginOpen(true)}
            >
              Client Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose E-Bridge Capital</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <Bitcoin className="h-12 w-12 text-yellow-400 mb-4" />
                <CardTitle className="text-white">Digital Assets</CardTitle>
                <CardDescription className="text-gray-300">
                  Expert management of Bitcoin and cryptocurrency investments with institutional-grade security.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Premium ETFs & Stocks</CardTitle>
                <CardDescription className="text-gray-300">
                  Curated selection of high-performance ETFs like STRF and STRK, plus blue-chip equities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">Regulatory Compliance</CardTitle>
                <CardDescription className="text-gray-300">
                  Estonian OÜ regulated entity with full KYC/AML compliance and digital asset licensing.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Accounts */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Demo Access</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-blue-500/20 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Administrator Access
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Full admin panel with client management capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-100">
                  <p><strong>Email:</strong> admin@ebridge.ee</p>
                  <p><strong>Password:</strong> demo123</p>
                  <p><strong>Features:</strong> Client management, proposals, documents</p>
                </div>
                <Button 
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Access Admin Panel
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-green-500/20 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe2 className="mr-2 h-5 w-5" />
                  Client Access
                </CardTitle>
                <CardDescription className="text-green-200">
                  Full client dashboard with portfolio and proposals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-green-100">
                  <p><strong>Email:</strong> cliente@ebridge.ee</p>
                  <p><strong>Password:</strong> demo123</p>
                  <p><strong>Features:</strong> Portfolio, documents, chat, proposals</p>
                </div>
                <Button 
                  className="mt-4 w-full bg-green-600 hover:bg-green-700"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Access Client Portal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black/20 border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6 text-yellow-400" />
                <span className="text-lg font-bold text-white">E-Bridge Capital</span>
              </div>
              <p className="text-gray-400 text-sm">
                Servizi di investimento professionale per Bitcoin, ETF e azioni premium. 
                Regolamentato in Estonia.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Servizi</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Gestione Portafoglio</li>
                <li>Bitcoin Investment</li>
                <li>ETF Premium</li>
                <li>Consulenza Investimenti</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Supporto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Centro Assistenza</li>
                <li>Documentazione</li>
                <li>Contatti</li>
                <li>FAQ</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Legale</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition-colors">
                    Termini di Servizio
                  </a>
                </li>
                <li>Conformità Regolamentare</li>
                <li>KYC/AML</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 E-Bridge Capital OÜ. Tutti i diritti riservati. 
              Servizi di investimento regolamentati in Estonia.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Reg. No: 16284943 | Licenza Attività Digitali: FVT000XXX | 
              Email: info@ebridge.ee | Tel: +372 6000 000
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const LoginForm = ({ onLogin, onGoogleLogin }: { onLogin: (email: string, password: string) => void, onGoogleLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <Button 
        className="w-full" 
        onClick={() => onLogin(email, password)}
      >
        Login
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={onGoogleLogin}
      >
        Continue with Google
      </Button>
    </div>
  );
};

const SignupForm = ({ onSignup, onGoogleLogin }: { onSignup: (email: string, password: string) => void, onGoogleLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }
    onSignup(email, password);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />
      </div>
      <Button className="w-full" onClick={handleSubmit}>
        Create Account
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={onGoogleLogin}
      >
        Continue with Google
      </Button>
    </div>
  );
};

export default Index;
