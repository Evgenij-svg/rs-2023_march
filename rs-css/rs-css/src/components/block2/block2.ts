import SideBar from "../elements/sideBar/sideBar";
import Code from "../elements/cods/code";
import "./block2.css";

interface Tag {
  tag: string;
  clas?: string;
  id?: string;
}
interface Arch extends Tag {
  child?: Tag;
}

class Block2 {
  private sideBar: SideBar;

  private code: Code;

  private codeELement: HTMLElement;

  private block2: HTMLElement;

  public constructor() {
    this.sideBar = new SideBar();
    this.code = new Code();
    this.codeELement = document.createElement("div");
    this.block2 = document.createElement("div");
  }

  public UpdateBlock2(
    arch: Arch[],
    callbackHighlight: (e: Event) => void,
    callbackremoveHighlight: (e: Event) => void
  ): void {
    this.codeELement.remove();
    this.codeELement = this.code.archDraw(
      arch,
      callbackHighlight,
      callbackremoveHighlight
    );
    this.block2.appendChild(this.codeELement);
  }

  public drawBlock2(
    arch: Arch[],
    callbackHighlight: (e: Event) => void,
    callbackremoveHighlight: (e: Event) => void
  ): HTMLElement {
    this.codeELement = this.code.archDraw(
      arch,
      callbackHighlight,
      callbackremoveHighlight
    );
    this.block2.classList.add("block2");
    this.block2.appendChild(this.sideBar.drawSideBar("SideBar"));
    this.block2.appendChild(this.codeELement);
    return this.block2;
  }
}
export default Block2;
