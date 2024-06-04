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




export async function retrieveBooksByAuthorOrCat(authors, category,target,order, page) {
  try {
    let url = "http://localhost:3030/books?";

      for (let i = 0; i < authors.length; i++) { // Change here: Start from 0
        url += `&authors_like=${authors[i]}`;
      }
      for (let i = 0; i < category.length; i++) { // Change here: Start from 0
        url += `&categories_like=${category[i]}`;
      }

      const allBooksResponse = await fetch(url);
      const totalBooks = await allBooksResponse.json();
      const totalPages = Math.ceil(totalBooks.length / 10);

    url += `&_page=${page}`
    if (target !== "" && order !== "") {
      url += `&_sort=${target}&_order=${order}`;

    }
    url += `&limit=10`;
    const response = await fetch(url);
    return [await response.json(), totalPages];

  } catch (error) {
    console.error("An error occurred: ", error);
    throw error; // re-throw the error to be handled by the caller
  }
}



export async function randomSearch (value) {
  try {
    const response = await fetch(`http://localhost:3030/books?title_like=${value}`);
    return  await response.json();

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

export function updateCart(cart, price) {
    return fetch(`http://localhost:3030/cart/${cart}/${price}`)
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