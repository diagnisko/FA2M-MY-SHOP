import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Container, Link, TextField, Typography, Stack } from "@mui/material";
import { api } from "@/api/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [devLink, setDevLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setDevLink(null);
    setLoading(true);
    try {
      const { data } = await api.post<{ detail: string; link?: string }>("/auth/password-reset/", { email });
      setMsg(data.detail);
      if (data.link) setDevLink(data.link);
    } catch {
      setMsg("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Mot de passe oublié
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Saisissez votre email : nous vous enverrons un lien de réinitialisation (console mail en développement).
      </Typography>
      <Stack component="form" spacing={2} onSubmit={onSubmit}>
        <TextField type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
        {msg && <Alert severity="success">{msg}</Alert>}
        {devLink && (
          <Alert severity="info">
            Mode dev — lien : <a href={devLink}>{devLink}</a>
          </Alert>
        )}
        <Button type="submit" variant="contained" disabled={loading}>
          Envoyer
        </Button>
        <Link component={RouterLink} to="/connexion">Retour connexion</Link>
      </Stack>
    </Container>
  );
}
