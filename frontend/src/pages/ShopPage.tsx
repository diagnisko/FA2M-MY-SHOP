import { useMemo } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useQuery } from "@tanstack/react-query";
import { api, mediaUrl } from "@/api/client";
import type { Category, Paginated, ProductListItem } from "@/api/types";
import { formatMoney } from "@/lib/format";

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || "1");
  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const view = (params.get("view") as "grid" | "list") || "grid";

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await api.get<Category[]>("/categories/")).data,
  });

  const queryString = useMemo(() => {
    const q = new URLSearchParams();
    if (search) q.set("search", search);
    if (category) q.set("category", category);
    q.set("page", String(page));
    return q.toString();
  }, [search, category, page]);

  const { data, isLoading } = useQuery({
    queryKey: ["products", queryString],
    queryFn: async () => (await api.get<Paginated<ProductListItem>>(`/products/?${queryString}`)).data,
  });

  const PAGE_SIZE = 24;
  const totalPages = data ? Math.max(1, Math.ceil(data.count / PAGE_SIZE)) : 1;

  function setFilter(next: Partial<{ page: number; category: string; view: string }>) {
    const p = new URLSearchParams(params);
    if (next.page !== undefined) p.set("page", String(next.page));
    if (next.category !== undefined) {
      if (next.category) p.set("category", next.category);
      else p.delete("category");
      p.set("page", "1");
    }
    if (next.view !== undefined) p.set("view", next.view);
    setParams(p);
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }} sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800} sx={{ flex: 1 }}>
          Boutique
        </Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="cat">Catégorie</InputLabel>
          <Select
            labelId="cat"
            label="Catégorie"
            value={category}
            onChange={(e) => setFilter({ category: String(e.target.value) })}
          >
            <MenuItem value="">Toutes</MenuItem>
            {(categories ?? []).map((c) => (
              <MenuItem key={c.id} value={String(c.id)}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={view}
          onChange={(_, v) => v && setFilter({ view: v })}
        >
          <ToggleButton value="grid" aria-label="grille">
            <ViewModuleIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="list" aria-label="liste">
            <ViewListIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {search && (
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Résultats pour « {search} » — {data?.count ?? "…"} produit(s)
        </Typography>
      )}
      {isLoading && <Typography>Chargement…</Typography>}
      <Grid container spacing={2}>
        {(data?.results ?? []).map((p) =>
          view === "grid" ? (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
              <Card>
                <CardActionArea component={RouterLink} to={`/produit/${p.id}`}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={mediaUrl(p.main_image) || "https://placehold.co/800x600/e3eaf2/0d47a1?text=FA2M"}
                    alt=""
                    sx={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                  <CardContent>
                    <Typography fontWeight={700} gutterBottom>
                      {p.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap title={p.description}>
                      {p.description}
                    </Typography>
                    <Typography color="primary" fontWeight={700} sx={{ mt: 1 }}>
                      {formatMoney(p.price)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ) : (
            <Grid item xs={12} key={p.id}>
              <Card>
                <CardActionArea component={RouterLink} to={`/produit/${p.id}`} sx={{ display: "flex", alignItems: "stretch" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 160, minHeight: 120, objectFit: "cover" }}
                    image={mediaUrl(p.main_image) || "https://placehold.co/800x600/e3eaf2/0d47a1?text=FA2M"}
                    alt=""
                    loading="lazy"
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography fontWeight={700}>{p.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {p.description}
                    </Typography>
                    <Typography color="primary" fontWeight={700} sx={{ mt: 1 }}>
                      {formatMoney(p.price)} — Stock {p.stock}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ),
        )}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setFilter({ page: value })}
          color="primary"
        />
      </Box>
    </Container>
  );
}
