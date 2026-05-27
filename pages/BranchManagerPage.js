export class BranchManagerPage {
  constructor(page) {
    this.page = page;
    
    // Sidebar Navigation Link
    this.leadPoolLink = page.locator('span:has-text("Lead Pool"), a:has-text("Lead Pool"), .nav-text:has-text("Lead Pool")').last();
    
    // Tab Navigation
    this.approveRejectTab = page.getByText('Approve / Reject', { exact: true });

    // --- 🚀 RECORDED SELECTORS: Updated directly from your Inspector recording ---
    this.applicantProfile = page.getByRole('textbox', { name: 'Enter Applicant Profile' }).first();
    this.applicantIncome = page.getByRole('textbox', { name: 'Enter Approximate Income' }).first();
    
    this.coApplicantProfile = page.getByRole('textbox', { name: 'Enter Applicant Profile' }).nth(1);
    this.coApplicantIncome = page.getByRole('textbox', { name: 'Enter Approximate Income' }).nth(1);

    // This completely fixes the read-only freeze by using your exact recorded target!
    this.foirField = page.getByRole('textbox', { name: 'Enter Foir' });
    this.propertyOwnerField = page.getByRole('textbox', { name: 'Enter Property Owner Name' });

    // Decision Dropdown & Submit Controls
    this.decisionDropdown = page.locator('.ant-select-selector.ng-tns-c76-4 > .ant-select-selection-search > .ant-select-selection-search-input');
    this.approvedOption = page.getByText('Approved', { exact: true });
    this.submitButton = page.getByRole('button', { name: 'Update Lead Status' });
  }

  /**
   * Opens the Lead Pool, clicks the matching mobile number row, and targets the Approve/Reject tab
   * @param {string} mobileNumber - The applicant's phone sequence to match
   */
  async openLeadAndNavigateToApproval(mobileNumber) {
    console.log('📋 Accessing the central Lead Pool menu layout...');
    await this.leadPoolLink.waitFor({ state: 'visible', timeout: 20000 });
    await this.leadPoolLink.click();

    console.log(`🔍 Drilling down into Lead context matching phone: ${mobileNumber}...`);
    const leadRow = this.page.locator('tr', { has: this.page.locator(`td:text("${mobileNumber}")`) }).first();
    await leadRow.waitFor({ state: 'visible', timeout: 30000 });
    await leadRow.click();

    console.log('🔘 Focusing viewport tracking to "Approve / Reject" tab dashboard layout...');
    await this.approveRejectTab.waitFor({ state: 'visible', timeout: 30000 });
    await this.approveRejectTab.click({ force: true });
  }

  /**
   * Fills the Branch Manager evaluation spreadsheet module and submits authorization
   * @param {Object} config - The data map container holding form value targets
   */
  async performApprovalFormFill(config) {
    console.log('✍️ Beginning spreadsheet record parameter injection...');

    // 1. Fill Applicant row metrics
    await this.applicantProfile.waitFor({ state: 'visible', timeout: 15000 });
    await this.applicantProfile.fill(config.applicantProfileText);
    await this.applicantIncome.fill(String(config.applicantIncomeAmount));

    // 2. Fill Co-Applicant row metrics
    await this.coApplicantProfile.fill(config.coApplicantProfileText);
    await this.coApplicantIncome.fill(String(config.coApplicantIncomeAmount));

    // 3. Fill Core Summary Parameters using recorded textbox actions
    console.log('✍️ Injecting FOIR percentage text...');
    await this.foirField.scrollIntoViewIfNeeded();
    await this.foirField.fill(String(config.foirPercentage));
    
    // 4. Fill Property Owner Info
    console.log('✍️ Injecting Property Owner metrics...');
    await this.propertyOwnerField.scrollIntoViewIfNeeded();
    await this.propertyOwnerField.fill(config.propertyOwnerNameText);

    // 5. Handle Decision Selection Box Dropdown routing using your exact CSS tokens
    console.log('🔘 Expanding Decision selection dropdown panel...');
    await this.decisionDropdown.scrollIntoViewIfNeeded();
    await this.decisionDropdown.click({ force: true });

    console.log('🎯 Selecting target decision item: Approved...');
    await this.approvedOption.waitFor({ state: 'visible', timeout: 5000 });
    await this.approvedOption.click();

    // 6. Finalize the Submission using recorded button role identification
    console.log('🚀 Dispatching application state parameters via Update Lead Status...');
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
    
    console.log('✅ Form configuration saved and processed completely.');
  }
}
