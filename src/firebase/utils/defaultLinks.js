const defaultLinks = [
	{
		displayName: 'Instagram',
		name: 'instagram',
		type: 'sublink',
		placeholder: 'Instagram username',
		linkPrefix: 'https://instagram.com/',
		linkInfo:
			'Step 1: Open the Instagram app. Step 2: Navigate to your profile. Step 3: Your username will be at the top of your screen.',
		order: 1,
		prefixSign: '@',
	},
	{
		displayName: 'Snapchat',
		name: 'snapchat',
		type: 'sublink',
		placeholder: 'Snapchat username',
		linkPrefix: 'https://snapchat.com/',
		linkInfo:
			'Step 1: Open the Snapchat app. Step 2: Tap your profile picture in the top left corner. Step 3: Your username will be below your snapchat name.',
		order: 2,
		prefixSign: '',
	},
	{
		displayName: 'Twitter',
		name: 'twitter',
		type: 'sublink',
		placeholder: 'Twitter username',
		linkPrefix: 'https://twitter.com/',
		linkInfo:
			'Step 1: Open the Twitter app. Step 2: Tap your profile picture in the top left corner. Step 3: Your twitter username will be in grey with an @ sign.',
		order: 3,
		prefixSign: '@',
	},
	{
		displayName: 'Facebook',
		name: 'facebook',
		type: 'link',
		placeholder: 'Facebook profile link',
		linkPrefix: '',
		linkInfo:
			'Step 1: Go to facebook.com. Step 2: Open your facebook profile or page. Step 3: Copy and paste the url link from the browser here.',
		order: 4,
		prefixSign: '',
	},
	{
		displayName: 'LinkedIn',
		name: 'linkedin',
		type: 'link',
		placeholder: 'LinkedIn profile link',
		linkPrefix: '',
		linkInfo:
			'Step 1: Go to your LinkedIn profile. Step 2: Navigate down to the "Contact" section. Step 3: Find your profile link in this section and paste here.',
		order: 5,
		prefixSign: '',
	},

	{
		displayName: 'Text',
		name: 'text',
		type: 'sublink',
		placeholder: 'SMS Text Message',
		linkPrefix: 'tel:',
		linkInfo:
			'Step 1: Go to your Contact App. Step 2: Open your profile. Step 3: Paste your phone number with your country code.',
		order: 6,
		prefixSign: '',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'sublink',
		placeholder: 'Email',
		linkPrefix: 'mailto:',
		linkInfo:
			'Add any email you want to make public, it can be a gmail, yahoo, hotmail, or business email',
		order: 7,
		prefixSign: '',
	},
	{
		displayName: 'Youtube',
		name: 'youtube',
		type: 'link',
		placeholder: 'Youtube link',
		linkPrefix: '',
		linkInfo:
			'Step 1: Open the Youtube app. Step 2: Navigate to your channel profile. Step 3: Tap the three dots in the top right corner, tap share. Step 4: Copy and paste the link here.',
		order: 8,
		prefixSign: '',
	},
	{
		displayName: 'TikTok',
		name: 'tiktok',
		type: 'sublink',
		placeholder: 'TikTok username',
		linkPrefix: 'https://www.tiktok.com/',
		linkInfo:
			'Step 1: Open the TikTok app. Step 2: Navigate to the "Me" tab. Step 3: Grab your TikTok username under your profile picture.',
		order: 9,
		prefixSign: '',
	},
	{
		displayName: 'Sound Cloud',
		name: 'soundcloud',
		type: 'sublink',
		placeholder: 'SoundCloud username',
		linkPrefix: 'https://www.soundcloud.com/',
		linkInfo:
			'Step 1: Open the SoundCloud app. Step 2: Navigate to your channel profile. Step 3: Copy and paste your username here.',
		order: 10,
		prefixSign: '',
	},
	{
		displayName: 'Spotify',
		name: 'spotify',
		type: 'link',
		placeholder: 'Link to Spotify',
		linkPrefix: '',
		linkInfo:
			'Step 1: Open the Spotify app. Step 2: Tap the three dots in the top right corner of your favorite playlist, track or album. Step 3: Tap share and copy and paste your link here.',
		order: 11,
		prefixSign: '',
	},
	{
		displayName: 'Apple',
		name: 'apple',
		type: 'link',
		placeholder: 'Link to Apple Music',
		linkPrefix: '',
		linkInfo:
			'Step 1: Open the Apple Music app. Step 2: Tap the three dots in the top right corner of your favorite playlist, track or album. Step 3: Tap share and copy and paste your link here.',
		order: 12,
		prefixSign: '',
	},
	{
		displayName: 'Venmo',
		name: 'venmo',
		type: 'sublink',
		placeholder: 'Venmo username',
		linkPrefix: 'https://venmo.com/',
		linkInfo:
			'Step 1: Open the Venmo app. Step 2: Tap the menu option in the top left corner . Step 3: Your username will be in grey with an @ sign.',
		order: 13,
		prefixSign: '@',
	},
	{
		displayName: 'Cash App',
		name: 'cashapp',
		type: 'sublink',
		placeholder: 'CashApp username',
		linkPrefix: 'https://cash.app/$',
		linkInfo:
			'Step 1: Open the CashApp app. Step 2: Tap on the profile icon in the top right corner. Step 3: Your CashApp username will be in grey with a $.',
		order: 14,
		prefixSign: '$',
	},
	{
		displayName: 'Paypal',
		name: 'paypal',
		type: 'link',
		placeholder: 'PayPal.me link',
		linkPrefix: '',
		linkInfo:
			'Step 1: Visit to www.paypal.me, Step 2: Tap the blue "Create Your PayPal.Me Link" button. Step 3: When you create your account (paypal.me/username), copy and paste your link here.',
		order: 15,
		prefixSign: '',
	},
	{
		displayName: 'Whatsapp',
		name: 'whatsapp',
		type: 'sublink',
		placeholder: 'WhatsApp number',
		linkPrefix: 'https://api.whatsapp.com/send?phone=',
		linkInfo:
			'Step 1: Open the WhatsApp app. Step 2: Navigate to settings. Step 3: Tap your profile at the top and add your WhatsApp phone number here.',
		order: 16,
		prefixSign: '',
	},
	{
		displayName: 'Twitch',
		name: 'twitch',
		type: 'sublink',
		placeholder: 'Twitch channel username',
		linkPrefix: 'https://www.twtich.tv/',
		linkInfo:
			'Step 1: Open the Twitch app. Step 2: Navigate to your account. Step 3: Copy and paste your username here.',
		order: 17,
		prefixSign: '',
	},
	{
		displayName: 'Custom Link',
		name: 'customlink',
		type: 'link',
		placeholder: 'Enter any custom link',
		linkPrefix: '',
		linkInfo:
			'Step 1: Visit the website on your browser. Step 2: Copy and paste the URL here.',
		order: 18,
		prefixSign: '',
	},
	{
		displayName: 'Website',
		name: 'website',
		type: 'link',
		placeholder: 'Website link',
		linkPrefix: '',
		linkInfo:
			'Step 1: Visit the website on your browser. Step 2: Copy and paste the URL here.',
		order: 19,
		prefixSign: '',
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'link',
		placeholder: 'Google address',
		linkPrefix: '',
		linkInfo:
			'Step 1: Open Google Maps App. Step 2: Search for the address. Step 3: Tap the share button, just copy the complete link here.',
		order: 20,
		prefixSign: '',
	},
]

export default defaultLinks
