/// <reference path="../Scripts/jquery.d.ts" />
/// <reference path="DataService/ListDataSvcMetadata.d.ts" />

// Declaration for libs without a TypeScript definition (infered any)
declare var SP;
declare var Rainbow;


module MyApp {

  export var ctx = new MyApp.DataService.Context({
    name: "oData",
    oDataServiceHost: "../_vti_bin/listdata.svc"
  });

 
  // Open modal Dialog
  $(document).on('click', 'a.viewModal', function (event) {
    event.preventDefault();

    var options = {
      url: "",
      title: "List Detail",
      autoSize: true,
      allowMaximize: true,
      showClose: true
    };

    options.url = event.currentTarget.href;

    SP.UI.ModalDialog.showModalDialog(options);
  });

}

module MyApp.CRUD {
  export var examples = [];

  // Create a new project item
  examples.push({
    Title: "Create a new project item",
    Description: "Entity.context.addEventListener() provides an easy way of logging. \n" +
    "Simply hook that into SP.UI.Notify.addNotification() to provide SharePoint like notification",
    Code: function () {

      var project = new ctx.Projects.elementType({
        Title: 'Project one'
      });
      ctx.Projects.add(project);
      ctx.saveChanges();
    }
  });

  // Create a new project item
  examples.push({
    Title: " Create a another project item by using an object literal",
    Description: "This time saveChanges() uses explicit success and error callbacks",
    Code: function () {
      
      ctx.Projects.add({
        Title: "Project two"
      });
      ctx.saveChanges({
        success: function () {
          console.log("Item created!");
        },
        error: function () {
          console.log('Error: ', arguments[0]);
        }
      });
    }
  });


  // Create a new project item
  examples.push({
    Title: " Create a another project item",
    Description: "saveChanges() provides a promise Interface as well, so we can " + 
      "use .then() and .fail() instead of success and error callbacks. My personal favorite ;-)",
    Code: function () {
      ctx.Projects.add({
        Title: 'Project three'
      });
      ctx.saveChanges()
        .then(function () {
          console.log('Item created')
        })
        .fail(function () {
          console.log('Error: ', arguments[0]);
        })
    }
  });

  // Create multiple items
  examples.push({
    Title: "Ever had the need to create more than one project in a single network operation?",
    Description: "addMany() and object literals are your friends. Watch how that translates " + 
      "into a OData's $batch method that sgoes over the wire.",
    Code: function () {
      var newProjects = [];
      for (var i = 4, end = 14; i < end; i++) {
        newProjects.push(
          new MyApp.DataService.ProjectsItem({
            Title: 'Project ' + i
          })
        );
      }

      // Todo: How to add addMany TypeScript support?
      //ctx.Projects.addMany(newProjects);

      $.each(newProjects, function (index, project) {
        ctx.Projects.add(project);
      });


      ctx.saveChanges()
        .then(function () {
          console.log("Mulitple items created!");
          console.dir(newProjects);
        })
        .fail(function () {
          console.log('Error: ', arguments[0]);
        })
    }
  });

  // Run a project through its whole life cyle
  examples.push({
    Title: "Run a project through its whole life cyle",
    Description: "Create, Update, Delete in a hurry! Individual notifications for each event",
    Code: function () {

      var project = new ctx.Projects.elementType({
        Title: 'Unfortunately I won\'t be here for very long'
      });


      ctx.Projects.add(project);
      ctx.saveChanges()
        .then(function () {
          console.log('Going to attach');
          ctx.attach(project);
          project.Title = 'Told you... they are already updating me. Guess what comes next?';
          console.log('Going to save');
          return ctx.saveChanges();
        })
        .then(function () {
          console.log('Going to remove');
          ctx.Projects.remove(project);
          return ctx.saveChanges();
        })
        .then(function () {
          console.log('project life cycle completed')
        })
        .fail(function () {
          console.log('Error: ', arguments[0]);
        });
    }
  });
}

module MyApp.view {
  var items = [];
  // For this demo I don't want to introduce a dependency on knockout.js, handlebars etc.
  // but you certainly wanna use them in your project

  $.each(MyApp.CRUD.examples, function (key, val) {

    items.push('<div id="example' + (key + 1) + '" class="panel radius anchorLink">');
    items.push('<h4>Example ' + (key + 1) + ": " + val.Title + '</h4>');
    items.push('<p>' + val.Description + '</p>');
    items.push('<pre><code data-language="javascript">' + val.Code.toString() + '</code></pre>');
    items.push('<a href="#" class="button" onclick="MyApp.view.logResults(' + key + ');return false;">Run example ' + (key + 1) + '</a>&nbsp;');
    items.push('<a href="../lists/projects?IsDlg=1" class="secondary button viewModal" >View project list</a>&nbsp;');
    items.push('<a href="../lists/TIme Tracking List?IsDlg=1" class="secondary button viewModal" >View time tracking list</a>');
    items.push('</div>');
  });

  $('<ul/>', {
    'class': 'example-list',
    html: items.join('')
  }).appendTo('#dynExamples');

  //Highlight code after appending
  Rainbow.color();

  // log example and run Code
  export var logResults = function (key) {
    console.info('Example ' + (key + 1));
    MyApp.CRUD.examples[key].Code();
  };
}

module MyApp.notification {

  // Stores return value of SP.UI.Notify.addNotification
  export var notifyId: string;

  // Moving notificationArea to the top ribbon, so that it won't scroll
  $('#notificationArea').appendTo('.ms-cui-ribbonTopBars');

  // Hooking up EventListener to SP.UI.Notify.addNotification
  // Add minimalistic TypeScript defintion in jaydata.t.ds
  // addEventListener(event: string, any): void;
 
  ctx.addEventListener("added", function () {
    console.log("Event notification: Item added", arguments);
    notifyId = SP.UI.Notify.addNotification('Item added');
  });
  ctx.addEventListener("updated", function () {
    console.log("Event notification: Item updated", arguments);
    notifyId = SP.UI.Notify.addNotification('Item updated');
  });
  ctx.addEventListener("deleted", function () {
    console.log("Event notification: Item deleted", arguments);
    notifyId = SP.UI.Notify.addNotification('Item deleted');
  });
}