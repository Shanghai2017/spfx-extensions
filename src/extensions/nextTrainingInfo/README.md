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

4. Go to your **Videos** list URL, append the following query string after it. Replace the `_MANIFEST_ID_HERE_` with the ID from your manifest file.

    ```
    ?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"_MANIFEST_ID_HERE_":{"location":"ClientSideExtension.ApplicationCustomizer","properties":{"testMessage":"HelloWorld"}}}
    ```

5. A dialog about *Hello World* should be popped up.

6. Walk through the code in [extension file](NextTrainingInfoApplicationCustomizer).

    - `onInit`: The hook is run on the application customizer when initialize.
    - `properties`: The data storage for each application customizer.
    - `Log.info`: Output when in debug mode, stripped out in production.
    - `Dialog.alert`: Pop up the dialog and show something.

## Step 3

1. Access `this.context.pageContext.list` to get the metadata of the current list. Check the list is available and the list is **Videos** list before continue.

2. Access `window.g_listData.Row` to get the list items of the current list. It is creating TypeScript typing for it manually.

3. Filter the training items later than today and sort them by time.

4. Retrieve the top placeholder and check if it is available.

5. Render the next training item into the top placeholder.

## Step 4

1. Leverage [Module CSS](https://github.com/css-modules/css-modules) to apply beautiful CSS styles.

    - Set background as `$ms-color-neutralLight` as guideline from [Fabric](https://developer.microsoft.com/en-us/fabric#/styles/colors).
    - Preserve some spacing between icon and message. We should leverage `ms-margin-right` mixin for RTL support.

2. Leverage `getIconClassName` from Fabric React to apply the `Info` [icon](https://developer.microsoft.com/en-us/fabric#/styles/icons).
