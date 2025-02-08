import './App.css'
import Question from './Otazka.jsx'
import {useState} from "react";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

const questions = [
    {
        t: "Jak můžeš být přínosem pro tým?", sq: [
            "Rychle rozpoznávám a využívám nové příležitosti.",
            "Dokážu efektivně spolupracovat s různými lidmi.",
            "Jsem kreativní a přicházím s novými nápady.",
            "Umím povzbudit ostatní, když vidím, že mohou přispět něčím cenným.",
            "Mám schopnost dotahovat věci do konce.",
            "Nebojím se dočasné nepopularity, pokud vede k dosažení dobrých výsledků.",
            "Dokážu rychle vycítit, co bude fungovat v situacích, které dobře znám.",
            "Umím nabídnout rozumné alternativy při rozhodování."
        ]
    },
    {
        t: "Co ti může komplikovat týmovou spolupráci?", sq: [
            "Necítím se dobře, když porady nejsou dobře organizované.",
            "Mám sklon podporovat i názory, které nebyly prosazeny, i když jsou cenné.",
            "Někdy příliš mluvím, když se v týmu diskutuje o nových nápadech.",
            "Můj rozum mě někdy brzdí, i když bych chtěl s nadšením jít do akce.",
            "Občas jsem příliš přísný, když je potřeba něco rychle dokončit.",
            "Mám problém vést ostatní, protože jsem citlivý na atmosféru v týmu.",
            "Občas se nechám unést vlastními myšlenkami a ztrácím přehled o dění v týmu.",
            "Spoluhráči mě někdy vnímají jako příliš úzkostlivého, když jde o detaily."
        ]
    },
    {
        t: "Jak se chováš při spolupráci s ostatními?", sq: [
            "Umím na ostatní působit pozitivně, aniž bych na ně vyvíjel nátlak.",
            "Jsem soustředěný a vyhýbám se chybám z nepozornosti.",
            "Dbám na to, aby porady nebyly ztrátou času a tým se držel hlavního cíle.",
            "Lidé se na mě mohou spolehnout, že přinesu originální řešení.",
            "Neváhám se postavit za dobrý návrh.",
            "Rád hledám nové informace a přístupy.",
            "Ostatní si cení mé schopnosti zachovat chladnou hlavu při rozhodování.",
            "Pečlivě dohlížím na to, aby se klíčové úkoly dokončily."
        ]
    },
    {
        t: "Jaký je tvůj přístup k týmové spolupráci?", sq: [
            "Zajímám se o své spoluhráče a chci je lépe poznat.",
            "Nebojím se zpochybnit názory druhých nebo podpořit menšinový názor.",
            "Dokážu rozpoznat a odmítnout nezdravé či škodlivé návrhy.",
            "Jsem schopný zajistit hladký průběh realizace plánu.",
            "Mám sklon přicházet s neobvyklými řešeními a vyhýbat se stereotypům.",
            "Mám sklony k perfekcionismu při plnění úkolů.",
            "Využívám své kontakty mimo tým, pokud to může pomoci.",
            "Zajímám se o různé názory, ale ve správnou chvíli umím rozhodnout."
        ]
    },
    {
        t: "Co tě nejvíce motivuje při plnění úkolů?", sq: [
            "Rád přemýšlím nad situací a zvažuji všechny možnosti.",
            "Baví mě hledat praktická řešení vzniklých problémů.",
            "Těší mě, když podporuji dobré vztahy v týmu.",
            "Mám vliv na rozhodování.",
            "Rád spolupracuji s lidmi, kteří mohou týmu něco nabídnout.",
            "Umím ostatní přesvědčit o nutných krocích.",
            "Dovedu se naplno soustředit na úkol.",
            "Rád hledám nové podněty, které rozvíjejí mou představivost."
        ]
    },
    {
        t: "Jak se zachováš, když máš pracovat s neznámými lidmi?", sq: [
            "Nejprve se stáhnu do ústraní a promyslím si řešení.",
            "Budu se snažit spolupracovat s lidmi, kteří zvládnou i náročné úkoly.",
            "Rozdělím práci podle schopností členů týmu.",
            "Dodržím stanovený termín.",
            "Zachovám klid a budu uvažovat racionálně.",
            "Nenechám se rozptýlit tlakem okolí a soustředím se na cíl.",
            "Pokud se tým neposouvá, převezmu vedení.",
            "Podpořím diskuzi, aby vznikaly nové nápady a pohledy."
        ]
    },
    {
        t: "S čím míváš v týmu problémy?", sq: [
            "Jsem netrpělivý, když někdo zbytečně zpomaluje proces.",
            "Mohu být kritizován za špatné vyhodnocení situace.",
            "Můj důraz na dokonalé dokončení práce může brzdit další kroky.",
            "Rychle se začnu nudit a čekám, že mě někdo motivuje.",
            "Mám problém začít, když nejsou jasně stanovené cíle.",
            "Občas se mi nedaří srozumitelně vysvětlit složité problémy.",
            "Někdy se snažím potlačit názory ostatních, protože věřím, že ten můj je lepší.",
            "Vyhýbám se diskuzím, když mám proti sobě silného oponenta."
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
