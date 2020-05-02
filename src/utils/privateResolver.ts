const privateResolver = (resolverFunction) => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.req.user) {
    throw new Error('No JWT. Please check your jwt or log in first!');
  }
  const resolved = await resolverFunction(parent, args, context, info);
  return resolved;
};

export default privateResolver;
