// temp solution until extending Request with user without ts errors
export const getReqUserId = (user: any): number => {
  return user.id
}