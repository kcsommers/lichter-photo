export const log = (...args) => {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
    console.log.apply(console, args);

  }
};