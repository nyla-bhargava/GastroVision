import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from "./hooks/useAuth";
// import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import About from "./pages/About";
import Support from "./pages/Support";
import Home from "./pages/Dashboard"; 
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> {/* Add GoogleOAuthProvider */}
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
                  <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
                  <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                  <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
                  <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </GoogleOAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

