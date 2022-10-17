import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(paramss);
        this.setTitle("Posts")
    }

    async getHtml() {
        return ` 
            <h1>PostsView</h1>
            <p>You are viewing the second post</p>
        `
    }
}