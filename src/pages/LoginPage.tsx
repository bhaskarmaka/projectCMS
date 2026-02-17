import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Mail, Lock, Sparkles, Zap, BarChart3, MessageSquare } from "lucide-react";
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

  const features = [
    { icon: <Zap className="h-4 w-4" />, label: "AI-Powered Classification" },
    { icon: <BarChart3 className="h-4 w-4" />, label: "Real-time Analytics" },
    { icon: <MessageSquare className="h-4 w-4" />, label: "Instant Communication" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left - Branding Panel */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden items-center justify-center p-16">
        <img src={authBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-info/8 rounded-full blur-[80px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-lg"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shadow-[0_0_30px_hsl(160_84%_39%/0.2)]">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground tracking-wide">CMS</span>
          </div>
          <h1 className="text-5xl font-extrabold text-foreground mb-4 leading-[1.1] tracking-tight">
            AI-Powered<br />
            <span className="gradient-text">Complaint Management</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
            Streamline issue resolution with intelligent routing, real-time tracking, and comprehensive analytics.
          </p>

          <div className="mt-10 space-y-3">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {f.icon}
                </div>
                <span>{f.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-[80px]" />
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-[420px] relative z-10"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold">CMS</span>
          </div>

          <h2 className="text-3xl font-bold mb-2 tracking-tight">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-secondary/30 border-border/30 rounded-xl focus:border-primary/50 focus:shadow-[0_0_0_3px_hsl(160_84%_39%/0.08)] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 bg-secondary/30 border-border/30 rounded-xl focus:border-primary/50 focus:shadow-[0_0_0_3px_hsl(160_84%_39%/0.08)] transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>

            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl shadow-[0_0_20px_hsl(160_84%_39%/0.2)] hover:shadow-[0_0_30px_hsl(160_84%_39%/0.3)] transition-all duration-300"
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
          <div className="mt-8 p-4 rounded-xl bg-secondary/20 border border-border/20">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2.5">Demo Credentials</p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p><span className="text-foreground/70 text-mono">Admin:</span> admin@demo.com</p>
              <p><span className="text-foreground/70 text-mono">Agent:</span> agent@demo.com</p>
              <p><span className="text-foreground/70 text-mono">User:</span> any email + password</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
