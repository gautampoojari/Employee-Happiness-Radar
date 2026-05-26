import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Backup database
const backupDatabase = () => {
  try {
    const dbPath = path.join(__dirname, '..', 'database.sqlite');
    
    if (!fs.existsSync(dbPath)) {
      console.error('❌ Database file not found at:', dbPath);
      return;
    }
    
    // Create backups directory if it doesn't exist
    const backupDir = path.join(__dirname, '..', 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Create backup filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `database-backup-${timestamp}.sqlite`);
    
    // Copy database file
    fs.copyFileSync(dbPath, backupPath);
    
    console.log('✅ Database backup created successfully!');
    console.log(`📁 Backup location: ${backupPath}`);
    
    // Get file size
    const stats = fs.statSync(backupPath);
    console.log(`📊 Backup size: ${(stats.size / 1024).toFixed(2)} KB`);
    
    // List all backups
    const backups = fs.readdirSync(backupDir)
      .filter(f => f.endsWith('.sqlite'))
      .sort()
      .reverse();
    
    console.log(`\n📚 Total backups: ${backups.length}`);
    console.log('\n📋 Recent backups:');
    backups.slice(0, 5).forEach((backup, index) => {
      const backupStats = fs.statSync(path.join(backupDir, backup));
      console.log(`   ${index + 1}. ${backup} (${(backupStats.size / 1024).toFixed(2)} KB)`);
    });
    
  } catch (error) {
    console.error('❌ Error creating backup:', error);
  }
};

backupDatabase();
