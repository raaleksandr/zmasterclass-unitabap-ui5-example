sap.ui.define([
	"sap/ui/base/ManagedObject"
], function(
	ManagedObject
) {
	"use strict";

	return ManagedObject.extend("zdepartmentsfioriel.ext.common.ZInputChecker", {
        constructor: function() {
			this.department_address = "";
			this.department_room = "";
			this._reset_errors();
		},
		
		set_department_address: function(department_address) {
			this.department_address = department_address;
		},
		
		set_department_room: function(department_room) {
			this.department_room = department_room;
		},
		
		check_input: function() {
			if(this.department_room && !this.department_address)
			{
				this.department_room_state = "Error";
				this.department_room_state_text = "Если не заполнен адрес, то номер комнаты должен быть пустым";
			}
			else {
				this._reset_errors();
			}
		},
		
		get_department_room_state: function() {
			return this.department_room_state;	
		},
		
		get_department_room_state_text: function() {
			return this.department_room_state_text;	
		},
		
		get_is_error: function() {
			return (this.department_room_state === "Error");
		},
		
		_reset_errors: function() {
			this.department_room_state = "None";
			this.department_room_state_text = "";
		}
	});
});