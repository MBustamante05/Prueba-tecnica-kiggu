function maxFrequency(arr) {
  const count = {};

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    count[num] = (count[num] || 0) + 1;
  }

  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);

  return sorted.slice(0, 2);
}
console.log(maxFrequency([1, 1, 1, 2, 4, 5, 5, 5, 5, 5])); // [[5, 5], [1, 3]]
