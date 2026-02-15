// Livora Internationalization - Bangla + English
export type Language = 'bn' | 'en';

export const translations = {
  bn: {
    // App Name
    appName: 'লিভোরা',
    
    // Language Selection
    selectLanguage: 'ভাষা নির্বাচন করুন',
    bangla: 'বাংলা',
    english: 'English',
    
    // Role Selection
    whatDoYouWantToDo: 'আপনি কী করতে চান?',
    lookingForWork: 'কাজ খুঁজছি',
    lookingToHire: 'কাজ দিতে চাই',
    
    // Worker - New or Returning
    areYouNew: 'আপনি কি নতুন?',
    firstTime: 'প্রথমবার',
    returningUser: 'আগে ব্যবহার করেছি',
    
    // Login
    phoneNumber: 'ফোন নম্বর',
    enterPhoneNumber: 'আপনার ফোন নম্বর লিখুন',
    sendOTP: 'OTP পাঠান',
    enterOTP: 'OTP লিখুন',
    verify: 'যাচাই করুন',
    otpSent: 'OTP পাঠানো হয়েছে',
    otpVerified: 'যাচাই সম্পন্ন!',
    
    // Registration Method
    chooseMethod: 'তথ্য দেওয়ার পদ্ধতি বাছাই করুন',
    voiceForm: 'ভয়েস দিয়ে',
    writtenForm: 'লিখে',
    
    // Face Capture
    faceCapture: 'ছবি তুলুন',
    faceCaptureInstruction: 'ক্যামেরার দিকে তাকান এবং ছবি তুলুন',
    takePhoto: 'ছবি তুলুন',
    retake: 'আবার তুলুন',
    usePhoto: 'এই ছবি ব্যবহার করুন',
    
    // Basic Info
    basicInfo: 'মৌলিক তথ্য',
    name: 'নাম',
    enterName: 'আপনার নাম লিখুন',
    age: 'বয়স',
    selectAge: 'বয়স নির্বাচন করুন',
    gender: 'লিঙ্গ (ঐচ্ছিক)',
    male: 'পুরুষ',
    female: 'মহিলা',
    other: 'অন্যান্য',
    preferNotToSay: 'বলতে চাই না',
    
    // Age ranges
    age18to25: '১৮-২৫',
    age26to35: '২৬-৩৫',
    age36to45: '৩৬-৪৫',
    age46to55: '৪৬-৫৫',
    age56plus: '৫৬+',
    
    // Skills
    selectSkills: 'দক্ষতা নির্বাচন করুন',
    cleaner: 'পরিষ্কারক',
    mason: 'রাজমিস্ত্রি',
    electrician: 'ইলেকট্রিশিয়ান',
    driver: 'ড্রাইভার',
    cook: 'রান্না',
    plumber: 'প্লাম্বার',
    carpenter: 'কাঠমিস্ত্রি',
    painter: 'রঙমিস্ত্রি',
    gardener: 'মালি',
    security: 'নিরাপত্তা',
    otherSkill: 'অন্যান্য',
    enterOtherSkill: 'অন্য দক্ষতা লিখুন',
    
    // Experience
    experience: 'অভিজ্ঞতা',
    selectExperience: 'অভিজ্ঞতা নির্বাচন করুন',
    noExperience: 'কোনো অভিজ্ঞতা নেই',
    lessThan1Year: '১ বছরের কম',
    oneToThreeYears: '১-৩ বছর',
    threeYearsPlus: '৩+ বছর',
    
    // Work & Location
    workAndLocation: 'কাজ ও স্থান',
    jobType: 'কাজের ধরন',
    selectJobType: 'কাজের ধরন নির্বাচন করুন',
    fullTime: 'পূর্ণকালীন',
    partTime: 'খণ্ডকালীন',
    daily: 'দৈনিক',
    contract: 'চুক্তিভিত্তিক',
    location: 'স্থান',
    enterLocation: 'আপনার এলাকা লিখুন',
    
    // ID Upload
    idUpload: 'পরিচয়পত্র আপলোড',
    uploadNID: 'জাতীয় পরিচয়পত্র',
    uploadBirthCert: 'জন্ম সনদ',
    chooseFromGallery: 'গ্যালারি থেকে নিন',
    uploadSuccess: 'আপলোড সম্পন্ন!',
    
    // Profile
    profile: 'প্রোফাইল',
    yourProfile: 'আপনার প্রোফাইল',
    downloadProfilePDF: 'প্রোফাইল ডাউনলোড করুন (PDF)',
    profileWarning: 'ভুল তথ্য দিলে প্রোফাইল বাতিল হতে পারে',
    editProfile: 'প্রোফাইল সম্পাদনা',
    
    // Employer
    employerRegistration: 'নিয়োগকারী নিবন্ধন',
    tradeLicense: 'ট্রেড লাইসেন্স (ঐচ্ছিক)',
    
    // Package Selection
    selectPackage: 'প্যাকেজ নির্বাচন করুন',
    oneTimePost: 'একবারের পোস্ট',
    monthlySubscription: 'মাসিক সাবস্ক্রিপশন',
    emergencyPost: 'জরুরি পোস্ট',
    
    // Payment
    payment: 'পেমেন্ট',
    selectPaymentMethod: 'পেমেন্ট পদ্ধতি নির্বাচন করুন',
    bkash: 'বিকাশ',
    nagad: 'নগদ',
    mobileBalance: 'মোবাইল ব্যালেন্স',
    pay: 'পে করুন',
    
    // Post Job
    postJob: 'কাজ পোস্ট করুন',
    numberOfWorkers: 'কর্মী সংখ্যা',
    urgency: 'জরুরিতা',
    normal: 'সাধারণ',
    urgent: 'জরুরি',
    payRange: 'বেতন সীমা (ঐচ্ছিক)',
    postJobButton: 'কাজ পোস্ট করুন',
    jobPosted: 'কাজ পোস্ট হয়েছে!',
    
    // Job Matching
    nearbyWorkers: 'কাছের কর্মীরা',
    sendSMS: 'SMS পাঠান',
    smsSent: 'SMS পাঠানো হয়েছে',
    smsCredits: 'SMS ক্রেডিট',
    
    // Hiring
    hiringOptions: 'নিয়োগ পদ্ধতি',
    instantHire: 'সরাসরি নিয়োগ',
    reviewAndSelect: 'দেখে নির্বাচন',
    
    // Rating
    rateWorker: 'কর্মীকে রেটিং দিন',
    bulkRating: 'একসাথে রেটিং',
    submitRating: 'রেটিং জমা দিন',
    
    // Complaint
    complaint: 'অভিযোগ',
    fileComplaint: 'অভিযোগ করুন',
    safetyIssue: 'নিরাপত্তা সমস্যা',
    paymentIssue: 'পেমেন্ট সমস্যা',
    fakeInfo: 'ভুল তথ্য',
    submitComplaint: 'অভিযোগ জমা দিন',
    complaintSubmitted: 'অভিযোগ জমা হয়েছে',
    
    // Badges
    trusted: 'বিশ্বস্ত',
    caution: 'সতর্কতা',
    restricted: 'সীমাবদ্ধ',
    
    // Common
    next: 'পরবর্তী',
    back: 'পেছনে',
    submit: 'জমা দিন',
    cancel: 'বাতিল',
    save: 'সংরক্ষণ',
    done: 'সম্পন্ন',
    skip: 'এড়িয়ে যান',
    settings: 'সেটিংস',
    language: 'ভাষা',
    logout: 'লগআউট',
    home: 'হোম',
    jobs: 'কাজ',
    messages: 'বার্তা',
    
    // Voice Form
    voiceFormTitle: 'ভয়েস ফর্ম',
    tapToSpeak: 'কথা বলতে চাপুন',
    listening: 'শুনছি...',
    processing: 'প্রক্রিয়াকরণ হচ্ছে...',
  },
  
  en: {
    // App Name
    appName: 'Livora',
    
    // Language Selection
    selectLanguage: 'Select Language',
    bangla: 'বাংলা',
    english: 'English',
    
    // Role Selection
    whatDoYouWantToDo: 'What do you want to do?',
    lookingForWork: 'Looking for work',
    lookingToHire: 'Looking to hire',
    
    // Worker - New or Returning
    areYouNew: 'Are you new here?',
    firstTime: 'First time',
    returningUser: 'Returning user',
    
    // Login
    phoneNumber: 'Phone Number',
    enterPhoneNumber: 'Enter your phone number',
    sendOTP: 'Send OTP',
    enterOTP: 'Enter OTP',
    verify: 'Verify',
    otpSent: 'OTP has been sent',
    otpVerified: 'Verified!',
    
    // Registration Method
    chooseMethod: 'Choose how to give information',
    voiceForm: 'Voice form',
    writtenForm: 'Written form',
    
    // Face Capture
    faceCapture: 'Take Photo',
    faceCaptureInstruction: 'Look at the camera and take a photo',
    takePhoto: 'Take Photo',
    retake: 'Retake',
    usePhoto: 'Use this photo',
    
    // Basic Info
    basicInfo: 'Basic Information',
    name: 'Name',
    enterName: 'Enter your name',
    age: 'Age',
    selectAge: 'Select age range',
    gender: 'Gender (optional)',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    preferNotToSay: 'Prefer not to say',
    
    // Age ranges
    age18to25: '18-25',
    age26to35: '26-35',
    age36to45: '36-45',
    age46to55: '46-55',
    age56plus: '56+',
    
    // Skills
    selectSkills: 'Select Skills',
    cleaner: 'Cleaner',
    mason: 'Mason',
    electrician: 'Electrician',
    driver: 'Driver',
    cook: 'Cook',
    plumber: 'Plumber',
    carpenter: 'Carpenter',
    painter: 'Painter',
    gardener: 'Gardener',
    security: 'Security',
    otherSkill: 'Other',
    enterOtherSkill: 'Enter other skill',
    
    // Experience
    experience: 'Experience',
    selectExperience: 'Select experience level',
    noExperience: 'No experience',
    lessThan1Year: 'Less than 1 year',
    oneToThreeYears: '1-3 years',
    threeYearsPlus: '3+ years',
    
    // Work & Location
    workAndLocation: 'Work & Location',
    jobType: 'Job Type',
    selectJobType: 'Select job type',
    fullTime: 'Full-time',
    partTime: 'Part-time',
    daily: 'Daily',
    contract: 'Contract',
    location: 'Location',
    enterLocation: 'Enter your area',
    
    // ID Upload
    idUpload: 'ID Upload',
    uploadNID: 'National ID Card',
    uploadBirthCert: 'Birth Certificate',
    chooseFromGallery: 'Choose from gallery',
    uploadSuccess: 'Upload successful!',
    
    // Profile
    profile: 'Profile',
    yourProfile: 'Your Profile',
    downloadProfilePDF: 'Download Profile (PDF)',
    profileWarning: 'Providing false information may restrict your profile',
    editProfile: 'Edit Profile',
    
    // Employer
    employerRegistration: 'Employer Registration',
    tradeLicense: 'Trade License (optional)',
    
    // Package Selection
    selectPackage: 'Select Package',
    oneTimePost: 'One-time Post',
    monthlySubscription: 'Monthly Subscription',
    emergencyPost: 'Emergency Post',
    
    // Payment
    payment: 'Payment',
    selectPaymentMethod: 'Select payment method',
    bkash: 'bKash',
    nagad: 'Nagad',
    mobileBalance: 'Mobile Balance',
    pay: 'Pay',
    
    // Post Job
    postJob: 'Post a Job',
    numberOfWorkers: 'Number of Workers',
    urgency: 'Urgency',
    normal: 'Normal',
    urgent: 'Urgent',
    payRange: 'Pay Range (optional)',
    postJobButton: 'Post Job',
    jobPosted: 'Job Posted!',
    
    // Job Matching
    nearbyWorkers: 'Nearby Workers',
    sendSMS: 'Send SMS',
    smsSent: 'SMS Sent',
    smsCredits: 'SMS Credits',
    
    // Hiring
    hiringOptions: 'Hiring Options',
    instantHire: 'Instant Hire',
    reviewAndSelect: 'Review & Select',
    
    // Rating
    rateWorker: 'Rate Worker',
    bulkRating: 'Bulk Rating',
    submitRating: 'Submit Rating',
    
    // Complaint
    complaint: 'Complaint',
    fileComplaint: 'File Complaint',
    safetyIssue: 'Safety Issue',
    paymentIssue: 'Payment Issue',
    fakeInfo: 'Fake Information',
    submitComplaint: 'Submit Complaint',
    complaintSubmitted: 'Complaint Submitted',
    
    // Badges
    trusted: 'Trusted',
    caution: 'Caution',
    restricted: 'Restricted',
    
    // Common
    next: 'Next',
    back: 'Back',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    done: 'Done',
    skip: 'Skip',
    settings: 'Settings',
    language: 'Language',
    logout: 'Logout',
    home: 'Home',
    jobs: 'Jobs',
    messages: 'Messages',
    
    // Voice Form
    voiceFormTitle: 'Voice Form',
    tapToSpeak: 'Tap to speak',
    listening: 'Listening...',
    processing: 'Processing...',
  },
};

export type TranslationKey = keyof typeof translations.en;
