import { createContext, useContext } from 'react';

/**
 * Two-locale dictionary. The app is dictated to in Russian far more often than
 * it is read in English, and answering «добавь молоко» with "Recognized" was a
 * small paper cut on every single utterance — so the UI language follows the
 * recognition language the user picked.
 */
export type Lang = 'ru' | 'en';

export const LANGUAGES: { lang: Lang; speech: string; label: string }[] = [
  { lang: 'ru', speech: 'ru-RU', label: 'Русский' },
  { lang: 'en', speech: 'en-US', label: 'English' },
];

const ru = {
  appName: 'Голосовой список покупок',
  loginIntro: 'Войдите или зарегистрируйтесь, чтобы вести список.',
  username: 'Имя пользователя',
  password: 'Пароль',
  passwordMin: 'Пароль (минимум 8 символов)',
  login: 'Войти',
  register: 'Регистрация',
  haveAccount: 'Уже есть аккаунт? ',
  noAccount: 'Ещё нет аккаунта? ',
  loginHere: 'Войти',
  registerHere: 'Зарегистрироваться',
  fillBoth: 'Введите имя пользователя и пароль.',
  passwordTooShort: 'Пароль должен быть не короче 8 символов.',
  somethingWrong: 'Что-то пошло не так',

  listTitle: 'Список покупок',
  activeList: 'Список',
  myList: 'Мой список',
  backToMyList: '← Мой список',
  viewing: 'смотрят',
  emptyList: 'Список пуст — надиктуйте или введите, что купить.',
  addPlaceholder: 'Добавить вручную…',
  add: 'Добавить',
  frequent: 'Часто:',
  bought: 'Куплено',
  clearBought: 'Очистить купленное',
  boughtCleared: 'Купленное очищено',

  startVoice: '🎤 Говорить',
  listening: '🎙 Слушаю…',
  voiceUnsupported: '⚠️ Этот браузер не поддерживает распознавание речи.',
  recognitionLanguage: 'Язык распознавания',
  recognized: 'Распознано: {items}',
  notUnderstood: 'Не разобрал: «{text}»',
  addAsIs: 'Добавить как есть',
  checkedOff: 'Вычеркнуто: {items}',
  removed: 'Удалено: {items}',
  notOnList: 'Нет в списке: {items}',
  micDenied: 'Нет доступа к микрофону — разрешите его в настройках браузера',

  undo: 'Отменить',
  undone: 'Отменено: {label}',
  nothingToUndo: 'Отменять нечего',
  returnAction: 'Вернуть',

  shareTitle: 'Доступ к списку',
  shareHint:
    'Ссылку можно открыть один раз, чтобы получить доступ. Кто её открыл — останется в списке участников.',
  copyLink: 'Скопировать ссылку',
  linkCopied: 'Ссылка скопирована',
  copyFailed: 'Не удалось скопировать — скопируйте адрес вручную',
  rotateLink: 'Обновить ссылку',
  linkRotated: 'Старая ссылка больше не работает',
  members: 'Участники',
  noMembers: 'Пока никого — отправьте ссылку',
  removeMember: 'Убрать',
  memberRemoved: '{member} больше не имеет доступа',
  leaveList: 'Покинуть список',
  leftList: 'Вы вышли из списка «{list}»',
  joinedList: 'Доступ открыт: список «{list}»',
  joinFailed: 'Ссылка-приглашение недействительна',

  settings: 'Настройки',
  language: 'Язык',
  theme: 'Тема',
  themeAuto: 'Как в системе',
  themeLight: 'Светлая',
  themeDark: 'Тёмная',
  changePassword: 'Сменить пароль',
  currentPassword: 'Текущий пароль',
  newPassword: 'Новый пароль',
  passwordChanged: 'Пароль изменён',
  deleteAccount: 'Удалить аккаунт',
  deleteAccountHint: 'Список, история и приглашения будут удалены безвозвратно.',
  deleteAccountConfirm: 'Введите пароль, чтобы подтвердить удаление',
  accountDeleted: 'Аккаунт удалён',
  logout: 'Выйти',
  loggedOut: 'Вы вышли',
  close: 'Закрыть',
  cancel: 'Отмена',
  save: 'Сохранить',

  offline: 'Офлайн — показан сохранённый список',
  offlineChanges: 'Не синхронизировано: {count}',
  backOnline: 'Связь есть — синхронизирую…',
  offlineMode: 'Офлайн. Изменения сохранятся локально.',
  syncFailed: 'Не удалось отправить изменений: {count}',
  sessionExpired: 'Сессия истекла — войдите снова',
  listUpdated: 'Список изменили',
  noAccess: 'Нет доступа к этому списку',
  addFailed: 'Не удалось добавить «{name}»',

  rename: 'Переименовать',
  renamePlaceholder: 'Название позиции',
  markBought: 'Отметить купленным: {name}',
  returnToList: 'Вернуть в список: {name}',
  oneMore: 'Ещё один: {name}',
  oneLess: 'На один меньше: {name}',
  removeItem: 'Удалить: {name}',
  notifications: 'Уведомления об этом списке',
  notificationsOn: 'Уведомления включены для «{list}»',
  notificationsOff: 'Уведомления выключены',
  notificationsBlocked: 'Уведомления заблокированы в браузере',
  notificationsFailed: 'Не удалось включить уведомления',
};

