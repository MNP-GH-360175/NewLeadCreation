# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: leadflow.spec.js >> Manappuram Lead Management System Flow >> Step 4: SO-KYC-UPLOAD 
- Location: tests\leadflow.spec.js:62:9

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: page.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Lead submit")')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - link "MAFIL" [ref=e4] [cursor=pointer]:
      - /url: "#/dashboard"
      - img "MAFIL" [ref=e5]
    - button [ref=e6] [cursor=pointer]
    - heading "Lead Management System" [level=4] [ref=e8]
    - list [ref=e9]:
      - listitem [ref=e10]:
        - button "NIDHIN Sales Officeruser" [ref=e11] [cursor=pointer]:
          - generic [ref=e12]: NIDHIN Sales Officer
          - img "user" [ref=e13]
  - generic [ref=e14]:
    - generic [ref=e15]:
      - generic [ref=e17]:
        - link " Dashboard" [ref=e19] [cursor=pointer]:
          - /url: "#/dashboard"
          - generic [ref=e20]:
            - generic [ref=e21]: 
            - text: Dashboard
        - generic [ref=e23]: Lead
        - link " Create Lead" [ref=e25] [cursor=pointer]:
          - /url: "#/lead/new"
          - generic [ref=e26]:
            - generic [ref=e27]: 
            - text: Create Lead
        - link " Lead Pool" [ref=e29] [cursor=pointer]:
          - /url: "#/lead/total-lead"
          - generic [ref=e30]:
            - generic [ref=e31]: 
            - text: Lead Pool
        - generic [ref=e32]:
          - generic [ref=e33] [cursor=pointer]:
            - generic [ref=e34]: 
            - text: Processed Leads
          - generic:
            - link " New Lead" [ref=e36] [cursor=pointer]:
              - /url: "#/lead/lead-pool"
              - generic [ref=e37]:
                - generic [ref=e38]: 
                - text: New Lead
            - link " Approved Leads" [ref=e40] [cursor=pointer]:
              - /url: "#/lead/approved"
              - generic [ref=e41]:
                - generic [ref=e42]: 
                - text: Approved Leads
            - link " In Follow Up" [ref=e44] [cursor=pointer]:
              - /url: "#/lead/in-follow-up"
              - generic [ref=e45]:
                - generic [ref=e46]: 
                - text: In Follow Up
            - link " Under Bureau Check" [ref=e48] [cursor=pointer]:
              - /url: "#/lead/under-bureau-check"
              - generic [ref=e49]:
                - generic [ref=e50]: 
                - text: Under Bureau Check
            - link " Rejected Leads" [ref=e52] [cursor=pointer]:
              - /url: "#/lead/rejected"
              - generic [ref=e53]:
                - generic [ref=e54]: 
                - text: Rejected Leads
            - link " Not Interested Leads" [ref=e56] [cursor=pointer]:
              - /url: "#/lead/not-interested"
              - generic [ref=e57]:
                - generic [ref=e58]: 
                - text: Not Interested Leads
            - link " Enquiry Pool" [ref=e60] [cursor=pointer]:
              - /url: "#/lead/enquiry-pool"
              - generic [ref=e61]:
                - generic [ref=e62]: 
                - text: Enquiry Pool
        - link " Overdue Leads" [ref=e65] [cursor=pointer]:
          - /url: "#/lead/overdue-leads"
          - generic [ref=e66]:
            - generic [ref=e67]: 
            - text: Overdue Leads
        - link " Rejected Lead Reuse" [ref=e69] [cursor=pointer]:
          - /url: "#/lead/overdue-lead-reuse"
          - generic [ref=e70]:
            - generic [ref=e71]: 
            - text: Rejected Lead Reuse
        - link " HOT Leads" [ref=e73] [cursor=pointer]:
          - /url: "#/lead/hot-lead"
          - generic [ref=e74]:
            - generic [ref=e75]: 
            - text: HOT Leads
        - link " Daily Work Updation" [ref=e77] [cursor=pointer]:
          - /url: "#/lead/work-updation"
          - generic [ref=e78]:
            - generic [ref=e79]: 
            - text: Daily Work Updation
        - generic [ref=e81]: Admin
        - link " Bulk Upload" [ref=e83] [cursor=pointer]:
          - /url: "#/lead/upload"
          - generic [ref=e84]:
            - generic [ref=e85]: 
            - text: Bulk Upload
        - generic [ref=e87]: Reports
        - link " Lead Report" [ref=e89] [cursor=pointer]:
          - /url: "#/report"
          - generic [ref=e90]:
            - generic [ref=e91]: 
            - text: Lead Report
        - link " HOT Lead Report" [ref=e93] [cursor=pointer]:
          - /url: "#/report/hot-lead-report"
          - generic [ref=e94]:
            - generic [ref=e95]: 
            - text: HOT Lead Report
        - link " Dashboard Report" [ref=e97] [cursor=pointer]:
          - /url: "#/report/dashboard-report"
          - generic [ref=e98]:
            - generic [ref=e99]: 
            - text: Dashboard Report
        - link " Lead Summary Report" [ref=e101] [cursor=pointer]:
          - /url: "#/report/lead-summary"
          - generic [ref=e102]:
            - generic [ref=e103]: 
            - text: Lead Summary Report
      - button [ref=e105] [cursor=pointer]
    - main [ref=e106]:
      - list [ref=e108]:
        - listitem [ref=e109]:
          - link "Home" [ref=e110] [cursor=pointer]:
            - /url: "#/"
        - listitem [ref=e111]: / Lead Details
        - listitem [ref=e112]:
          - group "Button group with nested dropdown" [ref=e113]:
            - link " Dashboard" [ref=e114] [cursor=pointer]:
              - /url: "#/dashboard"
              - generic [ref=e115]: 
              - text: Dashboard
      - generic [ref=e119]:
        - generic [ref=e122]:
          - button [ref=e124] [cursor=pointer]:
            - img [ref=e126]
          - generic [ref=e128]: Lead Details
        - generic [ref=e129]:
          - table [ref=e133]:
            - rowgroup [ref=e134]:
              - row "Lead Id L0100000865 Current Status Sales Officer Submitted" [ref=e135]:
                - cell "Lead Id" [ref=e136]
                - cell "L0100000865" [ref=e137]:
                  - strong [ref=e138]: L0100000865
                - cell "Current Status" [ref=e139]
                - cell "Sales Officer Submitted" [ref=e140]:
                  - strong [ref=e141]:
                    - generic [ref=e142]: Sales Officer Submitted
              - row "Applicant Name Aravindan Mobile Number 8590228978" [ref=e143]:
                - cell "Applicant Name" [ref=e144]
                - cell "Aravindan" [ref=e145]:
                  - strong [ref=e146]: Aravindan
                - cell "Mobile Number" [ref=e147]
                - cell "8590228978" [ref=e148]:
                  - strong [ref=e149]: "8590228978"
              - row "Requested Loan Amount ₹ 5,00,000 Created Date 26-May-2026 7:03:18 AM" [ref=e150]:
                - cell "Requested Loan Amount" [ref=e151]
                - cell "₹ 5,00,000" [ref=e152]:
                  - strong [ref=e153]: ₹ 5,00,000
                - cell "Created Date" [ref=e154]
                - cell "26-May-2026 7:03:18 AM" [ref=e155]:
                  - strong [ref=e156]: 26-May-2026 7:03:18 AM
              - row "Lead Source Own lead Pin Code & Branch 673602 KAMASHIPALAYAM" [ref=e157]:
                - cell "Lead Source" [ref=e158]
                - cell "Own lead" [ref=e159]:
                  - strong [ref=e160]: Own lead
                - cell "Pin Code & Branch" [ref=e161]
                - cell "673602 KAMASHIPALAYAM" [ref=e162]:
                  - strong [ref=e163]: "673602"
                  - strong [ref=e164]: KAMASHIPALAYAM
          - generic [ref=e165]:
            - tablist [ref=e166]:
              - generic [ref=e168]:
                - tab "Bureau Check" [active] [selected] [ref=e170] [cursor=pointer]
                - tab "Approve / Reject" [ref=e172] [cursor=pointer]
                - tab "History" [ref=e174] [cursor=pointer]
            - generic [ref=e179]:
              - heading "Applicants" [level=5] [ref=e182]
              - separator [ref=e184]
              - generic [ref=e189]:
                - table [ref=e193]:
                  - rowgroup [ref=e200]:
                    - row "# Applicant KYC PAN CIBIL Score Equifax Credit Score" [ref=e201]:
                      - columnheader "#" [ref=e202]
                      - columnheader "Applicant" [ref=e203]
                      - columnheader "KYC" [ref=e204]
                      - columnheader "PAN" [ref=e205]
                      - columnheader "CIBIL Score" [ref=e206]
                      - columnheader "Equifax Credit Score" [ref=e207]
                  - rowgroup [ref=e208]:
                    - row:
                      - cell
                      - cell
                      - cell
                      - cell
                      - cell
                      - cell
                    - row "1 Aravindan K Applicant Male , 19-Oct-1990 CHERUKUNNUMMAL HOUSE CHERUKUNNUMMAL HOUSE, 673602 , Kerala DL991234567890 Driving License FFEE DDCC 1100 UIDAI Card (Aadhaar) EEEPB6205R Name as per PAN 750 26-May-2026 06:12 PM 740 26-May-2026 06:12 PM" [ref=e209]:
                      - cell "1" [ref=e210]
                      - cell "Aravindan K Applicant Male , 19-Oct-1990 CHERUKUNNUMMAL HOUSE CHERUKUNNUMMAL HOUSE, 673602 , Kerala" [ref=e211]:
                        - text: Aravindan K
                        - generic [ref=e212]: Applicant
                        - text: Male , 19-Oct-1990
                        - text: CHERUKUNNUMMAL HOUSE CHERUKUNNUMMAL HOUSE, 673602 , Kerala
                      - cell "DL991234567890 Driving License FFEE DDCC 1100 UIDAI Card (Aadhaar)" [ref=e213]:
                        - text: DL991234567890
                        - img [ref=e215]
                        - generic [ref=e219]: Driving License
                        - generic [ref=e220]: FFEE DDCC 1100
                        - img [ref=e222]
                        - generic [ref=e226]: UIDAI Card (Aadhaar)
                      - cell "EEEPB6205R Name as per PAN" [ref=e227]:
                        - text: EEEPB6205R
                        - img [ref=e229]
                        - generic [ref=e234]: Name as per PAN
                      - cell "750 26-May-2026 06:12 PM" [ref=e235]:
                        - heading "750" [level=4] [ref=e236]
                        - text: 26-May-2026 06:12 PM
                      - cell "740 26-May-2026 06:12 PM" [ref=e237]:
                        - heading "740" [level=4] [ref=e238]
                        - text: 26-May-2026 06:12 PM
                    - row "2 Vignesh G Co-Applicant Male , 19-Oct-1990 CHERUKUNNUMMAL HOUSE CHERUKUNNUMMAL HOUSE, 673602 , Kerala DL881234567890 Driving License GGHH IIJJ 0011 UIDAI Card (Aadhaar) XYZWR5678R Name as per PAN 750 26-May-2026 06:12 PM 740 26-May-2026 06:12 PM" [ref=e239]:
                      - cell "2" [ref=e240]
                      - cell "Vignesh G Co-Applicant Male , 19-Oct-1990 CHERUKUNNUMMAL HOUSE CHERUKUNNUMMAL HOUSE, 673602 , Kerala" [ref=e241]:
                        - text: Vignesh G
                        - generic [ref=e242]: Co-Applicant
                        - text: Male , 19-Oct-1990
                        - text: CHERUKUNNUMMAL HOUSE CHERUKUNNUMMAL HOUSE, 673602 , Kerala
                      - cell "DL881234567890 Driving License GGHH IIJJ 0011 UIDAI Card (Aadhaar)" [ref=e243]:
                        - text: DL881234567890
                        - img [ref=e245]
                        - generic [ref=e249]: Driving License
                        - generic [ref=e250]: GGHH IIJJ 0011
                        - img [ref=e252]
                        - generic [ref=e256]: UIDAI Card (Aadhaar)
                      - cell "XYZWR5678R Name as per PAN" [ref=e257]:
                        - text: XYZWR5678R
                        - img [ref=e259]
                        - generic [ref=e264]: Name as per PAN
                      - cell "750 26-May-2026 06:12 PM" [ref=e265]:
                        - heading "750" [level=4] [ref=e266]
                        - text: 26-May-2026 06:12 PM
                      - cell "740 26-May-2026 06:12 PM" [ref=e267]:
                        - heading "740" [level=4] [ref=e268]
                        - text: 26-May-2026 06:12 PM
                - list [ref=e270]:
                  - listitem "Previous Page" [ref=e271]:
                    - button [disabled] [ref=e272]:
                      - img [ref=e274]
                  - listitem "1" [ref=e276] [cursor=pointer]:
                    - generic [ref=e277]: "1"
                  - listitem "Next Page" [ref=e278]:
                    - button [disabled] [ref=e279]:
                      - img [ref=e281]
  - generic [ref=e284]:
    - link "All rights reserved" [ref=e285] [cursor=pointer]:
      - /url: https://manappuram.com
    - text: © 2023 Manappuram Finance Ltd.
