import { override } from '@microsoft/decorators';
import { autobind } from 'office-ui-fabric-react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import * as React from 'react';

export interface IIframeModalProps {
  videoLink: string;
}

export interface IIframeModalState {
  open: boolean;
}

export class IframeModal extends React.Component<IIframeModalProps, IIframeModalState> {
  public constructor(props: IIframeModalProps) {
    super(props);

    this.state = {
      open: false
    };
  }

  @override
  public render(): JSX.Element {
    return (
      <Modal
        isOpen={this.state.open}
        onDismiss={this._close}
      >
        <iframe
          src={`${this.props.videoLink}/player#autoplay`}
          width="960"
          height="540"
          frameBorder="0"
          allowFullScreen={true}
        />
      </Modal>
    );
  }

  @autobind
  public open() {
    this.setState({
      open: true
    });
  }

  @autobind
  private _close() {
    this.setState({
      open: false
    });
  }
}
