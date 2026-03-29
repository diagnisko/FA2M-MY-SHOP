import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  Container,
  Link,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import type { AdminOrder } from "@/api/types";
import { formatMoney } from "@/lib/format";

const STATUSES = [
  { value: "pending", label: "En attente" },
  { value: "confirmed", label: "Confirmée" },
  { value: "shipped", label: "Expédiée" },
  { value: "delivered", label: "Livrée" },
  { value: "cancelled", label: "Annulée" },
];

export default function AdminOrders() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => (await api.get<AdminOrder[]>("/admin/orders/")).data,
  });

  const patchStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await api.patch(`/admin/orders/${id}/`, { status });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-orders"] }),
  });

  function onStatusChange(id: number, e: SelectChangeEvent<string>) {
    patchStatus.mutate({ id, status: e.target.value });
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Commandes & statuts
      </Typography>
      <Card>
        {isLoading ? (
          <Typography sx={{ p: 2 }}>Chargement…</Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Paiement</TableCell>
                <TableCell sx={{ minWidth: 180 }}>Statut</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {(data ?? []).map((o) => (
                <TableRow key={o.id}>
                  <TableCell>{o.id}</TableCell>
                  <TableCell>{o.username || o.user}</TableCell>
                  <TableCell>{formatMoney(o.total)}</TableCell>
                  <TableCell>{o.payment_method}</TableCell>
                  <TableCell>
                    <FormControl size="small" fullWidth>
                      <InputLabel id={`st-${o.id}`}>Statut</InputLabel>
                      <Select
                        labelId={`st-${o.id}`}
                        label="Statut"
                        value={o.status}
                        onChange={(e) => onStatusChange(o.id, e)}
                      >
                        {STATUSES.map((s) => (
                          <MenuItem key={s.value} value={s.value}>
                            {s.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(o.created_at).toLocaleString("fr-FR")}
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Le changement de statut déclenche une notification push utilisateur lorsque FCM est configuré (
        <Link component={RouterLink} to="/">
          accueil client
        </Link>
        ).
      </Typography>
    </Container>
  );
}
