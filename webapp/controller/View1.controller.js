sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/syncStyleClass",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, syncStyleClass, JSONModel, Filter, FilterOperator, MessageToast) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {
                var oModel = new JSONModel();
                this.getView().setModel(oModel, "customer");
            },
            onSavePress: function () {

                var oModelData = this.getView().getModel("customer").getData();
                var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                if (oModelData.Discount === undefined) { oModelData.Discount = 0; }

                this.byId("customerTable").getBinding("items").create({
                    "Form": oModelData.Form,
                    "CustomerName": oModelData.CustomerName,
                    "Discount": oModelData.Discount + "",
                    "Street": oModelData.Street,
                    "PostCode": oModelData.PostCode,
                    "City": oModelData.City,
                    "Country": oModelData.Country,
                    "Email": oModelData.Email,
                    "Telephone": oModelData.Telephone
                }).created().then(function () {
                    MessageToast.show(oResourceBundle.getText("customerCreatedMessage"));
                });
                
                // if (!this.pDialog) {
                //     this.pDialog = this.loadFragment({
                //         name: "project1.view.Dialog"
                //     });
                // }
                // this.pDialog.then(function (oDialog) {
                //     oDialog.open();
                // });
            },

            onCloseDialog: function () {
                this.byId("dialog").close();
            },
            onCustomerChange: function (oEvent) {
                var oBindingContext = oEvent.getParameter("listItem").getBindingContext();
                this.byId("bookingTable").setBindingContext(oBindingContext);
            },
            onFilterCustomers: function (oEvent) {
                var aFilter = [];
                var sQuery = oEvent.getParameter("query");
                if (sQuery && sQuery.length > 0) {
                    aFilter.push(new Filter("CustomerName", FilterOperator.Contains, sQuery));

                }

                var oTable = this.byId("customerTable");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(aFilter);

            },
            onNavToDetails: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("detail");
            }

        });
    });
