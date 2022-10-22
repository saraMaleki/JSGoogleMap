export class Modal {
  constructor(contentId, fallbackText) {
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById("modal-template");
    this.fallbackText = fallbackText;
  }

  show() {
    if ("content" in document.createElement("template")) {
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true
      );
      this.modalElement = modalElements.querySelector(".modal");
      this.bacdropElement = modalElements.querySelector(".backdrop");
      const contentElement = document.importNode(
        this.contentTemplateEl.content,
        true
      );
      this.modalElement.appendChild(contentElement);

      document.body.insertAdjacentElement("afterbegin", this.modalElement);
      document.body.insertAdjacentElement("afterbegin", this.bacdropElement);
    } else {
      //fallback code
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElement) {
      document.body.removeChild(this.modalElement);
      document.body.removeChild(this.bacdropElement);

      this.modalElement = null;
      this.bacdropElement = null;
    }
  }
}
