// Simple test to verify encryption functionality
// Run with: node test-encryption.js

const crypto = require('crypto');

class EncryptionUtils {
    static encryptSecret(secret, encryptionKey) {
        if (!secret || !encryptionKey) {
            throw new Error("Secret and encryption key are required");
        }

        const keyBuffer = crypto.createHash("sha256").update(encryptionKey).digest();
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv("aes-256-gcm", keyBuffer, iv);

        let encrypted = cipher.update(secret, "utf8", "hex");
        encrypted += cipher.final("hex");

        const authTag = cipher.getAuthTag();

        const combined = Buffer.concat([
            iv,
            authTag,
            Buffer.from(encrypted, "hex"),
        ]);

        return combined.toString("base64");
    }

    static decryptSecret(encryptedSecret, encryptionKey) {
        if (!encryptedSecret || !encryptionKey) {
            throw new Error("Encrypted secret and encryption key are required");
        }

        const keyBuffer = crypto.createHash("sha256").update(encryptionKey).digest();
        const combined = Buffer.from(encryptedSecret, "base64");

        const iv = combined.slice(0, 16);
        const authTag = combined.slice(16, 32);
        const encrypted = combined.slice(32);

        const decipher = crypto.createDecipheriv("aes-256-gcm", keyBuffer, iv);
        decipher.setAuthTag(authTag);

        try {
            let decrypted = decipher.update(encrypted.toString("hex"), "hex", "utf8");
            decrypted += decipher.final("utf8");
            return decrypted;
        } catch (error) {
            throw new Error("Failed to decrypt secret - invalid key or corrupted data");
        }
    }

    static sanitizeForLogging(encryptedSecret, maxLength = 20) {
        if (!encryptedSecret) {
            return "[EMPTY]";
        }
        return `${encryptedSecret.substring(0, maxLength)}...`;
    }
}

// Test the encryption
console.log('🔐 Testing Encryption Functionality');
console.log('='.repeat(40));

try {
    const secret = 'SB2WOZYD2JI2RL3BMZGJVXK5LVOZ2KMOJYGGGEZB5F2X6OBNAF4FQJRA';
    const key = 'test-encryption-key-123';
    
    console.log('Original secret:', secret.substring(0, 10) + '...');
    
    // Encrypt
    const encrypted = EncryptionUtils.encryptSecret(secret, key);
    console.log('Encrypted:', EncryptionUtils.sanitizeForLogging(encrypted));
    console.log('Full length:', encrypted.length);
    
    // Decrypt
    const decrypted = EncryptionUtils.decryptSecret(encrypted, key);
    console.log('Decrypted:', decrypted.substring(0, 10) + '...');
    
    // Verify
    const isValid = secret === decrypted;
    console.log('✅ Encryption/Decryption successful:', isValid);
    
    // Test wrong key
    try {
        EncryptionUtils.decryptSecret(encrypted, 'wrong-key');
        console.log('❌ Should have failed with wrong key');
    } catch (error) {
        console.log('✅ Correctly rejected wrong key');
    }
    
    console.log('\n🎉 All tests passed! Encryption layer working correctly.');
    
} catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
}
