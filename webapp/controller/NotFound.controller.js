sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.NotFound", {

            onNavToOverview: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("View1", {}, true);
            }

        });
    });