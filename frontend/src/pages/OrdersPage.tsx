import { Link as RouterLink } from "react-router-dom";
import { Card, CardActionArea, CardContent, Chip, Container, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import type { Order } from "@/api/types";
import { formatMoney } from "@/lib/format";

const statusColor: Record<string, "default" | "primary" | "success" | "warning" | "error"> = {
  pending: "warning",
  confirmed: "primary",
  shipped: "primary",
  delivered: "success",
  cancelled: "error",
};

const statusLabel: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

export default function OrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => (await api.get<Order[]>("/orders/")).data,
  });

  if (isLoading) return <Container sx={{ py: 4 }}><Typography>Chargement…</Typography></Container>;

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Mes commandes
      </Typography>
      <Stack spacing={2}>
        {(data ?? []).map((o) => (
          <Card key={o.id}>
            <CardActionArea component={RouterLink} to={`/commandes/${o.id}`}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography fontWeight={700}>Commande #{o.id}</Typography>
                  <Chip size="small" color={statusColor[o.status] || "default"} label={statusLabel[o.status] || o.status} />
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  {new Date(o.created_at).toLocaleString("fr-FR")}
                </Typography>
                <Typography color="primary" fontWeight={700}>
                  {formatMoney(o.total)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
      {!data?.length && <Typography color="text.secondary">Aucune commande pour l’instant.</Typography>}
    </Container>
  );
}
