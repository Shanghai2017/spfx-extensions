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

1. Run `gulp serve --nobrowser` to launch the server.

2. Apply the following URL into your **Videos** list URL. Replace the `_FIELD_CUSTOMIZER_ID_` with ID from [the `IframePlayer` manifest file](IframePlayerFieldCustomizer.manifest.json). Notice the `Link` field name in the JSON blob matches the column name in **Videos** list.

    ```
    ?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&fieldCustomizers={"Link":{"id":"_FIELD_CUSTOMIZER_ID_","properties":{"sampleText":"Test"}}}
    ```

3. Notice the `Link` column in the table has prefix the `Test: ` string dynamically.

4. We can combine the test query string for application customizer with this one. Replace the `_ID_` accordingly. You should see both extensions are working.

    ```
    ?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"_APPLICATION_CUSTOMIZER_ID_":{"location":"ClientSideExtension.ApplicationCustomizer","properties":{}}}&fieldCustomizers={"Link":{"id":"_FIELD_CUSTOMIZER_ID_","properties":{"sampleText":"Test"}}}
    ```

5. Walk through the code in [`IframePlayerFieldCustomizer` file](IframePlayerFieldCustomizer.ts).

    - `onInit`: The hook run on field customizer initialization phrase.
    - `onRenderCell`: The method to customize the `event.domElement` on each cell in the target column.
    - `onDisposeCell`: The method to clean up the resource allocated during `onRenderCell`.
