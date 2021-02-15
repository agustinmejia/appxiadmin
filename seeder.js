const Seeder = require("mysql-db-seed").Seeder;
const { database } = require('./src/config');

// Generate a new Seeder instance
const seed = new Seeder(
  database.connectionLimit, 
  database.host,
  database.user,
  database.password,
  database.database
);

(async () => {
  await seed.seed(
    00,
    "users", 
    {
      username: 'admin',
      password: '$2a$10$cEyFhknidfWKH/xDPqo5huWegBfYnlSZGVBKrNr/D/uM2SZLViyTy',
      fullname: 'Administrador',
      created_at: '2021-02-15 05:54:45',
      updated_at: '2021-02-15 05:54:45'
    }
  )
  seed.exit();
  process.exit();
})();