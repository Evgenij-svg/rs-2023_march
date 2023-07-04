import Button from "../elements/button/button";
import "./block3.css";

class Block3 {
  private button: Button;

  private descriptionLevel: HTMLElement;

  private LevelSpan: HTMLElement;

  public constructor() {
    this.button = new Button();
    this.LevelSpan = document.createElement("span");
    this.descriptionLevel = document.createElement("p");
  }

  // private EkrementLevel = (): void => {
  //   this.Level += 1;
  //   this.LevelSpan.textContent = this.Level.toString();
  // };

  // private DekrementLevel = (): void => {
  //   this.Level -= 1;
  //   this.LevelSpan.textContent = this.Level.toString();
  // };
  public UpdateBlock3(level: string, description: string): void {
    this.LevelSpan.textContent = level;
    this.descriptionLevel.textContent = description;
  }

  public drawBlock3(
    level: string,
    description: string,
    callbackEnkrement: () => void,
    callbackDekrement: () => void
  ): HTMLElement {
    const block3 = document.createElement("nav");
    const changeLevel = document.createElement("div");

    block3.classList.add("block3");
    changeLevel.classList.add("changeLevel");
    this.LevelSpan.classList.add("LevelSpan");
    this.descriptionLevel.classList.add("descriptionLevel");

    this.LevelSpan.textContent = level;
    this.descriptionLevel.textContent = description;

    changeLevel.appendChild(
      this.button.drawButton("ArrowLeft", "<", callbackDekrement)
    );
    changeLevel.appendChild(
      this.button.drawButton("ArrowRight", ">", callbackEnkrement)
    );
    block3.appendChild(this.LevelSpan);
    block3.appendChild(changeLevel);
    block3.appendChild(this.descriptionLevel);

    return block3;
  }
}
export default Block3;
