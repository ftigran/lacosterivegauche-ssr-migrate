export const getSubset = (obj, ...keys) => keys.reduce((a, c) => ({ ...a, [c]: obj[c] }), {});