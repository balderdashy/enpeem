/*eslint indent:1*/
/**
* Module errors
* @type {Object}
*/
module.exports = {
	cantFindNpm: function () {
		return new Error(
			'Couldn\'t install dependencies because `npm` could not be found.  ' +
			'(Is it in your $PATH?)' + '\n' +
			'Anyways, you\'ll probably have to install them yourself with `npm install`.'
		);
	}
};
