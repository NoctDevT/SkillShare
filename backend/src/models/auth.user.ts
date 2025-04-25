export interface Auth0User {
    email?: string;
    name?: string;
    sub?: string;
    picture?: string;
    [key: string]: any;
}
  export default Auth0User; 

  