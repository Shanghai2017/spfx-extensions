import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { SPList } from '@microsoft/sp-page-context';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { css, getIconClassName } from 'office-ui-fabric-react';

import { IListItem } from './IListItem';

import styles from './styles.module.scss';
import * as strings from 'NextTrainingInfoApplicationCustomizerStrings';

const LOG_SOURCE: string = 'NextTrainingInfoApplicationCustomizer';

/** A Custom Action which can be run during execution of a Client Side Application */
export default class NextTrainingInfoApplicationCustomizer
  extends BaseApplicationCustomizer<{}> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Check if it is Videos list.
    const list: undefined | SPList = this.context.pageContext.list;
    if (!list || list.serverRelativeUrl !== '/sites/it-training/Lists/Videos') {
      Log.info(LOG_SOURCE, 'Not video list');
      return Promise.resolve();
    }

    // Filter, sort and retrieve the next training item.
    const now = new Date();
    const listData = (window as any).g_listData.ListData;
    const items = listData.Row
      .filter((item: IListItem) => new Date(item.Date) > now)
      .sort((a: IListItem, b: IListItem) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
    const nextItem = items[0];

    // Render the next training item to the top placeholder.
    this._renderNextTraining(nextItem);

    return Promise.resolve();
  }

  private _renderNextTraining(item: undefined | IListItem): void {
    Log.info(LOG_SOURCE, 'RenderPlaceHolders');

    // Do nothing if there is no next training item.
    if (!item) {
      Log.info(LOG_SOURCE, 'No next item');
      return;
    }

    // Retrieve the top placeholder from context.
    const topPlaceholder: PlaceholderContent = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);
    if (!topPlaceholder) {
      Log.error(LOG_SOURCE, new Error('The top placeholder is not available.'));
      return;
    }

    // Show the next training item info to the top placeholder.
    if (topPlaceholder.domElement) {
      topPlaceholder.domElement.innerHTML = `
        <div class="${styles.info}">
          <i class="${css(styles.icon, getIconClassName('Info'))}" aria-hidden="true"></i>
          <span>Next training topic is about ${item.Title}. It will be in ${item.Date}.</span>
        </div>
      `;
    }
  }
}
