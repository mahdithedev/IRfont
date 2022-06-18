require('dotenv');
const express = require('express');
const bodyParser = require('body-parser')
// const { Pool } = require('pg');
const cors = require('cors');
const beautify = require('beautify');

const app = express();
const PORT = process.env.PORT || 5100;

app.use(cors());
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: 5432,
// });

const host = `http://localhost:${PORT}`;

const constructCss = (familyName , styleName , weight , display) => {

    return [
        `@font-face {`,
        `   font-family: '${familyName}';`,
        `   font-style: ${styleName};`,
        `   font-weight: ${weight};`,
        `   ${display};`,
        `   src: url(${host}/${familyName}-${styleName}-${weight}.ttf) format('truetype');`,
        `}\n\n`
    ].join('\n');

};

app.get('/font' , (req , res) => {

    const families = Array.isArray(req.query.f) ? req.query.f : [req.query.f];

    let css = '';
    const display = req.query.display ? `font-display: ${req.query.display}` : '';

    for(const family of families) {

        // http://localhost:5100/font?f=Vazir:normal@100,200,300;italic@400,500,600&f=Roboto
        const sliceIndex = family.indexOf(":");
        
        if(sliceIndex == -1) {
            return res.send('');
        };

        const familyName = family.slice(0 , sliceIndex);
        const styles = family.slice(sliceIndex + 1).split(';');

        for(const style of styles) {

            const sliceIndex = family.indexOf('@');

            if(sliceIndex == -1) {
                return res.send('');
            };

            const styleName = style.slice(0 , sliceIndex)
            const weights = style.slice(sliceIndex + 1).split(',');

            if(weights.length == 0) {
                return res.send('');
            }

            for(const weight of weights) {
                css += constructCss(familyName , styleName , weight , display); 
            };
        };
    };

    res.setHeader('Content-Type' , 'text/css; charset=utf-8');
    res.send(css);

});

app.listen(PORT , () => {
    console.log(`server is listening on http://localhost:${PORT}`);
});