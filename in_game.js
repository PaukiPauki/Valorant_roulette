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

const DEFAULT_AGENTS = {
  Astra: [
    { key: 'C', name: 'Nova Pulse', cost: 100, maxPurchases: 1 },
    { key: 'Q', name: 'Nebula', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'Gravity Well', cost: 250, maxPurchases: 1 }
  ],
  Breach: [
    { key: 'C', name: 'Fault Line', cost: 0, maxPurchases: 1 },
    { key: 'Q', name: 'Flashpoint', cost: 250, maxPurchases: 2 },
    { key: 'E', name: 'Aftershock', cost: 200, maxPurchases: 1 }
  ],
  Brimstone: [
    { key: 'C', name: 'Stim Beacon', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Incendiary', cost: 250, maxPurchases: 1 },
    { key: 'E', name: 'Sky Smoke', cost: 100, maxPurchases: 2 }
  ],
  Chamber: [
    { key: 'C', name: 'Trademark', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Head Hunter', cost: 100, maxPurchases: 8 },
    { key: 'E', name: 'Tour De Force', cost: 0, maxPurchases: 1 }
  ],
  Clove: [
    { key: 'C', name: 'Pick-me-up', cost: 100, maxPurchases: 1 },
    { key: 'Q', name: 'Meddle', cost: 250, maxPurchases: 1 },
    { key: 'E', name: 'Ruse', cost: 100, maxPurchases: 1 }
  ],
  Cypher: [
    { key: 'C', name: 'Trapwire', cost: 200, maxPurchases: 2 },
    { key: 'Q', name: 'Cyber Cage', cost: 100, maxPurchases: 2 },
    { key: 'E', name: 'Spycam', cost: 0, maxPurchases: 1 }
  ],
  Deadlock: [
    { key: 'C', name: 'Sonic Sensor', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Barrier Mesh', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'GravNet', cost: 150, maxPurchases: 1 }
  ],
  Fade: [
    { key: 'C', name: 'Seize', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Prowler', cost: 250, maxPurchases: 1 },
    { key: 'E', name: 'Dark Curve', cost: 150, maxPurchases: 1 }
  ],
  Gekko: [
    { key: 'C', name: 'Wingman', cost: 250, maxPurchases: 1 },
    { key: 'Q', name: 'Dizzy', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'Mosh Pit', cost: 200, maxPurchases: 1 }
  ],
  Harbor: [
    { key: 'C', name: 'Cascade', cost: 150, maxPurchases: 1 },
    { key: 'Q', name: 'High Tide', cost: 300, maxPurchases: 1 },
    { key: 'E', name: 'Cove', cost: 150, maxPurchases: 1 }
  ],
  Iso: [
    { key: 'C', name: 'Undercut', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Contingency', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'Bullet Burst', cost: 0, maxPurchases: 1 }
  ],
  Jett: [
    { key: 'C', name: 'Cloudburst', cost: 200, maxPurchases: 2 },
    { key: 'Q', name: 'Updraft', cost: 150, maxPurchases: 1 },
    { key: 'E', name: 'Tailwind', cost: 0, maxPurchases: 1 }
  ],
  'KAY/O': [
    { key: 'C', name: 'FRAG/ment', cost: 250, maxPurchases: 1 },
    { key: 'Q', name: 'FLASH/drive', cost: 250, maxPurchases: 1 },
    { key: 'E', name: 'ZERO/point', cost: 0, maxPurchases: 1 }
  ],
  Killjoy: [
    { key: 'C', name: 'Alarmbot', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Turret', cost: 150, maxPurchases: 1 },
    { key: 'E', name: 'Nano Swarm', cost: 0, maxPurchases: 1 }
  ],
  Neon: [
    { key: 'C', name: 'Fast Lane', cost: 150, maxPurchases: 1 },
    { key: 'Q', name: 'Relay Bolt', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'High Gear', cost: 0, maxPurchases: 1 }
  ],
  Omen: [
    { key: 'C', name: 'Shrouded Step', cost: 100, maxPurchases: 2 },
    { key: 'Q', name: 'Paranoia', cost: 250, maxPurchases: 1 },
    { key: 'E', name: 'Dark Cover', cost: 150, maxPurchases: 1 }
  ],
  Phoenix: [
    { key: 'C', name: 'Blaze', cost: 150, maxPurchases: 1 },
    { key: 'Q', name: 'Curveball', cost: 250, maxPurchases: 1 },
    { key: 'E', name: 'Hot Hands', cost: 0, maxPurchases: 1 }
  ],
  Raze: [
    { key: 'C', name: 'Boom Bot', cost: 300, maxPurchases: 1 },
    { key: 'Q', name: 'Blast Pack', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'Paint Shells', cost: 0, maxPurchases: 1 }
  ],
  Reyna: [
    { key: 'C', name: 'Leer', cost: 250, maxPurchases: 1 },
    { key: 'Q', name: 'Devour', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'Dismiss', cost: 0, maxPurchases: 1 }
  ],
  Sage: [
    { key: 'C', name: 'Barrier Orb', cost: 400, maxPurchases: 1 },
    { key: 'Q', name: 'Slow Orb', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'Healing Orb', cost: 0, maxPurchases: 1 }
  ],
  Skye: [
    { key: 'C', name: 'Trailblazer', cost: 150, maxPurchases: 1 },
    { key: 'Q', name: 'Guiding Light', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'Regrowth', cost: 150, maxPurchases: 1 }
  ],
  Sova: [
    { key: 'C', name: 'Owl Drone', cost: 400, maxPurchases: 1 },
    { key: 'Q', name: 'Shock Bolt', cost: 150, maxPurchases: 2 },
    { key: 'E', name: 'Recon Bolt', cost: 0, maxPurchases: 1 }
  ],
  Tejo: [
    { key: 'C', name: 'Special Delivery', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Guided Salvo', cost: 250, maxPurchases: 1 },
    { key: 'E', name: 'Stealth Drone', cost: 150, maxPurchases: 1 }
  ],
  Viper: [
    { key: 'C', name: 'Snake Bite', cost: 300, maxPurchases: 1 },
    { key: 'Q', name: 'Poison Cloud', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'Toxic Screen', cost: 0, maxPurchases: 1 }
  ],
  Vyse: [
    { key: 'C', name: 'Shear', cost: 200, maxPurchases: 1 },
    { key: 'Q', name: 'Arc Rose', cost: 250, maxPurchases: 1 },
    { key: 'E', name: 'Steel Garden', cost: 150, maxPurchases: 1 }
  ],
  Waylay: [
    { key: 'C', name: 'Light Disk', cost: 150, maxPurchases: 1 },
    { key: 'Q', name: 'Facet', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'Convergent Paths', cost: 0, maxPurchases: 1 }
  ],
  Yoru: [
    { key: 'C', name: 'Fakeout', cost: 150, maxPurchases: 1 },
    { key: 'Q', name: 'Blindside', cost: 200, maxPurchases: 1 },
    { key: 'E', name: 'Gatecrash', cost: 100, maxPurchases: 1 }
  ]
};

let AGENTS = { ...DEFAULT_AGENTS };

// --- ÉTAT GLOBAL ---
let credits = 4000;
let currentAgent = 'Raze';
let isSpinning = false;
const CARD_HEIGHT = 130; // Hauteur uniforme pour aligner le centre

// --- GÉNÉRATION COMBINATOIRE (0..maxPurchases par capacité) ---
function generateAbilityCombinations(abilities) {
  const combinations = [];

  function build(index, slots, totalCost) {
    if (index >= abilities.length) {
      combinations.push({
        slots,
        totalCost,
        countPurchased: slots.reduce((sum, slot) => sum + (slot.isPurchased ? slot.quantity : 0), 0)
      });
      return;
    }

    const ability = abilities[index];
    const maxQty = ability.maxPurchases ?? 1;

    for (let quantity = 0; quantity <= maxQty; quantity++) {
      const nextSlot = quantity > 0
        ? {
            key: ability.key,
            name: ability.name,
            cost: ability.cost,
            quantity,
            icon: ability.icon || '',
            isPurchased: true
          }
        : {
            key: ability.key,
            name: 'NOTHING',
            cost: 0,
            quantity: 0,
            icon: '',
            isPurchased: false
          };

      build(index + 1, [...slots, nextSlot], totalCost + quantity * ability.cost);
    }
  }

  build(0, [], 0);
  return combinations;
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

async function loadAgentsFromApi() {
  try {
    const response = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = await response.json();
    const apiAgents = Array.isArray(payload?.data) ? payload.data : [];
    const mappedAgents = {};

    for (const agent of apiAgents) {
      const fallback = DEFAULT_AGENTS[agent.displayName] || DEFAULT_AGENTS[agent.displayName.replace(/\s+/g, '')];
      const abilities = Array.isArray(agent.abilities) ? agent.abilities.slice(0, 3) : [];
      const fallbackByKey = fallback ? Object.fromEntries(fallback.map(a => [a.key, a])) : {};

      mappedAgents[agent.displayName] = ['C', 'Q', 'E'].map((key, index) => {
        const ability = abilities[index] || {};
        const fallbackAbility = fallbackByKey[key] || { cost: 0, maxPurchases: 1 };

        return {
          key,
          name: ability.displayName || fallbackAbility.name || 'Ability',
          cost: fallbackAbility.cost ?? 0,
          maxPurchases: fallbackAbility.maxPurchases ?? 1,
          icon: ability.displayIcon || fallbackAbility.icon || ''
        };
      });
    }

    if (Object.keys(mappedAgents).length > 0) {
      AGENTS = mappedAgents;
    }
  } catch (error) {
    console.warn('Impossible de charger les agents depuis l’API, utilisation du fallback local.', error);
    AGENTS = { ...DEFAULT_AGENTS };
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

    if (!AGENTS[currentAgent]) {
      currentAgent = Object.keys(AGENTS)[0] || 'Raze';
    }

    const defaultCombo = generateAbilityCombinations(AGENTS[currentAgent])[0];
    initReel('ability', defaultCombo);
  }
}

// --- CRÉATION DU HTML DES CARTES ---
function createCard(type, data) {
  const card = document.createElement('div');
  card.className = 'slot-card';

  if (type === 'weapon') {
    card.innerHTML = `
      <div class="card-icon-wrap">
        ${data.icon ? `<img class="card-icon" src="${data.icon}" alt="${data.name}" />` : ''}
      </div>
      <div class="card-category">${data.category}</div>
      <div class="card-name">${data.name}</div>
      <div class="card-cost">${data.cost > 0 ? data.cost + ' ¤' : 'GRATUIT'}</div>
    `;
  } else if (type === 'ability') {
    const rowsHtml = data.slots.map(s => {
      const totalCost = s.isPurchased ? s.cost * s.quantity : 0;
      const label = s.isPurchased ? `${s.name}${s.quantity > 1 ? ` x${s.quantity}` : ''}` : s.name;
      const iconMarkup = s.icon ? `<img class="ability-icon" src="${s.icon}" alt="${label}" />` : '';

      return `
        <div class="ability-row ${s.isPurchased ? 'active' : 'empty'}">
          <div class="ability-left">
            <span class="ability-key">${s.key}</span>
            ${iconMarkup}
            <span class="ability-name">${label}</span>
          </div>
          <div class="ability-cost">${s.isPurchased ? (totalCost > 0 ? totalCost + ' ¤' : 'FREE') : 'NO PURCHASE'}</div>
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
  const validCombos = [];

  for (const weapon of WEAPONS) {
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
      weapon: WEAPONS[0], // Classic
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
  credits = Math.max(0, Math.min(9000, credits + amount));
  document.getElementById('current-credits').textContent = credits;
  document.getElementById('stat-left').textContent = credits;
}

async function spin() {
  if (isSpinning) return;
  isSpinning = true;
  document.getElementById('roll-btn').disabled = true;

  const result = getValidCombo();
  const abilityCombos = generateAbilityCombinations(AGENTS[currentAgent]);

  // Déroulement des trois colonnes
  const rollWeapon = animateReel('weapon', WEAPONS, result.weapon, 1800);
  const rollAbility = animateReel('ability', abilityCombos, result.abilityCombo, 2300);
  const rollShield = animateReel('shield', SHIELDS, result.shield, 2800);

  await Promise.all([rollWeapon, rollAbility, rollShield]);

  // Mise à jour des stats du bas
  document.getElementById('stat-weapon').textContent = `${result.weapon.cost} ¤`;
  document.getElementById('stat-abilities').textContent = `${result.abilityCombo.totalCost} ¤`;
  document.getElementById('stat-shield').textContent = `${result.shield.cost} ¤`;
  document.getElementById('stat-spent').textContent = `${result.total} ¤`;
  document.getElementById('stat-left').textContent = `${credits - result.total} ¤`;

  isSpinning = false;
  document.getElementById('roll-btn').disabled = false;
}

// Initialisation
window.addEventListener('load', async () => {
  const select = document.getElementById('agent-select');

  await Promise.all([
    loadWeaponsFromApi(),
    loadShieldsFromApi(),
    loadAgentsFromApi()
  ]);

  if (select) {
    select.addEventListener('change', (e) => {
      currentAgent = e.target.value;
      const defaultCombo = generateAbilityCombinations(AGENTS[currentAgent])[0];
      initReel('ability', defaultCombo);
    });
  }

  const initialCombo = generateAbilityCombinations(AGENTS[currentAgent])[0];
  initReel('weapon', WEAPONS[0]);
  initReel('ability', initialCombo);
  initReel('shield', SHIELDS[0]);
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !isSpinning) {
    e.preventDefault();
    spin();
  }
});