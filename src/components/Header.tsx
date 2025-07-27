import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  User,
  ShoppingCart,
  Settings,
  Edit2,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/supabaseClient";
import { FcGoogle } from "react-icons/fc";

function getInitials(username: string) {
  return username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const Header = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [usernameDialogOpen, setUsernameDialogOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [updatingUsername, setUpdatingUsername] = useState(false);

  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setDropdownOpen(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setError(error.message);
    setLoading(false);
    return;
  }

  // Get fresh user info to check email verification
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    setError("Failed to verify user status.");
    setLoading(false);
    return;
  }

  const emailConfirmedAt = userData.user?.email_confirmed_at;

  if (!emailConfirmedAt) {
    await supabase.auth.signOut();
    setUser(null);
    setError("Email not verified. Please check your inbox before logging in.");
    setLoading(false);
    return;
  }

  setLoading(false);
};

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: username.trim() },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setError("Check your email for the verification link. Please verify before logging in.");
      setIsRegistering(false);
      setEmail("");
      setUsername("");
      setPassword("");
      setPasswordConfirm("");
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingUsername(true);
    setError(null);

    if (!newUsername.trim()) {
      setError("Username cannot be empty");
      setUpdatingUsername(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      data: { username: newUsername.trim() },
    });

    if (error) {
      setError(error.message);
    } else {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setUsernameDialogOpen(false);
    }

    setUpdatingUsername(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // Supabase will redirect to Google and handle session
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg font-bold text-xl">
              e-food
            </div>
          </div>

          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Deliver to: Athens, Greece</span>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search for restaurants or dishes..." className="pl-10" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!user ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{isRegistering ? "Register" : "Sign In to e-food"}</DialogTitle>
                  </DialogHeader>

                  {isRegistering ? (
                    <form onSubmit={handleRegister} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                      />
                      {error && <p className="text-red-500 text-sm">{error}</p>}

                      <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Registering..." : "Register"}
                      </Button>

                      <p className="text-sm text-center">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setIsRegistering(false);
                            setError(null);
                          }}
                          className="text-primary underline"
                        >
                          Sign In
                        </button>
                      </p>
                    </form>
                  ) : (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      {error && <p className="text-red-500 text-sm">{error}</p>}

                      <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Signing in..." : "Sign In"}
                      </Button>

                      <div className="text-center">
                        <span className="text-muted-foreground text-sm">or</span>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full flex items-center justify-center space-x-2"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                      >
                        <FcGoogle className="h-5 w-5" />
                        <span>Continue with Google</span>
                      </Button>

                      <p className="text-sm text-center">
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setIsRegistering(true);
                            setError(null);
                          }}
                          className="text-primary underline"
                        >
                          Register here
                        </button>
                      </p>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            ) : (
              <div className="relative" tabIndex={0}>
                <button
                  aria-label="User menu"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold select-none"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {user.user_metadata?.username
                    ? getInitials(user.user_metadata.username)
                    : user.email?.[0].toUpperCase()}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-50">
                    <button
                      onClick={() => alert("Settings clicked!")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted cursor-pointer"
                    >
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setUsernameDialogOpen(true);
                        setNewUsername(user.user_metadata?.username || "");
                        setError(null);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted cursor-pointer"
                    >
                      <Edit2 className="mr-2 h-4 w-4" /> Change Username
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </button>
                  </div>
                )}

                <Dialog open={usernameDialogOpen} onOpenChange={setUsernameDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Username</DialogTitle>
                      <DialogDescription>Enter your new username below.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUsernameUpdate} className="space-y-4">
                      <Input
                        placeholder="New username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                      />
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                      <DialogFooter>
                        <Button type="submit" disabled={updatingUsername}>
                          {updatingUsername ? "Updating..." : "Update Username"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            <Button variant="outline" size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart (0)
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
