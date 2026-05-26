import { AdminToken } from '../models/index.js';

// Initialize default admin invite tokens
export const initializeAdminTokens = async () => {
  try {
    // Check if tokens already exist
    const existingTokens = await AdminToken.count();
    
    if (existingTokens > 0) {
      console.log('✅ Admin tokens already initialized');
      return;
    }
    
    // Create default admin tokens
    const defaultTokens = [
      {
        token: 'ADMIN-INVITE-2025-MAIN',
        description: 'Main Admin Token',
        expiresAt: new Date('2026-12-31')
      },
      {
        token: 'ADMIN-INVITE-HR-001',
        description: 'HR Department Token',
        expiresAt: new Date('2026-12-31')
      },
      {
        token: 'ADMIN-INVITE-EXEC-001',
        description: 'Executive Token',
        expiresAt: new Date('2026-12-31')
      }
    ];
    
    await AdminToken.bulkCreate(defaultTokens);
    console.log('✅ Default admin tokens initialized successfully');
    console.log('📋 Available tokens:', defaultTokens.map(t => t.token).join(', '));
  } catch (error) {
    console.error('❌ Error initializing admin tokens:', error);
  }
};
