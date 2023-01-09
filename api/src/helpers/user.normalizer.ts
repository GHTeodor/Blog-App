class UserNormalizer {
    username = (username: string) => username.trim().charAt(0).toUpperCase() + username.trim().substring(1);

    email = (email: string) => email.trim().charAt(0).toUpperCase() + email.trim().substring(1).toLowerCase();
}

export const userNormalizer = new UserNormalizer();
