//------------------------------------------------------------------
//------------------------------------------------------------------
const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const array = a.split('');
//------------------------------------------------------------------
export function getKeyCode(num) {
  let code = "";
  for (let i = 0; i < num; i++) {
    code += array[getRandomInclusive(0, array.length - 1)];
  }
  return code;
}
//------------------------------------------------------------------
export function getRandomInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}