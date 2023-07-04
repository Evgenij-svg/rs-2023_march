import Input from "../input/input";
import "./textEditor.css";

class TextEditor {
  private input: Input;

  public constructor() {
    this.input = new Input();
  }

  // private Enter(e: KeyboardEvent): void {
  //   if (e.key === "Enter") {
  //     console.log(e.target);
  //     const input = document.querySelector(
  //       ".textEditorInput"
  //     ) as HTMLInputElement;
  //     console.log(input.value);
  //   }
  // }

  public drawTextEditor(callback: (e: KeyboardEvent) => void): HTMLElement {
    const textEditor = document.createElement("div");
    textEditor.classList.add("textEditor");
    textEditor.appendChild(
      this.input.drawInput("textEditorInput", "Write css selctors", callback)
    );
    const text = document.createElement("div");
    text.innerHTML = "<br> rs-css Selectors<br> <br> Made by MrDes<br>";
    textEditor.appendChild(text);
    return textEditor;
  }
}
export default TextEditor;
