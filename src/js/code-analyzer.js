import * as esprima from 'esprima';

const parseCode = (codeToParse) => {
    return esprima.parseScript(codeToParse,{loc:true});
};

///////////////////////////////////////////////////////// my code starts here
let lineARR = [];
let typeARR = [];
let nameARR = [];
let conditionARR = [];
let valueARR = [];
////////////////
const mainfunc = (parsedCode) => {
    lineARR = [];
    typeARR = [];
    nameARR = [];
    conditionARR = [];
    valueARR = [];
    let myTable = '<table width = "100%" dir="ltr" border = "1">';
    lineARR.push('Line');
    typeARR.push('Type');
    nameARR.push('Name');
    conditionARR.push('Condition');
    valueARR.push('Value');
    for(let i = 0; i < parsedCode.body.length; i++){LineInProgram(parsedCode.body[i]);}
    for (let i = 0; i < lineARR.length; i++) {
        myTable += '<tr width = "100%"><td>' + lineARR[i] + '</td><td>' + typeARR[i] + '</td><td>' + nameARR[i] + '</td><td>' + conditionARR[i] + '</td><td>' + valueARR[i] + '</td></tr>';
    }
    myTable += '</table>';
    return myTable;
};

const LineInProgram = (parsedBlockOrLine) => {
    if(parsedBlockOrLine.type == 'FunctionDeclaration'){
        funcControl(parsedBlockOrLine);
    }
    else if(parsedBlockOrLine.type == 'BlockStatement'){
        for(let i = 0; i < parsedBlockOrLine.body.length; i++){
            LineInProgram(parsedBlockOrLine.body[i]);
        }
    }
    else if(parsedBlockOrLine.type == 'ReturnStatement'){
        returnControl(parsedBlockOrLine);
    }
    else {
        LineInProgram2(parsedBlockOrLine);
    }
};

const LineInProgram2 = (parsedBlockOrLine) => {
    if(parsedBlockOrLine.type == 'ExpressionStatement'){
        expressionControl(parsedBlockOrLine.expression);
    }
    else  if(parsedBlockOrLine.type == 'IfStatement'){
        ifControl(parsedBlockOrLine);
    }
    else if(parsedBlockOrLine.type == 'VariableDeclaration'){
        for(let i = 0; i < parsedBlockOrLine.declarations.length; i++){
            varControl(parsedBlockOrLine.declarations[i]);
        }
    }
    else{
        LineInProgram3(parsedBlockOrLine);
    }
};

const LineInProgram3 = (parsedBlockOrLine) => {
    if(parsedBlockOrLine.type == 'WhileStatement'){
        whileControl(parsedBlockOrLine);
    }
    if(parsedBlockOrLine.type == 'ForStatement'){
        forControl(parsedBlockOrLine);
    }
};

const forControl = (myLine) =>{
    lineARR.push(myLine.loc.start.line);
    typeARR.push('For Statement');
    nameARR.push('');
    valueARR.push('');
    conditionARR.push(BinaryExpControl(myLine.test));
    expressionControl(myLine.init);
    expressionControl(myLine.update);
    LineInProgram(myLine.body);
};

const whileControl = (myLine) => {
    lineARR.push(myLine.loc.start.line);
    typeARR.push('While Statement');
    nameARR.push('');
    valueARR.push('');
    conditionARR.push(BinaryExpControl(myLine.test));
    LineInProgram(myLine.body);
};


const varControl = (parsedBlockOrLine) => {
    lineARR.push(parsedBlockOrLine.loc.start.line);
    typeARR.push('Variable Declaration');
    nameARR.push(parsedBlockOrLine.id.name);
    conditionARR.push('');
    if(parsedBlockOrLine.init == null){
        valueARR.push('');
    }
    else if(parsedBlockOrLine.init.type == 'Identifier'){
        valueARR.push(parsedBlockOrLine.init.name);
    }
    else{
        valueARR.push(parsedBlockOrLine.init.raw);
    }
};

