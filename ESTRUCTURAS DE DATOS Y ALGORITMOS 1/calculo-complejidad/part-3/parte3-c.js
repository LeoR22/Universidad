
function recursivos4(A,i,j){
    if (i>j){
        return i
    }else{
        let parte = Math.trunc((i+j)/2)
        return recursivos4(A,i,i+parte-1)+
               recursivos4(A,i+parte,j)
    }
}

let info = [4, 7, 21, 10, 11, 13, 23];
recursivos2(info, 0, info.length-1)

