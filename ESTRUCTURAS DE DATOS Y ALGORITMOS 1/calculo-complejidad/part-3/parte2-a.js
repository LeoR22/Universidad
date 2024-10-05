function recursivos2(A,i,j){
    if (i>j){
        return acota (A)
    }else{
        return Math.max(A[i],A[j]) * recursivos2(A,i,j)
    }
}

let info = [4, 7, 21, 10, 11, 13, 23];
recursivos2(info, 0, info.length-1)