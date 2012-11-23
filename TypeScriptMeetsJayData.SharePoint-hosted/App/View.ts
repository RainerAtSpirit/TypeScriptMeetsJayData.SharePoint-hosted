import CRUD = module('CRUD');


// Declaration for libs without a TypeScript definition (infered any)
declare var SP;
declare var Rainbow;

export var init = function () {

  var items = [];

  // There's no dependency on knockout.js, handlebars etc in this demo.
  // but for larger projects you should consider using them

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

  //Highlight code after appending
  Rainbow.color();

}

export var logResults = function (key) {
  console.info('Example ' + (key + 1));
  CRUD.examples[key].Code();
};


// Open modal Dialog
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


  // Stores return value of SP.UI.Notify.addNotification
  export var notifyId: string;


// Moving notificationArea to the top ribbon, so that it won't scroll
  $('#notificationArea').appendTo('.ms-cui-ribbonTopBars');

  // Hooking up EventListener to SP.UI.Notify.addNotification
  // Add minimalistic TypeScript defintion in jaydata.t.ds
  // addEventListener(event: string, any): void;

  CRUD.ctx.addEventListener("added", function () {
    notifyId = SP.UI.Notify.addNotification('Item added');
  });
  CRUD.ctx.addEventListener("updated", function () {
    notifyId = SP.UI.Notify.addNotification('Item updated');
  });
  CRUD.ctx.addEventListener("deleted", function () {
    notifyId = SP.UI.Notify.addNotification('Item deleted');
  });