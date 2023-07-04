import "./code.css";

interface Tag {
  tag: string;
  clas?: string;
  id?: string;
}
interface Arch extends Tag {
  child?: Tag;
}

class Code {
  public archDraw(
    arch: Arch[],
    callbackHighlight: (e: Event) => void,
    callbackremoveHighlight: (e: Event) => void
  ): HTMLDivElement {
    const cods = document.createElement("div");
    cods.classList.add("Code");
    arch.forEach((elem, indx) => {
      cods.append(
        this.drawTags(
          elem,
          callbackHighlight,
          callbackremoveHighlight,
          indx + 1
        )
      );
    });
    return cods;
  }

  private InerHTMLTag(tag: string, clas?: string, id?: string): string {
    return `&lt;${tag} ${clas ? `class=${clas}` : ""} ${
      id ? `id=${id}` : ""
    } &gt; <br>`;
  }

  private drawTags(
    obj: Arch,
    callbackHighlight: (e: Event) => void,
    callbackremoveHighlight: (e: Event) => void,
    count: number
  ): HTMLElement {
    const tag = document.createElement("div");
    tag.onmouseover = callbackHighlight;
    tag.onmouseout = callbackremoveHighlight;
    tag.classList.add("tags");
    tag.classList.add(`${obj.tag}_${count}`);
    if (obj.child) {
      tag.innerHTML = this.InerHTMLTag(obj.tag, obj.clas, obj.id);
      tag.append(
        this.drawTags(
          obj.child,
          callbackHighlight,
          callbackremoveHighlight,
          count
        )
      );
      tag.innerHTML += `  <br> &lt;/${obj.tag}&gt;`;
    } else {
      tag.innerHTML = this.InerHTMLTag(obj.tag, obj.clas, obj.id);
      tag.innerHTML += ` &lt;/${obj.tag}&gt;`;
    }
    return tag;
  }
}
export default Code;
