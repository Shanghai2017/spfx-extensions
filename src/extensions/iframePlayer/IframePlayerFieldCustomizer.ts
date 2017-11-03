import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'IframePlayerFieldCustomizerStrings';
import IframePlayer, { IIframePlayerProps } from './components/IframePlayer';

const LOG_SOURCE: string = 'IframePlayerFieldCustomizer';

export default class IframePlayerFieldCustomizer
  extends BaseFieldCustomizer<{}> {

  @override
  public onInit(): Promise<void> {
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    // Render IframePlayer React component to DOM element of the cell.
    ReactDOM.render(
      React.createElement(IframePlayer, { videoLink: event.listItem.getValueByName('Link') }),
      event.domElement
    );
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // Unmount the React element from the DOM element.
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
