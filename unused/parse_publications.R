# Function to parse a single publication entry
parse_publication <- function(text) {
  # Initialize empty publication data frame row with specified columns in order
  pub <- data.frame(
    authors = character(1),
    doi = character(1),
    journal = character(1),
    pmid = character(1),
    title = character(1),
    year = character(1),
    link = character(1),
    stringsAsFactors = FALSE
  )
  
  # Extract year (assuming it's a 4-digit number)
  year_match <- regmatches(text, regexpr("\\b(19|20)\\d{2}\\b", text))
  if (length(year_match) > 0) {
    pub$year <- year_match
  }
  
  # Extract PMID (assuming it's an 8-digit number)
  pmid_match <- regmatches(text, regexpr("\\b\\d{8}\\b", text))
  if (length(pmid_match) > 0) {
    pub$pmid <- pmid_match
  }
  
  # Extract DOI if present
  doi_match <- regmatches(text, regexpr("10\\.\\d{4,9}/[-._;()/:A-Z0-9]+", text, ignore.case = TRUE))
  if (length(doi_match) > 0) {
    pub$doi <- doi_match
  }
  
  # Try to extract title (usually the first line)
  lines <- strsplit(text, "\n")[[1]]
  if (length(lines) > 0) {
    pub$title <- trimws(lines[1])
  }
  
  # Try to extract authors (usually after title and before journal)
  author_match <- regmatches(text, regexpr("([A-Z][a-z]+(?: [A-Z][a-z]+)*)(?:,|\\.)", text))
  if (length(author_match) > 0) {
    pub$authors <- author_match
  }
  
  # Try to extract journal (usually after authors and before year)
  journal_match <- regmatches(text, regexpr("\\.\\s*([A-Z][^.,]+(?: [A-Z][^.,]+)*)", text))
  if (length(journal_match) > 0) {
    pub$journal <- trimws(sub("^\\.\\s*", "", journal_match))
  }
  
  # Try to extract link (usually the last line)
  if (length(lines) > 0) {
    last_line <- trimws(lines[length(lines)])
    if (grepl("^https?://", last_line)) {
      pub$link <- last_line
    }
  }
  
  return(pub)
}

# Function to parse the entire publications file
parse_publications_file <- function(input_file) {
  # Read the input file
  text <- readLines(input_file, warn = FALSE)
  
  # Combine lines into a single string
  text <- paste(text, collapse = "\n")
  
  # Split into individual publications (assuming they're separated by blank lines)
  publications <- strsplit(text, "\n\\s*\n")[[1]]
  
  # Parse each publication
  parsed_pubs <- lapply(publications, parse_publication)
  
  # Combine into a single data frame
  result <- do.call(rbind, parsed_pubs)
  
  return(result)
}

# Function to write publications to tab-delimited file
write_publications_tab <- function(publications, output_file) {
  # Ensure the output file has .txt extension
  if (!grepl("\\.txt$", output_file)) {
    output_file <- paste0(output_file, ".txt")
  }
  
  # Write tab-delimited file
  write.table(publications, 
              file = output_file,
              sep = "\t",
              row.names = FALSE,
              quote = FALSE,
              na = "")
  
  cat(sprintf("Successfully wrote %d publications to %s\n", nrow(publications), output_file))
}

# Main function
main <- function() {
  # Get command line arguments
  args <- commandArgs(trailingOnly = TRUE)
  
  if (length(args) != 2) {
    cat("Usage: Rscript parse_publications.R input_file.txt output_file.txt\n")
    quit(status = 1)
  }
  
  input_file <- args[1]
  output_file <- args[2]
  
  # Parse publications
  publications <- parse_publications_file(input_file)
  
  # Write to tab-delimited file
  write_publications_tab(publications, output_file)
}

# Run the main function
main() 