import assert from 'assert';
import {parseCode,mainfunc} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing a simple var dec correctly', () => {
        assert.equal(
            mainfunc(parseCode('let a = 1;')),
            '<table width = "100%" dir="ltr" border = "1"><tr width = "100%"><td>Line</td><td>Type</td><td>Name</td><td>Condition</td><td>Value</td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>a</td><td></td><td>1</td></tr></table>'
        );
    });
    it('parsing correctly while',()=>{
        assert.equal(
            mainfunc(parseCode('while(a<5){a = a+1;}')),
            '<table width = "100%" dir="ltr" border = "1"><tr width = "100%"><td>Line</td><td>Type</td><td>Name</td><td>Condition</td><td>Value</td></tr><tr width = "100%"><td>1</td><td>While Statement</td><td></td><td>a < 5</td><td></td></tr><tr width = "100%"><td>1</td><td>Assignment Expression</td><td>a</td><td></td><td>a + 1</td></tr></table>'
        );
    });
    it('parsing correctly for',()=>{
        assert.equal(
            mainfunc(parseCode('for(let i = 0; i <= 5; i=i++){a=a+1;}')),
            '<table width = "100%" dir="ltr" border = "1"><tr width = "100%"><td>Line</td><td>Type</td><td>Name</td><td>Condition</td><td>Value</td></tr><tr width = "100%"><td>1</td><td>For Statement</td><td></td><td>i <= 5</td><td></td></tr><tr width = "100%"><td>1</td><td>Assignment Expression</td><td>i</td><td></td><td>i++</td></tr><tr width = "100%"><td>1</td><td>Assignment Expression</td><td>a</td><td></td><td>a + 1</td></tr></table>'
        );
    });
    it('parsing correctly binary search',()=>{
        assert.equal(
            mainfunc(parseCode('function binarySearch(X, V, n){\n' +
                '    let low, high, mid;\n' +
                '    low = 0;\n' +
                '    high = n - 1;\n' +
                '    while (low <= high) {\n' +
                '        mid = (low + high)/2;\n' +
                '        if (X < V[mid])\n' +
                '            high = mid - 1;\n' +
                '        else if (X > V[mid])\n' +
                '            low = mid + 1;\n' +
                '        else\n' +
                '            return mid;\n' +
                '    }\n' +
                '    return -1;\n' +
                '}')),
            '<table width = "100%" dir="ltr" border = "1"><tr width = "100%"><td>Line</td><td>Type</td><td>Name</td><td>Condition</td><td>Value</td></tr><tr width = "100%"><td>1</td><td>Function Declaration</td><td>binarySearch</td><td></td><td></td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>X</td><td></td><td></td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>V</td><td></td><td></td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>n</td><td></td><td></td></tr><tr width = "100%"><td>2</td><td>Variable Declaration</td><td>low</td><td></td><td></td></tr><tr width = "100%"><td>2</td><td>Variable Declaration</td><td>high</td><td></td><td></td></tr><tr width = "100%"><td>2</td><td>Variable Declaration</td><td>mid</td><td></td><td></td></tr><tr width = "100%"><td>3</td><td>Assignment Expression</td><td>low</td><td></td><td>0</td></tr><tr width = "100%"><td>4</td><td>Assignment Expression</td><td>high</td><td></td><td>n - 1</td></tr><tr width = "100%"><td>5</td><td>While Statement</td><td></td><td>low <= high</td><td></td></tr><tr width = "100%"><td>6</td><td>Assignment Expression</td><td>mid</td><td></td><td>low + high / 2</td></tr><tr width = "100%"><td>7</td><td>If Statement</td><td></td><td>X < V[mid]</td><td></td></tr><tr width = "100%"><td>8</td><td>Assignment Expression</td><td>high</td><td></td><td>mid - 1</td></tr><tr width = "100%"><td>9</td><td>If Statement</td><td></td><td>X > V[mid]</td><td></td></tr><tr width = "100%"><td>10</td><td>Assignment Expression</td><td>low</td><td></td><td>mid + 1</td></tr><tr width = "100%"><td>12</td><td>Return Statement</td><td></td><td></td><td>mid</td></tr><tr width = "100%"><td>14</td><td>Return Statement</td><td></td><td></td><td>- 1</td></tr></table>'
        );
    });

    it('test 5', () => {
        assert.equal(
            mainfunc(parseCode('let x=5,a=b, c, d;\n' +
                'function raiseC(x,a,b,c,d){\n' +
                '    if( a = b ){\n' +
                '        c = 5 + c;\n' +
                '    }\n' +
                '}')),
            '<table width = "100%" dir="ltr" border = "1"><tr width = "100%"><td>Line</td><td>Type</td><td>Name</td><td>Condition</td><td>Value</td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>x</td><td></td><td>5</td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>a</td><td></td><td>b</td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>c</td><td></td><td></td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>d</td><td></td><td></td></tr><tr width = "100%"><td>2</td><td>Function Declaration</td><td>raiseC</td><td></td><td></td></tr><tr width = "100%"><td>2</td><td>Variable Declaration</td><td>x</td><td></td><td></td></tr><tr width = "100%"><td>2</td><td>Variable Declaration</td><td>a</td><td></td><td></td></tr><tr width = "100%"><td>2</td><td>Variable Declaration</td><td>b</td><td></td><td></td></tr><tr width = "100%"><td>2</td><td>Variable Declaration</td><td>c</td><td></td><td></td></tr><tr width = "100%"><td>2</td><td>Variable Declaration</td><td>d</td><td></td><td></td></tr><tr width = "100%"><td>3</td><td>If Statement</td><td></td><td>a = b</td><td></td></tr><tr width = "100%"><td>4</td><td>Assignment Expression</td><td>c</td><td></td><td>5 + c</td></tr></table>'
        );
    });
    it('test member expression', () => {
        assert.equal(
            mainfunc(parseCode('let x = 5;\n' +
                'v[x] = 3;\n' +
                'v[3] = x;\n' +
                'let y = 5;\n' +
                'v[v[y]+3] = x')),
            '<table width = "100%" dir="ltr" border = "1"><tr width = "100%"><td>Line</td><td>Type</td><td>Name</td><td>Condition</td><td>Value</td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>x</td><td></td><td>5</td></tr><tr width = "100%"><td>2</td><td>Assignment Expression</td><td>v[x]</td><td></td><td>3</td></tr><tr width = "100%"><td>3</td><td>Assignment Expression</td><td>v[3]</td><td></td><td>x</td></tr><tr width = "100%"><td>4</td><td>Variable Declaration</td><td>y</td><td></td><td>5</td></tr><tr width = "100%"><td>5</td><td>Assignment Expression</td><td>v[v[y] + 3]</td><td></td><td>x</td></tr></table>'
        );
    });
    it('test 7', () => {
        assert.equal(
            mainfunc(parseCode('let x = 5;\n' +
                'let y = 5;\n' +
                'while( x != y ){\n' +
                '    x = x + 1\n' +
                '}\n' +
                'x = v[v[y]+3]')),
            '<table width = "100%" dir="ltr" border = "1"><tr width = "100%"><td>Line</td><td>Type</td><td>Name</td><td>Condition</td><td>Value</td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>x</td><td></td><td>5</td></tr><tr width = "100%"><td>2</td><td>Variable Declaration</td><td>y</td><td></td><td>5</td></tr><tr width = "100%"><td>3</td><td>While Statement</td><td></td><td>x != y</td><td></td></tr><tr width = "100%"><td>4</td><td>Assignment Expression</td><td>x</td><td></td><td>x + 1</td></tr><tr width = "100%"><td>6</td><td>Assignment Expression</td><td>x</td><td></td><td>v[v[y] + 3]</td></tr></table>'
        );
    });
    it('test swipe function', () => {
        assert.equal(
            mainfunc(parseCode('function swipe(X,Y){\n' +
                '    let temp = X;\n' +
                '    X = Y;\n' +
                '    Y = temp;\n' +
                '}')),
            '<table width = "100%" dir="ltr" border = "1"><tr width = "100%"><td>Line</td><td>Type</td><td>Name</td><td>Condition</td><td>Value</td></tr><tr width = "100%"><td>1</td><td>Function Declaration</td><td>swipe</td><td></td><td></td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>X</td><td></td><td></td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>Y</td><td></td><td></td></tr><tr width = "100%"><td>2</td><td>Variable Declaration</td><td>temp</td><td></td><td>X</td></tr><tr width = "100%"><td>3</td><td>Assignment Expression</td><td>X</td><td></td><td>Y</td></tr><tr width = "100%"><td>4</td><td>Assignment Expression</td><td>Y</td><td></td><td>temp</td></tr></table>'
        );
    });
    it('test index of function', () => {
        assert.equal(
            mainfunc(parseCode('function indexOf(X,V,n){\n' +
                '    let i = 0;\n' +
                '    for( i = 0; i < n; i = i++){\n' +
                '        if(X = V[i]){\n' +
                '            return i;\n' +
                '        }\n' +
                '    }\n' +
                '    return -1;\n' +
                '}')),
            '<table width = "100%" dir="ltr" border = "1"><tr width = "100%"><td>Line</td><td>Type</td><td>Name</td><td>Condition</td><td>Value</td></tr><tr width = "100%"><td>1</td><td>Function Declaration</td><td>indexOf</td><td></td><td></td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>X</td><td></td><td></td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>V</td><td></td><td></td></tr><tr width = "100%"><td>1</td><td>Variable Declaration</td><td>n</td><td></td><td></td></tr><tr width = "100%"><td>2</td><td>Variable Declaration</td><td>i</td><td></td><td>0</td></tr><tr width = "100%"><td>3</td><td>For Statement</td><td></td><td>i < n</td><td></td></tr><tr width = "100%"><td>3</td><td>Assignment Expression</td><td>i</td><td></td><td>0</td></tr><tr width = "100%"><td>3</td><td>Assignment Expression</td><td>i</td><td></td><td>i++</td></tr><tr width = "100%"><td>4</td><td>If Statement</td><td></td><td>X = V[i]</td><td></td></tr><tr width = "100%"><td>5</td><td>Return Statement</td><td></td><td></td><td>i</td></tr><tr width = "100%"><td>8</td><td>Return Statement</td><td></td><td></td><td>- 1</td></tr></table>'
        );
    });
    it('test clean code', () => {
        assert.equal(
            mainfunc(parseCode('')),
            '<table width = "100%" dir="ltr" border = "1"><tr width = "100%"><td>Line</td><td>Type</td><td>Name</td><td>Condition</td><td>Value</td></tr></table>'
        );
    });

});
