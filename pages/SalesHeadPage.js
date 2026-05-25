export class SalesHeadPage {
  constructor(page) {
    this.page = page;
    this.leadPoolLink = page.locator('a[href="#/lead/total-lead"]:has-text("Lead Pool"), a.nav-link:has-text("Lead Pool")').first();
    this.callStatusTab = page.locator('div[role="tab"]:has-text("Call Status"), .ant-tabs-tab-btn:has-text("Call Status")').first();
    this.statusDropdown = page.locator('nz-select[nzplaceholder="Select calling status"], nz-select[formcontrolname="callingStatus"]').first();
    this.remarksField = page.locator('textarea[formcontrolname="remarks"], input[placeholder*="Remarks"]').first();
    this.officerDropdown = page.locator('nz-select[nzplaceholder="Select Sales Officer"], nz-select[formcontrolname="salesOfficer"]').first();
    this.updateButton = page.locator('button span:has-text("Update Lead Status"), button:has-text("Update"), button:has-text("Submit")').first();
  }

  async openLeadFromPool(mobileNumber) {
    await this.leadPoolLink.waitFor({ state: 'visible', timeout: 20000 });
    await this.leadPoolLink.click();

    const leadRow = this.page.locator('tr', { has: this.page.locator(`td:text("${mobileNumber}")`) }).first();
    await leadRow.waitFor({ state: 'visible', timeout: 30000 });
    await leadRow.click();
  }

  async performStatusUpdate(config) {
    await this.callStatusTab.waitFor({ state: 'visible', timeout: 30000 });
    await this.callStatusTab.click();

    await this.statusDropdown.waitFor({ state: 'visible', timeout: 15000 });
    await this.statusDropdown.click();

    const statusOption = this.page.locator(`nz-option-item[title="${config.callingStatus}"], nz-option-item:has-text("${config.callingStatus}")`).first();
    await statusOption.waitFor({ state: 'visible', timeout: 15000 });
    await statusOption.click();

    if (await this.remarksField.isVisible()) {
      await this.remarksField.fill(config.remarks);
    }

    if (config.assignOfficerCode) {
      await this.officerDropdown.waitFor({ state: 'visible', timeout: 15000 });
      await this.officerDropdown.click();

      const officerOption = this.page.locator(`nz-option-item[title*="${config.assignOfficerCode}"], nz-option-item:has-text("${config.assignOfficerCode}")`).first();
      await officerOption.waitFor({ state: 'visible', timeout: 15000 });
      await officerOption.click();
    }

    await this.updateButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.updateButton.click();
  }
}