const en: Record<keyof typeof ru, string> = {
  appName: 'Voice Shopping List',
  loginIntro: 'Log in or register to manage your list.',
  username: 'Username',
  password: 'Password',
  passwordMin: 'Password (min. 8 characters)',
  login: 'Log in',
  register: 'Register',
  haveAccount: 'Already have an account? ',
  noAccount: "Don't have an account? ",
  loginHere: 'Log in',
  registerHere: 'Register',
  fillBoth: 'Please enter both username and password.',
  passwordTooShort: 'Password must be at least 8 characters.',
  somethingWrong: 'Something went wrong',

  listTitle: 'Shopping List',
  activeList: 'List',
  myList: 'My list',
  backToMyList: '← My list',
  viewing: 'viewing',
  emptyList: 'The list is empty — dictate or type something to buy.',
  addPlaceholder: 'Add manually…',
  add: 'Add',
  frequent: 'Frequent:',
  bought: 'Bought',
  clearBought: 'Clear bought',
  boughtCleared: 'Bought items cleared',

  startVoice: '🎤 Start voice',
  listening: '🎙 Listening…',
  voiceUnsupported: '⚠️ Speech recognition is not supported in this browser.',
  recognitionLanguage: 'Recognition language',
  recognized: 'Recognized: {items}',
  notUnderstood: 'Did not catch: “{text}”',
  addAsIs: 'Add as is',
  checkedOff: 'Checked off: {items}',
  removed: 'Removed: {items}',
  notOnList: 'Not on the list: {items}',
  micDenied: 'No microphone access — allow it in the browser settings',

  undo: 'Undo',
  undone: 'Undone: {label}',
  nothingToUndo: 'Nothing to undo',
  returnAction: 'Undo',

  shareTitle: 'List access',
  shareHint:
    'Anyone who opens this link once gets access and stays in the member list.',
  copyLink: 'Copy link',
  linkCopied: 'Link copied',
  copyFailed: 'Could not copy — copy the address manually',
  rotateLink: 'Replace link',
  linkRotated: 'The old link no longer works',
  members: 'Members',
  noMembers: 'Nobody yet — send the link',
  removeMember: 'Remove',
  memberRemoved: '{member} no longer has access',
  leaveList: 'Leave list',
  leftList: 'You left the list “{list}”',
  joinedList: 'Access granted: list “{list}”',
  joinFailed: 'This invite link is not valid',

  settings: 'Settings',
  language: 'Language',
  theme: 'Theme',
  themeAuto: 'Match system',
  themeLight: 'Light',
  themeDark: 'Dark',
  changePassword: 'Change password',
  currentPassword: 'Current password',
  newPassword: 'New password',
  passwordChanged: 'Password changed',
  deleteAccount: 'Delete account',
  deleteAccountHint: 'The list, its history and its invites are deleted for good.',
  deleteAccountConfirm: 'Enter your password to confirm deletion',
  accountDeleted: 'Account deleted',
  logout: 'Log out',
  loggedOut: 'Logged out',
  close: 'Close',
  cancel: 'Cancel',
  save: 'Save',

  offline: 'Offline — showing the saved list',
  offlineChanges: 'Not synced: {count}',
  backOnline: 'Back online — syncing…',
  offlineMode: 'Offline. Changes are saved locally.',
  syncFailed: 'Failed to send {count} change(s)',
  sessionExpired: 'Session expired — please log in again',
  listUpdated: 'The list was updated',
  noAccess: 'No access to this list',
  addFailed: 'Failed to add “{name}”',

  rename: 'Rename',
  renamePlaceholder: 'Item name',
  markBought: 'Mark as bought: {name}',
  returnToList: 'Return to the list: {name}',
  oneMore: 'One more: {name}',
  oneLess: 'One less: {name}',
  removeItem: 'Remove: {name}',
  notifications: 'Notifications about this list',
  notificationsOn: 'Notifications on for “{list}”',
  notificationsOff: 'Notifications off',
  notificationsBlocked: 'Notifications are blocked in the browser',
  notificationsFailed: 'Could not enable notifications',
};

export type TranslationKey = keyof typeof ru;

const dictionaries: Record<Lang, Record<TranslationKey, string>> = { ru, en };

export type Translate = (key: TranslationKey, vars?: Record<string, string | number>) => string;

export const translator =
  (lang: Lang): Translate =>
  (key, vars) => {
    const template = dictionaries[lang][key];
    if (!vars) return template;
    return template.replace(/\{(\w+)\}/g, (match, name) =>
      name in vars ? String(vars[name]) : match,
    );
  };

const LangContext = createContext<{ lang: Lang; t: Translate }>({
  lang: 'ru',
  t: translator('ru'),
});

export const LangProvider = LangContext.Provider;

export const useT = () => useContext(LangContext);
