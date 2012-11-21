var MyApp;
(function (MyApp) {
    MyApp.ctx = new MyApp.DataService.Context({
        name: "oData",
        oDataServiceHost: "../_vti_bin/listdata.svc"
    });
    MyApp.ctx.TimeTrackingList.add({
        Title: "Test entry",
        Date: new Date(),
        DurationHours: 4,
        ProjectTask: new MyApp.ctx.Projects.elementType({
            Title: 'Project one'
        }),
        EmployeeId: 7
    });
})(MyApp || (MyApp = {}));

