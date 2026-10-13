overwolf.windows.obtainDeclaredWindow('in_game', (result) => {
  if (result.success) {
    overwolf.windows.restore(result.window.id);
  }
});

const VALORANT_FEATURES = ['me', 'match_info'];
const liveGameSubscribers = new Set();
const liveGameState = { agent: null, credits: null };

function parseGameValue(value) {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function publishLiveGameState() {
  for (const subscriber of liveGameSubscribers) {
    subscriber({ ...liveGameState });
  }
}

function processValorantInfo(payload) {
  const root = payload?.res || payload?.info || payload;
  const info = root?.info || root;
  let updated = false;

  const agent = info?.me?.agent;
  if (typeof agent === 'string' && agent) {
    liveGameState.agent = agent;
    updated = true;
  }

  const matchInfo = info?.match_info || (payload?.category === 'match_info' ? { [payload.key]: payload.data } : {});
  for (const [key, rawValue] of Object.entries(matchInfo || {})) {
    if (!/^scoreboard_\d+$/.test(key)) continue;
    const player = parseGameValue(rawValue?.data ?? rawValue?.value ?? rawValue);
    if (!player || typeof player !== 'object' || !(player.is_local === true || player.is_local === 'true')) continue;

    const money = Number(player.money);
    if (Number.isFinite(money) && money >= 0) {
      liveGameState.credits = money;
      updated = true;
    }
  }

  if (updated) publishLiveGameState();
}

window.subscribeToValorantState = (subscriber) => {
  if (typeof subscriber !== 'function') return;
  liveGameSubscribers.add(subscriber);
  subscriber({ ...liveGameState });
};

if (overwolf.games?.events) {
  const handleInfoUpdate = info => processValorantInfo(info);
  overwolf.games.events.onInfoUpdates2.removeListener(handleInfoUpdate);
  overwolf.games.events.onInfoUpdates2.addListener(handleInfoUpdate);

  overwolf.games.events.setRequiredFeatures(VALORANT_FEATURES, result => {
    if (!result.success) {
      console.warn('Impossible de s’abonner aux données VALORANT.', result.error);
      return;
    }

    overwolf.games.events.getInfo(info => {
      if (info.success) processValorantInfo(info.res);
      else console.warn('Impossible de lire les données VALORANT actuelles.', info.error);
    });
  });
}