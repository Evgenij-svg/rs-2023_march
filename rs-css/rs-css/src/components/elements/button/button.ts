class Button {
  public drawButton(
    classElem: string,
    text: string,
    callback?: () => void
  ): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement("button");
    button.classList.add(classElem);
    button.textContent = text;
    if (callback !== undefined) {
      button.addEventListener("click", callback);
    }
    return button;
  }
}
export default Button;
