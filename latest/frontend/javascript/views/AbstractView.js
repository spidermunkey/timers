export class AbstractView {
  constructor() {}

  setTitle(title) {
    document.title = title;
    $(".app-header .current-tab .label").textContent = title;
  }
  async hydrate() {
    console.log("hydrating");
  }

  async getHTML() {
    return "";
  }
}