const funcControl = (parsedBlockOrLine) => {
    lineARR.push(parsedBlockOrLine.loc.start.line);
    typeARR.push('Function Declaration');
    nameARR.push(parsedBlockOrLine.id.name);
    conditionARR.push('');
    valueARR.push('');
    for(let i = 0; i < parsedBlockOrLine.params.length; i++){
        lineARR.push(parsedBlockOrLine.loc.start.line);
        typeARR.push('Variable Declaration');
        nameARR.push(parsedBlockOrLine.params[i].name);
        conditionARR.push('');
        valueARR.push('');
    }
    LineInProgram(parsedBlockOrLine.body);
};

const returnControl = (parsedBlockOrLine) => {
    lineARR.push(parsedBlockOrLine.loc.start.line);
    typeARR.push('Return Statement');
    nameARR.push('');
    conditionARR.push('');
    if(parsedBlockOrLine.argument.type == 'Identifier'){valueARR.push(parsedBlockOrLine.argument.name);}
    else if(parsedBlockOrLine.argument.type == 'Literal'){valueARR.push(parsedBlockOrLine.argument.raw);}
    else {returnComplexControl(parsedBlockOrLine);}

};

const returnComplexControl = (myLine) => {
    if(myLine.argument.argument.type == 'Identifier'){valueARR.push(myLine.argument.operator+' '+myLine.argument.argument.name);}
    else if(myLine.argument.argument.type == 'Literal'){valueARR.push(myLine.argument.operator+' '+myLine.argument.argument.raw);}
};

const expressionControl = (parsedBlockOrLine) => {
    if(parsedBlockOrLine.type == 'AssignmentExpression'){
        lineARR.push(parsedBlockOrLine.loc.start.line);
        typeARR.push('Assignment Expression');
        if(parsedBlockOrLine.left.type == 'Identifier'){nameARR.push(parsedBlockOrLine.left.name);}
        else{nameARR.push(memberControl(parsedBlockOrLine.left));}
        conditionARR.push('');
        valueARR.push(myHelper(parsedBlockOrLine.right));
    }
};

const myHelper = (myLine) => {
    let str='';
    if(myLine.type == 'BinaryExpression'){str+=BinaryExpControl(myLine);}
    else if(myLine.type == 'Identifier'){str+=myLine.name;}
    else if(myLine.type == 'MemberExpression'){str += memberControl(myLine);}
    else if(myLine.type == 'UpdateExpression'){
        str += myLine.argument.name+myLine.operator;
    }
    else{str+=myLine.raw;}
    return str;
};

const ifControl = (parsedBlockOrLine) => {
    lineARR.push(parsedBlockOrLine.loc.start.line);
    typeARR.push('If Statement');
    nameARR.push('');
    valueARR.push('');
    conditionARR.push(BinaryExpControl(parsedBlockOrLine.test));
    LineInProgram(parsedBlockOrLine.consequent);
    if(parsedBlockOrLine.alternate != null){
        LineInProgram(parsedBlockOrLine.alternate);
    }
};

const BinaryExpControl = (myLine) => {
    let str = '';
    if(myLine.left.type == 'BinaryExpression'){str += BinaryExpControl(myLine.left);}
    else if(myLine.left.type == 'Identifier'){str += myLine.left.name;}
    else if(myLine.left.type == 'MemberExpression'){str += memberControl(myLine.left);}
    else {str += myLine.left.raw;}
    str += ' '+myLine.operator+' '+BinaryExpControlPart2(myLine);
    return str;
};

const BinaryExpControlPart2 = (myLine) => {
    let str = '';
    if(myLine.right.type == 'BinaryExpression'){return str+BinaryExpControl(myLine.right);}
    else if(myLine.right.type == 'Identifier'){return str+myLine.right.name;}
    else if(myLine.right.type == 'MemberExpression'){return str + memberControl(myLine.right);}
    else{return str+myLine.right.raw;}
};

const memberControl = (myLine) => {
    let str='';
    str += myLine.object.name + '[';
    if(myLine.property.type == 'Identifier'){str += myLine.property.name;}
    else if(myLine.property.type == 'Literal'){str += myLine.property.raw;}
    else {str += BinaryExpControl(myLine.property);}
    str += ']';
    return str;
};


//////////////////////////////////////////////////////////////

export {parseCode,mainfunc};

