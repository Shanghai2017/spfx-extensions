# Application Customizer

It shows the next training information in the top placeholder.

## Step 1

1. Ensure the PC has installed [Node.js](https://nodejs.org/en/), [Yeoman](http://yeoman.io), [SharePoint Generator](https://www.npmjs.com/package/@microsoft/generator-sharepointhttps://www.npmjs.com/package/@microsoft/generator-sharepoint) and [Gulp](https://gulpjs.com/).

2. Create a folder named `spfx-extensions` and open it in CMD.

3. Run `yo @microsoft/sharepoint` and follow the steps. These are some critical selections:

    - Component type: Extension
    - Extension type: Application Customizer
    - Name: NextTrainingInfo

## Step 2

1. Open the `spfx-extensions` folder with your editor. Navigate to the [manifest file](NextTrainingInfoApplicationCustomizer.manifest.json). Remember the extension ID.

2. Run `gulp trust-dev-cert` to install the localhost certificate to browser. You can use `gulp untrust-dev-cert` to uninstall the certificate after all.

3. Run `gulp serve --nobrowser` in the folder to launch the server.

4. Go to your **Videos** list URL, append the following query string after it. Replace the `_APPLICATION_CUSTOMIZER_ID_` with the ID from your manifest file.

    ```
    ?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"_APPLICATION_CUSTOMIZER_ID_":{"location":"ClientSideExtension.ApplicationCustomizer","properties":{"testMessage":"HelloWorld"}}}
    ```

5. A dialog about *Hello World* should be popped up.

6. Walk through the code in [extension file](NextTrainingInfoApplicationCustomizer).

    - `onInit`: The hook is run on the application customizer when initialize.
    - `properties`: The data storage for each application customizer.
    - `Log.info`: Output when in debug mode, stripped out in production.
    - `Dialog.alert`: Pop up the dialog and show something.
