'use strict'

const _ = require('lodash')

// map datanyze:segment web technologies as key:value pairs
// some technologies are named differently in datanyze so we audited their 'technologies' object
// and manually mapped each technology to our naming (Q1 2016)
const segmentWebTech = {
 'Active Campaign': 'ActiveCampaign',
 AdRoll: 'AdRoll',
 Adjust: 'Adjust',
 'Amazon S3': 'Amazon S3',
 Amplitude: 'Amplitude',
 AppNexus: 'AppNexus',
 AppBoy: 'Appboy',
 Autopilot: 'AutopilotHQ',
 'Bing Ads': 'Bing Ads',
 Blueshift: 'Blueshift',
 'Branch Metrics': 'Branch Metrics',
 Bronto: 'Bronto',
 BugHerd: 'BugHerd',
 Chartbeat: 'Chartbeat',
 Clicky: 'Clicky',
 comScore: 'comScore',
 'Convertro (AOL)': 'Convertro',
 CrazyEgg: 'Crazy Egg',
 Crittercism: 'Crittercism',
 'Curebit (Talkable)': 'Curebit',
 'Customer.IO': 'Customer.io',
 DataXu: 'DataXu',
 Drip: 'Drip',
 Elevio: 'Elevio',
 Eloqua: 'Eloqua',
 Errorception: 'Errorception',
 Evergage: 'Evergage',
 ExactTarget: 'Salesforce Marketing Cloud',
 Extole: 'Extole',
 'Facebook Conversion Tracking': 'Facebook Pixel',
 'Facebook SDK': 'Facebook App Events',
 'Facebook Web Custom Audiences': 'Facebook Pixel',
 'Facebook WCA Page View': 'Facebook Pixel',
 Flurry: 'Flurry',
 Freshdesk: 'Freshdesk',
 FullStory: 'FullStory',
 Gauges: 'Gauges',
 GoSquared: 'GoSquared',
 'Google Adwords Conversion': 'AdWords',
 'Google Analytics': 'Google Analytics',
 'Google Dynamic Remarketing': 'AdWords',
 'Google Tag Manager': 'Google Tag Manager',
 'Google Universal Analytics': 'Google Analytics',
 HasOffers: 'HasOffers',
 HeapAnalytics: 'Heap',
 Hellobar: 'Hello Bar',
 HelpScout: 'Help Scout',
 HitTail: 'HitTail',
 Hubspot: 'HubSpot',
 Improvely: 'Improvely',
 Inspectlet: 'Inspectlet',
 Intercom: 'Intercom',
 Kissmetrics: 'KISSmetrics',
 Kahuna: 'Kahuna',
 'Keen IO': 'Keen IO',
 Klaviyo: 'Klaviyo',
 Kochava: 'Kochava',
 Leanplum: 'Leanplum',
 LiveChat: 'LiveChat',
 Localytics: 'Localytics',
 'Lucky Orange': 'Lucky Orange',
 MailChimp: 'MailChimp',
 'MailChimp SPF': 'MailChimp',
 'Mailchimp Mandrill': 'Mandrill',
 MailJet: 'Mailjet',
 Marketo: 'Marketo',
 MediaMath: 'MediaMath',
 'Millennial Media': 'Millennial Media',
 Mixpanel: 'Mixpanel',
 MoEngage: 'MoEngage',
 'MobileAppTracking by TUNE': 'MobileAppTracking',
 Mojn: 'Mojn',
 Monetate: 'Monetate',
 MouseFlow: 'Mouseflow',
 Nanigans: 'Nanigans',
 'New Relic': 'New Relic',
 Nudgespot: 'Nudgespot',
 Olark: 'Olark',
 'Omniture (Adobe)': 'Omniture',
 OneSignal: 'OneSignal',
 Optimizely: 'Optimizely',
 Pardot: 'Pardot',
 'Perfect Audience (Marin Software)': 'Perfect Audience',
 Pingdom: 'Pingdom',
 Piwik: 'Piwik',
 Qualaroo: 'Qualaroo',
 Quantcast: 'Quantcast',
 Rollbar: 'Rollbar',
 Salesforce: 'Salesforce',
 'Segment.io': 'Segment',
 Sendgrid: 'SendGrid',
 Sentry: 'Sentry',
 ShareASale: 'ShareASale',
 SimpleReach: 'SimpleReach',
 SnapEngage: 'SnapEngage',
 Spinnakr: 'Spinnakr',
 Stripe: 'Stripe',
 Taplytics: 'Taplytics',
 Tapstream: 'Tapstream',
 Totango: 'Totango',
 'Twitter Advertising': 'Twitter Ads',
 Twilio: 'Twilio',
 UserVoice: 'UserVoice',
 UserLike: 'Userlike',
 Vero: 'Vero',
 'Visual Website Optimizer': 'Visual Website Optimizer',
 WebEngage: 'WebEngage',
 Webtrends: 'Webtrends',
 Woopra: 'Woopra',
 'Wordpress.org': 'Wordpress',
 'Wordpress.com': 'Wordpress',
 'Yandex Metrica': 'Yandex Metrica',
 Zendesk: 'Zendesk',
 'Zopim by Zendesk': 'Zopim'
}

