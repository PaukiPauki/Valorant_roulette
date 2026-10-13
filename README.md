<div align="center">

# VALORANT ROULETTE

### The buy-phase roulette for your VALORANT rounds

Choose an agent, adjust your credits, and let the roulette build your loadout: weapon, abilities, and shield.

![Overwolf](https://img.shields.io/badge/Overwolf-App-ff4655?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=for-the-badge&logo=javascript&logoColor=111111)
![HTML5](https://img.shields.io/badge/HTML5-Interface-e34f26?style=for-the-badge&logo=html5&logoColor=ffffff)
![CSS3](https://img.shields.io/badge/CSS3-Styles-1572b6?style=for-the-badge&logo=css3&logoColor=ffffff)
![VALORANT API](https://img.shields.io/badge/Data-VALORANT%20API-ff4655?style=for-the-badge)

</div>

---

## About

VALORANT ROULETTE is an Overwolf app designed to add an element of randomness to the buy phase. It displays three synchronized reels: **weapon**, **the selected agent's abilities**, and **shield**. The total cost and remaining credits are calculated after each spin.

## Features

- Randomly selects a weapon, abilities, and a shield.
- Maps abilities to the `C`, `Q`, and `E` keys based on the slots returned by the API.
- Applies locally configured ability costs and charge limits.
- Lets you enter your credit balance directly using a keyboard or numpad (from 0 to 9,000 credits).
- Quickly adjusts credits in increments of 100 or 500.
- Loads weapons, agents, names, and icons from [valorant-api.com](https://valorant-api.com/).
- Detects the local agent and credit balance in-game through Overwolf VALORANT events.
- Automatically synchronizes the agent selector and balance when match data is available.
- Uses built-in fallback values if the API or local economy file is unavailable.

## Controls

| Key / control | Action |
| --- | --- |
| `Space` | Spin the roulette if no spin is already in progress |
| `Ctrl` + `Shift` + `X` | Show or hide the Overwolf in-game window |
| `CREDITS` field | Shows the detected in-game balance; also lets you manually enter a whole-number balance from 0 to 9,000 using a keyboard or numpad |
| `-500` button | Subtract 500 credits |
| `-100` button | Subtract 100 credits |
| `+100` button | Add 100 credits |
| `+500` button | Add 500 credits |

The Overwolf hotkey can be changed in the app's hotkey settings.
The credits field is disabled during a spin so the balance used by the roulette stays fixed until the animation ends. Manual entry and the adjustment buttons remain available outside a match or whenever game events do not provide a balance.

## Data sources

The app makes requests to the following public endpoints:

- `https://valorant-api.com/v1/weapons` for weapons and their icons.
- `https://valorant-api.com/v1/gear` for gear and shields.
- `https://valorant-api.com/v1/agents?isPlayableCharacter=true` for agents, abilities, descriptions, and icons.

Overwolf VALORANT events are also used to detect the local agent (`me`) and the `money` value for the scoreboard entry marked `is_local`. The manifest declares VALORANT (`21640`) as the target game, and the app subscribes to the `me` and `match_info` features.

The agents API does not provide the purchase costs and charge counts required by the roulette, so these are supplied locally. The optional `abilities_economy.json` file, placed next to `in_game.html`, lets you define these values by agent name and API slot. Any missing entries use the built-in values in `in_game.js`.

Example structure:

```json
{
  "Breach": {
    "Ability1": { "key": "Q", "cost": 250, "maxCharges": 2 },
    "Ability2": { "key": "E", "cost": 0, "maxCharges": 1 },
    "Grenade": { "key": "C", "cost": 200, "maxCharges": 1 }
  }
}
```

The API slots `Ability1`, `Ability2`, and `Grenade` correspond to the abilities assigned to the `Q`, `E`, and `C` keys by default. The JSON `key` field lets you configure which key is displayed in the roulette.

## Technologies

- **Overwolf Web App**: launch, in-game window, and global hotkey.
- **HTML5**: interface structure.
- **CSS3**: styling and reel animations.
- **JavaScript (ES6+)**: spin logic, credit calculations, and data merging.
- **Fetch API**: HTTP requests to the VALORANT API.
- **JSON**: local ability economy data.

No build step is required. The app is configured to run as an Overwolf Web App.

## Main files

| File | Purpose |
| --- | --- |
| `manifest.json` | Overwolf configuration, windows, and global hotkey |
| `background.html` / `background.js` | Background window and Overwolf startup logic |
| `in_game.html` | Roulette interface |
| `in_game.js` | API requests, data merging, and game logic |
| `abilities_economy.json` | Optional local settings for ability costs, keys, and charges |
| `IconMouseNormal.png` / `IconMouseOver.png` | Overwolf icons |
| `launcher_icon.ico` | Launcher icon |

## Getting started

1. Install or launch the app from the Overwolf development environment.
2. Start VALORANT and open the roulette window with `Ctrl` + `Shift` + `X`.
3. Select an agent, adjust your credits if needed, then spin with `Space`.

The app targets VALORANT using Overwolf game ID `21640`.