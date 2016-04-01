# damerau-levenshtein-git
A fast, flexible and easy JavaScript port of the [Damerau-Levenshtein](https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance) string distance calculation algorithm used in [Git](https://git-scm.com).



## Installing

```sh
npm install --save damerau-levenshtein-git
```

## Example

```javascript
const dl = require('damerau-levenshtein-git');

// Simplest invocation
console.log(dl("Floor", "Flower"))
// <= 3

// Run async
dl("Floor", "Flower", function(distance, source, target) {
    console.log(`${source} to ${target}: ${result} steps`);
});
// "Floor to Flower: 3 steps"
```

## Arguments

Argument | Req? | Description
---|---|---
source | yes | First string to compare
target | yes | Second string to compare
callback | no | If present, run async and call `callback(result, source, target)`
w | no | Swap cost multiplier
s | no | Substitution cost multiplier
a | no | Insertion (add) cost multiplier
d | no | Deletion cost multiplier

Return: `Number` indicating the steps needed to transform `source` into `target`.

## Notes & license
This project is available on [GitHub](https://github.com/StefanHamminga/damerau-levenshtein-git.js) and [npm](https://www.npmjs.com/package/damerau-levenshtein-git).

The project is licensed as [GPLv2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html), the license file is included in the project directory.

Original C source and work copyright Git. JavaScript port copyright 2016 [Stefan Hamminga](mailto:stefan@prjct.net) - [prjct.net](https://prjct.net)
