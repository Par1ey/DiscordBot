
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
            return this.x + '\n' + this.y;
        } else if(this.x != null && this.y != null && this.z != null && this.u == null){
            return this.x + '\n' + this.y + '\n' + this.z;
        } else if(this.x != null && this.y != null && this.z != null && this.u != null && this.i == null){
            return this.x + '\n' + this.y + '\n' + this.z + '\n' + this.u;
        } else {
            return this.x + '\n' + this.y + '\n' + this.z + '\n' + this.u + '\n' + this.i;
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