/** Formate les erreurs renvoyées par Django REST Framework (champs + non_field_errors). */

const LABELS: Record<string, string> = {
  non_field_errors: "",
  password: "Mot de passe",
  password_confirm: "Confirmation du mot de passe",
  username: "Identifiant",
  email: "Email",
  phone: "Téléphone",
};

function pushField(parts: string[], key: string, val: unknown) {
  if (val == null) return;
  const label = LABELS[key] ?? key;
  if (Array.isArray(val)) {
    const s = val.map((x) => String(x)).filter(Boolean).join(" ");
    if (!s) return;
    parts.push(label ? `${label} : ${s}` : s);
  } else if (typeof val === "string") {
    parts.push(label ? `${label} : ${val}` : val);
  }
}

export function formatDrfError(data: unknown): string {
  if (data == null || typeof data !== "object") {
    return "Impossible de contacter le serveur. Vérifiez la connexion ou que l’API tourne (port 8000).";
  }
  const d = data as Record<string, unknown>;

  if (typeof d.detail === "string") return d.detail;
  if (Array.isArray(d.detail)) return d.detail.map(String).join(" ");

  const order = ["non_field_errors", "password", "password_confirm", "username", "email", "phone"];
  const parts: string[] = [];
  for (const key of order) {
    if (key in d) pushField(parts, key, d[key]);
  }
  for (const [key, val] of Object.entries(d)) {
    if (key === "detail" || order.includes(key)) continue;
    pushField(parts, key, val);
  }

  if (parts.length) return parts.join(" — ");

  return "Inscription impossible. Mot de passe : au moins 8 caractères, pas un mot courant ni uniquement des chiffres.";
}
