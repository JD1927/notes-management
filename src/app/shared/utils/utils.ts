export const EMAIL_REGEX = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
export const SIMPLE_PASSWORD_REGEX = `(?=.*[a-z])(?=.*[0-9]).{6,}`;
export const PASSWORD_REGEX = `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}`;
export const PHONE_NUMBER = '[0-9]{10}';
export const TABLET_REGEX = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i;
export const MOBILE_REGEX =
  /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/;

export const isDesktopDevice = (): boolean => {
  const agent = navigator.userAgent;
  if (TABLET_REGEX.test(agent) || MOBILE_REGEX.test(agent)) {
    return false;
  }
  return true;
};
