/// <reference path="../Scripts/jquery.d.ts" />
/// <reference path="DataService/ListDataSvcMetadata.d.ts" />

// There's no TypeScript definition file for SP at the moment,
// so we declare it here (infered any)
declare var SP;

module MyApp {

  export var listDataSvc = new MyApp.DataService.Context({
    name: "oData",
    oDataServiceHost: "../_vti_bin/listdata.svc"
  });

  var project = new listDataSvc.Projects.elementType({
    Title: "hello world"
  });

}