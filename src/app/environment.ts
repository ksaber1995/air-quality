import { createNhostClient } from "@nhost/nhost-js";

export const breakpointUrl = 'https://api.naqi.dal2.com/api/rest/v1/public/breakpoints'
export const MapKey = 'AIzaSyDDQ3S08D_41Ll3a2GjTE28KGQR-G6XvmM';

export const nhost = createNhostClient({
    authUrl: 'https://auth.naqi.dal2.com/v1',
    storageUrl: 'https://auth.naqi.dal2.com/v1',
    graphqlUrl: 'https://auth.naqi.dal2.com/v1',
    functionsUrl: 'https://functions.naqi.dal2.com/v2',
  });
