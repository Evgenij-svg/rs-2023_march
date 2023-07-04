import TextEditor from "../elements/textEditor/textEditor";
import SideBar from "../elements/sideBar/sideBar";
import Button from "../elements/button/button";
import "./block1.css";

class Block1 {
  private sideBar: SideBar;

  private textEditor: TextEditor;

  private button: Button;

  public constructor() {
    this.sideBar = new SideBar();
    this.textEditor = new TextEditor();
    this.button = new Button();
  }

  public drawBlock1(
    callbackInput: (e: KeyboardEvent) => void,
    callbackButton: () => void
  ): HTMLElement {
    const block1 = document.createElement("div");
    block1.classList.add("block1");
    block1.appendChild(this.sideBar.drawSideBar("SideBar"));
    block1.appendChild(this.textEditor.drawTextEditor(callbackInput));
    block1.appendChild(
      this.button.drawButton("Button", "enter", callbackButton)
    );
    return block1;
  }
}
export default Block1;
