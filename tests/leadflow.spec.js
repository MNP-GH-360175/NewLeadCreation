import { test } from '@playwright/test';
import { TEST_DATA } from '../data/leadData';
import { LoginPage } from '../pages/LoginPage';
import { CreateLeadPage } from '../pages/CreateLeadPage';
import { SalesHeadPage } from '../pages/SalesHeadPage';
import { BureauCheckPage } from '../pages/BureauCheckPage';
import { KycPage } from '../pages/KycPage';
import { forceVerifyPanInDb } from '../helpers/panDbService';

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
      firstName: "Aravindan",
      lastName: "K",
      dob: "20-Oct-1990",
      mobileNumber: "8590228978"
    });
    
    await bureauPage.fillCoApplicant({
      firstName: "Vignesh",
      lastName: "G",
      dob: "20-Oct-1990",
      mobileNumber: "8590228979"
    }); 
  });

    test('Step 4: SO-KYC-UPLOAD ', async ({ page }) => {
    test.setTimeout(120000);
    const loginPage = new LoginPage(page);
    const bureauPage = new BureauCheckPage(page); 
    const kycPage = new KycPage(page);
    
    const credentials = TEST_DATA.salesOfficer.login;
    const kycConfig = TEST_DATA.kycDetails;

    // 🚀 INTERCEPT THE NETWORKS: Catch any dynamic API metadata payload matching lead details
    // Replace '*getLeadApplicant*' with the actual endpoint segment visible in your browser dev-tools network tab
    await page.route('**/*LeadApplicant*', async (route) => {
      console.log('🌐 Intercepting network validation details to force PAN approval flags...');
      const response = await route.fetch();
      let bodyText = await response.text();
      
      try {
        let jsonPayload = JSON.parse(bodyText);
        
        // Dynamically override status attributes across array entries if available
        if (Array.isArray(jsonPayload)) {
          jsonPayload.forEach(applicant => {
            applicant.Pan = applicant.ApplicantName.toUpperCase().includes('Aravindan') ? 'XYZWR5678G' : 'EEEPB6205O';
            applicant.IsPanVerified = 1;
            applicant.PanStatus = 'VERIFIED';
          });
        } else if (jsonPayload.data) {
          // If wrapped inside a nested framework structural object
          if (Array.isArray(jsonPayload.data)) {
            jsonPayload.data.forEach(applicant => {
              applicant.Pan = applicant.ApplicantName.toUpperCase().includes('VIGNESH') ? 'XYZWR5678G' : 'EEEPB6205O';
              applicant.IsPanVerified = 1;
            });
          }
        }
        
        await route.fulfill({
          response,
          body: JSON.stringify(jsonPayload)
        });
      } catch (err) {
        // Fallback option in case text modification is safer than JSON structures
        bodyText = bodyText.replace(/"IsPanVerified":0/g, '"IsPanVerified":1');
        await route.fulfill({ response, body: bodyText });
      }
    });

    console.log('💻 Proceeding with UI KYC testing steps...');
    await loginPage.navigate();
    await loginPage.login(credentials.username, credentials.password);
    await bureauPage.openLeadFromPool(TARGET_MOBILE);
    
    // Execute core document uploads (Driving License and Aadhaar rows)
    await kycPage.executeApplicantKyc(kycConfig.applicant);
    await kycPage.executeCoApplicantKyc(kycConfig.coApplicant);
  });

    test('Step 5: Seed PAN Verification Records via Backend Database', async () => {
    console.log('⚡ Running isolated backend database modifications for PAN rows...');
    
    const currentLeadId = 4939; // 🚀 Targets your current test data profile context perfectly
    
    await forceVerifyPanInDb(currentLeadId, 'Aravindan', 'EEEPB6205R'); 
    await forceVerifyPanInDb(currentLeadId, 'Vignesh', 'XYZWR5678R');      
    
    console.log('✅ Step 5 Complete: Database values applied successfully.');
  });


});
