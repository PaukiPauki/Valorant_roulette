<div align="center">

# VALORANT ROULETTE

### La roulette d'achat pour vos rounds VALORANT

Choisissez un agent, ajustez vos crédits et laissez la roulette composer votre équipement : arme, capacités et bouclier.

![Overwolf](https://img.shields.io/badge/Overwolf-App-ff4655?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=for-the-badge&logo=javascript&logoColor=111111)
![HTML5](https://img.shields.io/badge/HTML5-Interface-e34f26?style=for-the-badge&logo=html5&logoColor=ffffff)
![CSS3](https://img.shields.io/badge/CSS3-Styles-1572b6?style=for-the-badge&logo=css3&logoColor=ffffff)
![VALORANT API](https://img.shields.io/badge/Data-VALORANT%20API-ff4655?style=for-the-badge)

</div>

---

## À propos

VALORANT ROULETTE est une application Overwolf conçue pour ajouter une part d'aléatoire à la phase d'achat. Elle affiche trois rouleaux synchronisés : **arme**, **capacités de l'agent sélectionné** et **bouclier**. Le total dépensé et les crédits restants sont calculés après chaque tirage.

## Fonctionnalités

- Tirage aléatoire d'une arme, des capacités et d'un bouclier.
- Capacités associées aux touches `C`, `Q` et `E` à partir du slot retourné par l'API.
- Respect des coûts et du nombre de charges configurés localement.
- Saisie directe du solde avec le clavier ou le pavé numérique (de 0 à 9 000 crédits).
- Ajustement rapide des crédits par pas de 100 ou 500.
- Chargement des armes, agents, noms et icônes depuis [valorant-api.com](https://valorant-api.com/).
- Détection en jeu de l'agent local et de ses crédits via les événements VALORANT d'Overwolf.
- Synchronisation automatique du menu d'agent et du solde lorsque les données du match sont disponibles.
- Valeurs intégrées de secours si l'API ou le fichier local d'économie n'est pas accessible.

## Touches et commandes

| Touche / commande | Action |
| --- | --- |
| `Espace` | Lancer la roulette, si aucun tirage n'est en cours |
| `Ctrl` + `Maj` + `X` | Afficher ou masquer la fenêtre en jeu Overwolf |
| Champ `CREDITS` | Affiche le solde détecté en jeu; permet aussi de saisir manuellement un solde entier entre 0 et 9 000, au clavier ou au pavé numérique |
| Bouton `-500` | Retirer 500 crédits |
| Bouton `-100` | Retirer 100 crédits |
| Bouton `+100` | Ajouter 100 crédits |
| Bouton `+500` | Ajouter 500 crédits |

Le raccourci Overwolf peut être modifié depuis les paramètres de raccourcis de l'application.
Le champ de crédits est désactivé pendant un tirage; le solde utilisé par la roulette reste ainsi fixe jusqu'à la fin de l'animation. Hors match ou lorsque les événements de jeu ne fournissent pas de solde, la saisie manuelle et les boutons restent disponibles.

## Sources de données

L'application interroge les routes publiques suivantes :

- `https://valorant-api.com/v1/weapons` pour les armes et leurs icônes.
- `https://valorant-api.com/v1/gear` pour l'équipement et les boucliers.
- `https://valorant-api.com/v1/agents?isPlayableCharacter=true` pour les agents, capacités, descriptions et icônes.

Les événements Overwolf VALORANT sont également utilisés pour détecter l'agent local (`me`) et le montant `money` de l'entrée de tableau des scores marquée `is_local`. Le manifeste déclare le jeu VALORANT (`21640`) et l'application s'abonne aux fonctionnalités `me` et `match_info`.

L'API des agents ne fournit pas les prix d'achat et charges nécessaires à la roulette. Ceux-ci sont complétés localement. Le fichier facultatif `abilities_economy.json`, placé à côté de `in_game.html`, permet de définir ces valeurs par nom d'agent et par slot d'API. Les entrées manquantes utilisent les valeurs intégrées dans `in_game.js`.

Exemple de structure :

```json
{
  "Breach": {
    "Ability1": { "key": "Q", "cost": 250, "maxCharges": 2 },
    "Ability2": { "key": "E", "cost": 0, "maxCharges": 1 },
    "Grenade": { "key": "C", "cost": 200, "maxCharges": 1 }
  }
}
```

Les slots API `Ability1`, `Ability2` et `Grenade` désignent les capacités assignées aux touches `Q`, `E` et `C` par défaut. Le champ `key` du JSON permet de configurer la touche affichée dans la roulette.

## Technologies

- **Overwolf Web App** : lancement, fenêtre en jeu et raccourci global.
- **HTML5** : structure de l'interface.
- **CSS3** : présentation et animations des rouleaux.
- **JavaScript (ES6+)** : logique du tirage, calcul des crédits et fusion des données.
- **Fetch API** : appels HTTP à VALORANT API.
- **JSON** : données locales d'économie des capacités.

Aucune étape de compilation n'est requise. L'application est configurée pour s'exécuter comme une Web App Overwolf.

## Fichiers principaux

| Fichier | Rôle |
| --- | --- |
| `manifest.json` | Configuration Overwolf, fenêtres et raccourci global |
| `background.html` / `background.js` | Fenêtre de fond et logique de démarrage Overwolf |
| `in_game.html` | Interface de la roulette |
| `in_game.js` | Appels API, fusion des données et logique de jeu |
| `abilities_economy.json` | Complément local facultatif : coûts, touches et charges par capacité |
| `IconMouseNormal.png` / `IconMouseOver.png` | Icônes Overwolf |
| `launcher_icon.ico` | Icône de lancement |

## Démarrage

1. Installer ou lancer l'application depuis l'environnement de développement Overwolf.
2. Démarrer VALORANT et ouvrir la fenêtre de roulette avec `Ctrl` + `Maj` + `X`.
3. Sélectionner un agent, ajuster les crédits si nécessaire, puis lancer avec `Espace`.

L'application cible VALORANT via l'identifiant de jeu Overwolf `21640`.
