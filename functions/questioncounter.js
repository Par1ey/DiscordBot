
class counter{
    constructor(x, y, z, u, i){
        this.x = x;
        this.y = y;
        this.z = z;
        this.u = u;
        this.i = i;
        let amount;
    }

    question(){
        if(this.x != null){
            amount += 1;
        }
        if(this.y != null){
            amount += 1;
        }
        if(this.z != null){
            amount += 1;
        }
        if(this.u != null){
            amount += 1;
        }
        if(this.i != null){
            amount += 1;
        }

    return amount;
    }

}