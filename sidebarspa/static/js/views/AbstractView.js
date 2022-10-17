export default class {
    constructor(params) {
        this.params = params;

        console.log(this.params);
    }

    setTitle(title) {
        document.title = title;
    }

    // override method
    async getHtml() {
        return '';
    }
}