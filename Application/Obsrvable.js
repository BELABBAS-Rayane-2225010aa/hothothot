class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(ob) {
        this.observers.push(ob);
        console.log(this.observers);
    }

    unsubscribe(ob) {
        let i = this.observers.indexOf(ob);
        this.observers.slice(i, i+1);
    }

    notify(data) {
        this.observers.forEach((observer) => observer.update(data));
    }

}