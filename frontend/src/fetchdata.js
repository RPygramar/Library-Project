export function fetchAllBooks() {
  return fetch("http://localhost:5000/books")
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

        console.log(authors, category, target, order, page);
        let url = `http://localhost:5000/books`;
        if (category.length >0) {
            url += `/category/${category[0]}`;
        }
        if (authors.length>0) {
            url += `/author/${authors[0]}`;
        }
        if (target && order) {
            url += `/target/${target}/order/${order}`;
        }

        url += `/page/${page}`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return [data["books"], (data['total']/10)];



      } catch (error) {
        console.error("An error occurred: ", error);
        throw error; // re-throw the error to be handled by the caller
  }
}



export async function randomSearch (value) {
  try {
    const response = await fetch(`http://localhost:5000/books/title/${value}`);
    return  await response.json();

  } catch (error) {
    console.error("An error occurred: ", error);
    throw error; // re-throw the error to be handled by the caller
  }
}



export function fetchBookByID(id) {
  return fetch("http://localhost:5000/books/" + id)
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
