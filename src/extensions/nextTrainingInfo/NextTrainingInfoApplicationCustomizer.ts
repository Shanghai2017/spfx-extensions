import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { SPList } from '@microsoft/sp-page-context';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import { IListItem } from './IListItem';

import * as strings from 'NextTrainingInfoApplicationCustomizerStrings';

const LOG_SOURCE: string = 'NextTrainingInfoApplicationCustomizer';

/** A Custom Action which can be run during execution of a Client Side Application */
export default class NextTrainingInfoApplicationCustomizer
  extends BaseApplicationCustomizer<{}> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    const list: undefined | SPList = this.context.pageContext.list;
    if (!list || list.serverRelativeUrl !== '/sites/it-training/Lists/Videos') {
      Log.info(LOG_SOURCE, 'Not video list');
      return Promise.resolve();
    }

    const now = new Date();
    const listData = (window as any).g_listData.ListData;
    const items = listData.Row
      .filter((item: IListItem) => new Date(item.Date) > now)
      .sort((a: IListItem, b: IListItem) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
    const nextItem = items[0];

    this._renderNextTraining(nextItem);

    return Promise.resolve();
  }

  private _renderNextTraining(item: undefined | IListItem): void {
    Log.info(LOG_SOURCE, 'RenderPlaceHolders');

    if (!item) {
      Log.info(LOG_SOURCE, 'No next item');
      return;
    }

    const topPlaceholder: PlaceholderContent = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);
    if (!topPlaceholder) {
      Log.error(LOG_SOURCE, new Error('The top placeholder is not available.'));
      return;
    }

    if (topPlaceholder.domElement) {
      topPlaceholder.domElement.textContent = `
        Next training topic is about ${item.Title}. It will be in ${item.Date}.
      `;
    }
  }

}
