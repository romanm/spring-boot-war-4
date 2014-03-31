function TaskController1() {
	this.name = "Test drug tasks";
	this.taskBlock = [
		{drug: 'Dexamethasone', dose: '4 mg',
			termins: [
				{ malProDay: '3', days: '10' },
				{ malProDay: '2', days: '5' }
			]},
		{drug: 'Doxacillin', dose: '100 mg',
			termins: [
				{ malProDay: '2', days: '7' }
			]}
	];
	this.taskBlock2 = [
		{drug: 'Dexamethasone', dose: '4 mg', malProDay: '3', days: '10' },
		{drug: 'Dexamethasone', dose: '2 mg', malProDay: '3', days: '5' },
		{drug: 'Dexamethasone', dose: '2 mg', malProDay: '2', days: '5' },
		{drug: 'Doxacillin', dose: '100 mg', malProDay: '2', days: '7' }
		];
};
