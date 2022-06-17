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

const host = `http://localhost:${PORT}`

app.get('/font' , (req , res) => {
    
    const families = Array.isArray(req.query.family) ? req.query.family : [req.query.family];

    let css = '';
    const display = req.query.display ? `font-display: ${req.query.display}` : '';

    for(const family of families) {

        const sections = family.split(';');
        const familyName = sections[0]; // get the family name
        const styles = sections.slice(1);  // get the styles

        for(const style of styles) {

            const styleSections = style.split(',');
            const styleName = styleSections[0];
            const weights = styleSections.slice(1).map(weight => parseInt(weight));

            for(const weight of weights) {
                css += `@font-face {` +
                    `font-family: '${familyName}';` +
                    `font-style: ${styleName};` +
                    `font-weight: ${weight};` +
                    `${display};` +
                    `src: url(${host}/${familyName}-${styleName}-${weight}.ttf) format('truetype');\n` +
                    '}';
            };
        };
    };

    res.setHeader('Content-Type' , 'text/css; charset=utf-8');
    res.send(beautify(css , {format:'css'}));

});

app.listen(PORT , () => {
    console.log(`server is listening on http://localhost:${PORT}`);
});

// http://localhost:5100/font?
// family=Vazir;italic,100,200;normal,100,200&family=Roborto;norm,w-100,w-400,w-800&display=swap
