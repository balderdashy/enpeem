/**
 * Module errors
 * @type {Object}
 */
module.exports = {
	cantFindNpm: function ( consoleOutputFrom_npm_v ) {
		return new Error(
			'Couldn\'t install dependencies because `npm` could not be found.  ' +
			'(Is it in your $PATH?)' + '\n' +
			'Anyways, you\'ll probably have to install them yourself with `npm install`.'+
			
			''
			// TODO: bring this stuff back
			// (would need to reduce both stderr and stdout stream to get nice output for the error msg)
			// 
			// '\n'+
			// 'Here\'s what I got when I tried `npm -v`:' + '\n' + consoleOutputFrom_npm_v
			// 
		);
	}
};
