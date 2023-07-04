import Block1 from "../block1/block1";
import Block2 from "../block2/block2";
import Block3 from "../block3/block3";
import Block4 from "../block4/block4";
import Levels from "../data/data";

interface Tag {
  tag: string;
  clas?: string;
  id?: string;
}
interface Arch extends Tag {
  child?: Tag;
}

class App {
  private block1: Block1;

  private block2: Block2;

  private block3: Block3;

  private block4: Block4;

  private block4Elem: HTMLElement;

  private Level: number;

  private MaxLevel: number;

  public constructor() {
    this.block1 = new Block1();
    this.block2 = new Block2();
    this.block3 = new Block3();
    this.block4 = new Block4();
    this.Level = 0;
    this.MaxLevel = 0;

    this.block4Elem = document.createElement("div");
  }

  private UpdateApp(): void {
    const description = Levels[this.Level][1] as string;
    const arch = Levels[this.Level][0] as Arch[];
    this.block3.UpdateBlock3(this.Level.toString(), description);
    this.block2.UpdateBlock2(arch, this.Animation, this.removeAnimation);
    this.block4.UpdateBlock4(arch, this.Animation, this.removeAnimation);
  }

  private EkrementLevel = (): void => {
    this.Level += 1;
    if (!(this.Level > 9)) {
      this.Level = Math.min(this.MaxLevel, this.Level);
      this.UpdateApp();
    } else {
      alert("You won");
    }
  };

  private DekrementLevel = (): void => {
    this.Level -= 1;
    this.Level = Math.max(0, this.Level);
    this.UpdateApp();
  };

  private EnterIput = (e: KeyboardEvent): void => {
    const input = e.target as HTMLInputElement;
    if (e.code === "Enter") {
      this.RightValue(input.value);
    }
  };

  private EnterButton = (): void => {
    const input = document.querySelector(
      ".textEditorInput"
    ) as HTMLInputElement;
    this.RightValue(input.value);
  };

  private RightValue(value: string): void {
    const right = Levels[this.Level][2] as string;

    if (right === value) {
      this.MaxLevel += 1;
      this.MaxLevel = Math.min(this.MaxLevel, 9);

      const parents = document.querySelectorAll(".parent");
      parents.forEach((elem) => {
        // eslint-disable-next-line no-param-reassign
        (elem as HTMLElement).style.opacity = "0";
      });

      const childs = document.querySelectorAll(".child ");
      childs.forEach((elem) => {
        // eslint-disable-next-line no-param-reassign
        (elem as HTMLElement).style.opacity = "0";
      });

      this.block4Elem.classList.add("block4_anim");

      // // Удаление класса 'animated' после завершения анимации
      // // this.block4Elem.addEventListener("animationend", () => {
      // //   this.block4Elem.classList.remove("block4_anim");
      // //   this.EkrementLevel();
      // // });
      setTimeout(() => {
        this.block4Elem.classList.remove("block4_anim");
        this.EkrementLevel();
      }, 300); // Время анимации в миллисекундах
    }
  }

  private Animation(e: Event): void {
    const Element = e.target as HTMLElement;
    let ClassName = "";
    if (Element.tagName === "IMG") {
      const parentNodeImg = Element.parentNode as HTMLElement;
      const [, className] = parentNodeImg.className.split(" ");
      ClassName = className;
    } else {
      const [, className] = Element.className.split(" ");
      ClassName = className;
    }

    const ListElement = document.querySelectorAll(`.${ClassName}`);
    ListElement.forEach((elem) => {
      if (elem.className.split(" ")[0] === "tags") {
        elem.classList.add("high");
      } else {
        elem.classList.add("anim_mouse");
      }
    });
  }

  private removeAnimation(e: Event): void {
    const Element = e.target as HTMLElement;
    let ClassName = "";

    if (Element.tagName === "IMG") {
      const parentNodeImg = Element.parentNode as HTMLElement;
      const [, className] = parentNodeImg.className.split(" ");
      ClassName = className;
    } else {
      const [, className] = Element.className.split(" ");
      ClassName = className;
    }
    const ListElement = document.querySelectorAll(`.${ClassName}`);
    ListElement.forEach((elem) => {
      if (elem.className.split(" ")[0] === "tags") {
        elem.classList.remove("high");
      } else {
        elem.classList.remove("anim_mouse");
      }
    });
  }

  public start(): void {
    const arch = Levels[this.Level][0] as Arch[];
    const description = Levels[this.Level][1] as string;
    const body = document.querySelector("body");
    if (body !== null) {
      this.block4Elem = this.block4.drawBlock4(
        arch,
        this.Animation,
        this.removeAnimation
      );
      body.appendChild(this.block4Elem);

      body.appendChild(
        this.block1.drawBlock1(this.EnterIput, this.EnterButton)
      );
      body.appendChild(
        this.block2.drawBlock2(arch, this.Animation, this.removeAnimation)
      );
      body.appendChild(
        this.block3.drawBlock3(
          this.Level.toString(),
          description,
          this.EkrementLevel,
          this.DekrementLevel
        )
      );
    }
  }
}

export default App;
