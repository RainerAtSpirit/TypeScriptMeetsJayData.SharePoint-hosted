/**
 * User: Rainer Wittmann
 * Date: 01.11.12
 * Time: 13:50
 * Copyright: Spirit EDV-Beratung AG
 * http://www.spirit.de
 **/

// Exposing JSLQ101 as global
var JSLQ101 = window.JSLQ101 || {};

(function ($) {
    // examples: stores runCode() per example
    JSLQ101.examples = [];

    // results: stores $.getJSON data.d.results
    JSLQ101.results = [];

    // kayValId: stored key/Id pairs to match ?eid=XXX query string with array index(key)
    JSLQ101.keyValId = [];

    //params: stored querystring params. Currently only eid (val.Id) will be used
    JSLQ101.params = getParams();

    // Static JSON file exported from internal SharePoint site (_vti_bin/listdata.svc/JSLQ101)
    $.getJSON('../Lists/Examples/SharePointCRUD.js', function (data) {
        var items = [];

        JSLQ101.results = data.d.results;

        $.each(data.d.results, function (key, val) {

            JSLQ101.examples.push({ runCode:function () {
                eval(val.Code);
            } });

            JSLQ101.keyValId.push(val.Id);

            items.push('<div id="example' + val.Id + '" class="panel radius anchorLink">');
            items.push('<h4>Example ' + (key + 1) + ": " + val.Title + '</h4>');
            items.push('<p>' + val.Description + '</p>');
            items.push('<pre><code data-language="javascript">' + val.Code + '</code></pre>');
            items.push('<a href="#" class="button" onclick="JSLQ101.logResults(' + key + ');return false;">Run example ' + (key +1) + '</a>&nbsp;');
            items.push('<a href="../lists/projects?IsDlg=1" class="secondary button viewModal" >View project list</a>&nbsp;');
            items.push('<a href="../lists/TIme Tracking List?IsDlg=1" class="secondary button viewModal" >View time tracking list</a>');
            items.push('</div>');
        });

        $('<ul/>', {
            'class':'example-list',
            html:items.join('')
        }).appendTo('#dynExamples');

        //Highlight code after appending
        Rainbow.color();
    });

    // log result to console
    JSLQ101.logResults =  function (key){
        console.info('Example ' + (key +1));
        JSLQ101.examples[key].runCode();
    };

  

    // Returning the params object
    function getParams() {
        var params = {};
        if (location.search) {
            location.search.split('?')[1].split('&').forEach(function (param) {
                var key = param.split('=')[0],
                    val = decodeURIComponent(param.split('=')[1]);
                params[key] = val;
            });
        }
        return params;
    }

})(jQuery);


