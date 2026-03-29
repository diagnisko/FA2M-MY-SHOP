import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  FormHelperText,
  FormLabel,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import type { CartResponse, Order } from "@/api/types";
import { formatMoney } from "@/lib/format";
import { useAuthStore } from "@/store/authStore";

export default function CheckoutPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [payment, setPayment] = useState<"cod" | "pickup">("cod");
  const [shippingName, setShippingName] = useState(
    user?.first_name ? `${user.first_name} ${user.last_name}`.trim() : "",
  );
  const [shippingPhone, setShippingPhone] = useState(user?.phone || "");
  const [shippingAddress, setShippingAddress] = useState(user?.address || "");
  const [notes, setNotes] = useState("");

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => (await api.get<CartResponse>("/cart/")).data,
  });

  const submit = useMutation({
    mutationFn: async () => {
      const { data } = await api.post<Order>("/cart/checkout/", {
        payment_method: payment,
        shipping_name: shippingName,
        shipping_phone: shippingPhone,
        shipping_address: shippingAddress,
        notes,
      });
      return data;
    },
    onSuccess: (order) => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      navigate(`/commandes/${order.id}`);
    },
  });

  if (!cart?.items.length) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography gutterBottom>Panier vide.</Typography>
        <Link component={RouterLink} to="/boutique">
          Retour à la boutique
        </Link>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Validation
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            Total à payer
          </Typography>
          <Typography variant="h5" color="primary" fontWeight={800}>
            {formatMoney(cart.subtotal)}
          </Typography>
        </CardContent>
      </Card>
      <Stack
        component="form"
        spacing={2}
        onSubmit={(e) => {
          e.preventDefault();
          submit.mutate();
        }}
      >
        <div>
          <FormLabel id="pay">Mode de paiement</FormLabel>
          <RadioGroup
            aria-labelledby="pay"
            value={payment}
            onChange={(e) => setPayment(e.target.value as "cod" | "pickup")}
          >
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label="Paiement à la livraison (espèces ou mobile money au livreur)"
            />
            <FormControlLabel
              value="pickup"
              control={<Radio />}
              label="Paiement sur place (retrait au point de vente)"
            />
          </RadioGroup>
          <FormHelperText>
            Stripe, PayPal et Mobile Money pourront compléter ces options côté serveur.
          </FormHelperText>
        </div>
        <TextField
          label="Nom complet"
          required
          value={shippingName}
          onChange={(e) => setShippingName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Téléphone"
          required
          value={shippingPhone}
          onChange={(e) => setShippingPhone(e.target.value)}
          fullWidth
        />
        <TextField
          label="Adresse de livraison"
          required
          multiline
          minRows={3}
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          fullWidth
        />
        <TextField label="Notes (optionnel)" value={notes} onChange={(e) => setNotes(e.target.value)} fullWidth multiline minRows={2} />
        {submit.isError && <Alert severity="error">Impossible de valider la commande. Vérifiez le stock et votre session.</Alert>}
        <Button type="submit" variant="contained" size="large" disabled={submit.isPending}>
          Confirmer la commande
        </Button>
      </Stack>
    </Container>
  );
}
