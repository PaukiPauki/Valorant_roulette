// --- BASE DE DONNÉES ---
const DEFAULT_WEAPONS = [
  { name: 'Classic', category: 'Sidearm', cost: 0 },
  { name: 'Shorty', category: 'Sidearm', cost: 300 },
  { name: 'Frenzy', category: 'Sidearm', cost: 450 },
  { name: 'Ghost', category: 'Sidearm', cost: 500 },
  { name: 'Bandit', category: 'Sidearm', cost: 600 },
  { name: 'Sheriff', category: 'Sidearm', cost: 800 },
  { name: 'Stinger', category: 'SMG', cost: 1100 },
  { name: 'Spectre', category: 'SMG', cost: 1600 },
  { name: 'Bucky', category: 'Shotgun', cost: 850 },
  { name: 'Judge', category: 'Shotgun', cost: 1850 },
  { name: 'Bulldog', category: 'Rifle', cost: 2050 },
  { name: 'Guardian', category: 'Rifle', cost: 2250 },
  { name: 'Warden', category: 'Rifle', cost: 2900 },
  { name: 'Phantom', category: 'Rifle', cost: 2900 },
  { name: 'Vandal', category: 'Rifle', cost: 2900 },
  { name: 'Marshal', category: 'Sniper', cost: 950 },
  { name: 'Outlaw', category: 'Sniper', cost: 2400 },
  { name: 'Operator', category: 'Sniper', cost: 4700 },
  { name: 'Ares', category: 'Heavy', cost: 1600 },
  { name: 'Odin', category: 'Heavy', cost: 3200 }
];

const DEFAULT_SHIELDS = [
  { name: 'Nothing', category: 'Shield', cost: 0 },
  { name: 'Light Armor', category: 'Shield', cost: 400 },
  { name: 'Regen Shield', category: 'Shield', cost: 650 },
  { name: 'Heavy Armor', category: 'Shield', cost: 1000 }
];

let WEAPONS = [...DEFAULT_WEAPONS];
let SHIELDS = [...DEFAULT_SHIELDS];
let ABILITIES_ECONOMY = {};
const WEAPON_PREFERENCES_KEY = 'valorantRoulette.disabledWeapons';
let DISABLED_WEAPONS = new Set();
const FULL_BUY_WEAPONS = new Set(['vandal', 'phantom', 'warden', 'operator', 'odin']);