```

# Test source

```ts
  24  |     await createLeadPage.handleOutcome();
  25  |   });
  26  | 
  27  |   test('Step 2: Sales Head - Update ', async ({ page }) => {
  28  |     const loginPage = new LoginPage(page);
  29  |     const salesHeadPage = new SalesHeadPage(page);
  30  |     const config = TEST_DATA.salesHead;
  31  | 
  32  |     await loginPage.login(config.login.username, config.login.password, 45000);
  33  |     await salesHeadPage.openLeadFromPool(config.statusUpdate.targetMobile);
  34  |     await salesHeadPage.performStatusUpdate(config.statusUpdate);
  35  |   });
  36  | 
  37  |   test('Step 3: SO-LEAD-SUBMIT ', async ({ page }) => {
  38  |     test.setTimeout(120000);
  39  |     const loginPage = new LoginPage(page);
  40  |     const bureauPage = new BureauCheckPage(page);
  41  |     const config = TEST_DATA.salesOfficer;
  42  | 
  43  |     await loginPage.navigate();
  44  |     await loginPage.login(config.login.username, config.login.password);
  45  |     await bureauPage.openLeadFromPool(TARGET_MOBILE);
  46  |     
  47  |     await bureauPage.fillPrimaryApplicant({
  48  |       firstName: "Aravindan",
  49  |       lastName: "K",
  50  |       dob: "20-Oct-1990",
  51  |       mobileNumber: "8590228978"
  52  |     });
  53  |     
  54  |     await bureauPage.fillCoApplicant({
  55  |       firstName: "Vignesh",
  56  |       lastName: "G",
  57  |       dob: "20-Oct-1990",
  58  |       mobileNumber: "8590228979"
  59  |     }); 
  60  |   });
  61  | 
  62  |     test('Step 4: SO-KYC-UPLOAD ', async ({ page }) => {
  63  |     test.setTimeout(120000);
  64  |     const loginPage = new LoginPage(page);
  65  |     const bureauPage = new BureauCheckPage(page); 
  66  |     const kycPage = new KycPage(page);
  67  |     
  68  |     const credentials = TEST_DATA.salesOfficer.login;
  69  |     const kycConfig = TEST_DATA.kycDetails;
  70  | 
  71  |     // 🚀 INTERCEPT THE NETWORKS: Catch any dynamic API metadata payload matching lead details
  72  |     // Replace '*getLeadApplicant*' with the actual endpoint segment visible in your browser dev-tools network tab
  73  |     await page.route('**/*LeadApplicant*', async (route) => {
  74  |       console.log('🌐 Intercepting network validation details to force PAN approval flags...');
  75  |       const response = await route.fetch();
  76  |       let bodyText = await response.text();
  77  |       
  78  |       try {
  79  |         let jsonPayload = JSON.parse(bodyText);
  80  |         
  81  |         // Dynamically override status attributes across array entries if available
  82  |         if (Array.isArray(jsonPayload)) {
  83  |           jsonPayload.forEach(applicant => {
  84  |             applicant.Pan = applicant.ApplicantName.toUpperCase().includes('Aravindan') ? 'XYZWR5678G' : 'EEEPB6205O';
  85  |             applicant.IsPanVerified = 1;
  86  |             applicant.PanStatus = 'VERIFIED';
  87  |             applicant.BureauScore = 750;
  88  |             applicant.EquifaxBureauScore = 740;
  89  |           });
  90  |         } else if (jsonPayload.data) {
  91  |           // If wrapped inside a nested framework structural object
  92  |           if (Array.isArray(jsonPayload.data)) {
  93  |             jsonPayload.data.forEach(applicant => {
  94  |               applicant.Pan = applicant.ApplicantName.toUpperCase().includes('VIGNESH') ? 'XYZWR5678G' : 'EEEPB6205O';
  95  |               applicant.IsPanVerified = 1;
  96  |               applicant.BureauScore = 750;
  97  |               applicant.EquifaxBureauScore = 740;
  98  |             });
  99  |           }
  100 |         }
  101 |         
  102 |         await route.fulfill({
  103 |           response,
  104 |           body: JSON.stringify(jsonPayload)
  105 |         });
  106 |       } catch (err) {
  107 |         // Fallback option in case text modification is safer than JSON structures
  108 |         bodyText = bodyText.replace(/"IsPanVerified":0/g, '"IsPanVerified":1');
  109 |         await route.fulfill({ response, body: bodyText });
  110 |       }
  111 |     });
  112 |     
  113 |     console.log('💻 Re-logging and opening lead pool to confirm bureau data reflects visually...'); 
  114 |     await loginPage.navigate();
  115 |     await loginPage.login(credentials.username, credentials.password);
  116 |     await bureauPage.openLeadFromPool(TARGET_MOBILE);
  117 |     console.log('✅ Lead opened successfully. Verifying data status...'); 
  118 |     // Execute core document uploads (Driving License and Aadhaar rows)
  119 |     await kycPage.executeApplicantKyc(kycConfig.applicant);
  120 |     await kycPage.executeCoApplicantKyc(kycConfig.coApplicant);
  121 |     // 🚀 SUBMIT THE LEAD FORM
  122 |     console.log('📤 Submitting the complete lead application form...');
  123 |     // Replace with your page object's specific submit button locator or function
> 124 |     await page.click('button:has-text("Lead submit")');
      |                ^ Error: page.click: Test timeout of 120000ms exceeded.
  125 |     console.log('🎉 Lead submit button clicked successfully'); 
  126 |   });
  127 | 
  128 |     test('Step 5: Seed PAN Verification Records via Backend Database', async () => {
  129 |     console.log('⚡ Running isolated backend database modifications for PAN rows...');
  130 |     
  131 |     const currentLeadId = 4942; // 🚀 Targets your current test data profile context perfectly
  132 |     
  133 |     await forceVerifyPanInDb(currentLeadId, 'Prem', 'EEEPB6205R'); 
  134 |     await forceVerifyPanInDb(currentLeadId, 'Visag', 'XYZWR5678R');      
  135 |     
  136 |     console.log('✅ Step 5 Complete: Database values applied successfully.');
  137 |   });
  138 | 
  139 | 
  140 | });
  141 | 
```