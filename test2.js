import express from 'express';
const app = express()

app.get('/:browser', (req, res) => {
    const browser = req.params.browser;

    console.log(`begin ${browser}`);
    for (let i = 0; i < 99999999; i++) {
        const x = i * 654 * Math.random();
    }
    console.log(`end ${browser}`);
    res.end(`end ${browser}`)
})

app.listen(3000)