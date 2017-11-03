# Field Customizer

It shows the iframe player in a customized field.

## Step 1

1. Run `yo @microsoft/sharepoint` inside the solution folder. Follow the steps. These are some critical selections:

    - Component type: Extension
    - Extension type: Field Customizer
    - Name: IframePlayer
    - Framework: React

## Step 2

1. Open [config.json](../../../config/config.json) file. Under `bundles` section, each entry is bundled as one file. It means currently, the application customizer and field customizer are built as two bundles.

2. Merge them into one bundle. They are logically related and we are using one with another. Merge them into one bundle can optimize the network transition.

3. Change the bundle name to more generic one - `it-training-extensions`.

4. Run `gulp clean && gulp` and check `dist` folder. It generates the `it-training-extensions.js` file.

## Step 3

1. Test the generated code.

    - Open [`serve.json` file](../../../config/serve.json), move the `fieldCustomizers` test query under `default` section.
    - Update the `InternalFieldName` to `Link` as it is the target columns to customize.
    - Run `gulp serve` to launch the server.
    - The **Videos** list page opens. Click *Load debug scripts*.
    - Note that, the cells under *Link* columns are prefixed with `Value` string.

2. Walk through the code in [`IframePlayerFieldCustomizer` file](IframePlayerFieldCustomizer.ts).

    - `onInit`: The hook run on field customizer initialization phrase.
    - `onRenderCell`: The method to customize the `event.domElement` on each cell in the target column.
    - `onDisposeCell`: The method to clean up the resource allocated during `onRenderCell`.
