
import {environment,serverHost,imgHost} from './config';

export default {

    serverUrl :  'https://'+ serverHost[environment]+'/rest/api/',

    vcodeUrl  :  'https://'+ serverHost[environment]+'/rest/api/',

    imgUrl    :  'https://'+imgHost[environment]
}

