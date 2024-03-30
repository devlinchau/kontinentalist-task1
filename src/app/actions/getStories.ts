export type Story = {
  id: string;
  title: string;
  dek: string;
  hero_image: {
    url: string
  };
};

type ApiResponse = {
  current_page: string;
  data: Story[];
};

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
