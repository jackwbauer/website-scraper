const rp = require('request-promise');
const $ = require('cheerio');
const {split, Syntax} = require('sentence-splitter');
const url = 'https://www.mynslc.com/en/CannabisInfo/Cannabis-Info';

const info = []; // result of data scrape

rp(url)
    .then((html) => {
        $('div[class=Layout-main] > div > p', html).each((i, pTag) => {
            if(i == 7) {// this is the paragrah of text that contains where recreational cannabis can be purchased
                const text = pTag.children[0].data;
                let sentence = split(text)[2].raw.split(', '); // raw text of sentence containing locations
                for(let i = 0; i < sentence.length; i++) { // skipped first word because I'm looking for capital letters to identify location names
                if(sentence[i].charAt(0) == sentence[i].charAt(0).toUpperCase()) { // Checking for first letter capitalized
                        if(i == 0) {
                            const leadingStr = sentence[0];
                            const splitLeadingStr = leadingStr.split('');
                            for(let j = 1; j < splitLeadingStr.length; j++) { // looking for capital letter to remove the leading text; skipped first letter because it's capitalized
                                if(splitLeadingStr[j].match(/[A-Z]/) != null) {
                                    let subStr = leadingStr.slice(j);
                                    info.push(subStr);
                                    j = splitLeadingStr.length; // only the first capital letter is necessary since the following ones will be the same location
                                }
                            }
                        } else {
                            info.push(sentence[i]);
                        }
                }
                }
            }
        })
        
        console.log(info);
    })
    .catch((err) => {
        //handle error
        console.log(err);
    })