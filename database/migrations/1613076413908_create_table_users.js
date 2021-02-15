module.exports = {
    "up":  `
        CREATE TABLE users (
            id bigint(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
            username varchar(191) COLLATE utf8mb4_unicode_ci NULL,
            password varchar(191) COLLATE utf8mb4_unicode_ci NULL,
            fullname varchar(191) COLLATE utf8mb4_unicode_ci NULL,
            created_at timestamp NULL DEFAULT NULL,
            updated_at timestamp NULL DEFAULT NULL,
            deleted_at timestamp NULL DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `,
    "down": "DROP TABLE users"
}