export const azureConfig = {
  appInsights: {
    connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || '',
    enabled: process.env.NODE_ENV === 'production',
  },
  blobStorage: {
    accountName: process.env.AZURE_STORAGE_ACCOUNT || 'loshubstorage',
    containerName: process.env.AZURE_STORAGE_CONTAINER || 'media',
    baseUrl: process.env.AZURE_STORAGE_BASE_URL || 'https://loshubstorage.blob.core.windows.net',
  },
  keyVault: {
    vaultUrl: process.env.AZURE_KEYVAULT_URL || '',
  },
};
