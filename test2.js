import express from 'express';
const app = express();


const myPromise = (browser) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`start ${browser}`);
            for (let i = 0; i < 199999999; i++) {
                const x = i * 654 * Math.random();
            }
            console.log(`end ${browser}`);
            resolve(browser);
        }, 0);
    });
}


app.get('/:browser',  (req, res) => {
    const browser = req.params.browser;
    setTimeout(() => {
        console.log(`start ${browser}`);
        for (let i = 0; i < 299999999; i++) {
            const x = i * 654 * Math.random();
        }
        console.log(`end ${browser}`);
    }, 0);
    res.send(`end ${browser}`)
});



app.listen(4000);