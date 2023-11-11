sap.ui.define([
	"zdepartmentsfioriel/ext/common/ZInputChecker"
], 
	function(ZInputChecker) {

	return sap.ui.controller("zdepartmentsfioriel.ext.controller.ObjectPageExt", {
		onInit: function () {
			that = this;
			zInputChecker = new ZInputChecker();
			//alert("imhere");
		},
	
		onAfterRendering: function () {
			this._oEditButton = this.getView().byId(
				"zdepartmentsfioriel::sap.suite.ui.generic.template.ObjectPage.view.Details::ZDEPARTMENTS_CDS--edit");
			this._oEditButton.attachPress(this.onEditPress);

			this._oSaveButton = this.getView().byId(
				"zdepartmentsfioriel::sap.suite.ui.generic.template.ObjectPage.view.Details::ZDEPARTMENTS_CDS--save");
			this._oSaveButton.attachPress(this.onSavePress);

			//var departmentRoomField = that.getDepartmentRoomField();
			var departmentRoomField = this.getDepartmentRoomField();
			if(departmentRoomField) {
				departmentRoomField.attachChange(this.onDepartmentRoomChange);
			}

			var departmentAddressField = this.getDepartmentAddressField();
			if(departmentAddressField) {
				departmentAddressField.attachChange(this.onDepartmentAddressChange);
			}
		},
	
		onEditPress : function(){
			sap.m.MessageToast.show("Edit button pressed");
		},

		onSavePress : function() {
			//alert("imhere save");
		},

		onCreateNotification: function (oEvent) {
			var oNavControl = this.extensionAPI.getNavigationController();
			var oModel = this.getOwnerComponent().getModel();
			var sPath = oEvent.getSource().getBindingContext().getPath();
			var notNo = oModel.getProperty(sPath + "/qmnum");
			var ordNo = oModel.getProperty(sPath + "/aufnr");
			var ordStart = oModel.getProperty(sPath + "/orderstart");
			oNavControl.navigateExternal("Notification", {
				qmnum: notNo,
				aufnr: ordNo,
				qmdat: ordStart,
				preferredMode: "create"
			});
		},

		onDepartmentRoomChange : function() {
			that.checkForm();
			/*
			var roomField = that.getDepartmentRoomField();
			var addressField = that.getDepartmentAddressField();
			
			zInputChecker.set_department_address(addressField.getValue());
			zInputChecker.set_department_room(roomField.getValue());

			zInputChecker.check_input();

			roomField.setValueState(zInputChecker.get_department_room_state());
			roomField.setValueStateText(zInputChecker.get_department_room_state_text());
			*/
		},

		onDepartmentAddressChange : function() {
			that.checkForm();
		},

		getSmartFields : function() {
			var smartFields = this.getView().getContent()[0].getSections()[0].getSubSections()[0]
					.getBlocks()[0].getContent()[0].getSmartFields();
			return smartFields;
		},

		getDepartmentRoomField : function() {
			return this.getSmartField("department_room")
		},

		getDepartmentAddressField : function() {
			return this.getSmartField("department_address")
		},

		getSmartField : function(fieldName) {
			var smartFields = this.getSmartFields();
		
			var departmentRoomField = smartFields.find(function(element) {
				return element.sId.includes(fieldName);
			});

			return departmentRoomField;
		},

		checkForm : function() {
			var roomField = that.getDepartmentRoomField();
			var addressField = that.getDepartmentAddressField();
			
			zInputChecker.set_department_address(addressField.getValue());
			zInputChecker.set_department_room(roomField.getValue());

			zInputChecker.check_input();

			roomField.setValueState(zInputChecker.get_department_room_state());
			roomField.setValueStateText(zInputChecker.get_department_room_state_text());

			this.setSavePossible(!zInputChecker.get_is_error());
		},

		setSavePossible : function(savePossible) {
			//this._oSaveButton = this.getView().byId(
			//	"zdepartmentsfioriel::sap.suite.ui.generic.template.ObjectPage.view.Details::ZDEPARTMENTS_CDS--save");
			this._oSaveButton.setEnabled(savePossible);
		}
	})
});