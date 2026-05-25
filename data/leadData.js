export const TEST_DATA = {
  salesOfficer: {
    login: {
      username: '369343',
      password: 'soft1234'
    },
    leadDetails: {
      leadType: 'New Lead',
      applicantName: 'Nandu I S',
      mobileNumber: '9400140123',
      altMobileNumber: '9400140123',
      leadSource: 'Own lead',
      generatorMobile: '9400140123',
      loanType: 'LAP',
      scheme: 'LAP - Salaried',
      loanAmount: '500000',
      pincode: '673602',
      state: 'KERALA',
      branch: 'KAMASHIPALAYAM'
    }
  },
  salesHead: {
    login: {
      username: '369237',
      password: 'soft1234'
    },
    statusUpdate: {
      targetMobile: '9400140123', 
      callingStatus: 'Interested', 
      assignOfficerCode: '369343', 
      remarks: 'Updated status via automated script'
    },
    
  },
   kycDetails: {
    applicant: {
      dlNumber: 'DL991234567890',
      aadhaarNumber: '5544 3322 1100'
    },
    coApplicant: { 
      dlNumber: 'DL881234567890',
      aadhaarNumber: '6677 8899 0011'
    }
  }
};
