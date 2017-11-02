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
    QRCode.toCanvas(this._videoLink, (error, canvas) => {
      if (canvas) {
        this.domElement.appendChild(canvas);
      } else if (error) {
        this.domElement.textContent = `Failed to generate QR code for link: ${this._videoLink}. Error: ${error.message}`;
      } else {
        this.domElement.textContent = 'Unknown error';
      }
    });
  }
}
