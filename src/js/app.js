import $ from 'jquery';
import {parseCode,mainfunc} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        document.getElementById('parseTable').innerHTML = '';
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);

        document.getElementById('parseTable').innerHTML = mainfunc(parsedCode);

    });
});
