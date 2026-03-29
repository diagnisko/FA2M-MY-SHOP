import { useMemo, useState } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { Alert, Button, Container, Link, Stack, TextField, Typography } from "@mui/material";
import { api } from "@/api/client";

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const uid = useMemo(() => params.get("uid") || "", [params]);
  const token = useMemo(() => params.get("token") || "", [params]);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMsg(null);
    if (password !== password2) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post<{ detail: string }>("/auth/password-reset/confirm/", {
        uid,
        token,
        new_password: password,
      });
      setMsg(data.detail);
    } catch {
      setError("Lien invalide ou expiré.");
    } finally {
      setLoading(false);
    }
  }

  if (!uid || !token) {
    return (
      <Container maxWidth="xs" sx={{ py: 6 }}>
        <Alert severity="warning">Lien incomplet. Ouvrez le lien reçu par email.</Alert>
        <Link component={RouterLink} to="/mot-de-passe-oublie">Demander un nouveau lien</Link>
      </Container>
    );
  }

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Nouveau mot de passe
      </Typography>
      <Stack component="form" spacing={2} onSubmit={onSubmit}>
        <TextField type="password" label="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth />
        <TextField type="password" label="Confirmation" value={password2} onChange={(e) => setPassword2(e.target.value)} required fullWidth />
        {error && <Alert severity="error">{error}</Alert>}
        {msg && <Alert severity="success">{msg}</Alert>}
        <Button type="submit" variant="contained" disabled={loading}>
          Enregistrer
        </Button>
        <Link component={RouterLink} to="/connexion">Connexion</Link>
      </Stack>
    </Container>
  );
}
