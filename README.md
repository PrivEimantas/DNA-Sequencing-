
DNA Sequences can look like ...GTCAGATCGTTCGAACGGGGCTCCAAACA...

This program in javascript, allows to count frequncies such as input patterns of [ 'AA', 'AC' ] output { frequencies: { AA: 2, AC: 0 }, offsets: { AA: [ 0, 1 ], AC: [ ] } }


We also utilise asynchornous callbacks 

The function analyse1() works as the following. It asynchronously reads the contents of the ‘file.pattern’
file. Once the reading is successful, it asynchronously reads the content of the ‘file.data’ file and calls the
find() function for each data line in the data file.
The results of analysing the files should be stored in the results1 object. This object should contain pairs
of data lines from the ‘file.data’ file as keys and the object returned by the find function as a value. For
example, if the data file contains AAA and AAC (each in a separate line) and the pattern file contains AA and
AC (each in a separate line), then the object result1 should be
results1 = {
 AAA: { frequencies: { AA: 2, AC: 0 }, offsets: { AA: [Array], AC: [] } },
 AAC: { frequencies: { AA: 1, AC: 1 }, offsets: { AA: [Array], AC: [Array] } }
}

In addition we also use asynchoronous execution with Promises, which reads files and returns output.

Finally we also do Asynchronous execution using async/await 

Data file..
ACCA
AACGTCGACG

Patterns..
C
CG

Outputs..

{
 ACCA: { frequencies: { C: 2, CG: 0 }, offsets: { C: [1,2], CG: [] } },
 AACGTCGACG: {
 frequencies: { C: 3, CG: 3 },
 offsets: { C: [2,5,8], CG: [2,5,8] }
 }
}

We also use Erlang
data   Patterns   Call                       Output
"AAA" [ "AA"] cw:find_patterns("AAA",["AA"]) [[0,1]]


