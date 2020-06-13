// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  apiURL: "http://localhost:5000",

  CLOUD_NAME: "sva",
  CLOUD_API_KEY: 975547421473123,
  CLOUD_API_SECRET: "nR_Hy44bY4kod9dTxjRTqVqFtuA",
  CLOUDINARY_URL: "cloudinary://975547421473123:nR_Hy44bY4kod9dTxjRTqVqFtuA@sva",
  cloudinaryURL: 'https://api.cloudinary.com/v1_1/dzroeeczl/image/upload',
  cloudinaryPreset: 'neokons'
};
