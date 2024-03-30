// For each story, we need 4 attributes. We want to display the title, dek, and hero_image. 
// We also need to store the id so that we can use it as a key prop. 
export type Story = {
  id: string;
  title: string;
  dek: string;
  hero_image: {
    url: string
  };
};

// Here we define the shape of the API response.
type ApiResponse = {
  current_page: string;
  data: Story[];
};

// This function fetches stories from the API. We destructured the data array which contains the stories from the response and returned it as props.
export default async function getStories(page: number) {
  try {
    const response = await fetch(
      `https://cryptodire.kontinentalist.com/api/v1/stories?page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const { data }: ApiResponse = await response.json();
    return {
      props: {
        stories: data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        stories: [],
      },
    };
  }
}
