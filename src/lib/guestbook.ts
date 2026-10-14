export interface GuestWish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export const WISH_ADDED_EVENT = "wedding:wish-added";

export const saveGuestWish = (name: string, message: string) => {
  const wish: GuestWish = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };
  window.dispatchEvent(new CustomEvent<GuestWish>(WISH_ADDED_EVENT, { detail: wish }));
  return wish;
};
