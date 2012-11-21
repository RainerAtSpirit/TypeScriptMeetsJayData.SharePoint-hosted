var MyApp;
(function (MyApp) {
    MyApp.listDataSvc = new MyApp.DataService.Context({
        name: "oData",
        oDataServiceHost: "../_vti_bin/listdata.svc"
    });
    MyApp.listDataSvc.Projects.filter(function (project) {
        return project.Id === 1;
    });
})(MyApp || (MyApp = {}));

