// Publications data
let publications = [
    {"authors": "Nabbi A, Beck P, Delaidelli A, Oldridge DA, Sudhaman S, Zhu K, Yang SYC, Mulder DT, Bruce JP,Paulson JN, Raman P, Zhu Y, Resnick AC, Sorensen PH, Sill M, Brabetz S, Lambo S, Malkin D, Johann PD, Kool M, Jones DTW, Pfister SM, Jäger N, Pugh TJ", "doi": "10.1186/s13073-023-01219-x", "journal": "Genome Medicine, 15(1)", "pmid": "37679810", "title": "Transcriptional immunogenomic analysis reveals distinct immunological clusters in paediatric nervous system tumours", "year": "2023"},
    {"authors": "Shapiro JA, Gaonkar KS, Spielman SJ, Savonen CL, Bethell CJ, Jin R, Rathi KS, Zhu Y, Egolf LE, Farrow BK, Miller DP, Yang Y, Koganti T, Noureen N, Koptyra MP, Duong N, Santi M, Kim J, Robins S, Storm PB, Mack SC, Lilly JV, Xie HM, Jain P, Raman P, Rood BR, Lulla RR, Nazarian J, Kraya AA, VaksmanZ, Heath AP, Kline C, Scolaro L, Viaene AN, Huang X, Way GP, Foltz SM, Zhang B, Poetsch AR,Mueller S, Ennis BM, Prados M, Diskin SJ, Zheng S, Guo Y, Kannan S, Waanders AJ, Margol AS, KimMC, Hanson D, Van Kuren N, Wong J, Kaufman RS, Coleman N, Blackden C, Cole KA, Mason JL,Madsen PJ, Koschmann CJ, Stewart DR, Wafula E, Brown MA, Resnick AC, Greene CS, Rokita JL,Taroni JN; Children's Brain Tumor Network; Pacific Pediatric Neuro-Oncology Consortium", "doi": "10.1016/j.xgen.2023.100340", "journal": "Cell Genomics, 3(7):100340", "pmid": "37492101", "title": "OpenPBTA:The Open Pediatric Brain Tumor Atlas", "year": "2023"},
    {"authors": "Dang MT, Gonzalez MV, Gaonkar KS, Rathi KS, Young P, Arif S, Zhai L, Alam Z, Devalaraja S, To TKJ,Folkert IW, Raman P, Rokita JL, Martinez D, Taroni JN, Shapiro JA, Greene CS, Savonen C, Mafra F,Hakonarson H, Curran T, Haldar M", "doi": "10.1016/j.celrep.2023.112600", "journal": "Cell Reports, 42(6):112600", "pmid": "37235472", "title": "Macrophages in SHH subgroup medulloblastoma display dynamicheterogeneity that varies with treatment modality", "year": "2023"},
    {"authors": "Maddipati R, Norgard RJ, Baslan T, Rathi KS, Zhang A, Saeid A, Higashihara T, Wu F, Kumar A,Annamalai V, Bhattacharya S, Raman P, Adkisson CA, Pitarresi JR, Wengyn MD, Yamazoe T, Li J, BalliD, LaRiviere MJ, Ngo TC, Folkert IW, Millstein ID, Bermeo, J, Carpenter EL, McAuliffe JC, Oktay MH,Brekken RA, Lowe SW, Iacobuzio-Donahue CA, Notta F, Stanger BZ", "doi": "10.1158/2159-8290.CD-20-1826", "journal": "Cancer Discovery, 12(2):542-561", "pmid": "34551968", "title": "MYC Levels Regulate MetastaticHeterogeneity in Pancreatic Adenocarcinoma", "year": "2021"},
    {"authors": "Tong CCL, Koptyra M, Raman P, Rathi KS, Choudhari N, Lin X, Seckar T, Wei Z, Kohanski MA,O'Malley BW, Cohen NA, Kennedy DW, Adappa ND, Robertson ES, Baranov E, Kuan EC,Papagiannopoulos P, Jalaly JB, Feldman MD, Storm PB, Resnick AC, Palmer JN", "doi": "10.1002/alr.22882", "journal": "Int Forum Allergy Rhinol, 12(2),200-209", "pmid": "34510780", "title": "Targeted geneexpression profiling of inverted papilloma and squamous cell carcinoma", "year": "2021"}
];

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

function loadPublications() {
    // Publications data is now embedded directly in the script
    updatePublicationSummary();
    renderPublicationsTable();
    updatePaginationControls();
}

function updatePublicationSummary() {
    document.getElementById('total-pubs').textContent = publications.length;
}

function sortPublications(pubs, sortBy) {
    return [...pubs].sort((a, b) => {
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

// Event listeners for publications
document.getElementById('sort-by').addEventListener('change', (e) => {
    currentSort = e.target.value;
    currentPage = 1; // Reset to first page when sorting changes
    renderPublicationsTable();
    updatePaginationControls();
});

document.getElementById('publication-search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#publications-table-body tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

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
}); 