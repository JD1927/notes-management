export const getLocalStorageBooleanItem = (key: string): boolean => {
  const item = localStorage.getItem(key);
  return item === 'true';
}
