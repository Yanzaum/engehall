function permute(str) {
    let result = [];
    function permuteHelper(prefix, suffix) {
        if (suffix.length === 0) return result.push(prefix);
        for (let i = 0; i < suffix.length; i++) {
            permuteHelper(prefix + suffix[i], suffix.slice(0, i) + suffix.slice(i + 1));
        }
    }
    permuteHelper('', str);
    return result;
}
const permutations = permute("abc");
console.log(permutations);
