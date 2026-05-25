import { test } from '@playwright/test';
import { TEST_DATA } from '../data/leadData';
import { LoginPage } from '../pages/LoginPage';
import { CreateLeadPage } from '../pages/CreateLeadPage';
import { SalesHeadPage } from '../pages/SalesHeadPage';
import { BureauCheckPage } from '../pages/BureauCheckPage';
import { KycPage } from '../pages/KycPage';

const TARGET_MOBILE = TEST_DATA.salesOfficer.leadDetails.mobileNumber;

test.describe('Manappuram Lead Management System Flow', () => {

  test('Step 1: Sales Officer - Create Lead', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const createLeadPage = new CreateLeadPage(page);
    const config = TEST_DATA.salesOfficer;

    await loginPage.navigate();
    await loginPage.login(config.login.username, config.login.password);
    await createLeadPage.fillForm(config.leadDetails);
    await createLeadPage.handleOutcome();
  });

  test('Step 2: Sales Head - Update Lead Status', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const salesHeadPage = new SalesHeadPage(page);
    const config = TEST_DATA.salesHead;

    await loginPage.login(config.login.username, config.login.password, 45000);
    await salesHeadPage.openLeadFromPool(config.statusUpdate.targetMobile);
    await salesHeadPage.performStatusUpdate(config.statusUpdate);
  });

  test('Step 3: SO-LEAD-SUBMIT (Applicant & Co-Applicant Verification)', async ({ page }) => {
    test.setTimeout(120000);
    const loginPage = new LoginPage(page);
    const bureauPage = new BureauCheckPage(page);
    const config = TEST_DATA.salesOfficer;

    // Login and access context pool panel
    await loginPage.navigate();
    await loginPage.login(config.login.username, config.login.password);
    
    await bureauPage.openLeadFromPool(TARGET_MOBILE);
    
    await bureauPage.fillPrimaryApplicant({
      firstName: "Nandu I S",
      lastName: "K V T",
      dob: "20-Oct-1990",
      mobileNumber: "9400140012"
    });
    
    await bureauPage.fillCoApplicant({
      firstName: "Nandu I S",
      lastName: "K V T",
      dob: "20-Oct-1990",
      mobileNumber: "9400140013"
    });
  });

    test('Step 4: SO-KYC-UPLOAD (Applicant & Co-Applicant Document Verification)', async ({ page }) => {
    test.setTimeout(120000);
    const loginPage = new LoginPage(page);
    const bureauPage = new BureauCheckPage(page); // Handles tab switching navigation
    const kycPage = new KycPage(page);
    
    const credentials = TEST_DATA.salesOfficer.login;
    const kycConfig = TEST_DATA.kycDetails;

    // 1. Authenticate session
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    
    // 2. Open Lead profile AND automatically click the Bureau Check tab layout view
    await bureauPage.openLeadFromPool(TARGET_MOBILE);
    
    // 3. Execute consecutive tabular document uploads now that table elements are visible
    await kycPage.executeApplicantKyc(kycConfig.applicant);
    await kycPage.executeCoApplicantKyc(kycConfig.coApplicant);
  });

});
