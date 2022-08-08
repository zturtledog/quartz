import { moo } from "./lib/moo.js";
import { error } from "./lib/error.js";

let lexer = moo.compile({
    qdoc: {
        match: /\*-\/(?:qdoc)(?:.*)(?:[\r\n].*)+(?:.*)(?:\/-\*)/,///\*-\/(qdoc)([\r\n].*)+(\/-\*)/,
        lineBreaks: true
    },
    comment: /--\/.*/,
    mlcomment: /\*-\/(?:.*)(?:[\r\n].*)+(?:.*)(?:\/-\*)/,
    number: /0|[1-9][0-9]*/,
    string: [/['](?:\\['\\]|[^\n'\\])*[']/,/["](?:\\["\\]|[^\n"\\])*["]/],
    lparen: '(',
    rparen: ')',
    lcurly: '{',
    rcurly: '}',
    blocks: ['loop', 'if', 'while', 'bind', 'nonblocking', 'for', 'use'],
    varible: ['hide', 'delete', 'let', 'global'],
    visibility: ['public', 'private'],
    imports: ['import', 'as', 'iil','extern'],
    bind: ['bind', 'struct', 'fn'],
    operation: [',', '==', '>=', '<=', '=', '!', '&&', '||', '<', '>', '-', '+', '*', '/', '%', '?', ':', '.'],
    NL: {
        match: /\r\n/,
        lineBreaks: true
    },
    WS: / |\t/,
    misc: /[a-zA-Z_\.]+/,
    _QuartzIllegalCharecterOrImplementationError: {
        match: /[\$?`]/,
        error: true
    },
    // _noImplementationIsError: {match: /[\$?`]/, error: true},
})

if (Deno.args[0] == "help") {
    //TODO: help page
    Deno.exit()
} else if (Deno.args[0] == "new") {
    //TODO: new dir
}

let file
let path
try {
    file = Deno.readFileSync(Deno.args[1])
    path = Deno.args[1].split("/")
    path.length--;
    path = path.join("/") + "/"
    let chars = []
    file.forEach(element => {
        chars.push(String.fromCharCode(element))
    });
    file = chars.join("")
} catch (errror) {
    error("FileSystem Error", errror.toString())
    Deno.exit()
}

try {
    lexer.reset(file)
} catch (errror) {
    error("Internal Error", errror.toString())
    Deno.exit()
}

switch (Deno.args[0]) {
    case "-qdoc":
        qdoc();
        break;

    default:
        error("Invalid Argument", "the specified argument: '" + Deno.args[0] + "' in not a valid argument, run 'help' for a list of valid arguments.")
        Deno.exit()
        break;
}

function qdoc() {
    let tokens = []
    for (let token of lexer) {
        tokens.push(token)
    }
    tokens = filter(tokens)

    Deno.writeTextFileSync(path+"build/tokens.json",JSON.stringify(tokens))

    let qdocs = []
    tokens.forEach(token => {
        // let dfs = "".slice
        if (token.type == "qdoc") {
            qdocs.push(token.actial.slice(7,token.actial.length-3)+"\n")
        }
    });

    Deno.writeTextFileSync(path+"out/qdocs.md",qdocs.join("\n"))

    // Deno.writeTextFileSync(path+"build/tokens.json",JSON.stringify(tokens))
    // console.log(JSON.stringify(tokens))
}

function filter(tokens) {
    let clean = []
    tokens.forEach(token => {
        if (token.type != "NL" &&
            token.type != "WS" &&
            token.type != "comment" &&
            token.type != "mlcomment"
        ) {
            console.log(token)
            clean.push({
                type: token.type,
                actial: token.value.replaceAll("\r",""),
                ln: token.line,
                col: token.col
            })
        }
    });
    return clean
}