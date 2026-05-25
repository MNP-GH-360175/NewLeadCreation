export class CreateLeadPage {
  constructor(page) {
    this.page = page;
    this.createLeadLink = page.locator('a >> text="Create Lead"');
    this.leadTypeInput = page.locator('(//nz-select-search//input)[1]').first();
    this.applicantNameInput = page.locator('(//div/input[1])[1]');
    this.mobileNumberInput = page.locator('(//div/input[1])[2]');
    this.altMobileInput = page.locator('//div[4]//input');
    this.leadSourceInput = page.locator('//div[8]//input');
    this.generatorMobileInput = page.locator('//div[9]//input');
    this.loanTypeInput = page.locator('//div[10]//input');
    this.schemeInput = page.locator('//div[11]//input');
    this.loanAmountInput = page.locator('input[placeholder="Total Loan Amount Requested"]');
    this.pincodeInput = page.locator('input[placeholder="PIN Code"]');
    this.stateDropdown = page.locator('nz-select[formcontrolname="state"], nz-select:has-text("State")').first();
    this.branchDropdown = page.locator('nz-select[formcontrolname="branch"], nz-select:has-text("Branch")').first();
    this.submitBtn = page.locator('button span:has-text(" Add Lead ")');
    this.duplicatePopup = page.locator('button:has-text("OK") , button span:has-text("OK")').first();
  }

  async fillForm(data) {
    await this.createLeadLink.waitFor({ state: 'visible', timeout: 30000 });
    await this.createLeadLink.click();

    await this.leadTypeInput.click();
    await this.page.locator(`nz-option-item >> text="${data.leadType}"`).click();

    await this.applicantNameInput.fill(data.applicantName);
    await this.mobileNumberInput.fill(data.mobileNumber);
    await this.altMobileInput.fill(data.altMobileNumber);
  
    await this.leadSourceInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.leadSourceInput.click();
    await this.page.locator(`nz-option-item[title="${data.leadSource}"]`).click();

    await this.generatorMobileInput.fill(data.generatorMobile);
  
    await this.loanTypeInput.click();
    await this.page.locator(`nz-option-item[title="${data.loanType}"]`).click();
  
    await this.schemeInput.click();
    await this.page.locator(`nz-option-item[title="${data.scheme}"]`).click();
  
    await this.loanAmountInput.fill(data.loanAmount);
    await this.pincodeInput.fill(data.pincode);

    await this.stateDropdown.click();
    await this.page.keyboard.type(data.state);
    const stateOpt = this.page.locator(`nz-option-item:has-text("${data.state}"), .ant-select-item-option-content:has-text("${data.state}")`).first();
    await stateOpt.waitFor({ state: 'visible' });
    await stateOpt.click();
  
    await this.branchDropdown.click();
    await this.page.keyboard.type(data.branch);
    const branchOpt = this.page.locator(`nz-option-item:has-text("${data.branch}"), .ant-select-item-option-content:has-text("${data.branch}")`).first();
    await branchOpt.waitFor({ state: 'visible' });
    await branchOpt.click();

    await this.submitBtn.click();
  }

  async handleOutcome() {
    await this.page.waitForTimeout(3000); 
    if (await this.duplicatePopup.isVisible()) {
      console.log('✅ Expected Duplicate Context handled.');
      await this.duplicatePopup.click();
    } else {
      console.log('✅ Success Context handled.');
    }
  }
}
