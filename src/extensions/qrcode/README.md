# List View Command Set

It add a button to show QR Code for the link in contextual menu.

## Step 1

1. Run `yo @microsoft/sharepoint` inside the solution folder. Follow the steps. These are some critical selections:

    - Component type: Extension
    - Extension type: ListView Command Set
    - Name: QRCode

2. Open [`config.json`](../../../config/config.json) file and make the new generated component into the `spfx-extensions` bundle.

## Step 2

1. Test the generated code.

    - Open [`serve.json` file](../../../serve.json), move the `customActions` under `qrcode` to `default` section. Currently, we have two entries under `customActions` - one for *Application Customizer*, another for *List View Command Set*.
    - Run `gulp serve` to launch the server. If you are running the server, you need to stop and restart it because the server config is changed.
    - The **Videos** list page opens. Click *Load debug scripts*.
    - Select one item in the list, there is *Command One* in the contextual menu. Click on it will show a dialog.

2. Walk through the code in [manifest file](QRCodeCommandSet.manifest.json).

    - `items`: The object to declare which commands this extension is providing. The key is the command ID, the value is its configuration.
    - `title`: The title to show in the UI for the command. It support localized strings.
    - `iconImageUrl`: The icon image URL for the command. Currently, only image URL from web can be used here. It shows as 16x16 size.
    - `type`: Always fill as `command` at this moment.

3. Walk through the code in [`QRCodeCommandSet` file](QRCodeCommandSet.ts).

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

3. Restart the test server and test the command.

    - Because we are changing the manifest file. We need to stop and restart server.
    - After page opens, select one item, the QR Code command with a fancy icon should be shown in the contextual menu.
    - Because we have no implementation on it, nothing happens if click on it.

## Step 4

1. Run `npm install --save qrcode` to install the [QRCode](https://www.npmjs.com/package/qrcode) NPM package.

2. Update the `onListViewUpdated` method to make the QR Code command is visible only when there is one item selected.

3. Implement the `QRCodeDialog` to convert the video URL to QR Code and show it in the dialog.

4. When click on the QR Code command, show `QRCodeDialog`.

## Credits

This extension is using some icons from [Icon8](https://icons8.com/). They are licensed under [Creative Commons Attribution-NoDerivs 3.0 Unported](https://creativecommons.org/licenses/by-nd/3.0/). Read its license [here](https://icons8.com/license).
