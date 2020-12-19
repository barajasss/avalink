import shortId from 'shortid'

const userDefaults = user => ({
	id: shortId.generate(),
	username: 'unique username',
	details: {
		name: user.displayName,
		email: user.email,
		totalProfileLinks: 0,
		quickLink: false,
		imageUrl: '',
		about: '',
	},
	links: [
		{
			data: user.displayName,
			order: 0,
			name: 'contact',
		},
		{
			data: '',
			order: 1,
			name: 'instagram',
		},
		{
			data: '',
			order: 2,
			name: 'snapchat',
		},
		{
			data: '',
			order: 3,
			name: 'twitter',
		},
		{
			data: '',
			order: 4,
			name: 'facebook',
		},
		{
			data: '',
			order: 5,
			name: 'linkedin',
		},
		{
			data: '',
			order: 6,
			name: 'text',
		},
		{
			data: '',
			order: 7,
			name: 'email',
		},
		{
			data: '',
			order: 8,
			name: 'youtube',
		},
		{
			data: '',
			order: 9,
			name: 'tiktok',
		},
		{
			data: '',
			order: 10,
			name: 'soundcloud',
		},
		{
			data: '',
			order: 11,
			name: 'spotify',
		},
		{
			data: '',
			order: 12,
			name: 'apple',
		},
		{
			data: '',
			order: 13,
			name: 'venmo',
		},
		{
			data: '',
			order: 14,
			name: 'cashapp',
		},
		{
			data: '',
			order: 15,
			name: 'paypal',
		},
		{
			data: '',
			order: 16,
			name: 'whatsapp',
		},
		{
			data: '',
			order: 17,
			name: 'twitch',
		},
		{
			data: '',
			order: 18,
			name: 'customlink',
		},
		{
			data: '',
			order: 19,
			name: 'website',
		},
		{
			data: '',
			order: 20,
			name: 'address',
		},
	],
})

export default userDefaults
