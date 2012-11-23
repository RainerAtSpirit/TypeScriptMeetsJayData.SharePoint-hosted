define(["require", "exports", 'CRUD'], function(require, exports, __CRUD__) {
    var CRUD = __CRUD__;

    exports.init = function () {
        var items = [];
        $.each(CRUD.examples, function (key, val) {
            items.push('<div id="example' + (key + 1) + '" class="panel radius anchorLink">');
            items.push('<h4>Example ' + (key + 1) + ": " + val.Title + '</h4>');
            items.push('<p>' + val.Description + '</p>');
            items.push('<pre><code data-language="javascript">' + val.Code.toString() + '</code></pre>');
            items.push('<a href="#" class="button" onclick="require(\'View\').logResults(' + key + ');return false;">Run example ' + (key + 1) + '</a>&nbsp;');
            items.push('<a href="../lists/projects?IsDlg=1" class="secondary button viewModal" >View project list</a>&nbsp;');
            items.push('<a href="../lists/TIme Tracking List?IsDlg=1" class="secondary button viewModal" >View time tracking list</a>');
            items.push('</div>');
        });
        $(items.join('')).appendTo('#dynExamples');
        Rainbow.color();
    };
    exports.logResults = function (key) {
        console.info('Example ' + (key + 1));
        CRUD.examples[key].Code();
    };
    $(document).on('click', 'a.viewModal', function (event) {
        event.preventDefault();
        var options = {
            url: event.currentTarget.href,
            title: "List Detail",
            autoSize: true,
            allowMaximize: true,
            showClose: true
        };
        SP.UI.ModalDialog.showModalDialog(options);
    });
    exports.notifyId;
    $('#notificationArea').appendTo('.ms-cui-ribbonTopBars');
    CRUD.ctx.addEventListener("added", function () {
        exports.notifyId = SP.UI.Notify.addNotification('Item added');
    });
    CRUD.ctx.addEventListener("updated", function () {
        exports.notifyId = SP.UI.Notify.addNotification('Item updated');
    });
    CRUD.ctx.addEventListener("deleted", function () {
        exports.notifyId = SP.UI.Notify.addNotification('Item deleted');
    });
})
