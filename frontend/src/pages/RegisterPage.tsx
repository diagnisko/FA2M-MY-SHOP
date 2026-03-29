import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Alert, Button, Container, Link, Stack, TextField, Typography } from "@mui/material";
import { api } from "@/api/client";
import type { User } from "@/api/types";
import { formatDrfError } from "@/lib/apiErrors";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const setTokens = useAuthStore((s) => s.setTokens);
  const setUser = useAuthStore((s) => s.setUser);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post("/auth/register/", {
        username,
        email,
        password,
        password_confirm: passwordConfirm,
        first_name: firstName,
        last_name: lastName,
        phone,
      });
    } catch (err: unknown) {
      const ax = err as { response?: { data?: unknown }; message?: string };
      const data = ax.response?.data;
      if (data !== undefined) setError(formatDrfError(data));
      else setError(ax.message || "Erreur réseau (pas de réponse du serveur).");
      return;
    }
    try {
      const { data } = await api.post<{ access: string; refresh: string }>("/auth/login/", { username, password });
      setTokens(data.access, data.refresh);
      const me = await api.get<User>("/auth/me/");
      setUser(me.data);
      navigate("/");
    } catch (err: unknown) {
      const ax = err as { response?: { data?: unknown }; message?: string };
      const data = ax.response?.data;
      setError(
        data !== undefined
          ? `Compte créé, mais la connexion a échoué : ${formatDrfError(data)}`
          : "Compte créé. Connectez-vous manuellement depuis la page Connexion.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Inscription
      </Typography>
      <Stack component="form" spacing={2} onSubmit={onSubmit}>
        <TextField label="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required fullWidth />
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
        <TextField
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          autoComplete="new-password"
          helperText="Au moins 8 caractères ; évitez les mots trop simples ou uniquement des chiffres."
        />
        <TextField
          label="Confirmer le mot de passe"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
          fullWidth
          autoComplete="new-password"
        />
        <TextField label="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth />
        <TextField label="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth />
        <TextField
          label="Téléphone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+221 78 133 23 23"
          helperText="Sénégal : +221 et 9 chiffres ; ou 07X XXX XX XX ; ou 9 chiffres sans le 0 initial. Hors Sénégal : +indicatif (ex. +33 6 12…)."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" size="large" disabled={loading}>
          Créer mon compte
        </Button>
        <Link component={RouterLink} to="/connexion">Déjà un compte ? Connexion</Link>
      </Stack>
    </Container>
  );
}
