export class LoginPage {
  constructor(page) {
    this.page = page;
    this.userInput = page.locator('input[name="user"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginBtn = page.locator('button[name="loginButton"]');
    this.popupOkButton = page.locator('button.ant-btn-primary span:has-text("OK"), button:has-text("OK")').first();
  } 

  async navigate() {
    await this.page.goto('https://uatngl.manappuram.com/lead/#/login', { timeout: 90000, waitUntil: 'commit' });
  }

  async login(username, password, navigateTimeout = 90000) {
    if (this.page.url() === 'about:blank' || !this.page.url().includes('/login')) {
      await this.page.goto('https://uatngl.manappuram.com/lead/#/login', { timeout: navigateTimeout, waitUntil: 'commit' });
    }
    await this.userInput.waitFor({ state: 'visible', timeout: 30000 });
    await this.userInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();

    await this.popupOkButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.popupOkButton.click(); 
  }
}
