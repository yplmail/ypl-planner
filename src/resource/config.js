
let environment = 'pre';

if(process.env.NODE_ENV === 'production'){
	environment = 'produce';
}

const serverHost  = {
    dev  : 'premarket.toobei.com',
    pre  : 'premarket.toobei.com',
    produce : 'market.toobei.com'
};

const imgHost     =  {
	dev     : 'preimage.toobei.com',
	pre     : 'preimage.toobei.com',
	produce : 'image.toobei.com'      
};

const evnHost = {
	dev     : 'https://prenliecai.toobei.com/',
	pre     : 'https://prenliecai.toobei.com/',
	produce : 'https://nliecai.toobei.com/'
} 

export {environment,serverHost,imgHost,evnHost};	



