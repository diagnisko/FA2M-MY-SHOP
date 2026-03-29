import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Stack, Typography } from "@mui/material";
import { api, mediaUrl } from "@/api/client";
import type { Paginated, ProductListItem } from "@/api/types";

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ["products-home"],
    queryFn: async () => (await api.get<Paginated<ProductListItem>>("/products/?page_size=8")).data,
  });

  return (
    <Box>
      <Box
        sx={{
          background: "linear-gradient(135deg, #0d47a1 0%, #00838f 100%)",
          color: "common.white",
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, mb: 2, maxWidth: 720 }}>
            Boutique moderne : recherche, filtres, panier et commandes suivies.
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.92, mb: 3, maxWidth: 640, fontWeight: 400 }}>
            Paiement à la livraison ou sur place. PWA et application Android prêtes pour évoluer vers Stripe, PayPal ou Mobile
            Money.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button component={RouterLink} to="/boutique" variant="contained" color="inherit" size="large" sx={{ color: "primary.dark" }}>
              Voir le catalogue
            </Button>
            <Button component={RouterLink} to="/inscription" variant="outlined" color="inherit" size="large">
              Créer un compte
            </Button>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Sélection
        </Typography>
        <Grid container spacing={2}>
          {(data?.results ?? []).map((p) => (
            <Grid item xs={12} sm={6} md={3} key={p.id}>
              <Card>
                <CardActionArea component={RouterLink} to={`/produit/${p.id}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={mediaUrl(p.main_image) || "https://placehold.co/600x400/e3eaf2/0d47a1?text=FA2M"}
                    alt=""
                    sx={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                  <CardContent>
                    <Typography fontWeight={700} gutterBottom noWrap title={p.name}>
                      {p.name}
                    </Typography>
                    <Typography color="primary" fontWeight={700}>
                      {Number(p.price).toLocaleString("fr-FR", { style: "currency", currency: "XOF", maximumFractionDigits: 0 })}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
