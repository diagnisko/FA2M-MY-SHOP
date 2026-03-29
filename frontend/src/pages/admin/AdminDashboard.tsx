import { Link as RouterLink } from "react-router-dom";
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import type { AdminOrder, Paginated, ProductListItem } from "@/api/types";

export default function AdminDashboard() {
  const { data: products } = useQuery({
    queryKey: ["admin-products-count"],
    queryFn: async () => (await api.get<Paginated<ProductListItem>>("/products/?page_size=1")).data,
  });
  const { data: orders } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => (await api.get<AdminOrder[]>("/admin/orders/")).data,
  });
  const { data: users } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => (await api.get<{ id: number }[]>("/admin/users/")).data,
  });

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Tableau de bord
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Stocks, commandes et comptes clients. CRUD produits et mise à jour des statuts de commande.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardActionArea component={RouterLink} to="/admin/produits">
              <CardContent>
                <Inventory2OutlinedIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" fontWeight={700}>
                  Produits
                </Typography>
                <Typography color="text.secondary">{products?.count ?? "—"} articles</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardActionArea component={RouterLink} to="/admin/commandes">
              <CardContent>
                <LocalShippingOutlinedIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" fontWeight={700}>
                  Commandes
                </Typography>
                <Typography color="text.secondary">{orders?.length ?? "—"} suivies</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                Utilisateurs
              </Typography>
              <Typography color="text.secondary">{(users?.length ?? 0).toString()} comptes (aperçu)</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
