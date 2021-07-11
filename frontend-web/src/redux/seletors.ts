interface RootState {
  auth: boolean;
}
export const getAuthState = (store: RootState) => store.auth;
