import { testEscrowRelease } from "./escrow.test.js";
import { Config } from "./config.js";

// Run the release test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
	testEscrowRelease()
		.then((releaseDetails) => {
			console.log("📊 Release Details for Manual Verification:");
			console.log(`   Horizon URL: ${releaseDetails.horizonUrl}`);
			console.log(
				`   Escrow Account: ${releaseDetails.horizonUrl}/accounts/${releaseDetails.escrowPublicKey}`,
			);
			console.log(
				`   Custodian Account: ${releaseDetails.horizonUrl}/accounts/${releaseDetails.custodianPublicKey}`,
			);
			console.log(
				`   Transaction: ${releaseDetails.horizonUrl}/transactions/${releaseDetails.txHash}`,
			);
			console.log(`   Escrow Public Key: ${releaseDetails.escrowPublicKey}`);
			console.log(
				`   Custodian Public Key: ${releaseDetails.custodianPublicKey}`,
			);
			console.log(`   Transaction Hash: ${releaseDetails.txHash}`);
		})
		.catch((error) => {
			console.error("Release test execution failed:", error);
			process.exit(1);
		});
}
