const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://aglc.ca/cannabis/retail-cannabis/cannabis-licensee-search';

const info = []; // result of data scrape

exports.scrape = function() {
    rp(url)
        .then((html) => {
            $('tbody > tr', html).each((i, tRow) => {
                const tableData = tRow.children;
                const data = {
                    city: '',
                    licenseeName: '',
                    address: '',
                    postalCode: '',
                    phoneNumber: ''
                };

                tableData.forEach((elem, index) => {
                    if(elem.name === 'td') {
                        cellData = elem.children[0].data;
                        switch(index) {
                            case 1:
                                data.city = cellData;
                                break;
                            case 3:
                                data.licenseeName = cellData;
                                break;
                            case 5:
                                data.address = cellData;
                                break;
                            case 7:
                                data.postalCode = cellData;
                                break;
                            case 9:
                                data.phoneNumber = cellData;
                                info.push(data); // phone number is the last piece of info for the licensee
                                break;
                            default:
                                break;
                        }
                    }
                })
            })
            
            console.log(info);
        })
        .catch((err) => {
            //handle error
            console.log(err);
        })
}