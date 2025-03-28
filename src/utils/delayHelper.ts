// This file contains a utility function to create a delay in the execution of code.
// This is useful for simulating loading states or waiting for a certain period before executing the next line of code.
// It returns a promise that resolves after the specified number of milliseconds.

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
