# List View Command Set

It add a button to show QR Code for the link in contextual menu.

## Step 1

1. Run `yo @microsoft/sharepoint` inside the solution folder. Follow the steps. These are some critical selections:

    - Component type: Extension
    - Extension type: ListView Command Set
    - Name: QRCode

2. Open [`config.json`](../../../config/config.json) file and make the new generated component into the `spfx-extensions` bundle.

## Step 2

1. Run `gulp serve --nobrowser` to launch the server. Append the following query string to **Videos** list URL. Replace `_COMMAND_SET_ID_` with the ID in [manifest file](QRCodeCommandSet.manifest.json).

    ```
    ?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"_COMMAND_SET_ID_":{"location":"ClientSideExtension.ListViewCommandSet.CommandBar","properties":{"sampleTextOne":"One item is selected in the list.","sampleTextTwo":"This command is always visible."}}}
    ```

2. Notice that, *Command Two* is shown in the contextual menu. When select on item, *Command One* is shown dynamically. Click on these two command buttons will show a dialog.

3. You can also combine the query string with the previous two extension components. Note that, both *Application Customizer* and *List View Command Set* are using query string key `customActions` to specify value. Replace the `_ID_` values accordingly.

    ```
    ?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&fieldCustomizers={"Link":{"id":"_FIELD_CUSTOMIZER_ID_","properties":{}}}&customActions={"_APPLICATION_CUSTOMIZER_ID_":{"location":"ClientSideExtension.ApplicationCustomizer","properties":{}},"_COMMAND_SET_ID_":{"location":"ClientSideExtension.ListViewCommandSet.CommandBar","properties":{"sampleTextOne":"One item is selected in the list.","sampleTextTwo":"This command is always visible."}}}
    ```

4. All three extensions should work fine.

5. Walk through the code in [manifest file](QRCodeCommandSet.manifest.json).

    - `items`: The object to declare which commands this extension is providing. The key is the command ID, the value is its configuration.
    - `title`: The title to show in the UI for the command. It support localized strings.
    - `iconImageUrl`: The icon image URL for the command. Currently, only image URL from web can be used here. It shows as 16x16 size.
    - `type`: Always fill as `command` at this moment.

6. Walk through the code in [`QRCodeCommandSet` file](QRCodeCommandSet.ts).

    - `onInit`: The hook to initialize the list view command set.
    - `onListViewUpdated`: The method called when selected list items is changed. It can be used to dynamically show/hide a command.
    - `onExecute`: The method to execute concrete logic when a command is click. Check value of `event.itemId` to run different logics for different commands.

## Step 3

1. Update the command declaration in [manifest file](QRCodeCommandSet.manifest.json).

    - Command ID: QR_CODE
    - Title: QR Code
    - iconImageUrl: https://png.icons8.com/qr-code/p1em/16/0078d7

2. We should consider localization in all of our strings.

    - Declare `zh-cn` and `en-us` translation for command title.

3. Because we are changing the manifest file. We need to stop and server and re-launch it to reflect the changes. Refresh the **Videos** list page with test query string. You should see the QR Code command with a fancy icon.

## Credits

This extension is using some icons from [Icon8](https://icons8.com/). They are licensed under [Creative Commons Attribution-NoDerivs 3.0 Unported](https://creativecommons.org/licenses/by-nd/3.0/). Read its license [here](https://icons8.com/license).
