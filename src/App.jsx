import './App.css'
import Question from './Otazka.jsx'
import {useState} from "react";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

const questions = [
    {
        t: "Jak můžeš být prospěšnej pro team?", sq: [
            "Myslím, že dokážu rychle rozpoznat a využít výhody nových možností",
            "Dokáži dobře spolupracovat s různými lidmi",
            "Jsem nápaditý",
            "Umím povzbudit ostatní, kdykoli si všimnu, že mohou nabídnout něco\n" +
            "cenné",
            "Mám schopnost dotahovat věci do konce",
            "Jsem připraven postavit se dočasné nepopulárnosti, pokud budu mít\n" +
            "chtěné výsledky",
            "Rychle vycítím, co bude fungovat v situacích, které dobře znám (při hře)",
            "Umím nabídnout rozumné alternativní možnosti jednání"
        ]
    },
    {
        t: "Tvoje nedostatky v teamové práci můžou být způsobeny", sq: [
            "Necítím se dobře, pokud porady nejsou dobře vedené (zorganizované)",
            "Mám sklon respektovat ty, jejichž názor nebyl prosazovány, i když byl\n" +
            "cenný",
            "Mám sklon k mnohomluvnosti, jakmile se v týmu začne mluvit o nových\n" +
            "nápadech",
            "Můj rozum mi říká „Ne!“, když chci do věci okamžitě a s nadšením\n" +
            "s kolegy jít",
            "Někdy jsem přísný, když je třeba rychle něco dodělat",
            "Dělá mi potíže vést druhé, což je způsobeno tím, že jsem příliš citlivý na\n" +
            "to jaká je v týmu atmosféra",
            "Nechávám se unést vlastními myšlenkami a ztrácím kontakt s tím co se\n" +
            "v týmu děje",
            "Mí spoluhráči si myslí, že jsem úzkostlivý na detaily, a že mám strach, že\n" +
            "se věci nebudou dařit"
        ]
    },
    {
        t: "Když spolupracuješ společně s druhými", sq: [
            "Mám schopnost na ostatní působit bez toho, že bych na ně vyvíjel nátlak",
            "Jsem soustředěný a nedělám chyby z nepozornosti (nejsem roztržitý)",
            "Jsem připraven naléhat na to, abych měl jistotu, že porada (v kabině)\n" +
            "nebude ztrátou času nebo že ztratíme ze zřetele hlavní cíl (výhra, atd.)",
            "Mohou se na mě spolehnout, že přijdu s originálním řešením, návrhem",
            "Jsem vždy připraven bránit dobrý návrh",
            "Velice rád hledám nové informace a myšlenky",
            "Druzí si cení mé schopnosti posuzovat věci s chladnou hlavou",
            "Je na mě spolehnutí, že dohlédnu na to, aby se nejdůležitější úkoly\n" +
            "provedli"
        ]
    },
    {
        t: "Tvůj přístup k teamové spolupráci spočívá v tom, že", sq: [
            "Mám zájem poznat své spoluhráče",
            "Nestydím se mít námitky vůči názorům druhých nebo sám souhlasit\n" +
            "s názorem menšiny (malá skupina)",
            "Dokáži nalézt důvod k odmítnutí nezdravých, škodlivých návrhů\n" +
            "(nápadů)",
            "Mám talent na to zabezpečit fungování věci jakmile začne být plán\n" +
            "realizován",
            "Mám sklon přicházet s neobvyklým a vyhýbat se běžnému",
            "Při jakékoliv provádění cvičení mám sklon k perfekcionismu",
            "Jsem ochoten využít kontakty mimo náš tým",
            "Zajímají mne všechny názory, ale ve správné chvíli neváhám udělat\n" +
            "rozhodnutí (jsem rozhodný)"
        ]
    },
    {
        t: "Co tě uspokojuje při provádění úkonů?", sq: [
            "Rád přemýšlím a rozebírám situaci a zvažuji všechny možnosti",
            "Zajímám se o nalezení praktických řešení situací vzniklých v průběhu\n" +
            "cvičení",
            "Jsem rád, když cítím, že podporuji dobré vztahy mezi spoluhráči",
            "Mám velký vliv na rozhodování",
            "Setkávám se spoluhráči, kteří mají co nabídnout",
            "Dokážu ostatní přimět, aby souhlasili s nezbytnými postupy",
            "Mám pocit, že dokáži věnovat všechnu svou pozornost úkolu",
            "S radostí nalézám situace, které rozšiřují mou představivost"
        ]
    },
    {
        t: "Když máš provést úkol s neznámými kolegy, co uděláš?", sq: [
            "Uchýlím se do ústraní, abych našel řešení situace",
            "Byl bych připraven pracovat s člověkem, který dokáže řešit, i obtížný\n" +
            "úkol",
            "Rozdělil bych úkoly mezi členy týmu podle jejich možností a schopností",
            "Stihl bych termín",
            "Zachoval bych si chladnou hlavu a udržel schopnost uvažovat rozumně",
            "Tlak z okolí bych nevnímal, soustředil bych se na účel",
            "Pokud by skupina nedělala pokrok, přezval bych vedení",
            "Otevřel bych diskusi ke stimulaci vzniku a pohybu nových myšlenek\n" +
            "(Měl bych zájem o diskusi)"
        ]
    },
    {
        t: "Co je tvým problémem?", sq: [
            "Jsem netrpělivý, když někdo proces brzdí a zdržuje",
            "Mohu být kritizován, protože nedokáži správně situaci vyhodnotit",
            "Moje snaha o náležité dokončení práce může zabrzdit další věci",
            "Brzy se začnu nudit a spoléhám, že jiní ve mně zažehnou jiskru",
            "Těžko dokáži začít něco dělat při nejasných cílech",
            "Objasnění složitých problémů mi někdy dělá potíže",
            "Snažím se potlačit názory ostatních, protože svůj považuji za lepší",
            "Nerad se pouštím do diskusí, když mám proti sobě silnou protistranu"
        ]
    }
];

