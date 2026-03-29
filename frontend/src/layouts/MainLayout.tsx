import { useState } from "react";
import { Link as RouterLink, Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Badge,
  Box,
  Container,
  Drawer,
  IconButton,
  InputAdornment,
  Link,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import type { CartResponse } from "@/api/types";
import { useAuthStore } from "@/store/authStore";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/boutique", label: "Boutique" },
];

export default function MainLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawer, setDrawer] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const access = useAuthStore((s) => s.access);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => (await api.get<CartResponse>("/cart/")).data,
    enabled: !!access,
  });
  const cartCount = cart?.items.reduce((s, i) => s + i.quantity, 0) ?? 0;

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const s = q.trim();
    navigate(s ? `/boutique?search=${encodeURIComponent(s)}` : "/boutique");
    setDrawer(false);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Toolbar sx={{ gap: 1, flexWrap: "wrap" }}>
          {isMobile && (
            <IconButton edge="start" onClick={() => setDrawer(true)} aria-label="menu">
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ fontWeight: 800, textDecoration: "none", color: "primary.main", mr: 1 }}
          >
            FA2M
          </Typography>
          {!isMobile && (
            <Box component="nav" sx={{ display: "flex", gap: 2 }}>
              {nav.map((item) => (
                <Link key={item.to} component={RouterLink} to={item.to} underline="hover" color="inherit" fontWeight={600}>
                  {item.label}
                </Link>
              ))}
              {user?.is_staff && (
                <Link component={RouterLink} to="/admin" underline="hover" color="secondary" fontWeight={600}>
                  Admin
                </Link>
              )}
            </Box>
          )}
          <Box component="form" onSubmit={onSearch} sx={{ flex: 1, maxWidth: { md: 420 }, minWidth: 120 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Rechercher un produit…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <IconButton component={RouterLink} to={access ? "/panier" : "/connexion"} color="inherit" aria-label="panier">
            <Badge badgeContent={cartCount || undefined} color="secondary">
              <ShoppingBagOutlinedIcon />
            </Badge>
          </IconButton>
          {!access ? (
            <Link component={RouterLink} to="/connexion" fontWeight={600}>
              Connexion
            </Link>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Link component={RouterLink} to="/commandes" fontWeight={600} noWrap>
                {user?.first_name || user?.username}
              </Link>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                sx={{ cursor: "pointer", border: 0, background: "none", font: "inherit", color: "text.secondary" }}
              >
                Déconnexion
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <Box sx={{ width: 260, pt: 2 }} role="presentation" onClick={() => setDrawer(false)}>
          <List>
            {nav.map((item) => (
              <ListItemButton key={item.to} component={RouterLink} to={item.to}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            {user?.is_staff && (
              <ListItemButton component={RouterLink} to="/admin">
                <ListItemText primary="Administration" />
              </ListItemButton>
            )}
            {access && (
              <ListItemButton component={RouterLink} to="/commandes">
                <ListItemText primary="Mes commandes" />
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flex: 1, pb: 4 }}>
        <Outlet />
      </Box>
      <Box component="footer" sx={{ py: 3, borderTop: 1, borderColor: "divider", bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary">
            FA2M — Paiement à la livraison ou sur place. Application PWA & Android (Capacitor).
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
