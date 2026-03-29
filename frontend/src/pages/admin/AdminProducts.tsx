import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import type { Paginated, ProductListItem } from "@/api/types";
import { formatMoney } from "@/lib/format";

export default function AdminProducts() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => (await api.get<Paginated<ProductListItem>>("/products/")).data,
  });

  const del = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/products/${id}/`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-products"] }),
  });

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight={800}>
          Produits (CRUD)
        </Typography>
        <Button component={RouterLink} to="/admin/produits/nouveau" variant="contained" startIcon={<AddIcon />}>
          Nouveau
        </Button>
      </Stack>
      <Card>
        {isLoading ? (
          <Typography sx={{ p: 2 }}>Chargement…</Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Prix</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Actif</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {(data?.results ?? []).map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{formatMoney(p.price)}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>{p.is_active ? "oui" : "non"}</TableCell>
                  <TableCell align="right">
                    <IconButton component={RouterLink} to={`/admin/produits/${p.id}`} aria-label="éditer">
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton aria-label="supprimer" color="error" onClick={() => del.mutate(p.id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </Container>
  );
}
