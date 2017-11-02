# List View Command Set

It add a button to show QR Code for the link in contextual menu.

## Step 1

1. Run `yo @microsoft/sharepoint` inside the solution folder. Follow the steps. These are some critical selections:

    - Component type: Extension
    - Extension type: ListView Command Set
    - Name: VideoMenu

2. Open [`config.json`](../../../config/config.json) file and make the new generated component into the `spfx-extensions` bundle.

## Step 2

1. Run `gulp serve --nobrowser` to launch the server. Append the following query string to **Videos** list URL. Replace `_COMMAND_SET_ID_` with the ID in [manifest file](VideoMenuCommandSet.manifest.json).

    ```
    ?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"_COMMAND_SET_ID_":{"location":"ClientSideExtension.ListViewCommandSet.CommandBar","properties":{"sampleTextOne":"One item is selected in the list.","sampleTextTwo":"This command is always visible."}}}
    ```

2. Notice that, *Command Two* is shown in the contextual menu. When select on item, *Command One* is shown dynamically. Click on these two command buttons will show a dialog.

3. You can also combine the query string with the previous two extension components. Note that, both *Application Customizer* and *List View Command Set* are using query string key `customActions` to specify value. Replace the `_ID_` values accordingly.

    ```
    ?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&fieldCustomizers={"Link":{"id":"_FIELD_CUSTOMIZER_ID_","properties":{}}}&customActions={"_APPLICATION_CUSTOMIZER_ID_":{"location":"ClientSideExtension.ApplicationCustomizer","properties":{}},"_COMMAND_SET_ID_":{"location":"ClientSideExtension.ListViewCommandSet.CommandBar","properties":{"sampleTextOne":"One item is selected in the list.","sampleTextTwo":"This command is always visible."}}}
    ```

4. All three extensions should work fine.