// map datanyze:segment mobile technologies as key:value pairs
// some technologies are named differently in datanyze so we audited their 'mobile.technologies' object
// and manually mapped each technology to our naming (Q1 2016)
const segmentMobileTech = {
 'AdWords Conversion Tracking': 'AdWords',
 Adjust: 'Adjust',
 'Adobe Marketing Cloud': 'Adobe Marketing Cloud',
 'Amazon S3': 'Amazon S3',
 Amplitude: 'Amplitude',
 AppNexus: 'AppNexus',
 AppBoy: 'Appboy',
 Apptimize: 'Apptimize',
 'Branch Metrics': 'Branch Metrics',
 comScore: 'comScore',
 Countly: 'Countly',
 Crittercism: 'Crittercism',
 Extole: 'Extole',
 'Facebook SDK': 'Facebook App Events',
 Flurry: 'Flurry',
 'Google Analytics': 'Google Analytics',
 'Google Tag Manager': 'Google Tag Manager',
 'Google Universal Analytics': 'Google Analytics',
 Intercom: 'Intercom',
 Kahuna: 'Kahuna',
 'Keen IO': 'Keen IO',
 Kochava: 'Kochava',
 Leanplum: 'Leanplum',
 Localytics: 'Localytics',
 'Millennial Media': 'Millennial Media',
 Mixpanel: 'Mixpanel',
 MoEngage: 'MoEngage',
 Nanigans: 'Nanigans',
 'New Relic': 'New Relic',
 OneSignal: 'OneSignal',
 Optimizely: 'Optimizely',
 Salesforce: 'Salesforce',
 'ExactTarget Push': 'Salesforce Marketing Cloud',
 Segment: 'Segment',
 Taplytics: 'Taplytics',
 Tapstream: 'Tapstream',
 Twitter: 'Twitter Ads',
 UserVoice: 'UserVoice',
 Webtrends: 'Webtrends',
 Zendesk: 'Zendesk'
}

const iosOnlyTech = [
 'Apple Framework',
 'Apple Mobile Backup',
 'Apple Reachability'
]

const androidOnlyTech = [
 'Android',
 'Android Annotations Package',
 'Android Async Http Client',
 'Android Calendar View',
 'Android Crop',
 'Android Gif Drawable',
 'Android Graph View',
 'Android Support Library',
 'Android Swipe Layout',
 'AndroidAsync',
 'Apache Commons',
 'Butter Knife',
 'CommonsWare Android Components (CWAC)',
 'Google Cast',
 'Google Cloud',
 'Google Data API',
 'Google Drive',
 'Google Fitness',
 'Google Games',
 'Google HTTP Fetcher',
 'Google Location',
 'Google Nearby',
 'Google Play Services',
 'Google Wallet',
 'Java Annotations Package',
 'Java HTML Parser (jsoup)',
 'Kankan Wheel (Widget for Android)',
 'MPAndroidChart',
 'NineOldAndroids',
 'Simple Logging Facade For Java'
]

exports.getTechStack = function*(domainInfo) {
 const traits = {
 mobile_apps_list: [],
 supported_tech: [],
 nonsupported_tech: [],
 supported_mobile_tech: [],
 nonsupported_mobile_tech: [],
 has_ios: false,
 has_android: false,
 has_segment_ios_sdk: false,
 has_segment_android_sdk: false
 }

 // iterate over datanyze object and check if the technology is supported by Segment
 for (const techId in domainInfo.technologies) {
 const tech = domainInfo.technologies[techId]
 if (segmentWebTech[tech.name]) {
 traits.supported_tech.push(segmentWebTech[tech.name])
 } else {
 traits.nonsupported_tech.push(tech.name)
 }
 }

 // iterate over each mobile app returned by datanyze
 for (const mobileId in domainInfo.mobile) {
 const app = domainInfo.mobile[mobileId]

 traits.mobile_apps_list.push(app.name)

 // need two helper variables bc first we have to verify the mobile OS
 // then we check whether segment SDK is installed on that device
 // finally, if our SDK is installed, we verify the OS and update the correct 'has sdk' trait
 let segmentSdkHelper = false
 let currentAppOs

 // iterate over the mobile tech stack for each app
 for (const techId in app.technologies) {
 const tech = app.technologies[techId]

 // parse tech stack of mobile apps
 if (segmentMobileTech[tech.name]) {
 traits.supported_mobile_tech.push(segmentMobileTech[tech.name])
 } else {
 traits.nonsupported_mobile_tech.push(tech.name)
 }

 // techIds correspond to datanyze's ios-only SDKs
 if (!traits.has_ios && iosOnlyTech.indexOf(tech.name) !== -1) {
 traits.has_ios = true
 currentAppOs = 'ios'
 }

 // techIds correspond to datanyze's android-only SDKs
 if (!traits.has_android && androidOnlyTech.indexOf(tech.name) !== -1) {
 traits.has_android = true
 currentAppOs = 'android'
 }

 // if segment SDK is present, update the helper
 if (tech.name === 'Segment') {
 segmentSdkHelper = true
 }

 // check if mobile app has mParticle SDK
 if (tech.name === 'mParticle') {
 traits.has_mParticle_sdk = true
 }
 }

 // first check each app for segment sdk, then check the os
 if (segmentSdkHelper) {
 if (currentAppOs === 'ios') {
 traits.has_segment_ios_sdk = true
 } else if (currentAppOs === 'android') {
 traits.has_segment_android_sdk = true
 } else {
 // on the rare corner case that segmentSdkHelper is true yet we haven't identified any ios or android sdk
 traits.has_segment_sdk = true
 }
 }
 }

 // de-dupe the arrays (mostly for mobile but including web just in case)
 traits.supported_tech = _.uniq(traits.supported_tech)
 traits.nonsupported_tech = _.uniq(traits.nonsupported_tech)
 traits.supported_mobile_tech = _.uniq(traits.supported_mobile_tech)
 traits.nonsupported_mobile_tech = _.uniq(traits.nonsupported_mobile_tech)

 traits.mobile_apps_count = traits.mobile_apps_list.length
 traits.has_mobile_app = !!traits.mobile_apps_list.length

 return traits
}