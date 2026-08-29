export interface GuestWish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

const WISHES_STORAGE_KEY = "wedding-guestbook-wishes";
export const WISH_ADDED_EVENT = "wedding:wish-added";

export const getSavedWishes = (): GuestWish[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(WISHES_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as GuestWish[]) : [];
  } catch {
    return [];
  }
};

export const saveGuestWish = (name: string, message: string) => {
  const wish: GuestWish = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };
  const wishes = [wish, ...getSavedWishes()].slice(0, 30);
  window.localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(wishes));
  window.dispatchEvent(new CustomEvent<GuestWish>(WISH_ADDED_EVENT, { detail: wish }));
  return wish;
};
