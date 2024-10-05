function recursivos3(A,i,j){
    if (i>j){
        return (A[0]+A[1])/2
    }else{
        let res = obtenerMayo(A)
        let parte = Math.trunc((j+1-1)/3)
        res += recursivos3(A,i,i+parte-1)+
               recursivos3(A,i+parte,i+2*parte-1)+
               recursivos3(A,i+2*parte,j)
        return res
    }
}

let info = [4, 7, 21, 10, 11, 13, 23];
recursivos3(info, 0, info.length-1)