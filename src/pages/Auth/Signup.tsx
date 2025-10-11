import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { motion } from "framer-motion";

const SignUp = () => {
  const { signup, googleLogin } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
    if (credentialResponse.credential) {
      setLoading(true);
      try {
        await googleLogin(credentialResponse.credential);
        navigate("/dashboard");
      } catch (error) {
        console.error("Google login error:", error);
        toast.error("Google Sign-In failed");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In failed");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-b from-med-blue-light to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-white/80 backdrop-blur">
          <div className="mb-8 text-center p-6">
            <h1 className="text-3xl font-bold text-med-blue">Create an Account</h1>
            <p className="mt-2 text-med-teal">
              Sign up to start using GastroVision AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-6">
            <div>
              <Label htmlFor="name" className="text-med-blue">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                className="mt-1 text-med-blue bg-teal-50 border-teal-200 focus:border-med-teal focus:ring-med-teal"
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-med-blue">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="mt-1 text-med-blue bg-teal-50 border-teal-200 focus:border-med-teal focus:ring-med-teal"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-med-blue">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="mt-1 text-med-blue bg-teal-50 border-teal-200 focus:border-med-teal focus:ring-med-teal"
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-med-teal hover:bg-teal-600 text-white"
              disabled={loading}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 px-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-teal-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white/80 px-2 text-med-teal">Or sign up with</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              {!loading && (
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  shape="pill"
                  theme="outline"
                />
              )}
            </div>
          </div>

          <div className="mt-6 text-center text-sm pb-6">
            <span className="text-med-teal">Already have an account?</span>
            <Link to="/login" className="ml-2 font-medium text-med-blue hover:text-teal-600">
              Sign in
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;