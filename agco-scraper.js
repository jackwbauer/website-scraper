const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.agco.ca/status-current-cannabis-retail-store-applications';

const info = []; // result of data scrape

rp(url)
    .then((html) => {
        $('tbody > tr', html).each((i, tRow) => {
            const tableData = tRow.children;
            const data = {
                storeName: '',
                operatorName: '',
                municipality: '',
                storeAddress: '',
                licenseStatus: '',
                authorizationStatus: ''
            };

            tableData.forEach((elem, index) => {
                if(elem.name === 'td') {
                    cellData = elem.children[0].data;
                    switch(index) {
                        case 0: // store name
                            if(cellData === '\n') { // a few of the store names are in p tags within the tr
                                data.storeName = elem.children[1].children[0].data;
                            } else {
                                data.storeName = cellData;
                            }
                            break;
                        case 2: // operator name
                            data.operatorName = cellData;
                            break;
                        case 4: //municipality
                            data.municipality = cellData;
                            break;
                        case 6: // store address
                        if(cellData === '\n') { // a few of the store addresses are in p tags within the tr
                            data.storeAddress = elem.children[1].children[0].data;
                        } else {
                            data.storeAddress = cellData;
                        }
                            break;
                        case 8: // license status
                            if(cellData === '\n') {
                                if(elem.children[1].children[0].children) {
                                    data.licenseStatus = elem.children[1].children[0].children[0].data; // text inside strong inside of p inside of td
                                }
                                else {
                                    data.licenseStatus = elem.children[1].children[0].data; // text inside p inside td
                                }
                            } else if(!cellData){
                                if(elem.children[0].children) {
                                    data.licenseStatus = elem.children[0].children[0].data; // text inside of strong inside of td
                                }                                
                            } else {
                                data.licenseStatus = cellData; // text inside of td
                            }
                            break;
                        case 10: // authorization status
                            if(cellData === '\n') { // a few of the store names are in p tags within the tr
                                if(elem.children[3]) {
                                    data.authorizationStatus = elem.children[1].children[0].data + ' ' + elem.children[3].children[0].data;
                                } else {
                                    data.authorizationStatus = elem.children[1].children[0].data
                                }
                            } else {
                                if(elem.children[0].children) {
                                    data.authorizationStatus = elem.children[0].children[0].data; // text inside of strong inside of td
                                } else {
                                    data.authorizationStatus = cellData;
                                }
                            }
                            info.push(data); // authorization status is the last piece of info for the licensee
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
