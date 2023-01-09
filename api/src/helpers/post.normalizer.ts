class PostNormalizer {
    title = (title: string) => title.trim().charAt(0).toUpperCase() + title.trim().substring(1);

    description = (description: string) => description.trim().charAt(0).toUpperCase() + description.trim().substring(1);

    category = (category: string) => category.trim().charAt(0).toUpperCase() + category.trim().substring(1).toLowerCase();
}

export const postNormalizer = new PostNormalizer();
