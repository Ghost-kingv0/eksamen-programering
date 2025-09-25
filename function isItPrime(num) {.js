function isItPrime(num) {
  if (num <= 1) return false;  
    if(num%2===0 && num !==2) return false;
    for(let i =3; i<Math.sqrt(num)+1; i=i+2){
      if(num%i===0) return false;
    }
  return true;  
    }   
    print(isItPrime(81092380912803981209308123))