const results = [
    {name: "Vykonavatel", val: 0},
    {name: "Vůdce", val: 0},
    {name: "Usměrňovač", val: 0},
    {name: "Inovátor", val: 0},
    {name: "Vyhledavač zdrojů", val: 0},
    {name: "Hodnotitel", val: 0},
    {name: "Týmový hráč", val: 0},
    {name: "Dokončovatel", val: 0}
];

const combTable = [
    [6, 3, 5, 2, 0, 7, 1, 4],
    [0, 1, 4, 6, 2, 3, 5, 7],
    [7, 0, 2, 3, 5, 6, 4, 1],
    [3, 7, 1, 4, 6, 2, 0, 5],
    [1, 5, 3, 7, 4, 0, 2, 6],
    [5, 2, 6, 0, 7, 4, 1, 3],
    [4, 6, 0, 5, 3, 1, 7, 2]
];

function App() {

    const [res, setRes] = useState([]);

    function evaluate() {
        let responses = []

        for (let i = 0; i < 7; i++) {
            responses[i] = [];

            let s = 0;
            for (let j = 0; j < 8; j++) {
                let v = parseFloat(document.getElementById(letters[combTable[i][j]] + i).value);
                s += v;
                responses[i][j] = v;
            }

            for (let j = 0; j < 8; j++) {
                responses[i][j] *= 100 / (s * 7);
            }
        }

        for (let i = 0; i < 8; i++) {
            let s = 0;

            for (let j = 0; j < 7; j++) {
                s += responses[j][i];
            }

            results[i].val = s;
        }
        console.log(results);

        let ret = [...results]
        setRes(ret);
    }

    return (
        <>
            <h1>Lukavcův testíček 👍 (založeno na Belbínově testu)</h1>

            <h2>Instrukce</h2>
            <p>Dej do následující tabulky body, aby v každý kategorii zhruba reprezentovali poměr tvejch schopností,
                kašli na součet 10, samo se to normalizuje</p>

            <table style={{borderSpacing: "10px", textAlign: "left", width: "-webkit-fill-available"}}>
                <tbody>
                {questions.map((question, index) => (
                    <Question key={index} id={index} questionText={question.t} subQuestions={question.sq}/>
                ))}
                </tbody>
            </table>
            <button onClick={evaluate}>Spočítej výsledky</button>
            {
                (res.length > 1) ? (
                    <>
                        <hr/>
                        <h2>Výsledky</h2>
                    </>
                ) : ""
            }
            {res.sort((a, b) => b.val - a.val)
                .map(result => (
                    <>{result.name} - {result.val.toFixed(2)}% <br/></>
                ))}
        </>
    )
}

export default App
