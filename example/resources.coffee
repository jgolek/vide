Resource = require '../lib/Resource'
types = require './types'



exports.res1 = new Resource
	name: 'res1'
	type: types.Type1
	url: '/resource/res1'

exports.res2 = new Resource
	name: 'res2'
	type: types.Type2
	url: '/resource/res2'

