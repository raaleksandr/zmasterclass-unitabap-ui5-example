sap.ui.define([
	"zdepartmentsfioriel/ext/common/ZInputChecker"
],function(ZInputChecker) {
	"use strict";
	
	QUnit.module("Z: Input checker business logic correctness", {
		/*setup: function() {
			this.ZInputChecker = new ZInputChecker();
		}*/
		/*hooks.beforeEach(function() {
			this.ZInputChecker = new ZInputChecker();
		});*/
		before: function() {
			this.ZInputChecker = new ZInputChecker();
		}
	});
	QUnit.test("If both department_address and department_room are filled everything ok",function(assert) {
		// Arrange
		this.ZInputChecker.set_department_address("Some address");
		this.ZInputChecker.set_department_room("123");
		
		// Act
		this.ZInputChecker.check_input();
		
		// Assert
		assert.strictEqual(this.ZInputChecker.get_department_room_state(),"None","The state of field 'department_room' is not 'Error'");
		assert.strictEqual(this.ZInputChecker.get_department_room_state_text(),"","The error text for field 'department_room' is empty");
		assert.strictEqual(this.ZInputChecker.get_is_error(),false,"The error flag is set to false");
	});
	
	QUnit.test("If department_room is not empty but department_address is empty we get error",function(assert) {
		// Arrange
		this.ZInputChecker.set_department_address("");
		this.ZInputChecker.set_department_room("123");
		
		// Act
		this.ZInputChecker.check_input();
		
		// Assert
		assert.strictEqual(this.ZInputChecker.get_department_room_state(),"Error","The state of field 'department_room' is 'Error'");
		assert.strictEqual(this.ZInputChecker.get_department_room_state_text(),"Если не заполнен адрес, то номер комнаты должен быть пустым",
			"Correct error text for field 'department_room' is set");
		assert.strictEqual(this.ZInputChecker.get_is_error(),true,"The error flag is set to true");
	});
	
	QUnit.test("If both department_address and department_room are empty everything is ok too",function(assert) {
		// Arrange
		this.ZInputChecker.set_department_address("");
		this.ZInputChecker.set_department_room("");
		
		// Act
		this.ZInputChecker.check_input();
		
		// Assert
		assert.strictEqual(this.ZInputChecker.get_department_room_state(),"None","The state of field 'department_room' is not 'Error'");
		assert.strictEqual(this.ZInputChecker.get_department_room_state_text(),"","The error text for field 'department_room' is empty");
		assert.strictEqual(this.ZInputChecker.get_is_error(),false,"The error flag is set to false");
	});	

});