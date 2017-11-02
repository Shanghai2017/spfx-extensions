import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import { autobind } from 'office-ui-fabric-react';
import * as React from 'react';

import { IframeModal } from './IframeModal';

import styles from './IframePlayer.module.scss';

export interface IIframePlayerProps {
  videoLink: string;
}

const LOG_SOURCE: string = 'IframePlayer';

export default class IframePlayer extends React.Component<IIframePlayerProps, {}> {
  private _iframeModal: undefined | IframeModal;

  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: IframePlayer mounted');
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: IframePlayer unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {
    return (
      <div
        className={styles.container}
      >
        <iframe
          src={`${this.props.videoLink}/player`}
          width="96"
          height="54"
          frameBorder="0"
          sandbox=""
        />
        <button
          className={styles.overlay}
          title="Play"
          onClick={this.openVideo}
        />
        <IframeModal
          videoLink={this.props.videoLink}
          ref={instance => this._iframeModal = instance}
        />
      </div>
    );
  }

  @autobind
  private openVideo(): void {
    Log.info(LOG_SOURCE, `Open video: ${this.props.videoLink}`);
    if (this._iframeModal) {
      this._iframeModal.open();
    }
  }
}
