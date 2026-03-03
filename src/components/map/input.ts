export interface MovementKeys {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  shift: boolean;
}

export const createMovementKeys = (): MovementKeys => ({
  w: false,
  a: false,
  s: false,
  d: false,
  shift: false,
});

export const updateMovementKey = (
  keys: MovementKeys,
  key: string,
  isDown: boolean,
) => {
  if (key === 'w' || key === 'W' || key === 'ArrowUp') keys.w = isDown;
  if (key === 'a' || key === 'A' || key === 'ArrowLeft') keys.a = isDown;
  if (key === 's' || key === 'S' || key === 'ArrowDown') keys.s = isDown;
  if (key === 'd' || key === 'D' || key === 'ArrowRight') keys.d = isDown;
  if (key === 'Shift') keys.shift = isDown;
};
