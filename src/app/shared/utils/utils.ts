export const EMAIL_REGEX = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
export const SIMPLE_PASSWORD_REGEX = `(?=.*[a-z])(?=.*[0-9]).{6,}`;
export const PASSWORD_REGEX = `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}`;

export const getLocalStorageBooleanItem = (key: string): boolean => {
  const item = localStorage.getItem(key);
  return item === 'true';
}
