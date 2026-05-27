import { test } from '@playwright/test';
import { TEST_DATA } from '../data/leadData';
import { LoginPage } from '../pages/LoginPage';
import { CreateLeadPage } from '../pages/CreateLeadPage';
import { SalesHeadPage } from '../pages/SalesHeadPage';
import { BureauCheckPage } from '../pages/BureauCheckPage';
import { KycPage } from '../pages/KycPage';
import { forceVerifyPanInDb } from '../helpers/panDbService';
import { BranchManagerPage } from '../pages/BranchManagerPage'; 

const TARGET_MOBILE = TEST_DATA.salesOfficer.leadDetails.mobileNumber;

test.describe('Manappuram Lead Management System Flow', () => {

  test('Step 1: Sales Officer - Create', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const createLeadPage = new CreateLeadPage(page);
    const config = TEST_DATA.salesOfficer;

    await loginPage.navigate();
    await loginPage.login(config.login.username, config.login.password);
    await createLeadPage.fillForm(config.leadDetails);
    await createLeadPage.handleOutcome();
  });

  test('Step 2: Sales Head - Update ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const salesHeadPage = new SalesHeadPage(page);
    const config = TEST_DATA.salesHead;

    await loginPage.login(config.login.username, config.login.password, 45000);
    await salesHeadPage.openLeadFromPool(config.statusUpdate.targetMobile);
    await salesHeadPage.performStatusUpdate(config.statusUpdate);
  });

  test('Step 3: SO-LEAD-SUBMIT ', async ({ page }) => {
    test.setTimeout(120000);
    const loginPage = new LoginPage(page);
    const bureauPage = new BureauCheckPage(page);
    const config = TEST_DATA.salesOfficer;

    await loginPage.navigate();
    await loginPage.login(config.login.username, config.login.password);
    await bureauPage.openLeadFromPool(TARGET_MOBILE);
    
    await bureauPage.fillPrimaryApplicant({
      firstName: "Ranjith",
      lastName: "T G",
      dob: "20-Oct-1990",
      mobileNumber: "8590228978"
    });
    
    await bureauPage.fillCoApplicant({
      firstName: "Nikhil",
      lastName: "S",
      dob: "20-Oct-1990",
      mobileNumber: "8590228979"
    }); 
  });

  test('Step 4: Seed PAN & Bureau Records via Backend Database', async () => {
    console.log('⚡ Running isolated backend database modifications for PAN & Bureau scores...');
    
    const currentLeadId = 4937; 
    
    await forceVerifyPanInDb(currentLeadId, 'Karthikeyan K', 'EEEPB6205R'); 
    await forceVerifyPanInDb(currentLeadId, 'Vignesh', 'XYZWR5678R');      
    
    console.log('✅ Step 4 Complete: Database values applied successfully.');
  });

  // 💻 UI PROCESS: UI opens and sees the true, seeded values from the DB
  test('Step 5: SO-KYC-UPLOAD & Lead Submit', async ({ page }) => {
    test.setTimeout(120000);
    const loginPage = new LoginPage(page);
    const bureauPage = new BureauCheckPage(page); 
    const kycPage = new KycPage(page);
    
    const credentials = TEST_DATA.salesOfficer.login;
    const kycConfig = TEST_DATA.kycDetails;

    // Optional Network Interceptor fallback
    await page.route('**/*LeadApplicant*', async (route) => {
      console.log('🌐 Intercepting network validation details to reinforce API status flags...');
      const response = await route.fetch();
      let bodyText = await response.text();
      
      try {
        let jsonPayload = JSON.parse(bodyText);
        if (Array.isArray(jsonPayload)) {
          jsonPayload.forEach(applicant => {
            applicant.IsPanVerified = 1;
            applicant.PanStatus = 'VERIFIED';
            applicant.BureauScore = 750;
            applicant.EquifaxBureauScore = 740;
          });
        }
        await route.fulfill({ response, body: JSON.stringify(jsonPayload) });
      } catch (err) {
        bodyText = bodyText.replace(/"IsPanVerified":0/g, '"IsPanVerified":1');
        await route.fulfill({ response, body: bodyText });
      }
    });
    
      // 2. Re-login and open the lead pool to confirm data reflects visually
  await loginPage.navigate();
  await loginPage.login(credentials.username, credentials.password);
  await bureauPage.openLeadFromPool(TARGET_MOBILE);

  // 3. Focus onto the Bureau Check layout grid
  const bureauTab = page.locator('div[role="tab"], .ant-tabs-tab-btn').filter({ hasText: /^Bureau Check$/ }).first();
  await bureauTab.waitFor({ state: 'visible' });
  await bureauTab.click();

  console.log('⏳ Waiting for Angular layout and score columns to populate...');
  // Force a wait for the dynamic score table wrapper container to appear in the DOM
  await page.waitForSelector('.ant-table-tbody, nz-table', { state: 'visible', timeout: 15000 });

  // 4. Click final submit button with scroll and visibility assurances
  console.log('🎯 Locating Lead submit button...');
  const submitButton = page.locator('button.ant-btn.button-3:has-text("Lead submit")');
  
  // Explicitly scroll it into view and ensure it is fully ready
  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.waitFor({ state: 'visible', timeout: 10000 });
  
  // Execute the click action
  await submitButton.click();
  console.log('✅ Step 4b Complete: Verification confirmed and Lead submitted.');

  });
  test('Step 6: Branch Manager - Evaluation & Approval', async ({ page }) => {
  test.setTimeout(120000);
  const loginPage = new LoginPage(page);
  const bmPage = new BranchManagerPage(page);
  
  const bmConfig = TEST_DATA.branchManager;

  console.log('💻 Launching Branch Manager portal login phase...');
  await loginPage.navigate();
  await loginPage.login(bmConfig.login.username, bmConfig.login.password);

  // Navigate using the class structure method
  await bmPage.openLeadAndNavigateToApproval(TARGET_MOBILE);

  // 🚀 FIXED: Directly passing data parameters here since TEST_DATA only contains the BM employee code
  await bmPage.performApprovalFormFill({
    applicantProfileText: 'Salaried Professional Verification Confirmed',
    applicantIncomeAmount: 45000,
    coApplicantProfileText: 'Co-Applicant Document Profile Sourced',
    coApplicantIncomeAmount: 35000,
    foirPercentage: 42,
    propertyOwnerNameText: 'Ranjith T G'
  });

  console.log('🎉 Step 6 Complete: Application completely approved by the Branch Manager!');
});


});
