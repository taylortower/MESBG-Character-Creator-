export function encodeCharacterToURL(character) {
  try {
    const json = JSON.stringify(character);
    const encoded = btoa(encodeURIComponent(json));
    const url = new URL(window.location.href);
    url.searchParams.set('card', encoded);
    return url.toString();
  } catch {
    return window.location.href;
  }
}

export function decodeCharacterFromURL() {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('card');
    if (!encoded) return null;
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json);
  } catch {
    return null;
  }
}
