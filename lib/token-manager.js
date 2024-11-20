export class TokenManager {
  static getTokens() {
    if (typeof window === 'undefined') return null;
    
    try {
      const tokens = localStorage.getItem('googleTokens');
      console.log("Getting tokens from storage:", tokens);
      return tokens ? JSON.parse(tokens) : null;
    } catch (error) {
      console.error('Error getting tokens:', error);
      return null;
    }
  }

  static setTokens(tokens) {
    if (typeof window === 'undefined') return;
    
    try {
      console.log("Setting tokens:", tokens);
      localStorage.setItem('googleTokens', JSON.stringify(tokens));
      console.log("Tokens stored successfully");
    } catch (error) {
      console.error('Error storing tokens:', error);
    }
  }

  static clearTokens() {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('googleTokens');
    console.log("Tokens cleared");
  }

  static isTokenExpired() {
    const tokens = this.getTokens();
    if (!tokens || !tokens.expiry_date) return true;
    
    return tokens.expiry_date <= Date.now() + (5 * 60 * 1000);
  }
}