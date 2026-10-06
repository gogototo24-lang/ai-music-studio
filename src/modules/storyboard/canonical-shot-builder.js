export const CANON_CHARACTERS = {
  "white-emperor": {
    name: "白帝喵尊",
    lock: "snow-white long fur, blue eyes, white-silver cloud-pattern robe, pale-gold shoulder ornaments, no physical weapon, palm seals and hand signs"
  },
  moonfan: {
    name: "月扇影喵",
    lock: "black-toned female cat, fixed black folding fan, same face, same costume, same fan across shots"
  },
  suili: {
    name: "歲璃喵",
    lock: "female cat, fixed ancient sheath, golden time ripple, same face and costume, sheath must not turn into a blade"
  }
};

export function splitDuration(total, count) {
  const base = Math.floor(total / count);
  const remainder = total % count;
  return Array.from({ length: count }, (_, index) => base + (index < remainder ? 1 : 0));
}

export function buildCanonicalShotPrompt(shot, options = {}) {
  const character = options.character || { name: "custom character", lock: "preserve identity across shots" };
  const universe = options.universe || "cinematic short film";
  const ratio = options.ratio || "9:16";
  const provider = options.provider || "generic";
  return [
    `Project: ${options.title || "AI MV"}`,
    `Universe: ${universe}`,
    `Character: ${character.name}`,
    `Continuity lock: ${character.lock}`,
    `Aspect ratio: ${ratio}`,
    `Shot: ${shot.index}`,
    `Duration: ${shot.duration}s`,
    `Beat: ${shot.name}`,
    `Action: ${shot.action}`,
    `Provider: ${provider}`,
    "Rule: one primary action and one primary camera move per shot; preserve identity; no random text; non-graphic fictional action."
  ].join("\n");
}

export function buildStoryboard(options = {}) {
  const total = Number(options.totalDuration || 15);
  const count = Number(options.shotCount || 3);
  const durations = splitDuration(total, count);
  return durations.map((duration, index) => {
    const i = index + 1;
    const name = i === 1 ? "登場" : i === count ? "高潮／收勢" : "核心發展";
    const action = i === 1
      ? "建立環境與角色氣勢，做一個清楚的起手動作"
      : i === count
        ? "核心視覺效果達到高潮後乾淨收束"
        : "完成主要視覺能力或情緒轉折";
    return { index: i, duration, name, action };
  });
}
