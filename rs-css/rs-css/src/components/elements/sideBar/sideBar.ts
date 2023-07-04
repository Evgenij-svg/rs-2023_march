class SideBar {
  public drawSideBar(classElem: string): HTMLElement {
    const sideBar: HTMLElement = document.createElement("aside");
    sideBar.classList.add(classElem);
    const CountLines = 20;
    for (let i = 1; i <= CountLines; i += 1) {
      const line = document.createElement("div");
      line.textContent = i.toString();
      sideBar.appendChild(line);
    }
    return sideBar;
  }
}
export default SideBar;
