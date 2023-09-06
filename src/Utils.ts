export const numberToEnglish = (num: number): string => {
  const ones = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const twies = [
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  let s = num.toString();
  s = s.replace(/[, ]/g, "");
  let x = s.length;
  if (x > 2) return s;
  let n = s.split("");
  let str = "";
  for (let i = 0; i < x; i++) {
    if ((x - i) % 3 === 2) {
      if (n[i] === "1") {
        str += teens[Number(n[i + 1])] + " ";
        i++;
      } else if (n[i] !== "0") {
        str += twies[Number(n[i]) - 2] + " ";
      }
    } else if (n[i] !== "0") {
      str += ones[Number(n[i])] + " ";
    }
  }
  return str;
};
