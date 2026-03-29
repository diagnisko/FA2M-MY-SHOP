import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Alert, Button, Container, Link, Stack, TextField, Typography } from "@mui/material";
import { api } from "@/api/client";
import type { User } from "@/api/types";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const setTokens = useAuthStore((s) => s.setTokens);
  const setUser = useAuthStore((s) => s.setUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data } = await api.post<{ access: string; refresh: string }>("/auth/login/", { username, password });
      setTokens(data.access, data.refresh);
      const me = await api.get<User>("/auth/me/");
      setUser(me.data);
      navigate("/");
    } catch {
      setError("Identifiants incorrects ou compte inactif.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Connexion
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Utilisez votre nom d&apos;utilisateur (souvent identique à l&apos;email si vous vous êtes inscrit ainsi).
      </Typography>
      <Stack component="form" spacing={2} onSubmit={onSubmit}>
        <TextField label="Nom d&apos;utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required autoComplete="username" fullWidth />
        <TextField label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" fullWidth />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" size="large" disabled={loading}>
          Se connecter
        </Button>
        <Link component={RouterLink} to="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
        <Link component={RouterLink} to="/inscription">Créer un compte</Link>
      </Stack>
    </Container>
  );
}
