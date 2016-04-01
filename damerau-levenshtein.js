/** Damerau-Levenshtein string distance calculation
 *
 * This is a JavaScript port of the algorithm used in Git (git-scm.com). This
 * project is not associated with the official Git sources.
 *
 * Copyright:
 * Original version: Git (git-scm.com)
 * JavaScript port: Stefan Hamminga <stefan@prjct.net>.
 *
 * This function implements the Damerau-Levenshtein algorithm to
 * calculate a distance between strings.
 *
 * Basically, it says how many letters need to be swapped, substituted,
 * deleted from, or added to string1, at least, to get string2.
 *
 * The idea is to build a distance matrix for the substrings of both
 * strings.  To avoid a large space complexity, only the last three rows
 * are kept in memory (if swaps had the same or higher cost as one deletion
 * plus one insertion, only two rows would be needed).
 *
 * At any stage, "i + 1" denotes the length of the current substring of
 * string1 that the distance is calculated for.
 *
 * row2 holds the current row, row1 the previous row (i.e. for the substring
 * of string1 of length "i"), and row0 the row before that.
 *
 * In other words, at the start of the big loop, row2[j + 1] contains the
 * Damerau-Levenshtein distance between the substring of string1 of length
 * "i" and the substring of string2 of length "j + 1".
 *
 * All the big loop does is determine the partial minimum-cost paths.
 *
 * It does so by calculating the costs of the path ending in characters
 * i (in string1) and j (in string2), respectively, given that the last
 * operation is a substitution, a swap, a deletion, or an insertion.
 *
 * Note that this algorithm calculates a distance _iff_ d == a.
 *
 * @param  {String}     source   First input string
 * @param  {String}     target   Second input string
 * @param  {Function}   callback If provided run async: callback(distance,
 *                               							     source, target)
 * This implementation allows the costs to be weighted:
 * @param  {Number}     w        Swap cost multiplier
 * @param  {Number}     s        Substitution cost multiplier
 * @param  {Number}     a        Insertion cost multiplier
 * @param  {Number}     d        Deletion cost multiplier
 *
 * @return {Number}              Operations needed to transform source to target
 */
module.exports = function levenshtein(source, target, callback, w, s, a, d) {
    "use strict";
    // Default weights:
    w = w || 1;
    s = s || 1;
    a = a || 1;
    d = d || 1;
    if (typeof callback === 'function') {
        setTimeout(function(){
            callback(run(source, target, w, s, a, d), source, target);
        }, 0);
    } else {
        if (callback && a && !(d)) { d=a; a=s; s=w; w=callback; }
        return run(source, target, w, s, a, d);
    }
};

function run(source, target, w, s, a, d) {
    "use strict";
    const SL = source.length;
    const TL = target.length;
    const SL1 = SL + 1;
    const TL1 = TL + 1;

    var tmp, jp1, jm1;
    var row0 = new Array(TL1);
    var row1 = new Array(TL1);
    var row2 = new Array(TL1);

    for (let i = 0; i < TL; i++) {
        row1[i] = i * a;
    }
    for (let i = 0; i < SL; i++) {
        row2[0] = (i + 1) * d;
        for (let j = 0; j < TL; j++) {
            jm1 = j - 1;
            jp1 = j + 1;
            // Substitution
            row2[jp1] = row1[j] + s * (source[i] !== target[i]);
            // Swap
            if (i > 0 && j > 0 && source[i - 1] == target[j]   &&
                                  source[i]     == target[jm1] &&
                                  row2[jp1]     >  row0[jm1] + w) {
                row2[jp1] = row0[jm1] + w;
            }
            // Deletion
			if (row2[jp1] > row1[jp1] + d)
				row2[jp1] = row1[jp1] + d;
            // Insertion
			if (row2[jp1] > row2[j] + a)
				row2[jp1] = row2[j] + a;
        }
        tmp = row0;
		row0 = row1;
		row1 = row2;
		row2 = tmp;
    }
    return row1[TL];
}
