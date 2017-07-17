class A {
    _name: string
    setName() {
        this._name = 'sunhk'
    }
    get name() {
        return this._name
    }
}
class B extends A {
    constructor() {
        super()
        this.setName()
        console.log(this.name)
    }
}

new B()