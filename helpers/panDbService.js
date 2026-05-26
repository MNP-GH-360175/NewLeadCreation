import oracledb from 'oracledb';

oracledb.autoCommit = true;

/**
 * Directly verifies applicant or co-applicant PAN details by LeadId and Row Position
 * @param {number} leadId - The tracking sequence number (e.g., 4937)
 * @param {string} targetName - Filter to distinguish records inside the LeadId block
 * @param {string} validPanNumber - The 10-character alphanumeric PAN string to inject
 * @returns {Promise<boolean>} Returns true if rows were successfully updated
 */
export async function forceVerifyPanInDb(leadId, targetName, validPanNumber) {
  
  const dbConfig = {
    user: 'LOS',
    password: 'loS$9164',
  connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=los-uat.ciognzno8hbv.ap-south-1.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SID=ORCL)))'  };

  let connection;
  try {
    console.log(`🗄️ Connecting to Amazon RDS Oracle Database instance...`);
    connection = await oracledb.getConnection(dbConfig);

    // 🚀 FIXED: Targeting precise rows using LeadId paired with case-insensitive ApplicantName matching
    const updateQuery = `
      UPDATE "LeadApplicant" 
      SET "Pan" = :pan, 
          "IsPanVerified" = 1
      WHERE "LeadId" = :leadId 
        AND UPPER("ApplicantName") LIKE :name
    `;

    console.log(`🔍 Seeding record attributes for Lead: ${leadId}, Profile Matching: ${targetName}...`);
    
    const result = await connection.execute(
      updateQuery, 
      {
        pan: validPanNumber.toUpperCase(),
        leadId: Number(leadId),
        name: `%${targetName.toUpperCase()}%`
      }
    );

    if (result.rowsAffected && result.rowsAffected > 0) {
      console.log(`✅ Success! Oracle records modified. Rows affected: ${result.rowsAffected}`);
      return true;
    } else {
      console.warn(`⚠️ Warning: 0 rows updated. Verify if LeadId ${leadId} matches name text inside table rows.`);
      return false;
    }

  } catch (error) {
    console.error(`🚨 Fatal Database Error:`, error.message);
    throw error; 
  } finally {
    if (connection) {
      await connection.close();
      console.log(`🔌 Connection closed cleanly.`);
    }
  }
}
