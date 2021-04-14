const fs = require('fs');
const chalk = require('chalk');
const pressAnyKey = require('press-any-key');
const __prompt__ = require('prompt-sync')();
const keypress = require('keypress');
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

keypress(process.stdin);

const out = console.log;

const UVNS = () => {
    eventEmitter.on('runUVNS', () => {
        fs.readFile('./data/UVNS.json', 'utf8', (err: any, data: string) => {

            if (err) {
                out(chalk.red(`Error reading file from disk: ${err}`));
            } else {

                // parse JSON string to JSON object
                const Members = JSON.parse(data);

                Members.forEach((member: any) => {
                    out(`Name: ${member.name}`);
                    out('AKA:');
                    member.aka.forEach((aka: any) => {
                        out(`   ${aka}`);
                    })
                    out(`Real Name: ${member.realName}`);
                    out(`Age: ${member.age}`);
                });

                out('\n\n\n', chalk.hex('#00dfff')(`${data}`))
                out('Press any key to continue, or CTRL+C to reject\n\n');
            }
        });
    })

    eventEmitter.on('runUVNS', () => {
        process.stdin.on('keypress', function (ch, key) {
            if (key && key.ctrl && key.name == 'c') {
                process.stdin.pause();
            } else {
                main()
            }
        });
        
        process.stdin.setRawMode(true);
        process.stdin.resume();
    })

    eventEmitter.emit('runUVNS');
}

const Oenskeliste = () => {
    eventEmitter.on('runOenskeliste', () => {
        fs.readFile('./data/Ønskeliste.json', 'utf8', (err: any, data: string) => {

            if (err) {
                out(`Error reading file from disk: ${err}`);
            } else {

                // parse JSON string to JSON object
                const Liste = JSON.parse(data);

                Liste.forEach((thing: any) => {
                    out(`Name: ${thing.Thing}`);
                    out(`\tInfo: ${thing.Info}`);
                    out(`\tGotten: ${thing.Gotten}\n`)
                });

                out('\n\n\n', chalk.hex('#00dfff')(`${data}`))
                out('Press any key to continue, or CTRL+C to reject\n\n');
            }
        });
    })
    
    eventEmitter.on('runOenskeliste', () => {
        process.stdin.on('keypress', function (ch, key) {
            if (key && key.ctrl && key.name == 'c') {
                process.stdin.pause();
            } else {
                main()
            }
        });
        
        process.stdin.setRawMode(true);
        process.stdin.resume();
    })
    
    eventEmitter.emit('runOenskeliste');
}

const main = () => {
    const input = __prompt__('Things to do: UVNS; Oenskeliste;')

    if (input == 'UVNS') {
        UVNS();
    }
    
    if (input == 'Oenskeliste') {
        Oenskeliste();
    }
}

main();