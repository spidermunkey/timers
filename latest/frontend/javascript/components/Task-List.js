export class TaskList {
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('task-list');
        this.element.innerHTML = this.getHTML();
    }

    render(destination) {
        destination.appendChild(this.element);
        return this.element;
    }

    getHTML() {
        return `
            <div class="task-list">
                <div class="header">
                    <div class="label">Saved Tasks</div>
                </div>
            </div>
        `
    }
}