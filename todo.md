# path

file
|
|- parse [tokenize<moo> : block<sion> : clump<quartz>]
|
|- declassify [decompose<declass> : structify<ctruct> : reference<declass> : .class]
|_
| \_- branch checks [scope<quartz> : call<quartz> : iil<ill>]
|
|- ctyp {-comp : -qdocs : -iil}
|   |   |
\___|___|_- comp [prepl<organ> : comp<comp> : assemble<iili>]
    |   |
    |   \_- iil [prepl<organ> : comp<comp> : organize<iili> : assemble<iili>]
    |
    \- qdocs [list<organ> : qdoc<qdoc> : ?out<print>]

# files

- parser<tokenize:sion:clump>
- debind<declass:ctruct>
- checks<scope:call>
- iili<iil:illi>
- compiler<comp:organ>
- qdoc<qdoc:?out>

# syntax

block-statement: <keyword> [_(_](a) [params] [_)_](a) <_{_> [code] <_}_>
function: <_fn_> [visible] [return] <name><_(_>[params]<_)_><_{_> [code] <_}_>
class: <_bind_> <name> [_extends_](a) [extension](a) <_{_> 
    <_fn public new_><_(_> [params] <_)_> <_{_> [code] <_}_>
<_}_>
call:<name><_(_> [params] <_)_>
let:<_let_><type><name><_=_><actial>
.notation: <module(a)|struct(b)|bind(a-b)> <_._> <struct(a-b)(c)|function(a)(d)> <_(_>(d) [params](d) <_)_>(d) <_._>(c) <function(c)>(c) <_(_>(c) [params](c) <_)_>(c)