class AddedComment {
    constructor(data) {
        const {id, content, owner} = data;

        this.id = id;
        this.content = content;
        this.owner = owner;
    }
}

module.exports = AddedComment;