/// <reference path="../Scripts/jquery.d.ts" />
/// <reference path="DataService/ListDataSvcMetadata.d.ts" />

// Setting up JayData context to listdata.svc
export var ctx = new MyApp.DataService.Context({
  name: "oData",
  oDataServiceHost: "../_vti_bin/listdata.svc"
});

// CurrentUser
export var currentUser: any;

// Getting user information via REST the hard way :)
$.ajax('../_api/web/CurrentUser', {
  type: 'GET',
  headers: { 'Accept': 'application/json;odata=verbose' },
  contentType: 'application/json',
  success: function (json) { currentUser = json.d; },
  error: function () { console.log('Error' + arguments) }
});


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

// Create a new Time Tracking item
examples.push({
  Title: "Create a new Time Tracking item",
  Description: "TimeTracking list has a Lookup field to the project list. " +
    "Here we a going to create a new TimeTracking item AND a new project in a single call.",
  Code: function () {
    ctx.TimeTrackingList.add({
      Title: "Test entry",
      Date: new Date(),
      DurationHours: 4,
      ProjectTask: new ctx.Projects.elementType({ Title: 'Project with related time entry' }),
      // REST call to /_api/web/CurrentUser
      EmployeeId: currentUser.Id
    });
    ctx.saveChanges()
      .then(function () {
        console.log('Way too easy, isn\'t it?')
      })
      .fail(function () {
        console.log('Error: ', arguments[0]);
      });
  }
});


