export async function fetchReviews(productID) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?id=${productID}`,
      {
        method: "GET",
        cache: "no-store",
        credentials: "include",
      }
    );
    if (!response.ok) {
      const errorMessage = await response.json();
      console.log(errorMessage);
      return;
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}
