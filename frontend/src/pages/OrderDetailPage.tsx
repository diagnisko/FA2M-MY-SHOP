import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Breadcrumbs,
  Container,
  Divider,
  LinearProgress,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import type { Order } from "@/api/types";
import { formatMoney } from "@/lib/format";

const statusLabel: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const orderId = Number(id);

  const { data, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => (await api.get<Order>(`/orders/${orderId}/`)).data,
    enabled: Number.isFinite(orderId),
    refetchInterval: (query) => {
      const s = query.state.data?.status;
      return s && s !== "delivered" && s !== "cancelled" ? 10_000 : false;
    },
  });

  if (!Number.isFinite(orderId)) return <Typography>Commande introuvable.</Typography>;
  if (isLoading || !data) {
    return (
      <Container sx={{ py: 4 }}>
        <LinearProgress />
      </Container>
    );
  }

  const live = data.status !== "delivered" && data.status !== "cancelled";

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/commandes" underline="hover" color="inherit">
          Commandes
        </Link>
        <Typography color="text.primary">#{data.id}</Typography>
      </Breadcrumbs>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Suivi commande #{data.id}
      </Typography>
      {live && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Mise à jour automatique toutes les 10 s tant que la commande n’est pas livrée ou annulée.
        </Typography>
      )}
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography>
          <strong>Statut :</strong> {statusLabel[data.status] || data.status}
        </Typography>
        <Typography>
          <strong>Paiement :</strong> {data.payment_method === "cod" ? "À la livraison" : data.payment_method === "pickup" ? "Sur place" : data.payment_method}
        </Typography>
        <Typography>
          <strong>Total :</strong> {formatMoney(data.total)}
        </Typography>
        <Typography>
          <strong>Livraison :</strong> {data.shipping_name} — {data.shipping_phone}
        </Typography>
        <Typography sx={{ whiteSpace: "pre-line" }}>{data.shipping_address}</Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Produit</TableCell>
            <TableCell align="right">Prix</TableCell>
            <TableCell align="right">Qté</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items.map((it, idx) => (
            <TableRow key={`${it.product_name}-${idx}`}>
              <TableCell>{it.product_name}</TableCell>
              <TableCell align="right">{formatMoney(it.unit_price)}</TableCell>
              <TableCell align="right">{it.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
