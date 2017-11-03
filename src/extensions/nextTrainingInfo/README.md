# Application Customizer

It shows the next training information in the top placeholder.

## Step 1

1. Ensure the PC has installed [Node.js](https://nodejs.org/en/), [Yeoman](http://yeoman.io), [SharePoint Generator](https://www.npmjs.com/package/@microsoft/generator-sharepointhttps://www.npmjs.com/package/@microsoft/generator-sharepoint) and [Gulp](https://gulpjs.com/).

    - Please install Node.js [version 6.x](https://nodejs.org/dist/latest-v6.x/). The support on version 8.x is ongoing.

2. Create a folder named `spfx-extensions` and open it in CMD.

3. Run `yo @microsoft/sharepoint` and follow the steps. These are some critical selections:

    - Component type: Extension
    - Extension type: Application Customizer
    - Name: NextTrainingInfo

## Step 2

1. Run `gulp trust-dev-cert` to install the localhost certificate to browser. You can use `gulp untrust-dev-cert` to uninstall the certificate after all.

2. Test the generated code.

    - Put the **Videos** list URL to `pageUrl` field in [`serve.json` file](../../../config/serve.json).
    - Run `gulp serve` in the folder to launch the server.
    - It will open the test page with test query string automatically.
    - Click *Load debug scripts* in warning dialog.
    - A dialog about *Test Message* pops up.

3. Get in touch with [manifest file](NextTrainingInfoApplicationCustomizer.manifest.json).

    - Each extension has its own manifest file. The manifest file defines the extension ID, component type, etc.
    - The [`serve.json` file](../../../config/serve.json) uses the extension ID to figure out the extension to test.
    - The [`elements.xml` file](../../../sharepoint/assets/elements.xml) uses the extension ID to connect the extension in production. This will be mentioned in the following section.

4. Walk through the code in [extension file](NextTrainingInfoApplicationCustomizer).

    - `onInit`: The hook is run on the application customizer when initialize.
    - `properties`: The data storage for each application customizer.
    - `Dialog.alert`: Pop up the dialog and show something.
    - `Log.info`: Output when in debug mode, stripped out in production.

## Step 3

1. Access `this.context.pageContext.list` to get the metadata of the current list. Check the list is available and the list is **Videos** list before continue.

2. Access `window.g_listData.Row` to get the list items of the current list. It is creating TypeScript typing for it manually.

3. Filter the training items later than today and sort them by time.

4. Retrieve the top placeholder and check if it is available.

5. Render the next training item into the top placeholder.
