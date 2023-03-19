type ClientStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => boolean;
  removeItem: (key: string) => boolean;
  clear: () => boolean;
};

export const clientStorage: ClientStorage = {
  getItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  },
  setItem(key, value) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  },
  removeItem(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  },
  clear() {
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      return false;
    }
  },
};
