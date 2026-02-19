const STORAGE_KEY = 'mesbg_saved_templates';

export function saveTemplate(character, templateName) {
  const saved = loadAllTemplates();
  const id = Date.now().toString();
  saved[id] = { id, name: templateName, character, savedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  return id;
}

export function loadAllTemplates() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function deleteTemplate(id) {
  const saved = loadAllTemplates();
  delete saved[id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}
