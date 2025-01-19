import inquirer from 'inquirer';
import { NPC } from './archive.js';

let npcs = [
    new NPC('Bob', 'Barista', 20, 5),
    new NPC('Priscilla', 'Crypto Broker', 20, 10),
    new NPC('Angel', 'Ballerino', 20, 2),
    new NPC("Stacy's Mom", "Has Got it Going On", 20, 150)
];

let victims = [];

let player = null;

inquirer.prompt([
    {
        type: 'input',
        name: 'username',
        message: 'What is your name?'
    },
    {
        type: 'input',
        name: 'job',
        message: 'What is your occupation?'
    },
    {
        type: 'input',
        name: 'wealth',
        message: 'What is your net worth?'
    }
]).then(answers => {
    let hp;
    let wealth = parseInt(answers.wealth, 10) || 0;
    if (answers.job === 'Soldier') {
        hp = 50;
    } else if (answers.job === 'Crypto Bro') {
        console.log("No, it isn't.");
        wealth = 0;
        hp = 1;
    } else {
        wealth = parseInt(answers.wealth, 10) || 0;
        hp = 20;
    }
    player = new NPC(answers.username, answers.job, hp, wealth);
    console.log(`Welcome, ${answers.username}!`);

    function chooseYourFighter() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'fate',
                message: 'Select an NPC to sue into oblivion.',
                choices: npcs.map((npc) => npc.name)
            }
        ]).then(answers => {
            const target = npcs.find((npc) => npc.name === answers.fate);

            if (target) {
                player.attack(target);
            } else {
                console.log('NPC not found!');
                return;
            }

            if (target.hp <= 0) {
                npcs = npcs.filter((npc) => npc !== target);

                if (npcs.length === 0) {
                    console.log('You killed everybody, you monster!');
                    return;
                }
            }

            if (player.hp <= 0) {
                console.log('You suck.');
                return;
            }

            chooseYourFighter();
        });
    }

    chooseYourFighter();
});
