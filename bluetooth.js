angular.module('juancarmo.bluetooth',[])

.factory('jcmBT', function() {
	var priv_MACADDR = '';
	var priv_CHARS = '';
	
	var f = {};
	
	function private_checkMAC(mac) {
		//revisa direcciones del tipo:
		//XX:XX:XX:XX:XX:XX
		//XX-XX-XX-XX-XX-XX
		if (typeof(mac) !== 'undefined') {
			var regex = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/;
			return (regex.test(mac));
		}
		else {
			return false;
		}
	}; 
	
	f.getParameters = function(){
		return {
			'macAddress': priv_MACADDR,
			'chars': priv_CHARS
		};
	};
	
	f.setMacAddress = function(string_mac){
		if (private_checkMAC(string_mac)) {
			priv_MACADDR = string_mac;
			return true;
		} 
		else {
			return false;
		}	
	};
	
	f.getMacAddress = function() {
		return priv_MACADDR;
	};
	
	f.connect = function (callbackSuccess, callbackError){
		if (priv_MACADDR !== '') {
			bluetoothSerial.connect(
				priv_MACADDR, 
				callbackSuccess, 
				callbackError
			);	
		}else{ 
		  callbackError('Error:MAC ADDRESS does not exists.');
	    }
	};
	
	f.connectInsecure = function (){};
	
	f.disconnect = function (callbackSuccess, callbackError){
		bluetoothSerial.disconnect(
			callbackSuccess, 
			callbackError
		);	
	};
	
	f.write = function (datos,callbackSuccess,callbackError){
		bluetoothSerial.write(
			datos,
			callbackSuccess, 
			callbackError
		);	
	};
	
	f.available = function (){};
	f.read = function (){};
	f.readUntil = function (){};
	f.subscribe = function (){};
	
	f.unsubscribe = function (callbackSuccess,callbackError){
		bluetoothSerial.unsubscribe(
			callbackSuccess, 
			callbackError
		);	
	};
	
	f.subscribeRawData = function (){};
	f.unsubscribeRawData = function (){};
	
	f.clear = function (callbackSuccess,callbackError){
		bluetoothSerial.clear(
			callbackSuccess, 
			callbackError
		);	
	};
	
	f.listPaired = function (callbackSuccess,callbackError){
		/*
		 * Return example:
		 * [{
				"class": 276,
				"id": "10:BF:48:CB:00:00",
				"address": "10:BF:48:CB:00:00",
				"name": "Nexus 7"
			}, {
				"class": 7936,
				"id": "00:06:66:4D:00:00",
				"address": "00:06:66:4D:00:00",
				"name": "RN42"
			}]
		 */
		 bluetoothSerial.list(
			callbackSuccess, 
			callbackError
		);	
	};
	
	f.isEnabled = function (callbackSuccess,callbackError){
		bluetoothSerial.isEnabled(
			callbackSuccess,
			callbackError
		);
	};
	
	f.isConnected = function (callbackSuccess,callbackError){
		bluetoothSerial.isConnected(
			callbackSuccess,
			callbackError
		);
	};
	
	f.readRSSI = function (){};
	f.showBluetoothSettings = function (){};
	
	f.enable = function (callbackSuccess,callbackError){
		bluetoothSerial.enable(
			callbackSuccess,
			callbackError
		);
	};
	
	f.discover = function (callbackSuccess,callbackError){
		/*
		 bluetoothSerial.discoverUnpaired(function(devices) {
				devices.forEach(function(device) {
					console.log(device.id);
				})
			}, failure);
		*/
		
		/*
			[{
				"class": 276,
				"id": "10:BF:48:CB:00:00",
				"address": "10:BF:48:CB:00:00",
				"name": "Nexus 7"
			}, {
				"class": 7936,
				"id": "00:06:66:4D:00:00",
				"address": "00:06:66:4D:00:00",
				"name": "RN42"
			}]
		 */
		bluetoothSerial.discoverUnpaired(
			callbackSuccess,
			callbackError
		);
	};
	
	f.stopDiscover = function(callbackSuccess,callbackError) {
		bluetoothSerial.stopDiscover(
			callbackSuccess,
			callbackError
		);
	};
	
	return f;
});
