import re
import csv
import sys

def parse_publication(text):
    """Parse a single publication entry from text format to structured data."""
    # Initialize the publication dictionary
    pub = {
        'Title': '',
        'Authors': '',
        'Year': '',
        'Journal': '',
        'PMID': '',
        'Link': ''
    }
    
    # Extract year (assuming it's a 4-digit number)
    year_match = re.search(r'\b(19|20)\d{2}\b', text)
    if year_match:
        pub['Year'] = year_match.group()
    
    # Extract PMID (assuming it's an 8-digit number)
    pmid_match = re.search(r'\b\d{8}\b', text)
    if pmid_match:
        pub['PMID'] = pmid_match.group()
    
    # Try to extract title (usually the first line or before the authors)
    lines = text.split('\n')
    if lines:
        pub['Title'] = lines[0].strip()
    
    # Try to extract authors (usually after the title and before the journal)
    # This is a simple implementation - you might need to adjust based on your format
    author_match = re.search(r'([A-Z][a-z]+(?: [A-Z][a-z]+)*)(?:,|\.)', text)
    if author_match:
        pub['Authors'] = author_match.group(1)
    
    # Try to extract journal (usually after authors and before year)
    journal_match = re.search(r'\.\s*([A-Z][^.,]+(?: [A-Z][^.,]+)*)', text)
    if journal_match:
        pub['Journal'] = journal_match.group(1).strip()
    
    return pub

def parse_publications_file(input_file):
    """Parse a text file containing multiple publications."""
    publications = []
    
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            # Split the file into individual publications
            # This assumes publications are separated by blank lines
            raw_pubs = f.read().split('\n\n')
            
            for raw_pub in raw_pubs:
                if raw_pub.strip():  # Skip empty entries
                    pub = parse_publication(raw_pub)
                    publications.append(pub)
    
    except FileNotFoundError:
        print(f"Error: Could not find file {input_file}")
        sys.exit(1)
    
    return publications

def write_csv(publications, output_file):
    """Write publications to a CSV file."""
    fieldnames = ['Title', 'Authors', 'Year', 'Journal', 'PMID', 'Link']
    
    try:
        with open(output_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(publications)
        print(f"Successfully wrote {len(publications)} publications to {output_file}")
    
    except IOError:
        print(f"Error: Could not write to file {output_file}")
        sys.exit(1)

def main():
    if len(sys.argv) != 3:
        print("Usage: python parse_publications.py input_file.txt output_file.csv")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    publications = parse_publications_file(input_file)
    write_csv(publications, output_file)

if __name__ == "__main__":
    main() 