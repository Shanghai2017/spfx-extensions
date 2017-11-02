import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';

import QRCodeDialog from './QRCodeDialog';

import * as strings from 'VideoMenuCommandSetStrings';

const LOG_SOURCE: string = 'VideoMenuCommandSet';

export default class VideoMenuCommandSet extends BaseListViewCommandSet<{}> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized VideoMenuCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const qrCodeCommand: Command = this.tryGetCommand('QR_CODE');
    if (qrCodeCommand) {
      qrCodeCommand.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    const videoLink: string = event.selectedRows[0].getValueByName('Link');
    switch (event.itemId) {
      case 'QR_CODE':
        const dialog: QRCodeDialog = new QRCodeDialog(videoLink);
        dialog.show();
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
