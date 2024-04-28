export function setSession(key: string, value: object) {
  document.cookie = `${key}=${JSON.stringify(value)}`;
}

export function getCookie() {

} 