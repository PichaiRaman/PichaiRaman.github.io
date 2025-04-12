// Publications data
const publications = [
    {
        authors: "Author1, Author2, Pichai Raman, et al.",
        doi: "10.xxxx/xxxx",
        journal: "Journal Name",
        pmid: "12345678",
        title: "Your Publication Title",
        year: "2024",
        link: "https://example.com/paper"
    }
    // Add more publications here
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

function loadPublications() {
    try {
        console.log('Loading publications...');
        updatePublicationSummary();
        renderPublicationsTable();
    } catch (error) {
        console.error('Error loading publications:', error);
        const tbody = document.getElementById('publications-table-body');
        tbody.innerHTML = `<tr><td colspan="6" style="color: red; text-align: center;">Error loading publications: ${error.message}</td></tr>`;
    }
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

function renderPublicationsTable() {
    const tbody = document.getElementById('publications-table-body');
    tbody.innerHTML = '';

    const sortedPubs = sortPublications(publications, currentSort);
    sortedPubs.forEach(pub => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pub.year}</td>
            <td>${pub.title}</td>
            <td>${pub.authors}</td>
            <td>${pub.journal}</td>
            <td><a href="https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/" target="_blank">${pub.pmid}</a></td>
            <td><a href="${pub.link}" target="_blank">View</a></td>
        `;
        tbody.appendChild(row);
    });
}

// Event listeners for publications
document.getElementById('sort-by').addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderPublicationsTable();
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
    const projectsGrid = document.querySelector('.projects-grid');
    projects.forEach(project => {
        projectsGrid.appendChild(createProjectElement(project));
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

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadPublications();
    loadProjects();
}); 