class NPC {
    constructor(name, occupation, health, netWorth) {
        this.name = name;
        this.occ = occupation;
        this.hp = health;
        this.wealth = netWorth;
    }

    attack(target) {
        console.log(`${this.name} is suing ${target.name} for ${this.wealth} dollars!`);
        target.hp = target.hp - this.wealth;
        target.checkPulse(this);
    }

    checkPulse(assailant) {
        if(this.hp < 0 || this.hp == 0) {
            console.log(`${this.name} has died.`)
        } else if (this.hp > this.wealth) {
            console.log(`${this.name} is still goin' strong at ${this.hp} HP!`)
            this.attack(assailant);
        } else {
            console.log(`${this.name} is barely hangin' on at ${this.hp} HP!`)
            this.attack(assailant);
        }
    }


}
const mike = new NPC('Mike', 'Worker', 2000, 10);
const bob = new NPC('Bob', 'Worker', 200, 20);

bob.attack(mike);