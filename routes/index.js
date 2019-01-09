// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const profiles = {
	ecerezo: {
		name: 'elena cerezo',
		username:'ecerezo',
		occupation: 'tightrope wolker', 
		languages:['willow', 'cherrytree'],
		company: 'cirque du soleil'
	},
	karliky: {
		name: 'karliky',
		username:'karliky',
		occupation: 'quantum programmer', 
		languages:['js', 'python'],
		company: 'ibm'
	},
	eparrado: {
		name: 'estela parrado',
		username:'eparrado',
		occupation: 'professional dancer', 
		languages:['royale ballet', 'swan lake'],
		company: 'bolshoi'
	}

}


router.get('/', (req, res) => {
	res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
})

router.get('/profiles', (req, res) => {
	const keys = Object.keys(profiles)
	const list = []
	keys.forEach(key => {
		list.push(profiles[key])
		})
	const data = {
		profiles: list,
		timestamp: req.timestamp
	}	

	res.render('profiles', data)
})

// router.post('/post', (req, res) => {
// 	const body = req.body

// 	res.json({
// 		confitmation: 'success',
// 		data: body
// 	})
// })

router.post('/addprofile', (req, res) => {
	const body = req.body
	body['languages'] = req.body.languages.split(', ')
	profiles[body.username] = body
	res.redirect('/profile/' + body.username)
	// res.json({
	// 	confirmation: 'success',
	// 	data: body
	// })

})


router.get('/query', (req, res) => {
	const name = req.query.name
	const occupation = req.query.occupation

	const data = {
		name: name,
		occupation: occupation
	}
	res.render('profile', data)

	// res.json({
	// 	name: name,
	// 	occupation: occupation
	// })
})
router.get('/:path', (req, res) => {
	const path = req.params.path
	
	res.json({
		data: path
	})
})

router.get('/:profile/:username', (req, res) => {
	const profile = req.params.profile
	const username = req.params.username
	const currentProfile = profiles[username]
	
	if(currentProfile == null) {
		res.json({
			confirmation: 'fail', 
			message: 'Profile ' + username + ' not found'
		})
	}
	// res.json({
	// 	confirmation: 'success',
	// 	profile: currentProfile
	// })

	currentProfile.timestamp = req.timestamp
	res.render('profile', currentProfile)
})


module.exports = router
