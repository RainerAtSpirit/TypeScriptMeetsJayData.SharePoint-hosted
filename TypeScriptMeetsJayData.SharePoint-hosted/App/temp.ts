/// <reference path="../Scripts/jquery.d.ts" />
/// <reference path="DataService/ListDataSvcMetadata.d.ts" />

// There's no TypeScript definition file for SP at the moment,
// so we declare it here (infered any)
declare var SP;

module MyApp {

  export var ctx = new MyApp.DataService.Context({
    name: "oData",
    oDataServiceHost: "../_vti_bin/listdata.svc"
  });

  ctx.TimeTrackingList.add({
    Title: "Test entry",
    Date: new Date(),
    DurationHours: 4,
    ProjectTask:  new ctx.Projects.elementType({Title: 'Project one'}),
    // Hardcoding my own Id 
    EmployeeId: 7
  })
}