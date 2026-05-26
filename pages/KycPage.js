export class KycPage {
  constructor(page) {
    this.page = page;
    
    // Grid Rows targeting specific applicant profiles
    this.applicantRow = page.locator('tr', { has: page.locator('.ant-tag, span').filter({ hasText: /^Applicant$/ }) }).first();
    this.coApplicantRow = page.locator('tr', { has: page.locator('.ant-tag, span').filter({ hasText: /^Co-Applicant$/ }) }).first();
    
    // Ant-Design Specific Modals Context Elements
    this.modalContent = page.locator('.ant-modal-content');
    this.closeModalBtn = page.locator('.ant-modal-close, button:has-text("Cancel")').first();
    this.verifyBtn = page.locator('.ant-modal-content button:has-text("Verify")').first();
  }

  // Resilient helper method to safely handle modal dismissals
  async safelyDismissModal() {
    try {
      if (await this.modalContent.isVisible({ timeout: 3000 })) {
        console.log('⏳ Closing modal window context...');
        await this.closeModalBtn.click({ force: true, timeout: 3000 });
      }
    } catch (error) {
      console.log('⚠️ Modal closed during processing execution.');
    }
    await this.modalContent.waitFor({ state: 'detached', timeout: 5000 }).catch(() => null);
  }

  async executeApplicantKyc(data) {
    console.log('🚀 Commencing Applicant KYC uploads...');
    await this.applicantRow.waitFor({ state: 'visible', timeout: 15000 });
    
    // Target the specific KYC cell explicitly inside the applicant row
    const kycCell = this.applicantRow.locator('td').nth(2).filter({ hasText: /Click here to update/i });
    if (await kycCell.isVisible()) {
      await kycCell.click();
      await this.fillKycModalDetails(data);
    } else {
      console.log('⏭️ Applicant KYC already populated. Skipping dropdown actions.');
    }
  }

  async executeCoApplicantKyc(data) {
    console.log('🚀 Commencing Co-Applicant KYC uploads...');
    await this.coApplicantRow.waitFor({ state: 'visible', timeout: 15000 });
    await this.coApplicantRow.scrollIntoViewIfNeeded();
    
    // Target the specific KYC cell explicitly inside the co-applicant row (3rd column / Index 2)
    const coAppKycCell = this.coApplicantRow.locator('td').nth(2).filter({ hasText: /Click here to update/i });
    
    if (await coAppKycCell.isVisible()) {
      await coAppKycCell.click();
      await this.fillKycModalDetails(data);
    } else {
      console.log('⏭️ Co-Applicant KYC already verified or skipped.');
    }
  }

  // Isolated reusable modal steps utilizing clean, scoped dropdown locators
  async fillKycModalDetails(data) {
    // Target fields relative strictly to inside the opened modal window to prevent global textbox misclicks
    const firstDropdown = this.modalContent.locator('nz-select').first();
    await firstDropdown.click();
    await this.page.locator('nz-option-item:has-text("Driving License"), .ant-select-item-option-content:has-text("Driving License")').first().click();
    
    const firstInput = this.modalContent.locator('input[type="text"]').first();
    await firstInput.fill(data.dlNumber);

    const secondDropdown = this.modalContent.locator('nz-select').nth(1);
    await secondDropdown.click();
    await this.page.locator('nz-option-item:has-text("UIDAI Card (Aadhaar)"), .ant-select-item-option-content:has-text("UIDAI Card (Aadhaar)")').first().click();
    
    const secondInput = this.modalContent.locator('input[type="text"]').nth(1);
    await secondInput.fill(data.aadhaarNumber);

    await this.verifyBtn.click();
    await this.safelyDismissModal();
    await this.page.waitForTimeout(1500);
  }
}
