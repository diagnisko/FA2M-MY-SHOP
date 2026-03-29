import { useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, mediaUrl } from "@/api/client";
import type { ProductDetail } from "@/api/types";
import { formatMoney } from "@/lib/format";
import { useAuthStore } from "@/store/authStore";

export default function ProductDetailPage() {
  const { id } = useParams();
  const numericId = Number(id);
  const [qty, setQty] = useState(1);
  const access = useAuthStore((s) => s.access);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: p, isLoading } = useQuery({
    queryKey: ["product", numericId],
    queryFn: async () => (await api.get<ProductDetail>(`/products/${numericId}/`)).data,
    enabled: Number.isFinite(numericId),
  });

  const addMut = useMutation({
    mutationFn: async () => {
      await api.post("/cart/items/", { product: numericId, quantity: qty });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      navigate("/panier");
    },
  });

  if (!Number.isFinite(numericId)) return <Typography>Produit introuvable.</Typography>;
  if (isLoading || !p) return <Container sx={{ py: 4 }}><Typography>Chargement…</Typography></Container>;

  const imgs = [p.main_image, ...p.images.map((i) => i.image)].filter(Boolean) as string[];

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/boutique" underline="hover" color="inherit">
          Boutique
        </Link>
        <Typography color="text.primary">{p.name}</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={mediaUrl(imgs[0]) || "https://placehold.co/1200x900/e3eaf2/0d47a1?text=FA2M"}
            alt=""
            sx={{ width: "100%", borderRadius: 2, objectFit: "cover", maxHeight: 480 }}
            loading="lazy"
          />
          {p.images.length > 0 && (
            <ImageList cols={4} gap={8} sx={{ mt: 1 }}>
              {p.images.map((im) => (
                <ImageListItem key={im.id}>
                  <img src={mediaUrl(im.image)} alt="" loading="lazy" style={{ borderRadius: 8, objectFit: "cover", height: 72 }} />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            {p.name}
          </Typography>
          <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>
            {formatMoney(p.price)}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Stock : {p.stock} {p.category_detail && <> — {p.category_detail.name}</>}
          </Typography>
          <Typography sx={{ whiteSpace: "pre-line", mb: 3 }}>{p.description}</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
            <TextField
              type="number"
              size="small"
              label="Quantité"
              inputProps={{ min: 1, max: p.stock }}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Math.min(p.stock, Number(e.target.value) || 1)))}
              sx={{ width: 120 }}
            />
            <Button
              size="large"
              disabled={p.stock < 1 || addMut.isPending}
              onClick={() => {
                if (!access) {
                  navigate("/connexion");
                  return;
                }
                addMut.mutate();
              }}
            >
              Ajouter au panier
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
