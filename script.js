// Publications data
let publications = [];

// Sample projects data - replace with your actual projects
const projects = [
    {
        title: "Project Name",
        description: "Brief description of the project and its significance.",
        technologies: ["Technology1", "Technology2", "Technology3"],
        link: "https://github.com/PichaiRaman/project"
    },
    // Add more projects as needed
];

// Publications handling
let currentSort = 'year-desc';
let currentPage = 1;
const itemsPerPage = 10;

async function loadPublications() {
    try {
        // Try different possible paths for the JSON file
        let response = await fetch('./publications.json');
        if (!response.ok) {
            response = await fetch('publications.json');
        }
        if (!response.ok) {
            response = await fetch('/publications.json');
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        publications = data.publications;
        console.log('Loaded publications from JSON:', publications.length);
        updatePublicationSummary();
        renderPublicationsTable();
        updatePaginationControls();
    } catch (error) {
        console.error('Error loading publications from JSON:', error);
        console.log('Falling back to embedded data');
        // Fallback to embedded data if JSON fails
        publications = [
            {"authors": "Nabbi A, Beck P, Delaidelli A, Oldridge DA, Sudhaman S, Zhu K, Yang SYC, Mulder DT, Bruce JP,Paulson JN, Raman P, Zhu Y, Resnick AC, Sorensen PH, Sill M, Brabetz S, Lambo S, Malkin D, Johann PD, Kool M, Jones DTW, Pfister SM, Jäger N, Pugh TJ", "doi": "10.1186/s13073-023-01219-x", "journal": "Genome Medicine, 15(1)", "pmid": "37679810", "title": "Transcriptional immunogenomic analysis reveals distinct immunological clusters in paediatric nervous system tumours", "year": "2023"},
            {"authors": "Shapiro JA, Gaonkar KS, Spielman SJ, Savonen CL, Bethell CJ, Jin R, Rathi KS, Zhu Y, Egolf LE, Farrow BK, Miller DP, Yang Y, Koganti T, Noureen N, Koptyra MP, Duong N, Santi M, Kim J, Robins S, Storm PB, Mack SC, Lilly JV, Xie HM, Jain P, Raman P, Rood BR, Lulla RR, Nazarian J, Kraya AA, VaksmanZ, Heath AP, Kline C, Scolaro L, Viaene AN, Huang X, Way GP, Foltz SM, Zhang B, Poetsch AR,Mueller S, Ennis BM, Prados M, Diskin SJ, Zheng S, Guo Y, Kannan S, Waanders AJ, Margol AS, KimMC, Hanson D, Van Kuren N, Wong J, Kaufman RS, Coleman N, Blackden C, Cole KA, Mason JL,Madsen PJ, Koschmann CJ, Stewart DR, Wafula E, Brown MA, Resnick AC, Greene CS, Rokita JL,Taroni JN; Children's Brain Tumor Network; Pacific Pediatric Neuro-Oncology Consortium", "doi": "10.1016/j.xgen.2023.100340", "journal": "Cell Genomics, 3(7):100340", "pmid": "37492101", "title": "OpenPBTA:The Open Pediatric Brain Tumor Atlas", "year": "2023"},
            {"authors": "Dang MT, Gonzalez MV, Gaonkar KS, Rathi KS, Young P, Arif S, Zhai L, Alam Z, Devalaraja S, To TKJ,Folkert IW, Raman P, Rokita JL, Martinez D, Taroni JN, Shapiro JA, Greene CS, Savonen C, Mafra F,Hakonarson H, Curran T, Haldar M", "doi": "10.1016/j.celrep.2023.112600", "journal": "Cell Reports, 42(6):112600", "pmid": "37235472", "title": "Macrophages in SHH subgroup medulloblastoma display dynamicheterogeneity that varies with treatment modality", "year": "2023"},
            {"authors": "Maddipati R, Norgard RJ, Baslan T, Rathi KS, Zhang A, Saeid A, Higashihara T, Wu F, Kumar A,Annamalai V, Bhattacharya S, Raman P, Adkisson CA, Pitarresi JR, Wengyn MD, Yamazoe T, Li J, BalliD, LaRiviere MJ, Ngo TC, Folkert IW, Millstein ID, Bermeo, J, Carpenter EL, McAuliffe JC, Oktay MH,Brekken RA, Lowe SW, Iacobuzio-Donahue CA, Notta F, Stanger BZ", "doi": "10.1158/2159-8290.CD-20-1826", "journal": "Cancer Discovery, 12(2):542-561", "pmid": "34551968", "title": "MYC Levels Regulate MetastaticHeterogeneity in Pancreatic Adenocarcinoma", "year": "2021"},
            {"authors": "Tong CCL, Koptyra M, Raman P, Rathi KS, Choudhari N, Lin X, Seckar T, Wei Z, Kohanski MA,O'Malley BW, Cohen NA, Kennedy DW, Adappa ND, Robertson ES, Baranov E, Kuan EC,Papagiannopoulos P, Jalaly JB, Feldman MD, Storm PB, Resnick AC, Palmer JN", "doi": "10.1002/alr.22882", "journal": "Int Forum Allergy Rhinol, 12(2),200-209", "pmid": "34510780", "title": "Targeted geneexpression profiling of inverted papilloma and squamous cell carcinoma", "year": "2021"},
            {"authors": "Dang MT, Gonzalez MV, Gaonkar KS, Rathi KS, Young P, Arif S, Zhai L, Alam Z, Devalaraja S, To TKJ,Folkert IW, Raman P, Rokita JL, Martinez D, Taroni JN, Shapiro JA, Greene CS, Savonen C, Mafra F,Hakonarson H, Curran T, Haldar M", "doi": "10.1016/j.celrep", "journal": "Cell Rep, 34(13), 108917", "pmid": "33789113", "title": "Macrophages in SHH subgroup medulloblastoma display dynamicheterogeneity that varies with treatment modality", "year": "2021"},
            {"authors": "Kundra R, Zhang H, Sheridan R, Sirintrapun S, Wang A, Ochoa A, Wilson M, Gross B, Sun Y, MadupuriR, Satravada B, Reales D, Vakiani E, Al-Ahmadie H, Dogan A, Arcila M, Zehir A, Maron S, Berger M,Viaplana C, Janeway K, Ducar M, Sholl L, Dogan S, Bedard P, Surrey L, Sanchez I, Syed A, Rema A,Chakravarty D, Suehnholz S, Nissan M, Iyer G, Murali R, Bouvier N, Soslow R, Hyman D, Younes A,Intlekofer A, Harding J, Carvajal R, Sabbatini P, Abou-Alfa G, Morris L, Janjigian Y, Gallagher M,Soumerai T, Mellinghoff I, Hakimi A, Fury M, Huse J, Bagrodia A, Hameed M, Thomas S, Gardos S,Cerami E, Mazor T, Kumari P, Raman P, Shivdasani P, MacFarland S, Newman S, Waanders A, Gao J,Solit DSchultz N", "doi": "10.1200/cci.20.0010", "journal": "JCO Clinical CancerInformatics 221-230", "pmid": "33625877", "title": "OncoTree: A Cancer Classification System for Precision Oncology", "year": "2021"},
            {"authors": "Petralia F, Tignor N, Reva B, Koptyra M, Chowdhury S, Rykunov D, Krek A, Ma W, Zhu Y, Ji J,Calinawan A, Whiteaker J, Colaprico A, Stathias V, Omelchenko T, Song X, Raman P, Guo Y, Brown M,Ivey R, Szpyt J, Guha Thakurta S, Gritsenko M, Weitz K, Lopez G, Kalayci S, Gümuş Z, Yoo S, da VeigaLeprevost F, Chang H, Krug K, Katsnelson L, Wang Y, Kennedy J, Voytovich U, Zhao L, Gaonkar K,Ennis B, Zhang B, Baubet V, Tauhid L, Lilly J, Mason J, Farrow B, Young N, Leary S, Moon J, Petyuk V,Nazarian J, Adappa N, Palmer J, Lober R, Rivero-Hinojosa S, Wang L, Wang J, Broberg M, Chu R, MooreR, Monroe M, Zhao R, Smith R, Zhu J, Robles A, Mesri M, Boja E, Hiltke T, Rodriguez H, Zhang B,Schadt E, Mani D, Ding L, Iavarone A, Wiznerowicz M, Schürer S, Chen X, Heath A, Rokita J,Nesvizhskii A, Fenyö D, Rodland K, Liu T, Gygi S, Paulovich A, Resnick A, Storm P, Rood B, Wang P,Francis A, Morgan A, Waanders A, Viaene A, Buccoliero A, Chinnaiyan A, Leonard C, Kline C,Caporalini C, Kinsinger C, Li C, Kram D, Hanson D, Appert E, Kawaler E, Raabe E, Jackson E, GreenfieldJ, Stone G, Getz G, Grant G, Teo G, Pollack I, Cain J, Foster J, Phillips J, Palma J, Ketchum K, Ruggles K,Blumenberg L, Cornwell M, Sarmady M, Domagalski M, Cieślik M, Santi M, Li M, Ellis M,Wyczalkowski M, Connors M, Scagnet M, Gupta N, Edwards N, Vitanza N, Vaske O, Becher O,McGarvey P, Firestein R, Mueller S, Winebrake S, Dhanasekaran S, Cai S, Partap S, Patton T, Le T,Lorentzen T, Liu WBocik W", "doi": "10.1016/j.cell.2020.10.044", "journal": "Cell 183: 1962-1985.e31", "pmid": "33242424", "title": "Integrated Proteogenomic Characterization across Major Histological Typesof Pediatric Brain Cancer", "year": "2020"},
            {"authors": "Gaonkar K, Marini F, Rathi K, Jain P, Zhu Y, Chimicles N, Brown M, Naqvi A, Zhang B, Storm P, MarisJ, Raman P, Resnick A, Strauch K, Taroni JRokita J", "doi": "10.1186/s12859-020-03922-7", "journal": "BMC Bioinformatics 21", "pmid": "33317447", "title": "annoFuse: an R Package to annotate, prioritize, andinteractively explore putative oncogenic RNA fusions", "year": "2020"},
            {"authors": "Rathi K, Arif S, Koptyra M, Naqvi A, Taylor D, Storm P, Resnick A, Rokita J, Raman P", "doi": "10.1371/journal.pcbi.1008263", "journal": "PLOS ComputationalBiology 16: e1008263", "pmid": "33119584", "title": "Atranscriptome-based classifier to determine molecular subtypes in medulloblastoma", "year": "2020"},
            {"authors": "Tetri L, Kolla V, Golden R, Iyer R, Croucher J, Choi J, Macfarland S, Naraparaju K, Guan P, Nguyen F,Gaonkar K, Raman P, Brodeur G", "doi": "10.3892/or.2020.7583", "journal": "Oncology Reports", "pmid": "32319659", "title": "RET receptor expression and interaction with TRK receptors inneuroblastomas", "year": "2020"},
            {"authors": "Rentas S, Rathi K, Kaur M, Raman P, Krantz I, Sarmady MTayoun A", "doi": "10.1038/s41436-019-0741-5", "journal": "Genetics in Medicine 22: 927-936", "pmid": "31911672", "title": "Diagnosing Cornelia de Langesyndrome and related neurodevelopmental disorders using RNA sequencing", "year": "2020"},
            {"authors": "Martin C, Datta A, Littlefield C, Kalra A, Chapron C, Wawersik S, Dagbay K, Brueckner C, Nikiforov A,Danehy F, Streich F, Boston C, Simpson A, Jackson J, Lin S, Danek N, Faucette R, Raman P, Capili A,Buckler A, Carven G, Schürpf T", "doi": "10.1126/scitranslmed.aay8456", "journal": "Science Translational Medicine 12:eaay8456", "pmid": "32213632", "title": "Selective inhibition of TGFβ1 activation overcomes primary resistance tocheckpoint blockade therapy by altering tumor immune landscape", "year": "2020"},
            {"authors": "Sussman R, Rokita J, Huang K, Raman P, Rathi K, Martinez D, Bosse K, Lane M, Hart L, Bhatti T, PawelB, Maris J", "doi": "10.3389/fonc.2020.00302", "journal": "Frontiers in Oncology 10", "pmid": "32211329", "title": "CAMKV Is a Candidate Immunotherapeutic Target in MYCN Amplified Neuroblastoma", "year": "2020"},
            {"authors": "Yarmarkovich M, Farrel A, Sison A, di Marco M, Raman P, Parris J, Monos D, Lee H, Stevanovic SMarisJ", "doi": "10.3389/fimmu.2020.00069", "journal": "Frontiers in Immunology 11", "pmid": "32256484", "title": "Immunogenicity and Immune Silence in Human Cancer", "year": "2019"},
            {"authors": "Ijaz H, Koptyra M, Gaonkar K, Rokita J, Baubet V, Tauhid L, Zhu Y, Brown M, Lopez G, Zhang B, DiskinS, Vaksman Z, Mason J, Appert E, Lilly J, Lulla R, De Raedt T, Heath A, Felmeister A, Raman P,Nazarian J, Santi M, Storm P, Resnick A, Waanders A, Cole K", "doi": "10.1093/neuonc/noz192", "journal": "Neuro-Oncology 22: 163-165", "pmid": "32256484", "title": "Pediatric high-grade glioma resources fromthe Children's Brain Tumor Tissue Consortium", "year": "2019"},
            {"authors": "MacFarland S, Zelley K, Surrey L, Gallo D, Luo M, Raman P, Wertheim G, Hunger S, Li MBrodeur G", "doi": "10.1200/po.19.00062", "journal": "JCO PrecisionOncology 1-26", "pmid": "32783018", "title": "Pediatric Somatic Tumor Sequencing Identifies Underlying Cancer Predisposition", "year": "2019"},
            {"authors": "Rokita J, Rathi K, Cardenas M, Upton K, Jayaseelan J, Cross K, Pfeil J, Egolf L, Way G, Farrel A,Kendsersky N, Patel K, Gaonkar K, Modi A, Berko E, Lopez G, Vaksman Z, Mayoh C, Nance J, McCoyK, Haber M, Evans K, McCalmont H, Bendak K, Böhm J, Marshall G, Tyrrell V, Kalletla K, Braun F, QiL, Du Y, Zhang H, Lindsay H, Zhao S, Shu J, Baxter P, Morton C, Kurmashev D, Zheng S, Chen Y,Bowen J, Bryan A, Leraas K, Coppens S, Doddapaneni H, Momin Z, Zhang W, Sacks G, Hart L, KrytskaK, Mosse Y, Gatto G, Sanchez Y, Greene C, Diskin S, Vaske O, Haussler D, Gastier-Foster J, Kolb E,Gorlick R, Li X, Reynolds C, Kurmasheva R, Houghton P, Smith M, Lock R, Raman P, Wheeler DMarisJ", "doi": "10.1016/j.celrep.2019.09.071", "journal": "Cell Reports 29: 1675-1689.e9", "pmid": "31693904", "title": "Genomic Profiling of Childhood Tumor Patient-Derived Xenograft Models to Enable Rational ClinicalTrial Design", "year": "2019"},
            {"authors": "Surrey L, MacFarland S, Chang F, Cao K, Rathi K, Akgumus G, Gallo D, Lin F, Gleason A, Raman P,Aplenc R, Bagatell R, Minturn J, Mosse Y, Santi M, Tasian S, Waanders A, Sarmady M, Maris J, HungerS, Li M", "doi": "10.1186/s13073-019-0644-8", "journal": "Genome Med. 2019;11(1)", "pmid": "31133068", "title": "Clinical utility of custom-designed NGS panel testing in pediatric tumors", "year": "2019"},
            {"authors": "Raman P, Zimmerman S, Rathi K, de Torrenté L, Sarmady M, Wu C, Leipzig J, Taylor D, Tozeren A, MarJ", "doi": "10.1016/j.cancergen.2019.04.004", "journal": "CancerGenet. 2019;235-236:1-12", "title": "A comparison of survival analysis methods for cancer gene expression RNA-Sequencing data", "year": "2019"},
            {"authors": "Makvandi M, Lee H, Puentes L, Reilly S, Rathi K, Weng C, Chan H, Hou C, Raman P, Martinez D, Xu K,Carlin S, Greenberg R, Pawel B, Mach R, Maris J, Pryma D", "doi": "10.1158/1535-7163.mct-18-0837", "journal": "Mol Cancer Ther.2019:molcanther.0837.2018", "pmid": "31072830", "title": "Targeting PARP-1 with alpha-particles ispotently cytotoxic to human neuroblastoma in pre-clinical models", "year": "2019"},
            {"authors": "Taylor D, Aronow B, Tan K, Bernt K, Salomonis N, Greene C, Frolova A, Henrickson S, Wells A, Pei L,Jaiswal J, Whitsett J, Hamilton K, MacParland S, Kelsen J, Heuckeroth R, Potter S, Vella L, Terry N,Ghanem L, Kennedy B, Helbig I, Sullivan K, Castelo-Soccio L, Kreigstein A, Herse F, Nawijn M,Koppelman G, Haendel M, Harris N, Rokita J, Zhang Y, Regev A, Rozenblatt-Rosen O, Rood J, Tickle T,Vento-Tormo R, Alimohamed S, Lek M, Mar J, Loomes K, Barrett D, Uapinyoying P, Beggs A, AgrawalP, Chen Y, Muir A, Garmire L, Snapper S, Nazarian J, Seeholzer S, Fazelinia H, Singh L, Faryabi R,Raman P, Dawany N, Xie H, Devkota B, Diskin S, Anderson S, Rappaport E, Peranteau W, Wikenheiser-Brokamp K, Teichmann S, Wallace D, Peng T, Ding Y, Kim M, Xing Y, Kong S, Bönnemann C, Mandl K,White P", "doi": "10.1016/j.devcel.2019.03.001", "journal": "Dev Cell, 49(1):10-29", "pmid": "30930166", "title": "The Pediatric Cell Atlas: Defining the Growth Phase of Human Development at Single-CellResolution", "year": "2019"},
            {"authors": "Sano R, Krytska K, Larmour C, Raman P, Martinez D, Ligon G, Lillquist J, Cucchi U, Orsini P, Rizzi S,Pawel B, Alvarado D, Mossé Y", "doi": "10.1126/scitranslmed.aau9732", "journal": "Sci Transl Med, 11(483):eaau9732", "pmid": "30867324", "title": "An antibody-drug conjugate directed to the ALK receptor demonstratesefficacy in preclinical models of neuroblastoma", "year": "2019"},
            {"authors": "Raman P, Maddipati R, Lim K, Tozeren A", "journal": "PLOS ONE, 13(8):e0201751", "pmid": "30092011", "title": "Pancreatic cancer survival analysis defines a signature thatpredicts outcome", "year": "2018"},
            {"authors": "Mackay A, Burford A, Molinari V, Jones D, Izquierdo E, Brouwer-Visser J, Giangaspero F, Haberler C,Pietsch T, Jacques T, Figarella-Branger D, Rodriguez D, Morgan P, Raman P, Waanders A, Resnick A,Massimino M, Garrè M, Smith H, Capper D, Pfister S, Würdinger T, Tam R, Garcia J, Thakur M, VassalG, Grill J, Jaspan T, Varlet P, Jones C", "journal": "Cancer Cell,33(5):829-842.e5", "pmid": "29763623", "title": "Molecular, Pathological, Radiological, and Immune Profiling ofNon-brainstem Pediatric High-Grade Glioma from the HERBY Phase II Randomized Trial", "year": "2018"},
            {"authors": "Guha M, Srinivasan S, Raman P, Jiang Y, Kaufman B, Taylor D, Dong D, Chakrabarti R, Picard M,Carstens R, Kijima Y, Feldman M, Avadhani N", "journal": "Biochimica et BiophysicaActa (BBA) - Molecular Basis of Disease,1864(4):1060-1071", "pmid": "29309924", "title": "Aggressive triple negative breast cancers have uniquemolecular signature on the basis of mitochondrial genetic and functional defects", "year": "2018"},
            {"authors": "Jain P, Silva A, Han H, Lang S, Zhu Y, Boucher K, Smith T, Vakil A, Diviney P, Choudhari N, Raman P,Busch C, Delaney T, Yang X, Olow A, Mueller S, Haas-Kogan D, Fox E, Storm P, Resnick A, WaandersA", "journal": "Oncotarget, 8(49)", "pmid": "29156677", "title": "Overcoming resistance to single-agent therapy for oncogenic BRAF gene fusions via combinatorialtargeting of MAPK and PI3K/mTOR signaling pathways", "year": "2017"},
            {"authors": "Campbell B, Light N, Fabrizio D, Zatzman M, Fuligni F, de Borja R, Davidson S, Edwards M, Elvin J,Hodel K, Zahurancik W, Suo Z, Lipman T, Wimmer K, Kratz C, Bowers D, Laetsch T, Dunn G, JohannsT, Grimmer M, Smirnov I, Larouche V, Samuel D, Bronsema A, Osborn M, Stearns D, Raman P, Cole K,Storm P, Yalon M, Opocher E, Mason G, Thomas G, Sabel M, George B, Ziegler D, Lindhorst S, Issai V,Constantini S, Toledano H, Elhasid R, Farah R, Dvir R, Dirks P, Huang A, Galati M, Chung J,Ramaswamy V, Irwin M, Aronson M, Durno C, Taylor M, Rechavi G, Maris J, Bouffet E, Hawkins C,Costello J, Meyn M, Pursell Z, Malkin D, Tabori U, Shlien A", "journal": "Cell,171(5):1042-1056.e10", "pmid": "29056344", "title": "Comprehensive Analysis of Hypermutationin Human Cancer", "year": "2017"},
            {"authors": "Mackay A, Burford A, Carvalho D, Izquierdo E, Fazal-Salom J, Taylor K, Bjerke L, Clarke M, Vinci M,Nandhabalan M, Temelso S, Popov S, Molinari V, Raman P, Waanders A, Han H, Gupta S, Marshall L,Zacharoulis S, Vaidya S, Mandeville H, Bridges L, Martin A, Al-Sarraj S, Chandler C, Ng H, Li X, Mu K,Trabelsi S, Brahim D, Kisljakov A, Konovalov D, Moore A, Carcaboso A, Sunol M, de Torres C, Cruz O,Mora J, Shats L, Stavale J, Bidinotto L, Reis R, Entz-Werle N, Farrell M, Cryan J, Crimmins D, Caird J,Pears J, Monje M, Debily M, Castel D, Grill J, Hawkins C, Nikbakht H, Jabado N, Baker S, Pfister S, JonesD, Fouladi M, von Bueren A, Baudis M, Resnick A, Jones C", "journal": "Cancer Cell, 32(4):520-537.e5", "pmid": "28966033", "title": "Integrated Molecular Meta-Analysis of 1,000Pediatric High-Grade and Diffuse Intrinsic Pontine Glioma", "year": "2017"},
            {"authors": "Bosse K, Raman P, Zhu Z, Lane M, Martinez D, Heitzeneder S, Rathi K, Kendsersky N, Randall M,Donovan L, Morrissy S, Sussman R, Zhelev D, Feng Y, Wang Y, Hwang J, Lopez G, Harenza J, Wei J,Pawel B, Bhatti T, Santi M, Ganguly A, Khan J, Marra M, Taylor M, Dimitrov, D, Mackall C. and Maris,J", "journal": "Cancer Cell, 32(3), pp.295-309.e12", "pmid": "28898695", "title": "'Identification of GPC2 as an Oncoprotein and Candidate Immunotherapeutic Target in High-RiskNeuroblastoma'", "year": "2017"},
            {"authors": "Capasso M, McDaniel L, Cimmino F, Cirino A, Formicola D, Russell M, Raman P, Cole K, Diskin, S", "journal": "Journal ofCellular and Molecular Medicine", "pmid": "28667701", "title": "'The functional variant rs34330 of CDKN1B is associated with risk of Neuroblastoma'", "year": "2017"},
            {"authors": "Kim E, Cheng Y, Bolton-Gillespie E, Cai X, Ma C, Tarangelo A, Le L, Jambhekar M, Raman P, Hayer K,Wertheim G, Speck N, Tong W, Viatour, P", "journal": "The Journal of Experimental Medicine,p.jem.20160719", "pmid": "28550162", "title": "'Rb family proteins enforce the homeostasis of quiescenthematopoietic stem cells by repressing Socs3 expression'", "year": "2017"},
            {"authors": "Lurier E, Dalton D, Dampier W, Raman P, Nassiri S, Ferraro N, Rajagopalan R, Sarmady M, Spiller K", "journal": "Immunobiology", "pmid": "28318799", "title": "'Transcriptome analysis of IL-10-stimulated (M2c) macrophages by next-generation sequencing'", "year": "2017"},
            {"authors": "Padovan-Merhar O, Raman P", "journal": "PLOS Genetics, 12(12), p.e1006501", "pmid": "27997549", "title": "'Enrichment of Targetable Mutations in theRelapsed Neuroblastoma Genome.'", "year": "2016"},
            {"authors": "Hart L, Rader J, Raman P, Batra V, Russell M, Tsang M, Gagliardi M, Chen L, Martinez D, Li Y, WoodA, Kim S, Parasuraman S, Delach S, Cole K, Krupa S, Boehm M, Peters M, Caponigro G, Maris J", "doi": "10.1158/1078-0432.ccr-16-1131", "journal": "Clinical CancerResearch", "pmid": "27729458", "title": "'Preclinical therapeutic synergy of MEK1/2 and CDK4/6 inhibition in Neuroblastoma'", "year": "2016"},
            {"authors": "Sotillo E, Barrett D, Bagashev A, Black K, Lanauze C, Oldridge D, Sussman R, Harrington C, Chung E,Hofmann T, Maude S, Martinez N, Raman P, Ruella M, Allman D, Jacoby E, Fry T, Barash Y, Lynch K,Mackall C, Maris J, Grupp S, Thomas-Tikhonenko A", "journal": "Cancer Discovery, 5(12):1282-1295", "pmid": "26516065", "title": "'Convergence of acquired mutations and alternativesplicing of CD19 enables resistance to CART-19 immunotherapy'", "year": "2015"},
            {"authors": "Tarangelo A, Lo N, Teng R, Kim E, Linh L, Watson D, Furth EE, Raman P, Ehmer U, Viatour P", "journal": "Nature Communications, 6:10028", "pmid": "26639898", "title": "'Recruitment of Pontin/Reptin by E2f1 amplifies E2f transcriptional response during cancer progression.'", "year": "2015"},
            {"authors": "Schnepp RW, Khurana P, Attiyeh EF, Raman P, Chodosh SE, Oldridge DA, Gagliardi ME, Conkrite KL,Asgharzadeh S, Seeger RC, Madison BB, Rustgi AK, Maris JM, Diskin SJ", "journal": "Cancer Cell, S1535-6108(15)00343-8", "pmid": "26481147", "title": "'A LIN28B-RAN-AURKASignaling Network Promotes Neuroblastoma Tumorigenesis.'", "year": "2015"},
            {"authors": "Raman P, Purwin T, Pestell R, Tozeren A", "journal": "Cancer Informatics, p.113", "pmid": "26494976", "title": "'FXYD5 is a Marker for Poor Prognosis and a Potential Driverfor Metastasis in Ovarian Carcinomas.'", "year": "2015"},
            {"authors": "Krytska K, Ryles H, Sano R, Raman P, Infarinato N, Hansel T, Makena M, Song M, Reynolds C, MosseY", "journal": "Clinical CancerResearch", "pmid": "26438783", "title": "'Crizotinib Synergizes with Chemotherapy in Preclinical Models of Neuro", "year": "2015"},
            {"authors": "Russell M, Penikis A, Oldridge D, Alvarez-Dominguez J, McDaniel L, Diamond M, Padovan O, RamanP, Li Y, Wei J, Zhang S, Gnanchandran J, Seeger R, Asgharzadeh S, Khan J, Diskin S, Maris JM, Cole K", "journal": "CancerResearch, 75(15), pp.3155-3166", "pmid": "26100672", "title": "'CASC15-S Is a Tumor Suppressor lncRNA at the 6p22 Neuroblastoma Susceptibility Locus.'", "year": "2015"},
            {"authors": "Carson C, Raman P, Tullai J, Xu L, Henault M, Thomas E, Yeola S, Lao J, McPate M, Verkuyl J, MarshG, Sarber J, Amaral A, Bailey S, Lubicka D, Pham H, Miranda N, Ding J, Tang H, Ju H, Tranter P, Ji N,Krastel P, Jain R, Schumacher A, Loureiro J, George E, Berellini G, Ross N, Bushell S, Erdemli G,Solomon, J", "journal": "PLOS ONE, 10(6), p.e0127498", "pmid": "26098886", "title": "'Englerin A Agonizes the TRPC4/C5 Cation Channels to Inhibit Tumor Cell LineProliferation.'", "year": "2015"},
            {"authors": "Otsuru S, Hofmann T, Raman P, Olson T, Guess A, Dominici M, Horwitz E", "journal": "Cytotherapy, 17(3),pp.262-270", "pmid": "25659640", "title": "'Genomic and functionalcomparison of mesenchymal stromal cells prepared using two isolation methods.'", "year": "2015"},
            {"authors": "Dews, M, Tan, G, Hultine, S, Raman, P, Choi, J, Duperret, E, Lawler, J, Bass, A. and Thomas-Tikhonenko, A", "journal": "Journal of the National Cancer Institute, 043", "pmid": "24627270", "title": "'Masking Epistasis Between MYC and TGF-beta Pathways in Antiangiogenesis-MediatedColon Cancer Suppression.'", "year": "2014"},
            {"authors": "Psathas JN, Doonan PJ, Raman P, Freedman BD, Minn AJ, Thomas-Tikhonenko A", "journal": "Blood, 122 (26):4220-229", "pmid": "24169826", "title": "'The Myc-miR-17-92axis amplifies B-cell receptor signaling via inhibition of ITIM proteins: a novel lymphomagenic feedforwardloop.'", "year": "2013"},
            {"authors": "Britschgi A, Bill A, Brinkhaus H, Rothwell C, Clay I, Duss S, Rebhan M, Raman P, Guy CT, Wetzel K,George E, Popa MO, Lilley S, Choudhury H, Gosling M, Wang L, Fitzgerald S, Borawski J, Baffoe J,Labow M, Gaither LA, Bentires-Alj M", "journal": "Proc Natl Acad Sci, 110(11):E1026-34", "pmid": "23431153", "title": "'Calcium-activated chloride channel ANO1 promotes breast cancerprogression by activating EGFR and CAMK signaling.'", "year": "2013"},
            {"authors": "Barretina J, Caponigro G, Stransky N, Venkatesan K, Margolin AA, Kim S, Wilson CJ, Lehár J, KryukovGV, Sonkin D, Reddy A, Liu M, Murray L, Berger MF, Monahan JE, Morais P, Meltzer J, Korejwa A,Jané-Valbuena J, Mapa FA, Thibault J, Bric-Furlong E, Raman P, Shipway A, Engels IH, Cheng J, YuGK, Yu J, Aspesi P Jr, de Silva M, Jagtap K, Jones MD, Wang L, Hatton C, Palescandolo E, Gupta S,Mahan S, Sougnez C, Onofrio RC, Liefeld T, MacConaill L, Winckler W, Reich M, Li N, Mesirov JP,Gabriel SB, Getz G, Ardlie K, Chan V, Myer VE, Weber BL, Porter J, Warmuth M, Finan P, Harris JL,Meyerson M, Golub TR, Morrissey MP, Sellers WR, Schlegel R, Garraway LA", "journal": "Nature, 483(7391):603-7", "pmid": "22460905", "title": "'The Cancer Cell LineEncyclopedia enables predictive modelling of anticancer drug sensitivity.'", "year": "2012"},
            {"authors": "Varin T, Gubler H, Parker CN, Zhang JH, Raman P, Ertl P, Schuffenhauer A", "journal": "J Chem Inf Model, 50(12):2067-78", "pmid": "21073183", "title": "'Compound set enrichment:a novel approach to analysis of primary HTS data.'", "year": "2010"},
            {"authors": "Düvel K, Yecies JL, Menon S, Raman P", "journal": "Mol Cell, 39(2):171-83", "pmid": "20670887", "title": "'Activation of a metabolic gene regulatory network downstream of mTOR complex 1.'", "year": "2010"},
            {"authors": "Asur S, Raman P, Otey ME, Parthasarathy S", "journal": "Bioinformatics, 22(14):e40-8", "pmid": "16873499", "title": "'A model-based approach for mining membrane proteincrystallization trials.'", "year": "2006"},
            {"authors": "Raman P, Cherezov V, Caffrey M", "journal": "Cell Mol Life Sci, 63(1):36-51", "pmid": "16314922", "title": "'The Membrane Protein Data Bank.'", "year": "2006"}
        ];
        console.log('Using fallback data with', publications.length, 'publications');
        updatePublicationSummary();
        renderPublicationsTable();
        updatePaginationControls();
    }
}

function updatePublicationSummary() {
    document.getElementById('total-pubs').textContent = publications.length;
}

function sortPublications(pubs, sortBy) {
    console.log('Sorting publications by:', sortBy);
    const sorted = [...pubs].sort((a, b) => {
        switch (sortBy) {
            case 'year-desc':
                return parseInt(b.year) - parseInt(a.year);
            case 'year-asc':
                return parseInt(a.year) - parseInt(b.year);
            case 'title':
                return a.title.localeCompare(b.title);
            case 'journal':
                return a.journal.localeCompare(b.journal);
            default:
                return 0;
        }
    });
    console.log('First 3 sorted publications:', sorted.slice(0, 3));
    return sorted;
}

function getPaginatedPublications() {
    const sortedPubs = sortPublications(publications, currentSort);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedPubs.slice(startIndex, endIndex);
}

function renderPublicationsTable() {
    const tbody = document.getElementById('publications-table-body');
    tbody.innerHTML = '';

    const paginatedPubs = getPaginatedPublications();
    paginatedPubs.forEach(pub => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pub.year}</td>
            <td>${pub.title}</td>
            <td>${pub.authors}</td>
            <td>${pub.journal}</td>
            <td><a href="https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/" target="_blank">${pub.pmid}</a></td>
        `;
        tbody.appendChild(row);
    });
}

function updatePaginationControls() {
    const totalPages = Math.ceil(publications.length / itemsPerPage);
    const paginationDiv = document.getElementById('pagination-controls');
    
    let paginationHTML = `
        <div class="pagination">
            <button onclick="changePage(1)" ${currentPage === 1 ? 'disabled' : ''}>First</button>
            <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
            <span>Page ${currentPage} of ${totalPages}</span>
            <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
            <button onclick="changePage(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''}>Last</button>
        </div>
    `;
    
    paginationDiv.innerHTML = paginationHTML;
}

function changePage(newPage) {
    const totalPages = Math.ceil(publications.length / itemsPerPage);
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderPublicationsTable();
        updatePaginationControls();
    }
}

// Event listeners for publications - moved to DOMContentLoaded

// Function to create publication elements
function createPublicationElement(pub) {
    const div = document.createElement('div');
    div.className = 'publication-item';
    div.innerHTML = `
        <h3>${pub.title}</h3>
        <p class="authors">${pub.authors}</p>
        <p class="journal">${pub.journal}, ${pub.year}</p>
        <a href="${pub.link}" target="_blank" class="paper-link">View Paper</a>
    `;
    return div;
}

// Function to create project elements
function createProjectElement(project) {
    const div = document.createElement('div');
    div.className = 'project-card';
    div.innerHTML = `
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" target="_blank" class="project-link">View Project</a>
        </div>
    `;
    return div;
}

// Function to load projects
function loadProjects() {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    const projects = [
        {
            title: "Project Name",
            description: "Brief description of the project and its significance.",
            technologies: ["Technology1", "Technology2", "Technology3"],
            link: "https://github.com/PichaiRaman/project"
        },
        // Add more projects as needed
    ];

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" target="_blank" class="project-link">View Project</a>
        `;
        grid.appendChild(card);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Read More functionality for About section
document.querySelector('.read-more-btn').addEventListener('click', function() {
    const aboutFull = document.querySelector('.about-full');
    const aboutPreview = document.querySelector('.about-preview');
    const button = this;
    
    if (aboutFull.style.display === 'none') {
        aboutFull.style.display = 'block';
        aboutPreview.style.display = 'none';
        button.classList.add('expanded');
    } else {
        aboutFull.style.display = 'none';
        aboutPreview.style.display = 'block';
        button.classList.remove('expanded');
    }
});

// Experience section scroll animation
function checkScroll() {
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (itemTop < windowHeight * 0.8) {
            item.classList.add('visible');
        }
    });

}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Handle loading screen animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('.main-content');
    
    // Show loading screen for 3 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        mainContent.classList.add('fade-in');
        
        // Remove loading screen from DOM after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);

    // Initialize other functionality
    loadPublications();
    loadProjects();
    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // Event listeners for publications
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            console.log('Sort changed to:', e.target.value);
            currentSort = e.target.value;
            currentPage = 1; // Reset to first page when sorting changes
            console.log('Current sort:', currentSort);
            console.log('Publications before sort:', publications.slice(0, 3));
            renderPublicationsTable();
            updatePaginationControls();
        });
    }

    const searchInput = document.getElementById('publication-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#publications-table-body tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
}); 