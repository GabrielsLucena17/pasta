import { Icon as IconifyIcon } from "@iconify/react";

const icons = {
  add: "material-symbols:add-circle-outline-rounded",
  arrowDown: "material-symbols:keyboard-arrow-down-rounded",
  arrowLeft: "material-symbols:arrow-back-rounded",
  arrowRight: "material-symbols:arrow-forward-rounded",
  bell: "material-symbols:notifications-outline-rounded",
  calendar: "material-symbols:calendar-month-outline-rounded",
  camera: "material-symbols:photo-camera-outline-rounded",
  cancel: "material-symbols:cancel-rounded",
  check: "material-symbols:check-rounded",
  chevronRight: "material-symbols:chevron-right-rounded",
  clock: "material-symbols:schedule-rounded",
  close: "material-symbols:close-rounded",
  cloud: "material-symbols:partly-cloudy-day-rounded",
  copy: "material-symbols:content-copy-outline-rounded",
  creditCard: "material-symbols:credit-card-outline-rounded",
  delete: "material-symbols:delete-outline-rounded",
  edit: "material-symbols:edit-outline-rounded",
  home: "material-symbols:home-outline-rounded",
  hourglass: "material-symbols:hourglass-empty-rounded",
  instagram: "material-symbols:photo-camera-outline-rounded",
  info: "material-symbols:info-outline-rounded",
  money: "material-symbols:monetization-on-outline-rounded",
  lock: "material-symbols:lock-outline-rounded",
  logout: "material-symbols:logout-rounded",
  message: "material-symbols:chat-outline-rounded",
  moon: "material-symbols:dark-mode-outline-rounded",
  page: "material-symbols:article-outline-rounded",
  pin: "material-symbols:location-on-outline-rounded",
  pix: "material-symbols:api-rounded",
  send: "material-symbols:send-rounded",
  search: "material-symbols:search-rounded",
  visibility: "material-symbols:visibility-outline-rounded",
  wrench: "material-symbols:build-outline-rounded",
  sun: "material-symbols:wb-sunny-outline-rounded",
  sync: "material-symbols:history-rounded",
  user: "material-symbols:person-outline-rounded",
};

export default function Icon({ name, className = "", label }) {
  const icon = icons[name];

  if (!icon) {
    return null;
  }

  return (
    <IconifyIcon
      icon={icon}
      className={`icon ${className}`.trim()}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
    />
  );
}
