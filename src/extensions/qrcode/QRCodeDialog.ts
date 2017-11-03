import { override } from '@microsoft/decorators';
import { BaseDialog } from "@microsoft/sp-dialog";
import * as QRCode from 'qrcode';

export default class QRCodeDialog extends BaseDialog {
  private readonly _videoLink: string;

  public constructor(videoLink: string) {
    super();

    this._videoLink = videoLink;
  }

  @override
  protected render(): void {
    // Leverage QRCode NPM package to generate QR Code canvas for the video link.
    QRCode.toCanvas(this._videoLink, (error, canvas) => {
      if (canvas) {
        // Append the QR Code canvas to the dialog DOM.
        this.domElement.appendChild(canvas);
      } else if (error) {
        // Show the error message if happens.
        this.domElement.textContent = `Failed to generate QR code for link: ${this._videoLink}. Error: ${error.message}`;
      } else {
        // We don't know what is happening here.
        this.domElement.textContent = 'Unknown error';
      }
    });
  }
}
