/*
	Here you can see how to include the module in your controllers.

	Remember this in an example, use your own project files, be guided by this example but do not use it as it is.
*/
angular.module('appMain.controllers', ['ngMessages'])

/* Pay attention:
	when you define the module, pass the "jcmBT" key id of the module to your controller so you can use the modules functions on it.
*/
.controller('HomeCtrl', function($scope, $state,jcmBT, $ionicLoading, $ionicPopup) {

	//Sample function call to the jcmBT module.
	//Imagine we are trying to connect to a BT Printer, lets create a function to set a default printter.
	$scope.setDefaultPrinter = function(name, address) {

		var confirmation = $ionicPopup.confirm({
			title: 'Default Printter change',
			template: 'Are you sure, you want to change the default printter?'

		});

		confirmation.then(function(resp) {
			if (resp) {
				//If "Yes" set default printer

				//Use a FUNCTION MODULE to set setMacAddress 		<----------- IMPORTANT EXAMPLE.
				jcmBT.setMacAddress(address);

				var alert = $ionicPopup.alert({
					title: 'Result',
					template: 'Printter modified.'
				});
			}
		});
	};

	/*
		Sample function to call jcmBT functions to Enable/Discover/etc. bluettoth functions.
	*/
	$scope.searchPrinters = function(name, address) {
		$ionicLoading.show({
			template: 'Looking for bluetooth devices <br/> The process may be take a time. <br/> Please wait ... <ion-spinner icon="android"></ion-spinner>'
		});

		$scope.printer_list = [];

		jcmBT.enable(
			function() {
				jcmBT.discover(
					function(btlist) {
						/*debug the list of bluetooth devices returned by the discover function */
						console.log(JSON.stringify(btlist));
						
						var name = '';
						var address = '';
						var model = ''
						var number = '';

						btlist.forEach(
							function(device) {
								if (typeof(device.name) !== 'undefined') {
									name = device.name.split("-")[0];
									model = device.name.split("-")[1];
									number = device.name.split("-")[2];
									address = device.address;

									console.log(JSON.stringify(device));
									console.log(name);
									console.log(address);
									console.log(number);

									if (typeof(name) !== 'undefined' && typeof(address) !== 'undefined' && typeof(number) !== 'undefined') {
										$scope.printer_list.push({
											'name': name + "-" + model + "-" + number,
											'address': address
										});
									}

									console.log(JSON.stringify($scope.printer_list));
								}
							}
						);
						$ionicLoading.hide();
					},
					function() {
						$scope.printer_list = [];
						$ionicLoading.hide();
						//por las dudas se cuelgue
						jcmBT.stopDiscover(
							function() {},
							function() {}
						);
					}
				);
			},
			function() {
				$ionicLoading.show({
					template: '<i class="icon ion-android-warning"></i> ERROR:<br/> Cannot activate bluetooth',
					duration: 6000,
					noBackdrop: true
				});
			}
		);
	};
})

;