const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require("fs");

const url = "https://texturelabs.org/";
const cat = ["?ct=19", "?ct=20", "?ct=21", "?ct=22", "?ct=23", "?ct=29", "?ct=24", "?ct=25", "?ct=26", "?ct=27", "?ct=28", "?ct=30", "?ct=31", "?ct=32", "?ct=33", "?ct=364", "?ct=34", "?ct=35", "?ct=167", "?ct=257", "?ct=260", "?ct=255", "?ct=258", "?ct=259", "?ct=405"];

async function scrapedata() {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const listcat = $(".cat-single");
    listcat.each((idx, el) => {
        console.log($(el).children("a").attr("href"));
    })
}
async function getpageLinks(urls) {
    const links = []
    const { data } = await axios.get(urls);
    const $ = cheerio.load(data);
    const page = $(".pagination");
    const pages = $(page[0]).children("a");

    pages.each((i, e) => {
        links.push($(e).attr("href"))
    })
    return links;
}


(async()=>{
    let alllink = [];
    for (const c of cat) {
        let link = [url + c];
        alllink.push(link);
        await getpageLinks(link[0]).then((result) => {
            for (const l of result) {
                alllink.push(l);
            }
            
        })
        
    }
    console.log(JSON.stringify(alllink))
   

})();
