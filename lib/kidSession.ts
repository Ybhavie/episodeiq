const KEY = "episodeiq_kid_session";

export interface KidSession {
  childId: string;
  name: string;
}

export function setKidSession(session: KidSession) {
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function getKidSession(): KidSession | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as KidSession;
  } catch {
    return null;
  }
}

export function clearKidSession() {
  localStorage.removeItem(KEY);
}
