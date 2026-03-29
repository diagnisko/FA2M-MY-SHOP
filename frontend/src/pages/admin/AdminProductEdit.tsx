import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import type { Category, ProductDetail } from "@/api/types";

export default function AdminProductEdit() {
  const { id } = useParams();
  const isNew = id === "nouveau" || !id;
  const numericId = id && id !== "nouveau" ? Number(id) : NaN;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await api.get<Category[]>("/categories/")).data,
  });

  const { data: existing } = useQuery({
    queryKey: ["product", numericId],
    queryFn: async () => (await api.get<ProductDetail>(`/products/${numericId}/`)).data,
    enabled: Number.isFinite(numericId),
  });

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [category, setCategory] = useState<string>("");
  const [isActive, setIsActive] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!existing) return;
    setName(existing.name);
    setSlug(existing.slug);
    setDescription(existing.description);
    setPrice(String(existing.price));
    setStock(String(existing.stock));
    setCategory(existing.category != null ? String(existing.category) : "");
    setIsActive(existing.is_active);
  }, [existing]);

  const save = useMutation({
    mutationFn: async () => {
      setError(null);
      const appendProduct = (fd: FormData) => {
        fd.append("name", name);
        if (slug) fd.append("slug", slug);
        fd.append("description", description);
        fd.append("price", String(price));
        fd.append("stock", String(stock));
        if (category) fd.append("category", category);
        fd.append("is_active", isActive ? "true" : "false");
      };

      if (isNew) {
        const fd = new FormData();
        appendProduct(fd);
        if (file) fd.append("main_image", file);
        await api.post("/products/", fd, { headers: { "Content-Type": "multipart/form-data" } });
        return;
      }
      if (file) {
        const fd = new FormData();
        appendProduct(fd);
        fd.append("main_image", file);
        await api.patch(`/products/${numericId}/`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await api.patch(`/products/${numericId}/`, {
          name,
          slug: slug || undefined,
          description,
          price,
          stock: Number(stock),
          category: category ? Number(category) : null,
          is_active: isActive,
        });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin/produits");
    },
    onError: () => setError("Enregistrement impossible (vérifiez les champs et les droits)."),
  });

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        {isNew ? "Nouveau produit" : `Modifier #${numericId}`}
      </Typography>
      <Button component={RouterLink} to="/admin/produits" sx={{ mb: 2 }}>
        Retour liste
      </Button>
      <Stack spacing={2} component="form" onSubmit={(e) => { e.preventDefault(); save.mutate(); }}>
        <TextField label="Nom" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
        <TextField label="Slug (optionnel)" value={slug} onChange={(e) => setSlug(e.target.value)} fullWidth helperText="Généré automatiquement si vide" />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required multiline minRows={4} fullWidth />
        <TextField label="Prix" value={price} onChange={(e) => setPrice(e.target.value)} required fullWidth />
        <TextField label="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} required fullWidth />
        <TextField select label="Catégorie" value={category} onChange={(e) => setCategory(e.target.value)} fullWidth>
          <MenuItem value="">—</MenuItem>
          {(categories ?? []).map((c) => (
            <MenuItem key={c.id} value={String(c.id)}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />} label="Actif (visible boutique)" />
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Image principale
          </Typography>
          <Button variant="outlined" component="label">
            Choisir un fichier
            <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </Button>
          {file && (
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              {file.name}
            </Typography>
          )}
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" size="large" disabled={save.isPending}>
          Enregistrer
        </Button>
      </Stack>
    </Container>
  );
}