const DEFAULT_AGENTS = {
  Astra: [
    { key: 'C', name: 'Nova Pulse', cost: 100, maxPurchases: 1 },
    { key: 'Q', name: 'Nebula', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'Gravity Well', cost: 250, maxPurchases: 1 }
  ],
  Breach: [
    { key: 'Q', name: 'Flashpoint', cost: 250, maxPurchases: 2 },
    { key: 'E', name: 'Aftershock', cost: 200, maxPurchases: 1 }
  ],
  Brimstone: [
    { key: 'C', name: 'Stim Beacon', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Incendiary', cost: 250, maxPurchases: 1 },
    { key: 'E', name: 'Sky Smoke', cost: 100, freeCharges: 1, maxPurchases: 2 }
  ],
  Chamber: [
    { key: 'C', name: 'Trademark', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Head Hunter', cost: 100, maxPurchases: 8 }
  ],
  Clove: [
    { key: 'C', name: 'Pick-me-up', cost: 100, maxPurchases: 1 },
    { key: 'Q', name: 'Meddle', cost: 250, maxPurchases: 1 },
    { key: 'E', name: 'Ruse', cost: 150, maxPurchases: 1 }
  ],
  Cypher: [
    { key: 'C', name: 'Trapwire', cost: 200, maxPurchases: 2 },
    { key: 'Q', name: 'Cyber Cage', cost: 100, maxPurchases: 2 }
  ],
  Deadlock: [
    { key: 'C', name: 'Sonic Sensor', cost: 200, maxPurchases: 2 },
    { key: 'Q', name: 'Barrier Mesh', cost: 300, maxPurchases: 1 }
  ],
  Fade: [
    { key: 'C', name: 'Seize', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Prowler', cost: 250, maxPurchases: 2 },
    { key: 'E', name: 'Haunt', cost: 0, freeCharges: 1, maxPurchases: 0 }
  ],
  Gekko: [
    { key: 'C', name: 'Wingman', cost: 300, maxPurchases: 1 },
    { key: 'Q', name: 'Mosh Pit', cost: 250, maxPurchases: 1 },
    { key: 'E', name: 'Dizzy', cost: 0, freeCharges: 1, maxPurchases: 0 }
  ],
  Harbor: [
    { key: 'C', name: 'Storm Surge', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'High Tide', cost: 300, maxPurchases: 1 }
  ],
  Iso: [
    { key: 'C', name: 'Undercut', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Contingency', cost: 200, maxPurchases: 1 }
  ],
  Jett: [
    { key: 'C', name: 'Cloudburst', cost: 200, maxPurchases: 2 },
    { key: 'Q', name: 'Updraft', cost: 150, maxPurchases: 1 }
  ],
  'KAY/O': [
    { key: 'C', name: 'FRAG/ment', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'FLASH/drive', cost: 250, maxPurchases: 2 }
  ],
  Killjoy: [
    { key: 'C', name: 'Alarmbot', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Nano Swarm', cost: 200, maxPurchases: 2 }
  ],
  Neon: [
    { key: 'C', name: 'Fast Lane', cost: 300, maxPurchases: 1 },
    { key: 'Q', name: 'Relay Bolt', cost: 200, maxPurchases: 1 }
  ],
  Omen: [
    { key: 'C', name: 'Shrouded Step', cost: 100, maxPurchases: 2 },
    { key: 'Q', name: 'Paranoia', cost: 250, maxPurchases: 1 },
    { key: 'E', name: 'Dark Cover', cost: 150, freeCharges: 1, maxPurchases: 1 }
  ],
  Phoenix: [
    { key: 'C', name: 'Blaze', cost: 150, maxPurchases: 1 },
    { key: 'Q', name: 'Hot Hands', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'Curveball', cost: 250, freeCharges: 1, maxPurchases: 1 }
  ],
  Raze: [
    { key: 'C', name: 'Boom Bot', cost: 300, maxPurchases: 1 },
    { key: 'Q', name: 'Blast Pack', cost: 200, maxPurchases: 1 }
  ],
  Reyna: [
    { key: 'C', name: 'Leer', cost: 250, maxPurchases: 2 },
    { key: 'Q', name: 'Devour/Dismiss', cost: 200, maxPurchases: 2 },
  ],
  Sage: [
    { key: 'C', name: 'Barrier Orb', cost: 300, maxPurchases: 1 },
    { key: 'Q', name: 'Slow Orb', cost: 200, maxPurchases: 2 }
  ],
  Skye: [
    { key: 'C', name: 'Trailblazer', cost: 300, maxPurchases: 1 },
    { key: 'Q', name: 'Guiding Light', cost: 250, maxPurchases: 1 },
    { key: 'E', name: 'Regrowth', cost: 150, maxPurchases: 1 }
  ],
  Sova: [
    { key: 'C', name: 'Owl Drone', cost: 400, maxPurchases: 1 },
    { key: 'Q', name: 'Shock Bolt', cost: 150, maxPurchases: 2 },
    { key: 'E', name: 'Recon Bolt', cost: 0, freeCharges: 1, maxPurchases: 0 }
  ],
  Tejo: [
    { key: 'C', name: 'Special Delivery', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Guided Salvo', cost: 150, maxPurchases: 1 },
    { key: 'E', name: 'Stealth Drone', cost: 400, maxPurchases: 1 }
  ],
  Viper: [
    { key: 'C', name: 'Snake Bite', cost: 300, maxPurchases: 1 },
    { key: 'Q', name: 'Poison Cloud', cost: 200, maxPurchases: 1 }
  ],
  Vyse: [
    { key: 'C', name: 'RazorVine', cost: 150, maxPurchases: 2 },
    { key: 'Q', name: 'Shear', cost: 200, maxPurchases: 1 }
  ],
  Waylay: [
    { key: 'C', name: 'Saturate', cost: 300, maxPurchases: 1 },
    { key: 'Q', name: 'LightSpeed', cost: 300, maxPurchases: 1 }
  ],
  Yoru: [
    { key: 'C', name: 'Fakeout', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Blindside', cost: 250, maxPurchases: 1 },
    { key: 'E', name: 'Gatecrash', cost: 150, maxPurchases: 2 }
  ],
  Miks: [
    { key: 'C', name: 'M-Pulse', cost: 250, maxPurchases: 2 },
    { key: 'Q', name: 'Harmonize', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'WaveForm', cost: 150, maxPurchases: 1 }
  ]
};

const NORMALIZED_DEFAULT_AGENTS = Object.fromEntries(
  Object.entries(DEFAULT_AGENTS).map(([agentName, abilities]) => [
    agentName,
    abilities.map(ability => {
      const hasExplicitFreeCharges = ability.freeCharges !== undefined;
      const freeCharges = hasExplicitFreeCharges
        ? ability.freeCharges
        : Number(ability.cost) === 0 ? (ability.maxPurchases ?? 1) : 0;

      return {
        ...ability,
        freeCharges,
        maxPurchases: hasExplicitFreeCharges
          ? (ability.maxPurchases ?? 0)
          : Number(ability.cost) === 0 ? 0 : (ability.maxPurchases ?? 1)
      };
    })
  ])
);

let AGENTS = { ...NORMALIZED_DEFAULT_AGENTS };

// --- ÉTAT GLOBAL ---
let credits = 4000;
let currentAgent = 'Raze';
let isSpinning = false;
const CARD_HEIGHT = 130; // Hauteur uniforme pour aligner le centre

// --- GÉNÉRATION COMBINATOIRE (charges gratuites + achats optionnels) ---
function generateAbilityCombinations(abilities) {
  const combinations = [];

  function build(index, slots, totalCost) {
    if (index >= abilities.length) {
      combinations.push({
        slots,
        totalCost,
        countPurchased: slots.reduce((sum, slot) => sum + slot.purchasedQuantity, 0)
      });
      return;
    }

    const ability = abilities[index];
    const cost = Number(ability.cost) || 0;
    const hasExplicitFreeCharges = ability.freeCharges !== undefined;
    const freeCharges = hasExplicitFreeCharges
      ? ability.freeCharges
      : cost === 0 ? (ability.maxPurchases ?? 1) : 0;
    const maxPurchases = hasExplicitFreeCharges
      ? (ability.maxPurchases ?? 0)
      : cost === 0 ? 0 : (ability.maxPurchases ?? 1);

    for (let purchasedQuantity = 0; purchasedQuantity <= maxPurchases; purchasedQuantity++) {
      const quantity = freeCharges + purchasedQuantity;
      const nextSlot = quantity > 0
        ? {
            key: ability.key,
            name: ability.name,
            cost,
            quantity,
            freeCharges,
            purchasedQuantity,
            maxPurchases,
            icon: ability.icon || '',
            isPurchased: true
          }
        : {
            key: ability.key,
            name: 'NOTHING',
            cost: 0,
            quantity: 0,
            freeCharges: 0,
            purchasedQuantity: 0,
            maxPurchases,
            icon: '',
            isPurchased: false
          };

          build(index + 1, [...slots, nextSlot], totalCost + purchasedQuantity * cost);
    }
  }

  build(0, [], 0);
  return combinations;
}

function resolveAbilityEconomy(economy = {}, fallbackAbility = {}) {
  const cost = economy.cost ?? fallbackAbility.cost ?? 0;
  const freeCharges = economy.freeCharges
    ?? fallbackAbility.freeCharges
    ?? (Number(cost) === 0 ? fallbackAbility.maxPurchases ?? 1 : 0);
  const legacyMaxCharges = Number(economy.maxCharges);
  const maxPurchases = economy.maxPurchases
    ?? (economy.maxCharges !== undefined && Number.isFinite(legacyMaxCharges)
      ? Math.max(0, legacyMaxCharges - freeCharges)
      : fallbackAbility.freeCharges !== undefined
        ? fallbackAbility.maxPurchases ?? 0
        : Number(cost) === 0
          ? 0
          : fallbackAbility.maxPurchases ?? 1);

  return { cost, freeCharges, maxPurchases };
}

async function loadWeaponsFromApi() {
  try {
    const response = await fetch('https://valorant-api.com/v1/weapons');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = await response.json();
    const apiWeapons = Array.isArray(payload?.data) ? payload.data : [];
    const mappedWeapons = [];

    for (const weapon of apiWeapons) {
      const category = weapon.category || 'Weapon';
      const weaponName = weapon.displayName || weapon.name || 'Unknown';
      const price = weapon.shopData?.cost ?? DEFAULT_WEAPONS.find(item => item.name === weaponName)?.cost ?? 0;
      const icon = weapon.displayIcon || weapon.killfeedPortrait || weapon.shopData?.newImage || '';

      if (weaponName && weaponName !== 'Random') {
        mappedWeapons.push({
          name: weaponName,
          category,
          cost: price,
          icon
        });
      }
    }

    if (mappedWeapons.length > 0) {
      WEAPONS = mappedWeapons;
    }
  } catch (error) {
    console.warn('Impossible de charger les armes depuis l’API, utilisation du fallback local.', error);
    WEAPONS = [...DEFAULT_WEAPONS];
  }
}

function loadWeaponPreferences() {
  try {
    const storedPreferences = JSON.parse(window.localStorage.getItem(WEAPON_PREFERENCES_KEY) || '[]');
    DISABLED_WEAPONS = new Set(Array.isArray(storedPreferences) ? storedPreferences : []);
  } catch (error) {
    console.warn('Impossible de charger les préférences d’armes.', error);
    DISABLED_WEAPONS = new Set();
  }
}

function saveWeaponPreferences() {
  try {
    window.localStorage.setItem(WEAPON_PREFERENCES_KEY, JSON.stringify([...DISABLED_WEAPONS]));
  } catch (error) {
    console.warn('Impossible de sauvegarder les préférences d’armes.', error);
  }
}

function getAvailableWeapons() {
  return WEAPONS.filter(weapon => !DISABLED_WEAPONS.has(weapon.name));
}

function getWeaponsWithPreferences() {
  return WEAPONS.filter(weapon => weapon.name.trim().toLowerCase() !== 'classic'
    && !/melee/i.test(`${weapon.name} ${weapon.category || ''}`));
}

function updateWeaponPreferenceSummary() {
  const summary = document.getElementById('weapon-preference-count');
  const status = document.getElementById('weapon-preference-status');
  const preferenceWeapons = getWeaponsWithPreferences();
  const enabledCount = preferenceWeapons.filter(weapon => !DISABLED_WEAPONS.has(weapon.name)).length;
  if (summary) summary.textContent = `${enabledCount}/${preferenceWeapons.length}`;
  if (status) status.textContent = `${enabledCount} arme(s) autorisée(s)`;
}

function renderWeaponPreferences() {
  const list = document.getElementById('weapon-preferences-list');
  if (!list) return;

  const preferenceWeapons = getWeaponsWithPreferences();
  let preferencesChanged = false;
  for (const weapon of WEAPONS) {
    if (!preferenceWeapons.includes(weapon) && DISABLED_WEAPONS.delete(weapon.name)) {
      preferencesChanged = true;
    }
  }
  if (preferencesChanged) saveWeaponPreferences();

  if (preferenceWeapons.length > 0 && !preferenceWeapons.some(weapon => !DISABLED_WEAPONS.has(weapon.name))) {
    for (const weapon of preferenceWeapons) DISABLED_WEAPONS.delete(weapon.name);
    saveWeaponPreferences();
  }

  list.replaceChildren();
  for (const weapon of preferenceWeapons) {
    const label = document.createElement('label');
    label.className = 'weapon-preference';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !DISABLED_WEAPONS.has(weapon.name);
    checkbox.addEventListener('change', () => {
      if (!checkbox.checked && getAvailableWeapons().length <= 1) {
        checkbox.checked = true;
        const status = document.getElementById('weapon-preference-status');
        if (status) status.textContent = 'Garde au moins une arme autorisée.';
        return;
      }

      if (checkbox.checked) DISABLED_WEAPONS.delete(weapon.name);
      else DISABLED_WEAPONS.add(weapon.name);
      saveWeaponPreferences();
      updateWeaponPreferenceSummary();
    });

    const details = document.createElement('span');
    details.className = 'weapon-preference-details';
    const name = document.createElement('span');
    name.textContent = weapon.name;
    const cost = document.createElement('small');
    cost.textContent = `${weapon.cost} ¤`;
    details.append(name, cost);
    label.append(checkbox, details);
    list.appendChild(label);
  }

  updateWeaponPreferenceSummary();
}

function allowAllWeapons() {
  DISABLED_WEAPONS.clear();
  saveWeaponPreferences();
  renderWeaponPreferences();
}

async function loadShieldsFromApi() {
  try {
    const response = await fetch('https://valorant-api.com/v1/gear');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = await response.json();
    const apiGear = Array.isArray(payload?.data) ? payload.data : [];
    const mappedShields = [{ name: 'Nothing', category: 'Shield', cost: 0 }];

    for (const item of apiGear) {
      const name = item.displayName || item.name || '';
      const type = item.category || item.type || 'Shield';
      const icon = item.displayIcon || item.largeIcon || item.icon || '';
      if (!name || name === 'Random') continue;
      if (/shield|armor|gear/i.test(type) || /shield|armor|gear/i.test(name)) {
        mappedShields.push({
          name,
          category: 'Shield',
          cost: item.shopData?.cost ?? DEFAULT_SHIELDS.find(gear => gear.name === name)?.cost ?? 0,
          icon
        });
      }
    }

    if (mappedShields.length > 1) {
      SHIELDS = mappedShields;
    }
  } catch (error) {
    console.warn('Impossible de charger les boucliers depuis l’API, utilisation du fallback local.', error);
    SHIELDS = [...DEFAULT_SHIELDS];
  }
}

async function loadAbilitiesEconomy() {
  try {
    const economyUrl = new URL('abilities_economy.json', window.location.href);
    const response = await fetch(economyUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const contents = await response.text();

    const parsedEconomy = JSON.parse(contents);
    if (!parsedEconomy || typeof parsedEconomy !== 'object' || Array.isArray(parsedEconomy)) {
      throw new Error('Format JSON invalide');
    }

    ABILITIES_ECONOMY = parsedEconomy;
  } catch (error) {
    console.warn('Impossible de charger abilities_economy.json, utilisation des valeurs de secours.', error);
    ABILITIES_ECONOMY = {};
  }
}

async function loadAgentsFromApi() {
  try {
    const response = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = await response.json();
    const apiAgents = Array.isArray(payload?.data) ? payload.data : [];
    const mappedAgents = {};

    for (const agent of apiAgents) {
      const fallback = NORMALIZED_DEFAULT_AGENTS[agent.displayName]
        || NORMALIZED_DEFAULT_AGENTS[agent.displayName.replace(/\s+/g, '')];
      const keyBySlot = { Grenade: 'C', Ability1: 'Q', Ability2: 'E' };
      const abilities = Array.isArray(agent.abilities) ? agent.abilities : [];
      const abilityBySlot = Object.fromEntries(
        abilities.filter(ability => keyBySlot[ability.slot]).map(ability => [ability.slot, ability])
      );
      const economyBySlot = ABILITIES_ECONOMY[agent.displayName] || {};
      const fallbackByName = fallback
        ? Object.fromEntries(fallback.map(a => [a.name.trim().toLowerCase(), a]))
        : {};
      const fallbackByKey = fallback ? Object.fromEntries(fallback.map(a => [a.key, a])) : {};

      mappedAgents[agent.displayName] = Object.entries(keyBySlot).map(([slot, defaultKey]) => {
        const ability = abilityBySlot[slot] || {};
        const apiName = ability.displayName || '';
        const fallbackAbility = (apiName && fallbackByName[apiName.trim().toLowerCase()])
          || (!apiName && fallbackByKey[defaultKey])
          || { cost: 0, maxPurchases: 1 };
        const economy = economyBySlot[slot] || {};
        const resolvedEconomy = resolveAbilityEconomy(economy, fallbackAbility);

        return {
          key: economy.key || defaultKey,
          name: apiName || fallbackAbility.name || 'Ability',
          ...resolvedEconomy,
          icon: ability.displayIcon || fallbackAbility.icon || ''
        };
      }).sort((first, second) => ['C', 'Q', 'E'].indexOf(first.key) - ['C', 'Q', 'E'].indexOf(second.key));
    }

    if (Object.keys(mappedAgents).length > 0) {
      AGENTS = mappedAgents;
    }
  } catch (error) {
    console.warn('Impossible de charger les agents depuis l’API, utilisation du fallback local.', error);
    AGENTS = { ...NORMALIZED_DEFAULT_AGENTS };
  }

  const select = document.getElementById('agent-select');
  if (select) {
    select.innerHTML = '';
    Object.keys(AGENTS).forEach((agentName) => {
      const opt = document.createElement('option');
      opt.value = agentName;
      opt.textContent = agentName;
      select.appendChild(opt);
    });

    currentAgent = select.value || Object.keys(AGENTS)[0] || 'Raze';

    const defaultCombo = generateAbilityCombinations(AGENTS[currentAgent])[0];
    initReel('ability', defaultCombo);
  }
}

// --- CRÉATION DU HTML DES CARTES ---
function createCard(type, data) {
  const card = document.createElement('div');
  card.className = 'slot-card';

  if (type === 'weapon') {
    card.classList.add('weapon-card');
    card.innerHTML = `
      <div class="card-icon-wrap weapon-icon-wrap">
        ${data.icon ? `<img class="card-icon weapon-card-icon" src="${data.icon}" alt="${data.name}" />` : ''}
      </div>
      <div class="card-name">${data.name}</div>
      <div class="card-cost">${data.cost > 0 ? data.cost + ' ¤' : 'GRATUIT'}</div>
    `;
  } else if (type === 'ability') {
    const rowsHtml = data.slots.map(s => {
      const totalCost = s.cost * s.purchasedQuantity;
      const label = s.quantity > 0 ? `${s.name}${s.quantity > 1 ? ` x${s.quantity}` : ''}` : s.name;
      const iconMarkup = s.icon ? `<img class="ability-icon" src="${s.icon}" alt="${label}" />` : '';
      const costLabel = s.quantity === 0
        ? 'NO PURCHASE'
        : s.purchasedQuantity === 0 || totalCost === 0
          ? 'FREE'
          : `${totalCost} ¤`;

      return `
        <div class="ability-row ${s.quantity > 0 ? 'active' : 'empty'}">
          <div class="ability-left">
            <span class="ability-key">${s.key}</span>
            ${iconMarkup}
            <span class="ability-name">${label}</span>
          </div>
          <div class="ability-cost">${costLabel}</div>
        </div>
      `;
    }).join('');

    card.innerHTML = `<div class="ability-stack">${rowsHtml}</div>`;
  } else if (type === 'shield') {
    card.innerHTML = `
      <div class="card-icon-wrap">
        ${data.icon ? `<img class="card-icon" src="${data.icon}" alt="${data.name}" />` : ''}
      </div>
      <div class="card-category">${data.category}</div>
      <div class="card-name">${data.name}</div>
      <div class="card-cost">${data.cost > 0 ? data.cost + ' ¤' : 'NO PURCHASE'}</div>
    `;
  }

  return card;
}

// --- GESTION DU ROULEAU ---
function initReel(columnType, defaultItem) {
  const strip = document.getElementById(`strip-${columnType}`);
  const viewport = document.getElementById(`viewport-${columnType}`);
  const centerY = (viewport.clientHeight || 280) / 2 - CARD_HEIGHT / 2;

  strip.innerHTML = '';
  strip.style.transition = 'none';
  strip.style.transform = `translateY(${centerY}px)`;
  strip.appendChild(createCard(columnType, defaultItem));
}

function animateReel(columnType, itemsList, winningItem, durationMs) {
  return new Promise((resolve) => {
    const strip = document.getElementById(`strip-${columnType}`);
    const viewport = document.getElementById(`viewport-${columnType}`);
    const centerY = viewport.clientHeight / 2 - CARD_HEIGHT / 2;

    strip.innerHTML = '';
    strip.style.transition = 'none';
    strip.style.transform = `translateY(${centerY}px)`;

    const totalSteps = 26;
    const sequence = [];
    for (let i = 0; i < totalSteps; i++) {
      sequence.push(itemsList[Math.floor(Math.random() * itemsList.length)]);
    }

    const winningIndex = itemsList.indexOf(winningItem);
    const trailingItems = 6;
    const winnerPosition = sequence.length;
    sequence.push(winningItem);
    for (let i = 1; i <= trailingItems; i++) {
      const nextItem = itemsList[(winningIndex + i) % itemsList.length];
      sequence.push(nextItem);
    }

    sequence.forEach((item) => strip.appendChild(createCard(columnType, item)));

    const targetY = -(winnerPosition * CARD_HEIGHT) + centerY;

    requestAnimationFrame(() => {
      strip.style.transition = `transform ${durationMs}ms cubic-bezier(0.12, 0.8, 0.2, 1)`;
      strip.style.transform = `translateY(${targetY}px)`;
    });

    setTimeout(resolve, durationMs);
  });
}

// --- ALGORITHME DE TIRAGE SOUS CONTRAINTE ---
function getValidCombo() {
  const abilityCombos = generateAbilityCombinations(AGENTS[currentAgent]);
  const availableWeapons = getAvailableWeapons();
  const validCombos = [];

  for (const weapon of availableWeapons) {
    for (const abilityCombo of abilityCombos) {
      for (const shield of SHIELDS) {
        const total = weapon.cost + abilityCombo.totalCost + shield.cost;
        if (total <= credits) {
          validCombos.push({
            weapon,
            abilityCombo,
            shield,
            total
          });
        }
      }
    }
  }

  if (validCombos.length === 0) {
    return {
      weapon: availableWeapons[0],
      abilityCombo: abilityCombos[0], // 3x NOTHING
      shield: SHIELDS[0], // Nothing
      total: 0
    };
  }

  return validCombos[Math.floor(Math.random() * validCombos.length)];
}

// --- ACTIONS & ÉVÉNEMENTS ---
function adjustCredits(amount) {
  if (isSpinning) return;
  setCredits(credits + amount);
}

function setCredits(value) {
  if (isSpinning) return;

  const input = document.getElementById('current-credits');
  const amount = Number(value);
  if (String(value).trim() === '' || !Number.isFinite(amount)) {
    if (input) input.value = credits;
    return;
  }

  credits = Math.max(0, Math.min(9000, Math.trunc(amount)));
  if (input) input.value = credits;
  document.getElementById('stat-left').textContent = credits;
}

function isFullBuy(result) {
  const weaponName = result.weapon?.name?.trim().toLowerCase();
  const shieldName = result.shield?.name?.trim().toLowerCase() || '';
  const abilities = result.abilityCombo?.slots || [];
  const hasAllUtilities = abilities.length > 0 && abilities.every(
    ability => ability.purchasedQuantity >= ability.maxPurchases
  );

  return FULL_BUY_WEAPONS.has(weaponName) && /heavy|lourd/.test(shieldName) && hasAllUtilities;
}

let victoryTimeout;

function celebrateFullBuy() {
  const overlay = document.getElementById('victory-overlay');
  const confetti = document.getElementById('confetti-container');
  if (!overlay || !confetti) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  confetti.replaceChildren();
  if (!reducedMotion) {
    const colors = ['#ff4655', '#00f5d4', '#f7df1e', '#ffffff'];
    for (let index = 0; index < 220; index++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.classList.add(['is-square', 'is-ribbon', 'is-spark'][index % 3]);
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.setProperty('--confetti-color', colors[Math.floor(Math.random() * colors.length)]);
      piece.style.setProperty('--confetti-duration', `${2.8 + Math.random() * 1.5}s`);
      piece.style.setProperty('--confetti-delay', `${Math.random() * 0.8}s`);
      piece.style.setProperty('--confetti-drift', `${Math.round((Math.random() - 0.5) * 320)}px`);
      piece.style.setProperty('--confetti-rotation', `${Math.round(Math.random() * 1440)}deg`);
      confetti.appendChild(piece);
    }
  }

  clearTimeout(victoryTimeout);
  document.body.classList.remove('is-fullbuy');
  overlay.classList.remove('is-active');
  void overlay.offsetWidth;
  overlay.classList.add('is-active');
  if (!reducedMotion) {
    void document.body.offsetWidth;
    document.body.classList.add('is-fullbuy');
  }
  victoryTimeout = setTimeout(() => {
    overlay.classList.remove('is-active');
    confetti.replaceChildren();
    document.body.classList.remove('is-fullbuy');
  }, 4400);
}

async function spin() {
  if (isSpinning) return;
  isSpinning = true;
  document.getElementById('roll-btn').disabled = true;
  document.getElementById('current-credits').disabled = true;
  document.getElementById('weapon-preferences-open').disabled = true;

  const result = getValidCombo();
  const abilityCombos = generateAbilityCombinations(AGENTS[currentAgent]);

  // Déroulement des trois colonnes
  const rollWeapon = animateReel('weapon', getAvailableWeapons(), result.weapon, 1800);
  const rollAbility = animateReel('ability', abilityCombos, result.abilityCombo, 2300);
  const rollShield = animateReel('shield', SHIELDS, result.shield, 2800);

  await Promise.all([rollWeapon, rollAbility, rollShield]);

  // Mise à jour des stats du bas
  document.getElementById('stat-weapon').textContent = `${result.weapon.cost} ¤`;
  document.getElementById('stat-abilities').textContent = `${result.abilityCombo.totalCost} ¤`;
  document.getElementById('stat-shield').textContent = `${result.shield.cost} ¤`;
  document.getElementById('stat-spent').textContent = `${result.total} ¤`;
  document.getElementById('stat-left').textContent = `${credits - result.total} ¤`;
  if (isFullBuy(result)) celebrateFullBuy();

  isSpinning = false;
  document.getElementById('roll-btn').disabled = false;
  document.getElementById('current-credits').disabled = false;
  document.getElementById('weapon-preferences-open').disabled = false;
}

// Initialisation
window.addEventListener('load', async () => {
  const select = document.getElementById('agent-select');
  loadWeaponPreferences();

  await Promise.all([
    loadWeaponsFromApi(),
    loadShieldsFromApi(),
    loadAbilitiesEconomy(),
  ]);

  await Promise.all([
    loadAgentsFromApi()
  ]);

  renderWeaponPreferences();

  const preferencesOverlay = document.getElementById('weapon-preferences');
  const preferencesButton = document.getElementById('weapon-preferences-open');
  const closePreferences = () => {
    preferencesOverlay.hidden = true;
    preferencesButton.setAttribute('aria-expanded', 'false');
    preferencesButton.focus();
  };

  preferencesButton.addEventListener('click', () => {
    renderWeaponPreferences();
    preferencesOverlay.hidden = false;
    preferencesButton.setAttribute('aria-expanded', 'true');
    preferencesOverlay.querySelector('input')?.focus();
  });
  document.getElementById('weapon-preferences-close').addEventListener('click', closePreferences);
  document.getElementById('weapon-preferences-reset').addEventListener('click', allowAllWeapons);
  preferencesOverlay.addEventListener('click', event => {
    if (event.target === preferencesOverlay) closePreferences();
  });

  document.getElementById('close-app').addEventListener('click', () => {
    window.electronAPI?.quit();
  });

  if (select) {
    select.addEventListener('change', (e) => {
      currentAgent = e.target.value;
      const defaultCombo = generateAbilityCombinations(AGENTS[currentAgent])[0];
      initReel('ability', defaultCombo);
    });
  }

  const initialCombo = generateAbilityCombinations(AGENTS[currentAgent])[0];
  const creditsInput = document.getElementById('current-credits');
  if (creditsInput) {
    creditsInput.addEventListener('input', () => {
      if (creditsInput.value === '') return;
      const amount = Number(creditsInput.value);
      if (!Number.isFinite(amount)) return;
      credits = Math.max(0, Math.min(9000, Math.trunc(amount)));
      document.getElementById('stat-left').textContent = credits;
    });
    creditsInput.addEventListener('change', () => setCredits(creditsInput.value));
    creditsInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') creditsInput.blur();
    });
  }

  initReel('weapon', WEAPONS[0]);
  initReel('ability', initialCombo);
  initReel('shield', SHIELDS[0]);

});

window.addEventListener('keydown', (e) => {
  const preferencesOverlay = document.getElementById('weapon-preferences');
  if (e.key === 'Escape' && preferencesOverlay && !preferencesOverlay.hidden) {
    document.getElementById('weapon-preferences-close').click();
    return;
  }

  if (e.code === 'Space' && !isSpinning && e.target?.id !== 'current-credits'
    && !e.target?.closest?.('#weapon-preferences')) {
    e.preventDefault();
    spin();
  }
});