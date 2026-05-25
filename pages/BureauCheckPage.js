// pages/BureauCheckPage.js
export class BureauCheckPage {
  constructor(page) {
    this.page = page;
    this.leadPoolLink = page.locator('a[href="#/lead/total-lead"]:has-text("Lead Pool"), a.nav-link:has-text("Lead Pool")').first();
    this.bureauCheckTab = page.locator('div[role="tab"]:has-text("Bureau Check"), .ant-tabs-tab-btn:has-text("Bureau Check")').first();
    this.addApplicantBtnRaw = page.locator("(//span[contains(.,' Add Applicant ')])");
    this.addApplicantBtnRole = page.getByRole('button', { name: 'Add Applicant', exact: true });
    
    // Form Input Selectors
    this.firstNameInput = page.locator("input[placeholder*='First Name']");
    this.lastNameInput = page.locator("input[placeholder*='Last Name']");
    this.genderMaleRadio = page.getByRole('radio', { name: 'Male', exact: true });
    this.genderMaleLabel = page.locator('label:has-text("Male")').first();
    this.dobDatePicker = page.locator("nz-date-picker input, input[placeholder*='date' i]").first();
    this.addressLine1 = page.locator("input[placeholder='Applicant Address']").first();
    this.addressLine2 = page.locator("input[placeholder='Applicant Address']").nth(1);
    this.pincodeField = page.locator("input[maxlength='6'], input[placeholder='PIN Code']").first();
    this.stateInputSearch = page.locator("input[placeholder='Select the applicant state'], nz-select[nzplaceholder*='state'] input").last();
    this.stateDropdownResult = page.locator(".ant-select-item-option-content", { hasText: /^Kerala$/i }).first();
    this.mobileNumberField = page.locator("input[placeholder*='Mobile Number'], input[placeholder*='Mobile']").first();
    
    // Overlay Modals, Toasts, and Layout Context Popups
    this.applicantTypeDropdown = page.locator('div:has(> label:has-text("Applicant Type")) + div nz-select, nz-select:below(label:has-text("Applicant Type"))').first();
    this.coApplicantOption = page.locator('.ant-select-item-option-content:has-text("Co-Applicant"), nz-option-item:has-text("Co-Applicant")').first();
    this.modalOkBtn = page.locator("button:has-text('OK'), button.ant-btn-primary:has-text('OK')").last();
    this.modalCancelBtn = page.locator('button:has-text("Cancel"), button.ant-btn:has-text("Cancel")').first();
    this.failureToast = page.locator('.ngx-toastr, .toast-message').filter({ hasText: 'Already one applicant added' }).first();
    this.toastContainer = page.locator('.ngx-toastr');
    
    // Co-Applicant Specific Element Locators
    this.coAppFirstName = page.locator('div:has(> label:has-text("First Name")) + div input').first();
    this.coAppLastName = page.locator('div:has(> label:has-text("Last Name")) + div input').first();
    this.coAppAddress = page.locator('div:has(> label:has-text("Address")) + div input').first();
    this.coAppPincode = page.locator('input[maxlength="6"], input[placeholder*="PIN" i]').first();
    this.coAppStateDropdown = page.locator('div:has(> label:has-text("State")) + div nz-select, nz-select:below(label:has-text("State"))').first();
    this.coAppMobile = page.locator('div:has(> label:has-text("Mobile")) + div input, input[placeholder*="Mobile" i]').first();
  }

