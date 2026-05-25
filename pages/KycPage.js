export class KycPage {
  constructor(page) {
    this.page = page;
    
    // Grid Rows targeting specific tags based on your screenshot structure
    this.applicantRow = page.locator('tr', { has: page.locator('.ant-tag, span').filter({ hasText: /^Applicant$/ }) }).first();
    this.coApplicantRow = page.locator('tr', { has: page.locator('.ant-tag, span').filter({ hasText: /^Co-Applicant$/ }) }).first();
    
    // Document Form Fields
    this.docTypeDropdown1 = page.getByRole('textbox').first();
    this.dlOption = page.locator('.ant-select-item-option-content:has-text("Driving License"), nz-option-item:has-text("Driving License")').first();    this.dlNumberField = page.getByRole('textbox', { name: 'Enter Document Number' }).first();
    
    this.docTypeDropdown2 = page.locator('nz-select-top-control').filter({ hasText: 'Select the document type' }).locator('nz-select-search');
    this.coAppDocTypeDropdown2 = page.locator('nz-select-top-control').filter({ hasText: 'Select the document type' }).getByRole('textbox');
    this.aadhaarOption = page.locator('.ant-select-item-option-content:has-text("UIDAI Card (Aadhaar)"), nz-option-item:has-text("UIDAI Card (Aadhaar)")').first();
    this.aadhaarNumberField = page.getByRole('textbox', { name: 'Enter Document Number' }).nth(1);
    
    // Actions & Modal Closures
    this.verifyBtn = page.getByRole('button', { name: 'Verify' });
    this.closeModalBtn = page.locator('.ant-modal-close, button:has-text("Cancel")').first();
    this.modalContent = page.locator('.ant-modal-content');
    // Add these lines inside the constructor of pages/KycPage.js
this.panNumberField = page.locator('input[placeholder*="PAN" i], input[formcontrolname="panNumber"]').first();
this.panVerifyBtn = page.locator('button:has-text("Verify"), button.ant-btn-primary:has-text("Verify")').first();

  }

      async executeApplicantKyc(data) {
    console.log('🚀 Commencing Applicant KYC uploads...');
    
    await this.applicantRow.waitFor({ state: 'visible', timeout: 15000 });
    await this.applicantRow.scrollIntoViewIfNeeded();
    
    // 🚀 FIXED: Uses regex filter to ignore hidden spaces or dynamic Angular comments inside the <td>
    const updateCell = this.applicantRow.locator('td').filter({ hasText: /Click here to update/ }).first();
    await updateCell.waitFor({ state: 'visible', timeout: 5000 });
    await updateCell.click(); 
    
    // ... (rest of your applicant field inputs remain unchanged) ...
    await this.docTypeDropdown1.click();
    await this.dlOption.click();
    await this.dlNumberField.fill(data.dlNumber);
    await this.docTypeDropdown2.click();
    await this.aadhaarOption.click();
    await this.aadhaarNumberField.fill(data.aadhaarNumber);
    await this.verifyBtn.click();
    
    await this.closeModalBtn.waitFor({ state: 'visible', timeout: 5000 });
    await this.closeModalBtn.click();
    await this.modalContent.waitFor({ state: 'detached', timeout: 7000 });
    await this.page.waitForTimeout(2000); 
  }

  async executeCoApplicantKyc(data) {
    console.log('🚀 Commencing Co-Applicant KYC uploads...');
    await this.coApplicantRow.waitFor({ state: 'visible', timeout: 15000 });
    await this.coApplicantRow.scrollIntoViewIfNeeded();
    
    // 🚀 FIXED: Identical bulletproof cell filter for the Co-Applicant row scope
    const coAppUpdateCell = this.coApplicantRow.locator('td').filter({ hasText: /Click here to update/ }).first();
    await coAppUpdateCell.waitFor({ state: 'visible', timeout: 5000 });
    await coAppUpdateCell.click(); 
    
    // ... (rest of your co-applicant inputs remain unchanged) ...
    await this.docTypeDropdown1.click();
    await this.dlOption.click();
    await this.dlNumberField.fill(data.dlNumber);
    await this.coAppDocTypeDropdown2.click();
    await this.aadhaarOption.click();
    await this.aadhaarNumberField.fill(data.aadhaarNumber);
    await this.verifyBtn.click();
    await this.closeModalBtn.waitFor({ state: 'visible', timeout: 5000 });
    await this.closeModalBtn.click();
    await this.modalContent.waitFor({ state: 'detached', timeout: 5000 });
  }




}
