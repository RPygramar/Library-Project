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