   async openLeadFromPool(mobileNumber) {
    // 1. Wait for and click the Lead Pool Link
    await this.leadPoolLink.waitFor({ state: 'visible', timeout: 20000 });
    await this.leadPoolLink.click();

    // 2. Locate and click target lead row entry matching phone number
    const leadRow = this.page.locator('tr', { has: this.page.locator(`td:text("${mobileNumber}")`) }).first();
    await leadRow.waitFor({ state: 'visible', timeout: 30000 });
    await leadRow.click();
    
    // 3. Make sure the screen details card frame is loaded
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('domcontentloaded');

    // 🚀 FIXED TAB LOCATOR: Strict element matching targeting the inner button container
    console.log('Switching context to Bureau Check data tab view...');
    const strictBureauCheckTab = this.page.locator('.ant-tabs-tab-btn').filter({ hasText: /^Bureau Check$/ }).first();
    
    // Scroll, focus, and force the click action to bypass any layout overlays
    await strictBureauCheckTab.waitFor({ state: 'visible', timeout: 15000 });
    await strictBureauCheckTab.scrollIntoViewIfNeeded();
    await strictBureauCheckTab.click({ force: true });

    // 4. Double check the table rendering wrapper successfully shows up on screen
    const tableContainer = this.page.locator('nz-table, table, .ant-table').first();
    await tableContainer.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {
      console.log('Table structure took longer to display. Continuing to row validations...');
    });
  }


  async fillPrimaryApplicant(data) {
    console.log('Navigating to Bureau Check tab...');
    await this.bureauCheckTab.waitFor({ state: 'visible', timeout: 20000 });
    await this.bureauCheckTab.click();

    console.log('Opening primary Applicant form window...');
    await this.addApplicantBtnRole.first().click();
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName); 
    await this.genderMaleRadio.click();

    await this.dobDatePicker.click();
    await this.dobDatePicker.press("Control+A");
    await this.dobDatePicker.press("Backspace");
    await this.dobDatePicker.type(data.dob, { delay: 100 });
    await this.dobDatePicker.press("Enter");

    await this.addressLine1.fill(data.address1 || "CHERUKUNNUMMAL HOUSE CHERUKUNNUMMAL HOUSE");
    await this.addressLine2.fill(data.address2 || "VELLIMADUKUNNU PO");

    await this.pincodeField.focus(); 
    await this.pincodeField.fill(data.pincode || "673602");

    await this.stateInputSearch.scrollIntoViewIfNeeded();
    await this.stateInputSearch.click({ force: true });
    await this.stateInputSearch.press("Control+A");
    await this.stateInputSearch.press("Backspace");
    await this.stateInputSearch.type(data.state || "KERALA", { delay: 150 });

    await this.stateDropdownResult.waitFor({ state: "visible", timeout: 4000 });
    await this.stateDropdownResult.click();

    await this.mobileNumberField.scrollIntoViewIfNeeded();
    await this.mobileNumberField.focus();
    await this.mobileNumberField.fill(data.mobileNumber);

    console.log("Submitting primary Applicant profile form...");
    await this.modalOkBtn.scrollIntoViewIfNeeded();
    await this.modalOkBtn.click({ force: true });

    try {
      await this.failureToast.waitFor({ state: 'visible', timeout: 4000 });
      console.log("⚠️ toastr alert detected: 'Already one applicant added'. Cancelling modal window...");
      await this.modalCancelBtn.click();
    } catch (error) {
      console.log("✅ Clear execution path. Primary applicant profile updated.");
    }
    await this.page.waitForTimeout(1000);
  }

  async fillCoApplicant(data) {
    console.log("--- Starting Co-Applicant Flow ---");
    await this.addApplicantBtnRole.waitFor({ state: "visible", timeout: 10000 });
    await this.addApplicantBtnRole.click();

    console.log('Opening Applicant Type dropdown...');
    await this.applicantTypeDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.applicantTypeDropdown.click();

    console.log('Selecting Co-Applicant option...');
    await this.coApplicantOption.waitFor({ state: 'visible' });
    await this.coApplicantOption.click();

    await this.coAppFirstName.fill(data.firstName);
    await this.coAppLastName.fill(data.lastName);
    await this.genderMaleLabel.click();

    console.log('Setting up Date of Birth for Co-Applicant...');
    await this.dobDatePicker.waitFor({ state: 'visible', timeout: 10000 });
    await this.dobDatePicker.click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    await this.dobDatePicker.fill(data.dob);
    await this.dobDatePicker.press('Enter');

    // 5. Fill Address Configurations
    console.log('Entering address profile settings...');
    await this.coAppAddress.fill(data.address || "CHERUKUNNUMMAL HOUSE CHERUKUNNUMMAL HOUSE");
    await this.coAppPincode.fill(data.pincode || "673602");
    await this.coAppPincode.press('Tab');

    // 6. Select State Dropdown using dynamic State Label tracking 
    console.log('Opening State dropdown via explicit State Label mapping...');
    await this.coAppStateDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.coAppStateDropdown.click();

    console.log('Searching for Kerala...');
    const coApplicantStateSearchInput = this.coAppStateDropdown.locator('input.ant-select-selection-search-input');
    await coApplicantStateSearchInput.waitFor({ state: 'visible' });
    await coApplicantStateSearchInput.fill(data.state || 'Kerala');

    const stateOption = this.page.locator('.ant-select-item-option-content:has-text("Kerala"), nz-option-item:has-text("Kerala")').first();
    await stateOption.waitFor({ state: 'visible' });
    await stateOption.click();

    // 7. Input Co-Applicant Mobile Field and Save
    console.log("Entering Co-Applicant Mobile Number...");
    await this.coAppMobile.fill(data.mobileNumber || "9400140988");

    console.log("Submitting final Co-Applicant form...");
    await this.modalOkBtn.scrollIntoViewIfNeeded();
    await this.modalOkBtn.click({ force: true });
    
    await this.page.waitForTimeout(2000);
    console.log("✅ Workflow completed end-to-end for both applicant profiles.");
  }
}
