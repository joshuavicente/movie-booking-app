// Utility to simulate a delay (e.g. for loading states)
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
