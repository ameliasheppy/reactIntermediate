//lets learn about reduce methods by looking at it on an array
const numbers = [10,20,30];

let total = 0;

for(const n of numbers){
    total +=n
}
total

//that is a normal way to do it. now let's do it with reduce!
//reducer takes two values, one is the current value, 
//and then it takes the num at the given index as it indexes through
//the array with the reducer func
//n is the val for the next iteration, 
//we take the exisiting val, starting at 0
numbers.reduce((current, n) => current + n, 0)
//so the reducer takes two params, the current number and the num
//at that and goes through the arr
//output of reducer is the new val for the next iteration.
//starts at 0, adds each 
//the func that we pass in is called the reducer and it takes two
//params, the current value, and then the new val
//the output of the reducer is what the starting val of the next iteration will be. 
//lets use reducer to build a list of names