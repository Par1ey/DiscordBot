let pollreactions = { // For Multiple Choices
    1: '0️⃣',
    2: '1️⃣',
    3: '2️⃣',
    4: '3️⃣',
    5: '4️⃣',
    6: '😢',
}
module.exports = class Counter{

    constructor(x, y, z, u, i){
        this.x = x;
        this.y = y;
        this.z = z;
        this.u = u;
        this.i = i;

    }

    question(){
        let amount;
        if(this.x != null && this.y == null){
            return this.x;
        } else if(this.x != null && this.y != null && this.z == null){
            return pollreactions[1] + ": " + this.x + '\n' + pollreactions[2] + ": " + this.y;
        } else if(this.x != null && this.y != null && this.z != null && this.u == null){
            return pollreactions[1] + ": " + this.x + '\n' + pollreactions[2] + ": " + this.y + '\n' + pollreactions[3] + ": " + this.z;
        } else if(this.x != null && this.y != null && this.z != null && this.u != null && this.i == null){
            return pollreactions[1] + ": " + this.x + '\n' + pollreactions[2] + ": " + this.y + '\n' + pollreactions[3] + ": " + this.z + '\n' + pollreactions[4] + ": " + this.u;
        } else {
            return pollreactions[1] + ": " + this.x + '\n' + pollreactions[2] + ": " + this.y + '\n' + pollreactions[3] + ": " + this.z
             + '\n' + pollreactions[4] + ": " + this.u + '\n' + pollreaction[5] + ": " + this.i;
        }
    }
    reaction(){
        if(this.x != null && this.y == null){
            return 1;
        } else if(this.x != null && this.y != null && this.z == null){
            return 2;
        } else if(this.x != null && this.y != null && this.z != null && this.u == null){
            return 3;
        } else if(this.x != null && this.y != null && this.z != null && this.u != null && this.i == null){
            return 4;
        } else {
            return 5;
        }

    }


}