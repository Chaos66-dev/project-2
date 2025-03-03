class Item {
    constructor(data) {
        this.name = data.name
        this.id = data.id
        this.price = data.cost
        this.flavor_text = data.flavor_text_entries
        this.sprite = data.sprites.default
    }


}

export default Item