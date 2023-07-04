import "./block4.css";
import appleSrc from "./img/apple.png";
import orangeSrc from "./img/orange.png";
import cucumberSrc from "./img/cucumber.png";
import plankSrc from "./img/plank.png";
import plateSrc from "./img/plate.png";
import tableSrc from "./img/table.png";
import plateFancySrc from "./img/plate_fancy.png";
import appleSmallSrc from "./img/apple_small.png";
import orangeSmallSrc from "./img/orange_small.png";

interface Tag {
  tag: string;
  clas?: string;
  id?: string;
  anim?: boolean;
}
interface Arch extends Tag {
  child?: Tag;
}

class Block4 {
  private table: HTMLElement;

  private block4: HTMLElement;

  public constructor() {
    this.table = document.createElement("div");
    this.block4 = document.createElement("div");
  }

  private archDraw(
    arch: Arch[],
    callbackAddAnim: (e: Event) => void,
    callbackRemoveAnim: (e: Event) => void
  ): HTMLElement {
    const tableElemnt = document.createElement("div");
    tableElemnt.classList.add("table");

    arch.forEach((elem, indx) => {
      tableElemnt.append(
        this.drawTags(elem, callbackAddAnim, callbackRemoveAnim, indx + 1)
      );
    });
    return tableElemnt;
  }

  public drawBlock4(
    arch: Arch[],
    callbackAddAnim: (e: Event) => void,
    callbackRemoveAnim: (e: Event) => void
  ): HTMLElement {
    this.block4.classList.add("block4");
    this.block4.style.backgroundImage = `url(${tableSrc})`;
    this.table = this.archDraw(arch, callbackAddAnim, callbackRemoveAnim);
    this.block4.append(this.table);
    return this.block4;
  }

  private Switch(tagName: string, idName: string, className: string): string {
    switch (tagName) {
      case "apple":
        if (className === "small") {
          return appleSmallSrc;
        }
        return appleSrc;
        break;
      case "orange":
        if (className === "small") {
          return orangeSmallSrc;
        }
        return orangeSrc;
        break;
      case "cucumber":
        return cucumberSrc;
        break;
      case "plank":
        return plankSrc;
        break;
      case "plate":
        if (idName === "fancy") {
          return plateFancySrc;
        }
        return plateSrc;
        break;
      default:
        console.log(`Sorry, we are out of ${tagName}.`);
        return "";
    }
  }

  private drawTags(
    obj: Arch,
    callbackAddAnim: (e: Event) => void,
    callbackRemoveAnim: (e: Event) => void,
    count: number
  ): HTMLElement {
    const blockParent = document.createElement("div");
    const parent = document.createElement("img");
    blockParent.classList.add("parent");
    blockParent.classList.add(`${obj.tag}_${count}`);
    const classNameParent = obj.clas || "";
    const idNameParent = obj.id || "";
    parent.src = this.Switch(obj.tag, idNameParent, classNameParent);
    blockParent.onmouseover = callbackAddAnim;
    blockParent.onmouseout = callbackRemoveAnim;
    if (obj.anim) {
      blockParent.classList.add("anim");
    }
    if (obj.child) {
      const child = document.createElement("img");
      const blockChild = document.createElement("div");
      blockChild.classList.add("child");
      blockChild.classList.add(`${obj.child.tag}_${count}`);
      const classNameChild = obj.child.clas || "";
      const idNameChild = obj.child.id || "";
      child.src = this.Switch(obj.child.tag, idNameChild, classNameChild);
      if (obj.child.anim) {
        blockChild.classList.add("anim");
      }
      blockChild.append(child);
      blockParent.append(parent);
      blockParent.append(blockChild);
    } else {
      blockParent.append(parent);
    }

    return blockParent;
  }

  public UpdateBlock4(
    arch: Arch[],
    callbackAddAnim: (e: Event) => void,
    callbackRemoveAnim: (e: Event) => void
  ): void {
    this.table.remove();
    this.table = this.archDraw(arch, callbackAddAnim, callbackRemoveAnim);
    this.block4.append(this.table);
  }
}

export default Block4;
