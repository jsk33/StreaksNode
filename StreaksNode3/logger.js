const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        // send an HTTP request
        console.log(message);

        // raise an event
        this.emit('messageLogged', {id: 1, url: 'google.com'});
    }
}

module.exports = Logger;