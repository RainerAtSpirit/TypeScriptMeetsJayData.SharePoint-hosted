var MyApp;
(function (MyApp) {
    MyApp.user;
    MyApp.ctx = new MyApp.DataService.Context({
        name: "oData",
        oDataServiceHost: "../_vti_bin/listdata.svc"
    });
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
    $.ajax('../_api/web/CurrentUser', {
        type: 'GET',
        headers: {
            'Accept': 'application/json;odata=verbose'
        },
        contentType: 'application/json',
        success: function (json) {
            MyApp.user = json.d;
        },
        error: function () {
            console.log('Error' + arguments);
        }
    });
})(MyApp || (MyApp = {}));

var MyApp;
(function (MyApp) {
    (function (CRUD) {
        CRUD.examples = [];
        CRUD.examples.push({
            Title: "Create a new project item",
            Description: "Entity.context.addEventListener() provides an easy way of logging. \n" + "Simply hook that into SP.UI.Notify.addNotification() to provide SharePoint like notification",
            Code: function () {
                var project = new MyApp.ctx.Projects.elementType({
                    Title: 'Project one'
                });
                MyApp.ctx.Projects.add(project);
                MyApp.ctx.saveChanges();
            }
        });
        CRUD.examples.push({
            Title: " Create a another project item by using an object literal",
            Description: "This time saveChanges() uses explicit success and error callbacks",
            Code: function () {
                MyApp.ctx.Projects.add({
                    Title: "Project two"
                });
                MyApp.ctx.saveChanges({
                    success: function () {
                        console.log("Item created!");
                    },
                    error: function () {
                        console.log('Error: ', arguments[0]);
                    }
                });
            }
        });
        CRUD.examples.push({
            Title: " Create a another project item",
            Description: "saveChanges() provides a promise Interface as well, so we can " + "use .then() and .fail() instead of success and error callbacks. My personal favorite ;-)",
            Code: function () {
                MyApp.ctx.Projects.add({
                    Title: 'Project three'
                });
                MyApp.ctx.saveChanges().then(function () {
                    console.log('Item created');
                }).fail(function () {
                    console.log('Error: ', arguments[0]);
                });
            }
        });
        CRUD.examples.push({
            Title: "Ever had the need to create more than one project in a single network operation?",
            Description: "addMany() and object literals are your friends. Watch how that translates " + "into a OData's $batch method that sgoes over the wire.",
            Code: function () {
                var newProjects = [];
                for(var i = 4, end = 14; i < end; i++) {
                    newProjects.push(new MyApp.DataService.ProjectsItem({
                        Title: 'Project ' + i
                    }));
                }
                $.each(newProjects, function (index, project) {
                    MyApp.ctx.Projects.add(project);
                });
                MyApp.ctx.saveChanges().then(function () {
                    console.log("Mulitple items created!");
                    console.dir(newProjects);
                }).fail(function () {
                    console.log('Error: ', arguments[0]);
                });
            }
        });
        CRUD.examples.push({
            Title: "Run a project through its whole life cyle",
            Description: "Create, Update, Delete in a hurry! Individual notifications for each event",
            Code: function () {
                var project = new MyApp.ctx.Projects.elementType({
                    Title: 'Unfortunately I won\'t be here for very long'
                });
                MyApp.ctx.Projects.add(project);
                MyApp.ctx.saveChanges().then(function () {
                    console.log('Going to attach');
                    MyApp.ctx.attach(project);
                    project.Title = 'Told you... they are already updating me. Guess what comes next?';
                    console.log('Going to save');
                    return MyApp.ctx.saveChanges();
                }).then(function () {
                    console.log('Going to remove');
                    MyApp.ctx.Projects.remove(project);
                    return MyApp.ctx.saveChanges();
                }).then(function () {
                    console.log('project life cycle completed');
                }).fail(function () {
                    console.log('Error: ', arguments[0]);
                });
            }
        });
        CRUD.examples.push({
            Title: "Create a new Time Tracking item",
            Description: "TimeTracking list has a Lookup field to the project list. " + "Here we a going to create a new TimeTracking item AND a new project in a single call.",
            Code: function () {
                MyApp.ctx.TimeTrackingList.add({
                    Title: "Test entry",
                    Date: new Date(),
                    DurationHours: 4,
                    ProjectTask: new MyApp.ctx.Projects.elementType({
                        Title: 'Project with related time entry'
                    }),
                    EmployeeId: MyApp.user.Id
                });
                MyApp.ctx.saveChanges().then(function () {
                    console.log('Way too easy, isn\'t it?');
                }).fail(function () {
                    console.log('Error: ', arguments[0]);
                });
            }
        });
    })(MyApp.CRUD || (MyApp.CRUD = {}));
    var CRUD = MyApp.CRUD;

})(MyApp || (MyApp = {}));

var MyApp;
(function (MyApp) {
    (function (view) {
        var items = [];
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
        Rainbow.color();
        view.logResults = function (key) {
            console.info('Example ' + (key + 1));
            MyApp.CRUD.examples[key].Code();
        };
    })(MyApp.view || (MyApp.view = {}));
    var view = MyApp.view;

})(MyApp || (MyApp = {}));

var MyApp;
(function (MyApp) {
    (function (notification) {
        notification.notifyId;
        $('#notificationArea').appendTo('.ms-cui-ribbonTopBars');
        MyApp.ctx.addEventListener("added", function () {
            console.log("Event notification: Item added", arguments);
            notification.notifyId = SP.UI.Notify.addNotification('Item added');
        });
        MyApp.ctx.addEventListener("updated", function () {
            console.log("Event notification: Item updated", arguments);
            notification.notifyId = SP.UI.Notify.addNotification('Item updated');
        });
        MyApp.ctx.addEventListener("deleted", function () {
            console.log("Event notification: Item deleted", arguments);
            notification.notifyId = SP.UI.Notify.addNotification('Item deleted');
        });
    })(MyApp.notification || (MyApp.notification = {}));
    var notification = MyApp.notification;

})(MyApp || (MyApp = {}));

