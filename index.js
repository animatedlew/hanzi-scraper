const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const links = require('./links.json');

const contentDir = './out';

const getHanzi = async () => {
    try {
        let hanzi = [];

        for (let link of links) {

            const chunk = [];
            const { data } = await axios.get(link);
            const $ = cheerio.load(data);

            $('tbody > tr').each((index, el) => {
                const entry = $('span.Hans > a', el).text();
                if (entry)
                    chunk.push({
                        hanzi: entry,
                        pinyin: $('span.Latn > a', el).text(),
                        definition: $(el).children().last().text().replace(/(\r\n|\n|\r)|(\[aspect\])|(\(file\))/gm, "").trim()
                    });
            });

            hanzi.push(chunk);
            process.stdout.write('.');
        };

        console.log();
        return hanzi;
    } catch (error) { throw error; }
};

getHanzi().then(hanzi => {

    if (fs.existsSync(contentDir))
        fs.rmSync(contentDir, { recursive: true, force: true });

    fs.mkdirSync(contentDir);

    hanzi.forEach((chunk, index) => {
        const data = JSON.stringify(chunk, null, 2);
        const segment = `${index * 1000 + 1}-${(index + 1) * 1000}`;
        fs.writeFileSync(`out/hanzi.${segment}.json`, data, err => console.log(err));
    });
});
