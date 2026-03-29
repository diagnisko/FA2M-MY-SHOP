"""Normalisation des numéros pour l’inscription / profil (Sénégal +221 par défaut)."""

import re


def normalize_phone(value: str) -> str:
    """
    Retourne un numéro en E.164 simplifié (+XXXXXXXX…), ou chaîne vide si vide en entrée.

    Formats acceptés (exemples Sénégal) :
    - +221 78 133 23 23
    - 221781332323
    - 0781332323  (0 + 9 chiffres)
    - 781332323   (9 chiffres seuls → préfixe +221)

    Autres pays : commencez par + et l’indicatif (8 à 15 chiffres au total).
    """
    if value is None:
        return ""
    raw = value.strip()
    if not raw:
        return ""

    digits = re.sub(r"\D", "", raw)
    if not digits:
        raise ValueError("Le numéro ne contient aucun chiffre.")

    # 0 + 9 chiffres : mobile Sénégal (07x …), pas les 06 français etc.
    if len(digits) == 10 and digits.startswith("0") and digits[1] == "7":
        return "+221" + digits[1:]

    if len(digits) == 10 and digits.startswith("0"):
        raise ValueError(
            "Numéro à 10 chiffres commençant par 0 : pour le Sénégal, utilisez 07… "
            "ou +221…. Pour un autre pays, utilisez +indicatif (ex. +33…)."
        )

    # 221 + 9 chiffres
    if len(digits) == 12 and digits.startswith("221"):
        return "+" + digits

    # 9 chiffres seuls → Sénégal
    if len(digits) == 9:
        return "+221" + digits

    # International (8 à 15 chiffres), y compris si l’utilisateur a saisi +33…
    if 8 <= len(digits) <= 15:
        return "+" + digits

    raise ValueError(
        "Format non reconnu. Sénégal : +221 et 9 chiffres, ou 0XX XXX XX XX, ou 9 chiffres. "
        "Autre pays : +indicatif puis le numéro."
    )
