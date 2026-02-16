import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Mail, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { mockAuth } from "@/lib/mock-data";
import authBg from "@/assets/auth-bg.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 800));
    const result = mockAuth.login(email, password);
    if (result) {
      login(result.token, result.role, result.name);
      if (result.role === "admin") navigate("/admin");
      else if (result.role === "agent") navigate("/agent");
      else navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12">
        <img
          src={authBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/70" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-md"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">CMS</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
            AI-Powered<br />
            <span className="gradient-text">Complaint Management</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Streamline issue resolution with intelligent routing, real-time tracking, and comprehensive analytics.
          </p>
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Powered by AI for faster resolution</span>
          </div>
        </motion.div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-[400px]"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold">CMS</span>
          </div>

          <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-secondary/50 border-border/50 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 bg-secondary/50 border-border/50 focus:border-primary"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>

            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign in <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            New user?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Create an account
            </Link>
          </p>

          {/* Demo credentials */}
          <div className="mt-8 p-4 rounded-lg bg-secondary/30 border border-border/50">
            <p className="text-xs text-muted-foreground font-medium mb-2">Demo Credentials</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><span className="text-foreground/70">Admin:</span> admin@demo.com</p>
              <p><span className="text-foreground/70">Agent:</span> agent@demo.com</p>
              <p><span className="text-foreground/70">User:</span> any email + password</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
