import { Link as RouterLink } from "react-router-dom";
import {
        Box,
        Button,
        Card,
        CardContent,
        Container,
        IconButton,
        Link,
        Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, mediaUrl } from "@/api/client";
import type { CartResponse } from "@/api/types";
import { formatMoney } from "@/lib/format";

export default function CartPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => (await api.get<CartResponse>("/cart/")).data,
  });

  const patch = useMutation({
    mutationFn: async ({ product, quantity }: { product: number; quantity: number }) => {
      await api.patch("/cart/items/", { product, quantity });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });

  const remove = useMutation({
    mutationFn: async (product: number) => {
      await api.delete("/cart/items/", { data: { product } });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });

  if (isLoading || !data) return <Container sx={{ py: 4 }}><Typography>Chargement…</Typography></Container>;

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Panier
      </Typography>
      {data.items.length === 0 ? (
        <Typography color="text.secondary">
          Votre panier est vide. <Link component={RouterLink} to="/boutique">Continuer les achats</Link>
        </Typography>
      ) : (
        <>
          <Card sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Produit</TableCell>
                  <TableCell align="right">Prix</TableCell>
                  <TableCell align="center">Qté</TableCell>
                  <TableCell align="right">Sous-total</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.items.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          component="img"
                          src={mediaUrl(row.main_image) || "https://placehold.co/120x120/e3eaf2/0d47a1?text=F"}
                          alt=""
                          sx={{ width: 56, height: 56, borderRadius: 1, objectFit: "cover" }}
                        />
                        <Typography fontWeight={600}>{row.product_name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">{formatMoney(row.unit_price)}</TableCell>
                    <TableCell align="center" sx={{ width: 120 }}>
                      <TextField
                        type="number"
                        size="small"
                        value={row.quantity}
                        inputProps={{ min: 1 }}
                        onChange={(e) => {
                          const q = Number(e.target.value);
                          if (Number.isFinite(q)) patch.mutate({ product: row.product, quantity: q });
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">{formatMoney(row.line_total)}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="supprimer" onClick={() => remove.mutate(row.product)} color="error">
                        <DeleteOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary" fontWeight={800}>
                  {formatMoney(data.subtotal)}
                </Typography>
              </Stack>
              <Button component={RouterLink} to="/checkout" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
                Valider la commande
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
}
