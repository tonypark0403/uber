const cleanNullArgs = (args: object): object => {
  const notNull = {};
  Object.keys(args).forEach((key) => {
    if (key !== 'password' && args[key] !== null) {
      notNull[key] = args[key];
    }
  });
  return notNull;
};

export default cleanNullArgs;
