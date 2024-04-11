export function fetchAllBooks() {
  return fetch("http://localhost:3030/books")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error loading data");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("An error occurred: ", error);
    });
}


// Anotar que isto ainda está hardcoded, esta a tirar 10 livros apenas porque sim.
//Com o limit para 10 nao funciona

export async function fetchTenBooks(page) {
  try {
    const response = await fetch(`http://localhost:3030/books?_page=${page}`);

    if (!response.ok) {
      throw new Error("Error loading data");
    }

    return await response.json();
  } catch (error) {
    console.error("An error occurred: ", error);
    throw error; // re-throw the error to be handled by the caller
  }
}

export async function retrieveBooksByAuthorOrCat(authors, category) {
  try {

    const response = await fetch(`http://localhost:3030/books?`);
    const result = await response.json();
    console.log("filtering")
    if(category.length === 0 && authors.length > 0){
    const filteredBooks = result.filter(book => {
      return (authors.some(author => book.authors.includes(author)));}
    );
    return filteredBooks;
    }
    if(authors.length === 0 && category.length > 0){
      const filteredBooks = result.filter(book => {
        return (category.some(cat => book.categories.includes(cat)));}
      );
      return filteredBooks;
    }
    if(authors.length > 0 && category.length > 0){
      const filteredBooks = result.filter(book => {
        return (authors.some(author => book.authors.includes(author)) && category.some(cat => book.categories.includes(cat)));}
      );
      return filteredBooks;
    }
  } catch (error) {
    console.error("An error occurred: ", error);
    throw error; // re-throw the error to be handled by the caller
  }
}



export async function sortBooksByPrice(value, order, page) {
  try {
    const orderVal = order === "asc" ? "" : "-";
    const response = await fetch(`http://localhost:3030/books?_page=${page}&_sort=${orderVal}${value}`);

    if (!response.ok) {
      throw new Error("Error loading data");
    }
    return await response.json();
  } catch (error) {
    console.error("An error occurred: ", error);
    throw error; // re-throw the error to be handled by the caller
  }
}

export function fetchBookByID(id) {
  return fetch("http://localhost:3030/books/" + id)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error loading data");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("An error occurred: ", error);
      throw error; // Re-throw the error to propagate it to the caller
    });
}
