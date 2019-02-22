// ===========================================================
//  Using small examples to learn how to use cheerio
// ===========================================================
const axios = require('axios');
const cheerio = require('cheerio');


const textCleanUp = (text) => {
    let newText = text.substring(2);
    newText = newText.trim();
    return newText;
}

// axios.get('https://www.kijiji.ca/b-barrie/acoustic-guitar/k0l1700006?dc=true')
//     .then(response => {
//         let listAds = [];
//         let $ = cheerio.load(response.data);
//         $('.regular-ad').each(function (index, element) {
//             let saleItem = {};
//             saleItem.price = textCleanUp($(this).find('.price').text());
//             saleItem.title = textCleanUp($(this).find('a').text());
//             saleItem.link = $(this).find('.title enable-search-navigation-flag').attr('href');
//             saleItem.description = 
//             listAds.push(saleItem);

//         });
//         console.log(listAds);
//     })
//     .catch(err => console.log(error))


let testHTML = `<div class="parentDiv"> <h1>Header </h1><h1>Header second one </h1> <div>aksncajsc</div> </div>`
let $ = cheerio.load(testHTML);
console.log($('.parentDiv').find('h1').first().text())
// let $ = cheerio.load(someHtml);
// // $('.firstDiv').each(function (index, element) {
// //     listLi.push($(this).text());
// // });
// let moreText = [];
// $('.firstDiv').find('.thirdDiv').children().each(function (index, element) {
//     moreText.push($(this).text())
// });

// console.log(moreText);


