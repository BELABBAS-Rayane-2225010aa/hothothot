class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(ob) {
        this.observers.push(ob);
        console.log(this.observers);
    }

    unsubscribe(ob) {
        // TODO
    }

    notify(data) {
        this.observers.forEach((observer) => observer.update(data));
    }

}