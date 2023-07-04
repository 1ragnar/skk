import { initDatabase } from './initDatabase';

async function main() {
  try {
    await initDatabase();
    console.log('Database created');
  } catch (e) {
    console.log('Error occured while creating database ' + e);
  }
}

main();
