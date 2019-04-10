const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.mynslc.com/en/CannabisInfo/Cannabis-Info';

const info = []; // result of data scrape

rp(url)
    .then((html) => {
        $('div[class=Layout-main] > div > p', html).each((i, pTag) => {
            // const tableData = tRow.children;
            const data = {
                area: '',
                city: ''
            };

            if(i == 7) {// this is the paragrah of text that contains where recreational cannabis can be purchased
                console.log(pTag.children[0].data);
            }
            // tableData.forEach((elem, index) => {
            //     if(elem.name === 'td') {
            //         cellData = elem.children[0].data;
            //         switch(index) {
            //             case 1:
            //                 data.city = cellData;
            //                 break;
            //             case 3:
            //                 data.licenseeName = cellData;
            //                 break;
            //             case 5:
            //                 data.address = cellData;
            //                 break;
            //             case 7:
            //                 data.postalCode = cellData;
            //                 break;
            //             case 9:
            //                 data.phoneNumber = cellData;
            //                 info.push(data); // phone number is the last piece of info for the licensee
            //                 break;
            //             default:
            //                 break;
            //         }
            //     }
            // })
        })
        
        // console.log(info);
    })
    .catch((err) => {
        //handle error
        console.log(err);
    })
