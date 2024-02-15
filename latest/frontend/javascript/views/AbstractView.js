export class AbstractView {
  constructor() {}

  setTitle(title) {
    document.title = title;
  }

  async hydrate() {
    console.log("hydrating");
  }

  async getHTML() {
    return "";
  }
}
