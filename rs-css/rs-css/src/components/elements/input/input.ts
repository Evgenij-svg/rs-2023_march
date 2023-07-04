class Input {
  public drawInput(
    classElem: string,
    placeholderInput?: string,
    callback?: (e: KeyboardEvent) => void
  ): HTMLInputElement {
    const input: HTMLInputElement = document.createElement("input");
    input.classList.add(classElem);
    if (placeholderInput !== undefined) {
      input.placeholder = placeholderInput;
    }
    if (callback !== undefined) {
      input.addEventListener("keyup", callback); // Changed event type to "keydown"
    }
    return input;
  }
}

export default Input;
