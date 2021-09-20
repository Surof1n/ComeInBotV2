export const CiOptions = {
  token: process.env["TOKEN"],
  prefix: process.env["PREFIX"],
};

export const GuildReputationSettings = {
  emoji: "🏆",
};

export enum Icons {
  error = "https://i.imgur.com/9Fds4w6.png",
  warning = "https://i.imgur.com/5S7Qdbf.png",
  success = "https://i.imgur.com/1dFFXO4.png",
  info = "https://i.imgur.com/sDkN3mN.png",
  streaming = "https://i.imgur.com/d7LQCzS.png",
  online = "https://i.imgur.com/Ho92EY9.png",
  dnd = "https://i.imgur.com/njGQDwH.png",
  idle = "https://i.imgur.com/lum1O3o.png",
  offline = "https://i.imgur.com/0iWllP2.png",
  disconnect = "https://i.ibb.co/8dwGX8Z/member-gray-minus-red.png",
  connect = "https://i.ibb.co/gZnwwS7/member-gray-plus-green.png",
  infoOrange = "https://i.ibb.co/74yvsqC/Pics-Art-09-19-08-26-44.png",
}

export const TimeOutSet = new Set(['hour', 'day', 'isoWeek', 'month', 'year']);

export enum Colors {
  Brand = 0xff8c1a,
  Blue = 0x437db6,
  Gray = 0x6a7480,
  Red = 0xf04747,
  Yellow = 0xfaa61a,
  Green = 0x43b581,
  Invise = 0x36393f,
  Orange = 0xff572e
}

export const CardSettings = {
  AVATAR_SIZE: { x: 182, y: 182, r: 91 },
  IMAGE_SIZE: { x: 750, y: 517 },
  POSITIONS: {
    avatar: { x: 46, y: 101 },
    userInfo: { x: 295, y: 271 },
    nickname: { x: 62, y: 41 },
    role: { x: 62, y: 291 },
    wallet: {
      warmth: { x: 313, y: 163 },
      sparks: { x: 418, y: 163 },
      pents: { x: 512, y: 163 },
      xp: { x: 605, y: 163 },
    },
    stats: {
      messages: { x: 183, y: 336 },
      vc_hours: { x: 183, y: 366 },
      days: { x: 183, y: 395 },
    },
  },
  COLORS: { black: '#fff', white: '#000' },
};